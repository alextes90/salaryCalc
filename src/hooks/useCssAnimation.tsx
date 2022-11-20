import { useCallback, useEffect, useRef } from 'react';

type CssAnimation = { runAnimation: () => void };

export const useCssAnimation = (animateClass: string, elementClass: string): CssAnimation => {
  const animElement = useRef<Element | null>(null);

  const handleRemoveAnimationClass = useCallback(() => {
    animElement.current?.classList?.remove(animateClass);
  }, [animateClass]);

  const runAnimation = useCallback(() => {
    if (!animElement.current) {
      animElement.current = document.querySelector(`.${elementClass}`);
      if (animElement.current) {
        animElement.current?.addEventListener('animationend', handleRemoveAnimationClass);
      }
    }
    animElement.current?.classList?.add(animateClass);
  }, [handleRemoveAnimationClass, animateClass, elementClass]);

  useEffect(() => {
    return () => {
      animElement.current?.removeEventListener('animationend', handleRemoveAnimationClass);
    };
  }, [handleRemoveAnimationClass]);

  return { runAnimation };
};
