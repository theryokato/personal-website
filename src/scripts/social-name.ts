const nameElement = document.getElementById('hero-name');

if (nameElement) {
  const originalName = nameElement.textContent ?? '';
  let hovered: HTMLAnchorElement | null = null;
  let focused: HTMLAnchorElement | null = null;

  const updateName = () => {
    nameElement.textContent = (hovered ?? focused)?.dataset.handle || originalName;
  };

  document.querySelectorAll<HTMLAnchorElement>('.social-icon[data-handle]').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      hovered = icon;
      updateName();
    });
    icon.addEventListener('mouseleave', () => {
      if (hovered === icon) hovered = null;
      updateName();
    });
    icon.addEventListener('focus', () => {
      focused = icon;
      updateName();
    });
    icon.addEventListener('blur', () => {
      if (focused === icon) focused = null;
      updateName();
    });
  });
}

export {};
