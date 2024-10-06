import { useState, useEffect, Fragment } from 'react';
import generateCircles, { Circle } from './generateCircles';

export type Props = {
  width: number;
  height: number;
};

export default function Bubbles({ width, height }: Props) {
  const [items, setItems] = useState<Circle[]>([]);

  useEffect(() => {
    if (width > 10 && height > 10) setItems(generateCircles({ width, height }));
  }, [width, height]);

  if (items.length === 0 || width < 10) return null;
  console.log(items);

  return (
    <div style={{ touchAction: 'none' }}>
      <svg width={width} height={height}>
        <rect
          fill="#fff"
          width={width}
          height={height}
          rx={5}
          stroke="#000"
          strokeWidth={1}
        />

        {items.map((d, i) => (
          <Fragment key={d.id}>
            <circle
              key={`dot-${d.id}`}
              cx={d.x}
              cy={d.y}
              r={d.radius}
              fill={'#206CFE'}
              // transform={`translate(${dx}, ${dy})`}
              fillOpacity={0.9}
              stroke={'transparent'}
              strokeWidth={2}
            />
            {d.radius > 25 && (
              <text
                fill="white"
                x={d.x}
                y={d.y + 4}
                fontSize="12"
                textAnchor="middle"
                // key={d.id}
              >
                {d.id}
              </text>
            )}
          </Fragment>
        ))}
      </svg>

      <style>{`
        .Drag {
          display: flex;
          flex-direction: column;
          user-select: none;
        }

        svg {
          margin: 1rem 0;
        }
        .deets {
          display: flex;
          flex-direction: row;
          font-size: 12px;
        }
        .deets > div {
          margin: 0.25rem;
        }
      `}</style>
    </div>
  );
}
