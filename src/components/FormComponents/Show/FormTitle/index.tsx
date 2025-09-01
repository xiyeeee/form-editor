import React, { useEffect } from 'react';
import styles from './index.module.less';

interface FormTitleProps {
  id: string;
  placeholder: string;
  titleImageShow: boolean;
  titleImageUrl: string;
  titleValue: string;
  titleSize: string;
  titleDescriptionShow: boolean;
  titleDescription: string;
  titleDescriptionPosition: string;
  titleDescriptionSize: string;
  titleDescriptionColor: string;
  titleDescriptionFontWeight: string;
  titleDescriptionFontStyle: string;
  value: string;
  isDev: boolean;
}

const FormTitle: React.FC<FormTitleProps> = ({
  titleImageShow,
  titleImageUrl,
  titleValue,
  titleSize,
  titleDescriptionShow,
  titleDescription,
  titleDescriptionPosition,
  isDev,
}) => {
  const computedStyle = {
    textAlign: titleDescriptionPosition || 'center',
  };

  const getTitleSizeStyle = () => {
    const marginSize = titleSize === 'large' ? '16px' : titleSize === 'middle' ? '10px' : '6px';
    const fontSize = titleSize === 'large' ? '36px' : titleSize === 'middle' ? '24px' : '18px';
    const lineHeight = titleSize === 'large' ? '40px' : titleSize === 'middle' ? '28px' : '22px';

    return {
      marginTop: marginSize,
      marginBottom: marginSize,
      fontSize,
      lineHeight,
    };
  };

  const getDescriptionSizeStyle = () => {
    return {
      fontSize: titleSize === 'large' ? '16px' : titleSize === 'middle' ? '14px' : '12px',
    };
  };

  const getImageUrl = (imgUrl: string) => {
    try {
      return `/src/assets/background/${imgUrl}`;
    } catch (e) {
      return `/src/assets/background/default.jpg`;
    }
  };

  useEffect(() => {
    if (isDev) {
      console.log('FormTitle mounted');
    }
  }, [isDev]);

  return (
    <div className={styles.formHeader}>
      {titleImageShow && (
        <div className={styles.headerImg}>
          <img src={getImageUrl(titleImageUrl)} alt="Title" />
        </div>
      )}
      <section className={styles.titleSection} style={computedStyle as any}>
        <div className={styles.title} style={getTitleSizeStyle()}>
          <div className={styles.titleVal} style={getTitleSizeStyle()}>
            {titleValue}
          </div>
        </div>
        {titleDescriptionShow && (
          <div className={styles.description}>
            <div
              className={styles.descriptionValue}
              style={{ ...(computedStyle as any), ...getDescriptionSizeStyle() }}
            >
              {titleDescription}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default FormTitle;
