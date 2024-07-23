import { useEffect, useRef } from 'react';

export const useUniforms = (uniformsArg, updateObj, config) => {
  const uniforms = useRef(uniformsArg);

  useEffect(() => {
    /* Update Uniforms */
    const middlewares = config.middlewares || {};
    const uniformKeys = Object.keys(uniforms.current);
    const middlewareMissingKeys = Object.keys(middlewares).filter(
      k => !uniformKeys.includes(k)
    );

    const include = [
      ...uniformKeys,
      ...middlewareMissingKeys,
      ...(config.include || []),
    ];
    const exclude = config.exclude || [];

    Object.keys(updateObj)
      .filter(key => !exclude.includes(key))
      .filter(key => include.includes(key))
      .map(key => {
        if (middlewares[key]) {
          const res = middlewares[key](
            uniforms.current[key]?.value,
            updateObj[key]
          );

          if (res != undefined) {
            uniforms.current[key].value = res;
          }
        } else if (updateObj[key] != undefined) {
          uniforms.current[key].value = updateObj[key];
        }
      });
  }, [updateObj]);

  return uniforms;
};

/*
useUniforms(
    {
      uTime: { value: 0 },
      uParticleVelocity: { value: 0.1 },
      uParticleDisplaceFactor: { value: 0.5 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: size },
      uColor: { value: new THREE.Color(color) },
      uAlpha: { value: alpha }
    },
    {
      size,
      color,
      alpha,
      velocity,
      displacementFactor
    },
    {
      middlewares: {
        uColor: (curr, input) => {
          curr?.set(input)
        }
      }
    }
  )
 */
