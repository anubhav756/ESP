import React from 'react';
import { CircularProgress } from 'material-ui';
import styles from './styles';

function Loader() {
  return <center style={styles.container}><CircularProgress /></center>;
}

export default Loader;
