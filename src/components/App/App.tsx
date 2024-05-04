import { useState } from 'react';
import styles from './App.module.css';
import { Grid } from '../Grid/Grid';
import type { Coord, Orientation } from '../../typings';
import { Rover } from '../Rover/Rover';
import { DEFAULT_COORD, DEFAULT_ORIENTATION } from '../../constants';

// --------------------------------------------------------------------

function App() {
  const [ roverPosition, setRoverPosition ] = useState<Coord>(DEFAULT_COORD);
  const [ roverOrientation, setRoverOrientation ] = useState<Orientation>(DEFAULT_ORIENTATION);

  const init = () => {
    setRoverPosition(DEFAULT_COORD);
    setRoverOrientation(DEFAULT_ORIENTATION);
  };

  return (
    <div className={styles.outer_container}>
      <div className={styles.inner_container}>
        <h1 className={styles.title}>Mars Rover Control Panel</h1>
        <div className={styles.display_container}>
          <Grid roverPosition={roverPosition} roverOrientation={roverOrientation} />
          <Rover
            roverPosition={roverPosition}
            setRoverPosition={setRoverPosition}
            roverOrientation={roverOrientation}
            setRoverOrientation={setRoverOrientation}
            init={init}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
