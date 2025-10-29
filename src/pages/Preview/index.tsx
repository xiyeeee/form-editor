/*
 * @Author: Xiyeeee
 * @Date: 2025-10-29 22:00:02
 * @Description: React Preview Component
 * @LastEditors: Xiyeeee
 * @LastEditTime: 2025-10-29 22:00:07
 */
import React, { useState } from 'react';
import { Drawer, Radio, Button, Alert, Watermark } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import FormComponent from '@/components/FormComponents';
import styles from './index.module.less';

type PreviewType = 'Phone' | 'PC';

interface PreviewProps {
  open: boolean;
  selectForm: any;
  pageFooter: any;
  pageCompList: any[];
  onClose: () => void;
}

const Preview: React.FC<PreviewProps> = ({
  open,
  selectForm,
  pageFooter,
  pageCompList,
  onClose,
}) => {
  const [previewType, setPreviewType] = useState<PreviewType>('Phone');

  const formShowConfig = {
    formTitle: '表单预览',
    waterMarkBool: true,
    displayPaging: true,
  };

  const getSize = () => {
    const data = pageFooter?.value;
    return data?.size === 'large' ? '0 26px' : data?.size === 'small' ? '0 10px' : '0 16px';
  };

  const getLineHeight = () => {
    const data = pageFooter?.value;
    return data?.size === 'large' ? '40px' : data?.size === 'small' ? '24px' : '32px';
  };

  const handlePreviewTypeChange = (e: any) => {
    setPreviewType(e.target.value);
  };

  return (
    <div className={styles.body}>
      <Drawer
        title={formShowConfig.formTitle}
        className={styles.drawer}
        height="calc(100% - 0px)"
        placement="bottom"
        open={open}
        onClose={onClose}
        extra={
          <>
            <div className={styles.controls}>
              <Radio.Group value={previewType} onChange={handlePreviewTypeChange}>
                <Radio.Button value="Phone">移动端</Radio.Button>
                <Radio.Button value="PC">桌面端</Radio.Button>
              </Radio.Group>
            </div>
            <Button style={{ marginRight: 8 }} onClick={onClose}>
              取消
            </Button>
            <Button type="primary" onClick={onClose}>
              保存
            </Button>
          </>
        }
        bodyStyle={{
          background: 'aliceblue',
        }}
      >
        <div className={`${styles.bodyContent} ${previewType === 'Phone' ? styles.phone : ''}`}>
          <Watermark content={selectForm?.displayWaterMark ? selectForm?.waterMarkText || '' : ''}>
            <Alert
              className={styles.alert}
              message="预览状态无法提交"
              type="warning"
              showIcon
              closable
            />
            {pageCompList.length > 0 ? (
              <>
                <div className={styles.comps}>
                  {pageCompList.map((item, index) => (
                    <div key={item?.name} className={`${styles.cursorMove} ${styles.formItem}`}>
                      {(!['Paging'].includes(item.type) ||
                        (['Paging'].includes(item.type) && formShowConfig.displayPaging)) && (
                        <FormComponent
                          renderType="preview"
                          key={item.id + previewType}
                          component={item}
                          type={item.type}
                          isDev={false}
                          formConfig={selectForm}
                          previewType={previewType}
                          onDataChange={() => {}}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div
                  className={`${styles.formFooter} ${styles.formItem}`}
                  style={{
                    textAlign: (pageFooter?.position as any) || 'left',
                  }}
                >
                  <Button
                    icon={pageFooter?.buttonIconShowBool ? <CheckOutlined /> : null}
                    className={styles.submit}
                    type="primary"
                    size={pageFooter?.size}
                    style={{
                      padding: getSize(),
                      lineHeight: getLineHeight(),
                    }}
                  >
                    {pageFooter?.buttonText || '提交'}
                  </Button>
                </div>
              </>
            ) : (
              <div className={styles.noData}>
                <img src="/assets/form/no_data.svg" alt="" />
                <div className={styles.description}>表单为空，请返回编辑器配置内容</div>
              </div>
            )}
          </Watermark>
        </div>
      </Drawer>
    </div>
  );
};

export default Preview;
