import { placeCirclesFitInArea } from './PlaceCirclesFitInArea';

let rawData = [
  { text: 'Biography', radius: 50 },
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
  const placedCircles = placeCirclesFitInArea(width, height, rawData, 5);

  return placedCircles;
};

export default generateCircles;
