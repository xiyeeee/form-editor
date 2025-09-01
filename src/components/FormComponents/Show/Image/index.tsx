import React from 'react';
import styles from './index.module.less';

interface ImageProps {
  id: string;
  value: string;
  alt?: string;
  isDev: boolean;
}

const Image: React.FC<ImageProps> = ({ value, alt = 'Image' }) => {
  return (
    <img 
      src={value} 
      alt={alt} 
      className={styles.image}
    />
  );
};

export default Image;