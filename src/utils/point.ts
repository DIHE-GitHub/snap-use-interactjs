import { Vector2 } from "three";

interface Point {
  x: number;
  y: number;
}

interface Point {
  x: number;
  y: number;
}

function getCenterPoint(points: Point[]): Point | null {
  const totalPoints = points.length;
  if (totalPoints === 0) {
    return null;
  }

  let totalX = 0;
  let totalY = 0;
  for (let i = 0; i < totalPoints; i++) {
    totalX += points[i].x;
    totalY += points[i].y;
  }

  return {
    x: totalX / totalPoints,
    y: totalY / totalPoints,
  };
}

export function expandPoints(points: Point[], expand: number): Point[] {
  const centerPoint = getCenterPoint(points);
  if (!centerPoint) return points;
  const centerPointVector2 = new Vector2(centerPoint.x, centerPoint.y);
  const expandedPoints: Point[] = [];
  for (const point of points) {
    const pointVector2 = new Vector2(point.x, point.y);
    const offsetVector2 = pointVector2
      .clone()
      .sub(centerPointVector2)
      .normalize()
      .multiplyScalar(expand);
    const newPointVector2 = pointVector2.clone().add(offsetVector2);
    const newPoint = { x: newPointVector2.x, y: newPointVector2.y };
    expandedPoints.push(newPoint);
  }
  return expandedPoints;
}
