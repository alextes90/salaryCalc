import { AnimationItem } from 'lottie-web';

export const bootstrapPiggyAnimation = (anim: AnimationItem | null) => {
  const playSegmentInLoop = () => {
    anim?.playSegments([[12, 51]], true);
  };
  anim?.addEventListener('complete', playSegmentInLoop);
  anim?.playSegments([[0, 51]], true);
  anim?.setSpeed(0.5);

  return () => anim?.removeEventListener('complete', playSegmentInLoop);
};

export const continuePiggyAnimation = (anim: AnimationItem | null, onComplete: () => void) => {
  anim?.setSpeed(1);
  anim?.playSegments([[51, 120]], true);
  anim?.addEventListener('complete', onComplete);
};
