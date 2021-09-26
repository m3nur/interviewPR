import React from 'react';
import styles from './LoaderForSelect.module.css';
const LoaderForSelect = () => {
  return (
    <div className={styles.lds_ring}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoaderForSelect;
