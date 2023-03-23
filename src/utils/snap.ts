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
