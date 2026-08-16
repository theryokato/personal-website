import type { MediaItem } from '../types/interests';

const ANILIST_API = 'https://graphql.anilist.co';
const TRAKT_API = 'https://api.trakt.tv';
const HARDCOVER_API = 'https://api.hardcover.app/v1/graphql';

/**
 * Mapping for Hardcover status_id
 * 1 = Want to Read, 2 = Currently Reading, 3 = Read, 4 = Paused, 5 = Did Not Finish
 */
function mapHardcoverStatus(statusId: number): MediaItem['status'] {
  switch (statusId) {
    case 2: return 'reading';
    case 3: return 'finished';
    case 5: return 'abandoned';
    case 4: return 'partially';
    default: return 'partially';
  }
}

/**
 * Mapping for AniList status enum
 * CURRENT, PLANNING, COMPLETED, DROPPED, PAUSED, REPEATING
 */
function mapAniListStatus(status: string): MediaItem['status'] {
  switch (status) {
    case 'CURRENT':
    case 'REPEATING': return 'reading';
    case 'COMPLETED': return 'finished';
    case 'DROPPED': return 'abandoned';
    case 'PAUSED': return 'partially';
    default: return 'partially';
  }
}

interface AniListStaffEntry {
  full: string;
  native: string | null;
  role: string;
}

/**
 * Filters AniList staff to find the most likely primary creator (Writer/Artist),
 * then resolves their name in the requested locale.
 */
function resolveAniListAuthor(staff: AniListStaffEntry[], locale: 'en' | 'ja'): string {
  if (!staff || staff.length === 0) return 'Unknown Author';

  // Prioritize roles that typically indicate the primary creator
  const primaryRoles = ['Story & Art', 'Story', 'Art', 'Author', 'Writer', 'Artist'];

  const primary = staff.find(s => primaryRoles.includes(s.role));
  const chosen = primary ?? staff[0];

  // `native` is only populated for creators with a native-script name on
  // file (mainly Japanese/Korean/Chinese staff); fall back to `full` when
  // it's missing, same pattern as the title resolution below.
  return (locale === 'ja' ? chosen.native || chosen.full : chosen.full) || 'Unknown Author';
}

export const InterestService = {
  async getBooks(locale: 'en' | 'ja'): Promise<MediaItem[] | null> {
    try {
      const apiKey = import.meta.env.HARDCOVER_API_KEY;
      if (!apiKey) throw new Error('Missing HARDCOVER_API_KEY');

      const query = `
        query {
          me {
            user_books {
              status_id
              updated_at
              book {
                title
                contributions {
                  author {
                    name
                  }
                }
              }
            }
          }
        }
      `;

      const response = await fetch(HARDCOVER_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`Hardcover API response not ok: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors) {
        console.error('Hardcover GraphQL errors:', result.errors);
        throw new Error('Hardcover GraphQL query failed');
      }

      const books = result.data?.me?.[0]?.user_books || [];

      if (books.length === 0) {
        return null;
      }

      return books.map((item: any) => ({
        title: item.book?.title || 'Unknown Title',
        author:
          item.book?.contributions?.[0]?.author?.name ||
          'Unknown Author',
        status: mapHardcoverStatus(item.status_id),
      }));
    } catch (e) {
      console.warn('Hardcover API failed:', e);
      return null;
    }
  },

  async getManga(locale: 'en' | 'ja'): Promise<MediaItem[] | null> {
    try {
      const userId = import.meta.env.ANILIST_USER_ID;
      if (!userId) throw new Error('Missing ANILIST_USER_ID');

      const query = `
        query ($userId: Int) {
          MediaListCollection(userId: $userId, type: MANGA) {
            lists {
              entries {
                media {
                  title { english romaji native }
                  staff {
                    edges {
                      node {
                        name { full native }
                      }
                      role
                    }
                  }
                }
                status
                updatedAt
              }
            }
          }
        }
      `;

      const response = await fetch(ANILIST_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          variables: { userId: parseInt(userId, 10) }
        }),
      });
      if (!response.ok) throw new Error('AniList API response not ok');

      const { data } = await response.json();
      //console.log('AniList API Response:', JSON.stringify(data, null, 2));
      const allEntries = data.MediaListCollection.lists.flatMap((list: any) => list.entries);

      if (allEntries.length === 0) {
        return null;
      }

      return allEntries.map((entry: any) => {
        const { title, staff } = entry.media;

        const resolvedTitle =
          locale === 'ja'
            ? title.native || title.romaji || title.english
            : title.english || title.romaji || title.native;

        // Extract name (both scripts) and role from the staff connection
        const staffList: AniListStaffEntry[] = staff?.edges?.map((e: any) => ({
          full: e.node.name.full,
          native: e.node.name.native,
          role: e.role
        })) || [];

        return {
          title: resolvedTitle,
          author: resolveAniListAuthor(staffList, locale),
          status: mapAniListStatus(entry.status),
        };
      });
    } catch (e) {
      console.warn('AniList API failed:', e);
      return null;
    }
  },

  async getAnime(locale: 'en' | 'ja'): Promise<MediaItem[] | null> {
    try {
      const userId = import.meta.env.ANILIST_USER_ID;
      if (!userId) throw new Error('Missing ANILIST_USER_ID');

      const query = `
        query ($userId: Int) {
          MediaListCollection(userId: $userId, type: ANIME) {
            lists {
              entries {
                media {
                  title { english romaji native }
                  studios {
                    edges {
                      node {
                        name
                      }
                    }
                  }
                }
                status
                updatedAt
              }
            }
          }
        }
      `;

      const response = await fetch(ANILIST_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          variables: { userId: parseInt(userId, 10) }
        }),
      });
      if (!response.ok) throw new Error('AniList API response not ok');

      const { data } = await response.json();
      //console.log('AniList API Response:', JSON.stringify(data, null, 2));
      const allEntries = data.MediaListCollection.lists.flatMap((list: any) => list.entries);

      if (allEntries.length === 0) {
        return null;
      }

      return allEntries.map((entry: any) => {
        const { title, studios } = entry.media;

        const resolvedTitle =
          locale === 'ja'
            ? title.native || title.romaji || title.english
            : title.english || title.romaji || title.native;

        const studioNames = studios?.edges?.map((e: any) => e.node.name) || [];
        const studioName = studioNames.length > 0 ? studioNames[0] : 'Unknown Studio';

        return {
          title: resolvedTitle,
          author: studioName,
          status: mapAniListStatus(entry.status),
        };
      });
    } catch (e) {
      console.warn('AniList API failed:', e);
      return null;
    }
  },

  async getMovies(locale: 'en' | 'ja'): Promise<MediaItem[] | null> {
    try {
      const token = import.meta.env.TRAKT_TOKEN;
      const clientId = import.meta.env.TRAKT_CLIENT_ID;
      const username = import.meta.env.TRAKT_USERNAME;
      if (!token || !clientId || !username) throw new Error('Missing Trakt credentials');

      const response = await fetch(`${TRAKT_API}/users/${username}/history`, {
        headers: {
          'trakt-api-key': clientId,
          'trakt-api-version': '2',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Trakt API response not ok');

      const data = await response.json();
      //console.log('Trakt API Response:', JSON.stringify(data, null, 2));
      if (!data || data.length === 0) {
        return null;
      }
      return data.map((item: any) => ({
        title: item.movie.title,
        author: 'Trakt Movie',
        status: 'finished',
      }));
    } catch (e) {
      console.warn('Trakt API failed:', e);
      return null;
    }
  },
};
