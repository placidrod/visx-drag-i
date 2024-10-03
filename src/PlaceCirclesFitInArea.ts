interface CircleData {
  text: string;
  radius: number;
}

interface PlacedCircle {
  x: number;
  y: number;
  id: string;
  radius: number;
}

export function placeCirclesFitInArea(
  areaWidth: number,
  areaHeight: number,
  rawData: CircleData[],
  minDistance: number = 10
): PlacedCircle[] {
  const totalArea = (circles: CircleData[], minDistance: number): number => {
    return circles.reduce(
      (sum, circle) =>
        sum + Math.PI * Math.pow(circle.radius + minDistance / 2, 2),
      0
    );
  };

  const resizeRadii = (
    circles: CircleData[],
    scalingFactor: number
  ): CircleData[] => {
    return circles.map((circle) => ({
      ...circle,
      radius: circle.radius * scalingFactor,
    }));
  };

  const distance = (x1: number, y1: number, x2: number, y2: number): number =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  function isInBounds(
    x: number,
    y: number,
    radius: number,
    areaWidth: number,
    areaHeight: number
  ): boolean {
    return (
      x - radius >= 0 &&
      x + radius <= areaWidth &&
      y - radius >= 0 &&
      y + radius <= areaHeight
    );
  }

  function doesOverlap(
    x1: number,
    y1: number,
    r1: number,
    x2: number,
    y2: number,
    r2: number,
    minDistance: number
  ): boolean {
    return distance(x1, y1, x2, y2) < r1 + r2 + minDistance;
  }

  function placeNearExisting(
    circles: PlacedCircle[],
    radius: number,
    areaWidth: number,
    areaHeight: number,
    minDistance: number
  ): { x: number; y: number } | null {
    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];
      const desiredDistance = circle.radius + radius + minDistance;

      for (let angle = 0; angle < 360; angle += 10) {
        const rad = (Math.PI / 180) * angle;
        const newX = circle.x + Math.cos(rad) * desiredDistance;
        const newY = circle.y + Math.sin(rad) * desiredDistance;

        let validPlacement = true;

        if (isInBounds(newX, newY, radius, areaWidth, areaHeight)) {
          for (let j = 0; j < circles.length; j++) {
            if (
              doesOverlap(
                newX,
                newY,
                radius,
                circles[j].x,
                circles[j].y,
                circles[j].radius,
                minDistance
              )
            ) {
              validPlacement = false;
              break;
            }
          }
        } else {
          validPlacement = false;
        }

        if (validPlacement) {
          return { x: newX, y: newY };
        }
      }
    }
    return null;
  }

  let circles: PlacedCircle[] = [];

  const availableArea = areaWidth * areaHeight;
  const neededArea = totalArea(rawData, minDistance);

  let scalingFactor = 1;
  if (neededArea > availableArea) {
    scalingFactor = Math.sqrt(availableArea / neededArea);
    console.log(`Scaling circles by factor of: ${scalingFactor}`);
  }

  const resizedData = resizeRadii(rawData, scalingFactor);

  const firstCircle: PlacedCircle = {
    id: resizedData[0].text,
    x: areaWidth / 2,
    y: areaHeight / 2,
    radius: resizedData[0].radius,
  };
  circles.push(firstCircle);

  for (let i = 1; i < resizedData.length; i++) {
    const radius = resizedData[i].radius;
    const newCirclePosition = placeNearExisting(
      circles,
      radius,
      areaWidth,
      areaHeight,
      minDistance
    );
    if (newCirclePosition) {
      circles.push({
        id: resizedData[i].text,
        x: newCirclePosition.x,
        y: newCirclePosition.y,
        radius: radius,
      });
    } else {
      console.log(
        `Failed to place circle for '${resizedData[i].text}'. No valid position found.`
      );
      break;
    }
  }

  return circles;
}
