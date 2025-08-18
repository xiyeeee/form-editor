/*
 * @Author: Xiyeeee
 * @Date: 2025-08-17 22:00:02
 * @Description:
 * @LastEditors: Xiyeeee
 * @LastEditTime: 2025-08-17 22:00:15
 */
import React, { useState } from 'react';
import { Button, Tooltip, Typography } from 'antd';
import { useNavigate } from 'umi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import FormComponentWrapper from '@/components/FormComponents/FormComponent';
import FormSideBar from './components/FormSideBar';
import { CompListData } from './componentData';
import styles from './index.module.less';
import classNames from 'classnames';
import { QuestionCircleOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const compList = [...CompListData]; // 组件列表
const FormEditor: React.FC = () => {
  const navigate = useNavigate();
  const { components, globalFormConfig } = useSelector((state: RootState) => state.form);
  // 当前选中的分类
  const [activeType, setActiveType] = useState('basic');

  const handleCompControl = (type: string, component: any) => {
    console.log('Component control:', type, component);
  };

  const handleAddItem = (type: string) => {
    console.log('Add item:', type);
  };

  const callback = () => {
    navigate('/');
  };

  return (
    <div className={styles.formEditor}>
      <div className={styles.navData}>
        <div className={styles.header}>
          <div className={styles.callback} onClick={callback}>
            <img src="/assets/form-editor/callback.svg" alt="callback" />
          </div>
          <div className={styles.titleData}>
            <span className={styles.name}>React动态表单</span>
            <Text type="secondary" className={styles.time}>
              编辑于2024-11-03 09:12
            </Text>
          </div>
          <div className={styles.control}>
            <div className={styles.contItem}>
              <Button type="default">
                <img className={styles.btnIcon} src="/assets/form-editor/github.svg" alt="github" />
                <span className={styles.name}>GitHub</span>
              </Button>
            </div>
            <div className={styles.contItem}>
              <Button type="default">
                <img className={styles.btnIcon} src="/assets/form-editor/save.svg" alt="save" />
                <span className={styles.name}>保存</span>
              </Button>
            </div>
            <div className={styles.contItem}>
              <Button type="primary">
                <img
                  className={styles.btnIcon}
                  src="/assets/form-editor/publish.svg"
                  alt="publish"
                />
                <span className={styles.name}>发布</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className={classNames(styles.content, styles.editorContent)}>
        <FormSideBar activeType={activeType} setActiveType={setActiveType}></FormSideBar>
        {/* 拖拽组件 */}
        <div className={styles.components}>
          {compList.map(componentsItem => (
            <div className={styles.componentItem} key={componentsItem.type}>
              <div className={styles.compItemTitle}>
                {componentsItem.name}
                {styles.tooltip && (
                  <Tooltip title={componentsItem.tooltip}>
                    <QuestionCircleOutlined />
                  </Tooltip>
                )}
              </div>
              <div className={classNames(styles.compList)}>
                {componentsItem.children.map(component => (
                  <div className={classNames(styles.item)}>
                    {component.icon && <img className={styles.icon} src={component.icon} alt="" />}
                    {component.label}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.comps}>
          <div className={styles.formPreview}>
            {components.length === 0 ? (
              <div className={styles.emptyState}>
                <Text type="secondary">暂无表单组件，请从左侧拖拽添加</Text>
              </div>
            ) : (
              components.map((component, index) => (
                <FormComponentWrapper
                  key={component.id}
                  component={component}
                  type={component.type}
                  lineNumber={String(index + 1)}
                  formConfig={globalFormConfig}
                  isDev={true}
                  onCompControl={handleCompControl}
                  onAddItem={handleAddItem}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditor;
