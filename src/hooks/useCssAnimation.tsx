import { useCallback, useEffect, useRef } from 'react';

type CssAnimation = { runAnimation: () => void };

export const useCssAnimation = (animateClass: string, elementClass: string): CssAnimation => {
  const animElement = useRef<Element | null>(null);

  const runAnimation = useCallback(() => {
    if (!animElement.current) {
      animElement.current = document.querySelector(`.${elementClass}`);
      if (animElement.current) {
        animElement.current?.addEventListener('animationend', onRemoveAnimationClass);
        animElement.current?.classList?.add(animateClass);
      }
    }
    animElement.current?.classList?.add(animateClass);
  }, [animElement.current]);

  useEffect(() => {
    return () => {
      animElement.current?.removeEventListener('animationend', onRemoveAnimationClass);
    };
  }, []);

  const onRemoveAnimationClass = () => {
    animElement.current?.classList?.remove(animateClass);
  };

  return { runAnimation };
};
