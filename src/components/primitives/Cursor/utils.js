export const isTextType = el => {
  return (
    el.closest('p') ||
    el.closest('span') ||
    el.closest('h1') ||
    el.closest('h2') ||
    el.closest('h3') ||
    el.closest('h4') ||
    el.closest('h5') ||
    el.closest('h5') ||
    el.closest('input') ||
    el.closest('textarea')
  );
};

export const isPointerType = el => {
  return el.closest('button') || el.closest('a');
};
