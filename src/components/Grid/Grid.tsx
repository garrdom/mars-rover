import { useEffect, useMemo, useState } from 'react';
import styles from './Grid.module.css';
import type { Coord, Orientation } from '../../typings';
import { checkObstacle } from '../../utils';
import { DEFAULT_OBSTACLES, DEFAULT_ARRAY_GRID, DEFAULT_GRID_SIZE } from '../../constants';

import iconRoverUp from '../../images/rover-up.png';
import iconRoverDown from '../../images/rover-down.png';
import iconRoverRight from '../../images/rover-right.png';
import iconRoverLeft from '../../images/rover-left.png';
import iconObstacle from '../../images/obstacle.png';
import iconPlaceholder from '../../images/placeholder.png';

// --------------------------------------------------------------------

function getCellIndexes(i: number) {
  const col = i % DEFAULT_GRID_SIZE;
  const row = Math.floor(i / DEFAULT_GRID_SIZE);

  return [ row, col ];
}

const IMAGE: Record<Orientation, string> = {
  N: iconRoverUp,
  S: iconRoverDown,
  W: iconRoverLeft,
  E: iconRoverRight
}

type Props = {
  roverPosition: Coord;
  roverOrientation: Orientation;
}

// --------------------------------------------------------------------

export function Grid(props: Props) {
  const { roverPosition, roverOrientation } = props;

  const [ elements, setElements ] = useState<Array<JSX.Element> | null>(null);

  const renderPlaceholder = useMemo(() => {
    return DEFAULT_ARRAY_GRID.map((_, i) => {
      const [ x, y ] = getCellIndexes(i);

      const findObstacle = checkObstacle(DEFAULT_OBSTACLES, { x, y });

      if (findObstacle) {
        return (
          <img key={`${x}-${y}`} src={iconObstacle} alt="obstacle" />
        );
      }

      return (
        <img key={`${x}-${y}`} src={iconPlaceholder} alt="placeholder" />
      );
    });
  }, []);

  const renderRover = useMemo(() => {
    const { x, y } = roverPosition;
    const src = IMAGE[roverOrientation];

    return (
      <img key={`${x}-${y}`} src={src} alt="rover" />
    );
  }, [ roverPosition, roverOrientation ]);

  const buildCells = useMemo(() => {
    return renderPlaceholder.map((cell, i) => {
      const [ x, y ] = getCellIndexes(i);

      if (roverPosition.x === x && roverPosition.y === y) {
        return renderRover;
      }

      return cell;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ renderRover ]);

  useEffect(() => {
    setElements(buildCells);
  }, [ buildCells ]);

  return (
    <div className={styles.container}>
      {elements}
    </div>
  );
}
