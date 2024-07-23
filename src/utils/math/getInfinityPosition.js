export const getInfinityPosition = (elPosition, whole, offset) => {
  if (whole === offset) {
    return elPosition;
  }

  return (((elPosition % whole) + whole + offset) % whole) - offset;
};
