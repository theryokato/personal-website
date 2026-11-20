// mailto: does nothing without a mail app, so also copy the address and confirm it.
const emailIcon = document.querySelector<HTMLAnchorElement>('.social-icon[href^="mailto:"]');

if (emailIcon?.parentElement && navigator.clipboard) {
  const message = document.documentElement.lang === 'ja' ? 'メールアドレスをコピーしました' : 'Email copied';
  const status = document.createElement('span');
  status.setAttribute('role', 'status');
  status.className = 'ml-1 font-mono text-xs text-subtext0 opacity-0 transition-opacity duration-200';
  emailIcon.parentElement.append(status);
  let timer: ReturnType<typeof setTimeout> | undefined;

  document.querySelectorAll<HTMLAnchorElement>('main a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
      const address = decodeURIComponent(link.href.slice('mailto:'.length).split('?')[0]);
      navigator.clipboard.writeText(address).then(() => {
        status.textContent = message;
        status.classList.replace('opacity-0', 'opacity-100');
        clearTimeout(timer);
        timer = setTimeout(() => status.classList.replace('opacity-100', 'opacity-0'), 2400);
      }, () => {});
    });
  });
}

export {};
