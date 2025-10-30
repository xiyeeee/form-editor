import React, { useRef, useEffect, useState, useCallback } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Radio } from 'antd';
import styles from './index.module.less';

const { Group: RadioGroup, Button: RadioButton } = Radio;

interface Props {
  id: string;
  isPreviewRender?: boolean;
  previewType?: string;
}

const ElectronicSignature: React.FC<Props> = ({ id, isPreviewRender, previewType }) => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [canvasWidth, setCanvasWidth] = useState(300);
  const [history, setHistory] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const contList = [
    { name: '清空', type: 'clear' },
    { name: '撤销', type: 'undo' },
    { name: '重做', type: 'redo' },
  ];

  const saveToHistory = useCallback(() => {
    if (!sigCanvas.current) return;

    const dataURL = sigCanvas.current.toDataURL();
    // 如果当前不是在历史记录的末尾，截断后续记录
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(dataURL);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  }, [history, currentIndex]);

  const control = useCallback(
    (type: 'clear' | 'undo' | 'redo' | string) => {
      if (!sigCanvas.current) return;

      switch (type) {
        case 'clear':
          // 清空时不保存当前状态，直接重置历史记录
          sigCanvas.current.clear();
          setHistory([]);
          setCurrentIndex(-1);
          break;
        case 'undo':
          if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            const prevState = history[prevIndex];
            sigCanvas.current.fromDataURL(prevState);
            setCurrentIndex(prevIndex);
          } else if (currentIndex === 0) {
            // 如果是第一个签名，撤销回到空画布状态
            sigCanvas.current.clear();
            setCurrentIndex(-1);
          }
          break;
        case 'redo':
          if (currentIndex < history.length - 1) {
            const nextIndex = currentIndex + 1;
            const nextState = history[nextIndex];
            sigCanvas.current.fromDataURL(nextState);
            setCurrentIndex(nextIndex);
          }
          break;
      }
      console.log(type, { history: history.length, currentIndex });
    },
    [history, currentIndex]
  );

  const updateCanvasSize = useCallback(() => {
    let width = 300; // 默认宽度

    if (isPreviewRender) {
      width = previewType === 'PC' ? 566 : 350;
    } else {
      // 在非预览模式下，可以根据容器宽度自适应
      const container = document.getElementById(`signature-${id}`);
      if (container) {
        width = container.offsetWidth || 300;
      }
    }

    setCanvasWidth(width);
  }, [id, isPreviewRender, previewType]);

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [updateCanvasSize]);

  return (
    <div className={styles.sign} id={`signature-${id}`}>
      <SignatureCanvas
        ref={sigCanvas}
        canvasProps={{
          width: canvasWidth,
          height: 200,
          className: styles.signatureCanvas,
        }}
        backgroundColor="#f6f8fa"
        penColor="#333"
        minWidth={4}
        maxWidth={10}
        onEnd={saveToHistory}
      />
      <div className={styles.controlBtns}>
        <RadioGroup>
          {contList.map(item => (
            <RadioButton key={item.type} value={item.type} onClick={() => control(item.type)}>
              {item.name}
            </RadioButton>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default ElectronicSignature;
