import lottie, { AnimationItem } from 'lottie-web';
import React, { useEffect, useRef } from 'react';

type Props = {
  animJson: unknown;
};

export const useAnimation = (props: Props) => {
  const animationContainer = useRef(null);
  const anim = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (animationContainer.current) {
      anim.current = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: props.animJson,
      });
    }

    return () => {
      anim.current?.destroy();
    };
  }, []);

  const destroyAnimation = () => {
    if (!anim.current) return;
    anim.current?.destroy();
    anim.current = null;
  };

  return {
    AnimationContainer: <div ref={animationContainer} />,
    animation: anim.current,
    destroyAnimation,
  };
};
