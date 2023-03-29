import interact from "interactjs";
import { expandPoints } from "./point";

export const oRelativePoints = {
  topLeft: { x: 0, y: 0 },
  center: { x: 0.5, y: 0.5 },
  rightTop: { x: 1, y: 0 },
  bottomRight: { x: 1, y: 1 },
  bottomLeft: { x: 0, y: 1 },
};

export enum EFitType {
  Point,
  Mouse,
}
interface Point {
  x: number;
  y: number;
}
function scalePoint(point: Point, scale: number) {
  const { x, y } = point;
  return { x: x * scale, y: y * scale };
}
export function fitContainerScale(type: EFitType, scale: number) {
  switch (type) {
    case EFitType.Point:
      return (point: Point) => scalePoint(point, scale);
    case EFitType.Mouse:
      return (point: Point) => scalePoint(point, 1 / scale);
  }
}

function toClassSelector(className: string) {
  return `.${className}`
}

const snapDefaultParams = {}

export function snap({
  classNames,
  targetPoints
}: {
  targetPoints: Point[]
  classNames: { container: string; item: string };
}) {
  let scale = 1;

  function setScale(value: number) {
    scale = value;
  }


  const expandedPoints = expandPoints(
    targetPoints, 10 * Math.sqrt(2));
  // console.log(targetPoints, expandedPoints);
  function getTargets(scale = 1) {
    return expandedPoints.map(fitContainerScale(EFitType.Point, scale));
  }
  const targets = getTargets();
  // console.log(targets);
  const customSnapModifier = interact.modifiers.snap({
    targets: targets,
    range: 50,
    offset: toClassSelector(classNames.container),
    relativePoints: [
      oRelativePoints.topLeft,
      // oRelativePoints.center,
      oRelativePoints.rightTop,
      oRelativePoints.bottomRight,
      oRelativePoints.bottomLeft,
    ],
  });
  function onContainerScale(scaleValue: number) {
    scale = scaleValue;
    customSnapModifier.options.targets = getTargets(scale);
  }

  interface Delta {
    dx: number;
    dy: number;
  }
  function onTranslate({ dx, dy }: Delta) {
    ({ x: dx, y: dy } = fitContainerScale(
      EFitType.Mouse,
      scale
    )({ x: dx, y: dy }));

    hooks.onTranslate({ dx, dy });
    // return position;
  }
  const interactable = interact(toClassSelector(classNames.item)).draggable({
    modifiers: [customSnapModifier],
    listeners: {
      move(event) {
        // console.log(event);
        // console.log(event.modifiers)
        const position = onTranslate(event);
        // event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
      },
    },
  });

  const hooks = {
    onTranslate({ dx, dy }: Delta) {
      // console.log('[hooks: onTranslate]', { dx, dy });
    },
  };

  return {
    classNames,
    hooks,
    onContainerScale,
    expandedPoints
  };
}
