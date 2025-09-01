import React from 'react';
import styles from './index.module.less';

interface VideoProps {
  id: string;
  value: string;
  alt?: string;
  isDev: boolean;
}

const Video: React.FC<VideoProps> = ({ value, alt = 'Video' }) => {
  return (
    <video 
      src={value} 
      controls
      className={styles.video}
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;