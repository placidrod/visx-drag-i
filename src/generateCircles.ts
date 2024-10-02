import { getSeededRandom } from '@visx/mock-data';

export interface Circle {
  id: string;
  radius: number;
  x: number;
  y: number;
}

const generateCircles = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  const radiusRandom = getSeededRandom(0.8);
  const xRandom = getSeededRandom(0.5);
  const yRandom = getSeededRandom(0.6);

  return new Array(width < 360 ? 10 : 20).fill(1).map((d, i) => {
    const radius = 50 - radiusRandom() * 20;
    return {
      id: `${i}`,
      radius,
      x: Math.round(xRandom() * (width - radius * 2) + radius),
      y: Math.round(yRandom() * (height - radius * 2) + radius),
    };
  });
};

export default generateCircles;
