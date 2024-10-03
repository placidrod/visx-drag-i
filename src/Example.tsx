import { useState, useEffect } from 'react';
import { LinearGradient } from '@visx/gradient';
import { Drag } from '@visx/drag';
import generateCircles, { Circle } from './generateCircles';

export type DragIProps = {
  width: number;
  height: number;
};

export default function DragI({ width, height }: DragIProps) {
  const [draggingItems, setDraggingItems] = useState<Circle[]>([]);

  useEffect(() => {
    if (width > 10 && height > 10)
      setDraggingItems(generateCircles({ width, height }));
  }, [width, height]);

  if (draggingItems.length === 0 || width < 10) return null;
  console.log(draggingItems);

  return (
    <div className="Drag" style={{ touchAction: 'none' }}>
      <svg width={width} height={height}>
        <LinearGradient id="stroke" from="#ff00a5" to="#ffc500" />
        <rect
          fill="#fff"
          width={width}
          height={height}
          rx={5}
          stroke="#000"
          strokeWidth={1}
        />

        {draggingItems.map((d, i) => (
          <Drag
            key={`drag-${d.id}`}
            width={width}
            height={height}
            x={d.x}
            y={d.y}
            restrict={{
              xMax: d.x,
              xMin: d.x,
              yMax: d.y,
              yMin: d.y,
            }}
            // onDragStart={() => {
            //   // svg follows the painter model
            //   // so we need to move the data item
            //   // to end of the array for it to be drawn
            //   // "on top of" the other data items
            //   // setDraggingItems(raise(draggingItems, i));
            // }}
          >
            {({ dragStart, dragEnd, dragMove, isDragging, x, y, dx, dy }) => (
              <>
                <circle
                  key={`dot-${d.id}`}
                  cx={x}
                  cy={y}
                  r={d.radius}
                  fill={'#206CFE'}
                  transform={`translate(${dx}, ${dy})`}
                  fillOpacity={0.9}
                  stroke={'transparent'}
                  strokeWidth={2}
                  onMouseMove={dragMove}
                  onMouseUp={dragEnd}
                  onMouseDown={dragStart}
                  onTouchStart={dragStart}
                  onTouchMove={dragMove}
                  onTouchEnd={dragEnd}
                />
                {d.radius > 25 && (
                  <text
                    fill="white"
                    x={d.x}
                    y={d.y}
                    fontSize="12"
                    textAnchor="middle"
                  >
                    {d.id}
                  </text>
                )}
              </>
            )}
          </Drag>
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
