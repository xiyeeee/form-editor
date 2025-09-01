/*
 * @Author: Xiyeeee
 * @Date: 2025-08-17 22:00:02
 * @Description:
 * @LastEditors: Xiyeeee
 * @LastEditTime: 2025-09-01 20:54:07
 */
import React, { useState } from 'react';
import { Button, Tooltip, Typography } from 'antd';
import { useNavigate } from 'umi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import FormComponentWrapper from '@/components/FormComponents';
import FormSideBar from './components/FormSideBar';
import { CompListData } from './componentData';
import styles from './index.module.less';
import classNames from 'classnames';
import { QuestionCircleOutlined } from '@ant-design/icons';
import FormSetting from './components/FormSetting';
import type { CompItemType } from './componentData';
import * as _ from 'lodash-es';
import { getDefaultConfig } from './componentConfigData';
const { Title, Text } = Typography;
const compList = [...CompListData]; // 组件列表
import { v4 as uuidv4 } from 'uuid';
interface ActiveCompType {
  type: 'component' | 'header';
  id: string;
}
interface FooterType {
  id: string;
  size: string;
  buttonText: string;
  position: 'left' | 'right' | 'center';
  buttonIconShowBool: boolean;
}
interface HeaderType {
  type: string;
  id: string;
  titleValue: string;
  titleSize: string;
  titleDescription: string;
  titleImageUrl: string;
  titleDescriptionShow: boolean;
  titleImageShow: boolean;
  defUrl: string;
  titleDescriptionPosition: 'left' | 'right' | 'center';
}
const FormEditor: React.FC = () => {
  const navigate = useNavigate();
  const { components, globalFormConfig } = useSelector((state: RootState) => state.form);
  // 当前选中的分类
  const [activeType, setActiveType] = useState('basic');
  const [selectForm, setSelectForm] = useState({});
  const [pageCompList, setPageCompList] = useState<any[]>([]);
  /* 选中组件 */
  const [activeComp, setActiveComp] = useState<ActiveCompType>({ type: 'component', id: '' });
  /**
   * 编辑器编辑内容
   * 1. pageHeader // 底部配置
   * 2. pageCompList // 页面组件
   * 3. pageFooter // 底部提交按钮配置
   */
  const [pageHeader, setPageHeader] = useState<HeaderType>({
    id: '',
    titleValue: '标题名称',
    titleSize: 'middle',
    titleDescription: '低代码表单',
    titleImageUrl: 'bg.png',
    defUrl: 'bg.png',
    type: '',
    titleDescriptionShow: true,
    titleImageShow: true,
    titleDescriptionPosition: 'center',
  });
  const [pageFooter, setPageFooter] = useState<FooterType>({
    id: '',
    size: 'large',
    position: 'left',
    buttonText: '提交',
    buttonIconShowBool: true,
  });
  /* 激活 */
  const getActiveComp = () => {
    // 组件列表
    const item = _.find(pageCompList, (item: any) => item.id === activeComp.id);
    if (item) {
      return item;
    }
    if (activeComp.id === pageFooter.id) {
      return pageFooter;
    }
    if (activeComp.id === pageHeader.id) {
      return pageHeader;
    }
  };
  /*  生成组件 , 通过全局状态管理 */
  const createByClickOrDrag = (element: any) => {
    const defaultComp: any = getDefaultConfig(element.type);
    const item = {
      ...defaultComp,
      ...element.value,
      id: element.id || uuidv4(),
      title: element.name,
      type: element.type,
      name: element.name,
    };
    return { ...item };
  };
  const handleCreateFormComponents = (component: CompItemType) => {
    console.log(component);
    const element = createByClickOrDrag(component);
    setPageCompList([...pageCompList, element]);
  };
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
                  <div
                    className={classNames(styles.item)}
                    onClick={() => {
                      handleCreateFormComponents(component);
                    }}
                  >
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
            {pageCompList.length === 0 ? (
              <div className={styles.emptyState}>
                <Text type="secondary">暂无表单组件，请从左侧拖拽添加</Text>
              </div>
            ) : (
              pageCompList.map((component, index) => (
                <div
                  key={component.id}
                  className={classNames(styles.componentItem, {
                    [styles.activeComponentItem]: activeComp.id === component.id,
                  })}
                  onClick={() => {
                    setActiveComp({ type: 'component', id: component.id });
                    setSelectForm(component);
                  }}
                >
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
                </div>
              ))
            )}
          </div>
        </div>
        <div className={styles.rightFormConfig}>
          <FormSetting
            currentCompId={activeComp.id}
            selectForm={selectForm}
            selectComp={getActiveComp()}
          ></FormSetting>
        </div>
      </div>
    </div>
  );
};

export default FormEditor;
