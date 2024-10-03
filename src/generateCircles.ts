import { placeCirclesFitInArea } from './PlaceCirclesFitInArea';

let rawData = [
  { text: 'Biography', radius: 45 },
  { text: 'Mystery', radius: 78 },
  { text: 'Thriller', radius: 32 },
  { text: 'War', radius: 67 },
  { text: 'Sci-Fi', radius: 50 },
  { text: 'Crime', radius: 88 },
  { text: 'Drama', radius: 25 },
  { text: 'Action', radius: 90 },
  { text: 'Horror', radius: 15 },
  { text: 'Musical', radius: 60 },
  { text: 'Family', radius: 85 },
  { text: 'Adventure', radius: 40 },
  { text: 'Music', radius: 70 },
  { text: 'Romance', radius: 69 },
  { text: 'History', radius: 55 },
  { text: 'Western', radius: 53 },
  { text: 'Comedy', radius: 45 },
  { text: 'Fantasy', radius: 33 },
  { text: 'Documentary', radius: 20 },
  { text: 'Sport', radius: 30 },
  { text: 'Animation', radius: 80 },
];

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
  const placedCircles = placeCirclesFitInArea(width, height, rawData, 10);

  return placedCircles;

  // const minAxis = Math.min(width, height);
  // const maxRadius = Math.min(width, height) / 2;
  // const data = rawData.map((d) => ({
  //   ...d,
  //   radius: (d.radius * maxRadius) / minAxis,
  // }));
  // // Sort data to create the largest circle first
  // data.sort((a, b) => b.radius - a.radius);
  // console.log('Placid Logging: data ', data);

  // const circles: Circle[] = [];
  // const centerX = width / 2;
  // const centerY = height / 2;

  // // Place the largest circle in the center
  // circles.push({
  //   x: centerX,
  //   y: centerY,
  //   radius: data[0].radius,
  //   id: data[0].text,
  // });

  // // Function to check if a circle overlaps with any existing circles
  // function doesOverlap(newCircle: Circle): boolean {
  //   for (const circle of circles) {
  //     const dx = newCircle.x - circle.x;
  //     const dy = newCircle.y - circle.y;
  //     const distance = Math.sqrt(dx * dx + dy * dy);
  //     if (distance < newCircle.radius + circle.radius) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // // Create subsequent circles
  // for (let i = 1; i < data.length; i++) {
  //   const radius = data[i];
  //   let newCircle: Circle;
  //   let placed = false;

  //   // Try to place the new circle without overlapping
  //   for (let angle = 0; angle < 360; angle += 1) {
  //     const radians = (angle * Math.PI) / 180;
  //     const x =
  //       centerX + (radius.radius + circles[0].radius) * Math.cos(radians);
  //     const y =
  //       centerY + (radius.radius + circles[0].radius) * Math.sin(radians);

  //     newCircle = { x, y, radius: radius.radius, id: radius.text };

  //     if (!doesOverlap(newCircle)) {
  //       circles.push(newCircle);
  //       placed = true;
  //       break;
  //     }
  //   }

  //   // If no position found, place it randomly (fallback)
  //   if (!placed) {
  //     console.log('Placid Logging: placed randomly ', radius.text);
  //     circles.push({
  //       x: Math.random() * width,
  //       y: Math.random() * height,
  //       radius: radius.radius,
  //       id: radius.text,
  //     });
  //   }
  // }

  // return circles;
};

export default generateCircles;
