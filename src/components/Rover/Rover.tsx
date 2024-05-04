import { type Dispatch, type SetStateAction, useState } from 'react';
import styles from './Rover.module.css';
import type { Coord, Orientation } from "../../typings";
import { checkObstacle } from '../../utils';
import iconRestart from '../../images/restart.png';
import { DEFAULT_OBSTACLES, DEFAULT_GRID_SIZE } from '../../constants';

// --------------------------------------------------------------------

const ORIENTATION: Record<Orientation, string> = {
  N: 'North',
  S: 'South',
  W: 'West',
  E: 'East'
};

type Command = 'f' | 'b' | 'l' | 'r';
type Movement = 'forward' | 'backward';
type Rotation = 'left' | 'right';

type Props = {
  roverPosition: Coord;
  setRoverPosition: Dispatch<SetStateAction<Coord>>;
  roverOrientation: Orientation;
  setRoverOrientation: Dispatch<SetStateAction<Orientation>>;
  init: () => void;
}

// --------------------------------------------------------------------

export function Rover(props: Props) {
  const { roverPosition, setRoverPosition, roverOrientation, setRoverOrientation, init } = props;

  const [ obstaclePosition, setObstaclePosition ] = useState<Coord | null>(null);

  const movement = (move: Movement) => {
    let newCol = roverPosition.x;
    let newRow = roverPosition.y;

    switch (roverOrientation) {
      case 'N':
        newCol = move === 'forward' ? (newCol - 1 + DEFAULT_GRID_SIZE) % DEFAULT_GRID_SIZE : (newCol + 1) % DEFAULT_GRID_SIZE;
        break;
      case 'S':
        newCol = move === 'forward' ? (newCol + 1) % DEFAULT_GRID_SIZE : (newCol - 1 + DEFAULT_GRID_SIZE) % DEFAULT_GRID_SIZE;
        break;
      case 'W':
        newRow = move === 'forward' ? (newRow - 1 + DEFAULT_GRID_SIZE) % DEFAULT_GRID_SIZE : (newRow + 1) % DEFAULT_GRID_SIZE;
        break;
      case 'E':
        newRow = move === 'forward' ? (newRow + 1) % DEFAULT_GRID_SIZE : (newRow - 1 + DEFAULT_GRID_SIZE) % DEFAULT_GRID_SIZE;
    }

      const findObstacle = checkObstacle(DEFAULT_OBSTACLES, { x: newCol, y: newRow });

      if (findObstacle) {
        setObstaclePosition({ x: newCol, y: newRow });

        return;
      }

      setRoverPosition({ x: newCol, y: newRow });
      setObstaclePosition(null);
  };

  const rotation = (turn: Rotation) => {
    const orientations: Array<Orientation> = turn === 'left' ? ['N', 'W', 'S', 'E'] : ['N', 'E', 'S', 'W'];
    const currentIndex = orientations.indexOf(roverOrientation);
    const newOrientation = orientations[(currentIndex + 1) % orientations.length];
    
    setRoverOrientation(newOrientation);

    if (obstaclePosition !== null) {
      setObstaclePosition(null);
    }
  };

  const sendCommand = (command: Command) => {
    switch (command) {
      case 'f':
        movement('forward');
        break;
      case 'b':
        movement('backward');
        break;
      case 'l':
        rotation('left');
        break;
      case 'r':
        rotation('right');
    }
  };

  const restart = () => {
    init();
    setObstaclePosition(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.status_wrapper}>
        <h2>Rover Status</h2>
        <p>Position: ({roverPosition.x}, {roverPosition.y})</p>
        <p>Orientation: {ORIENTATION[roverOrientation]}</p>
        {obstaclePosition !== null && (
          <p className={styles.text_alert}>Ostacle encountered at position: ({obstaclePosition.x}, {obstaclePosition.y})</p>
        )}
      </div>
      <div className={styles.command_wrapper}>
        <button type="button" onClick={() => sendCommand('f')} className={styles.command_top}>Move Forward</button>
        <button type="button" onClick={() => sendCommand('b')} className={styles.command_bottom}>Move Backward</button>
        <button type="button" onClick={restart} className={styles.command_restart} title="Restart">
          <img src={iconRestart} alt="restart icon" className={styles.command_restart_img} />
        </button>
        <button type="button" onClick={() => sendCommand('l')} className={styles.command_left}>Turn Left</button>
        <button type="button" onClick={() => sendCommand('r')} className={styles.command_right}>Turn Right</button>
      </div>
    </div>
  );
}
