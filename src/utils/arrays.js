export function Array2D(len) {
  const a = [];
  for (; len--; ) {
    a[len] = [];
  }
  return a;
}

export function each(items, consumer) {
  items && items.some(consumer);
}

export function selectFrom(obj) {
  return function (key) {
    return obj[key];
  };
}
