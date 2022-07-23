import { Rectangle } from "@babylonjs/gui";
import {Animation, CubicEase, EasingFunction, AnimationGroup} from "@babylonjs/core";

export const InfoAnimation = (
  object: Rectangle,
  currentScaleValue: number,
  targetScaleValue: number,
  duration: number
) => {
  const animationLabelScalingX = new Animation(
    `animationLabelScalingX`,
    "scaleX",
    1,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CYCLE
  );

  const keysLabel = [
    { frame: 0, value: currentScaleValue },
    { frame: 60, value: targetScaleValue },
  ];
  animationLabelScalingX.setKeys(keysLabel);

  const easingFunctionLabel = new CubicEase();
  easingFunctionLabel.setEasingMode(
    EasingFunction.EASINGMODE_EASEINOUT
  );
  animationLabelScalingX.setEasingFunction(easingFunctionLabel);

  const animationLabelScalingY = new Animation(
    `animationLabelScalingY`,
    "scaleY",
    1,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CYCLE
  );

  animationLabelScalingY.setKeys(keysLabel);

  animationLabelScalingY.setEasingFunction(easingFunctionLabel);

  const animationGroup = new AnimationGroup("animationLabelGroups");
  animationGroup.addTargetedAnimation(animationLabelScalingX, object);
  animationGroup.addTargetedAnimation(animationLabelScalingY, object);
  animationGroup.speedRatio = duration;
  animationGroup.normalize(0, 60);
  animationGroup.onAnimationGroupEndObservable.add(() => {
    animationGroup.dispose();
  });

  return animationGroup;
};
