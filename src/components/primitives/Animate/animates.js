const properties = {
  y: v => {
    return {
      transform: `translateY(${v})`,
    };
  },
};

export const ANIMATES = {
  fade: {
    set: {
      opacity: 0,
    },
    in: {
      opacity: 1,
      ease: 'sine.inOut',
    },
    out: {
      opacity: 0,
      ease: 'sine.inOut',
    },
  },
  fadeTop: {
    set: {
      ...properties.y('1.8vw'),
      opacity: 0,
    },
    in: {
      y: 0,
      opacity: 1,
      ease: 'sine.inOut',
    },
    out: {
      y: '1.8vw',
      opacity: 0,
      ease: 'sine.inOut',
    },
  },
};
