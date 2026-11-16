const nameElement = document.getElementById('hero-name');

if (nameElement) {
  const originalName = nameElement.textContent ?? '';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let hovered: HTMLAnchorElement | null = null;
  let focused: HTMLAnchorElement | null = null;
  let desiredName = originalName;
  let generation = 0;
  let animation: Animation | null = null;

  const updateName = async (icon: HTMLAnchorElement | null, animate = true) => {
    const nextName = icon?.dataset.handle || originalName;
    if (animate && nextName === desiredName) return;
    desiredName = nextName;
    const current = ++generation;
    const opacity = getComputedStyle(nameElement).opacity;
    animation?.cancel();
    animation = null;

    if (!animate || reducedMotion.matches || !nameElement.animate || nameElement.textContent === nextName) {
      nameElement.textContent = nextName;
      return;
    }

    const fadeOut = nameElement.animate([{ opacity }, { opacity: 0 }], {
      duration: 90, easing: 'ease-in-out', fill: 'forwards',
    });
    animation = fadeOut;
    await fadeOut.finished.catch(() => {});
    if (current !== generation) return;
    nameElement.textContent = nextName;
    fadeOut.cancel();
    const fadeIn = nameElement.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 110, easing: 'ease-in-out',
    });
    animation = fadeIn;
    await fadeIn.finished.catch(() => {});
    if (current === generation) animation = null;
  };

  document.querySelectorAll<HTMLAnchorElement>('.social-icon[data-handle]').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      hovered = icon;
      void updateName(icon);
    });
    icon.addEventListener('mouseleave', () => {
      if (hovered === icon) hovered = null;
      void updateName(focused);
    });
    icon.addEventListener('focus', () => {
      focused = icon;
      void updateName(icon, false);
    });
    icon.addEventListener('blur', () => {
      if (focused === icon) focused = null;
      void updateName(hovered, false);
    });
  });

  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      const desired = desiredName;
      ++generation;
      animation?.cancel();
      animation = null;
      nameElement.textContent = desired;
    }
  });
  window.addEventListener('pagehide', () => {
    hovered = focused = null;
    void updateName(null, false);
  });
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    hovered = document.querySelector<HTMLAnchorElement>('.social-icon:hover');
    focused = document.activeElement instanceof HTMLAnchorElement && document.activeElement.matches('.social-icon')
      ? document.activeElement : null;
    void updateName(hovered ?? focused, false);
  });
}

export {};
