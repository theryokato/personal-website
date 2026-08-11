export interface MediaItem {
  title: string;
  author?: string;
  status: 'reading' | 'finished' | 'abandoned' | 'partially';
}
