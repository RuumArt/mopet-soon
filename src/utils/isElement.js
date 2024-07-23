export const isElement = node => {
  return (
    typeof node === 'object' &&
    node !== null &&
    !node.hasOwnProperty('nodeType') &&
    node.nodeType &&
    node.nodeType === 1
  );
};
