/*
 * @Author: Xiyeeee
 * @Date: 2025-08-17 22:00:02
 * @Description:
 * @LastEditors: Xiyeeee
 * @LastEditTime: 2025-09-01 20:54:07
 */
import React, { useEffect, useState } from 'react';
import { Button, notification, Tooltip, Typography } from 'antd';
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
import { FormComponent, setCurrentComponent, updateComponent } from '@/store/formSlice';
import { useDispatch } from 'react-redux';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { globalFormConfig, currentComponent } = useSelector((state: RootState) => state.form);
  // 当前选中的分类
  const [activeType, setActiveType] = useState('basic');
  const [selectForm, setSelectForm] = useState({});
  const [activeCompId, setActiveCompId] = useState('');
  const [pageCompList, setPageCompList] = useState<FormComponent[]>([]);

  // 移除 useEffect，改为手动同步更新

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
  const getActiveComp = (): FormComponent | FooterType | HeaderType | undefined => {
    // 组件列表
    const item = _.find(pageCompList, (item: any) => item.id === activeCompId);
    if (item) {
      return item;
    }
    if (activeCompId === pageFooter.id) {
      return pageFooter;
    }
    if (activeCompId === pageHeader.id) {
      return pageHeader;
    }
    return undefined;
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
    const element = createByClickOrDrag(component);
    /* 新增 */
    setPageCompList([...pageCompList, element]);
  };
  const handleSelectComponent = (component: any) => {
    setActiveCompId(component.id);
    dispatch(setCurrentComponent({ ...component }));
  };
  const handleCompControl = (type: string, component: any) => {
    const index = _.findIndex(pageCompList, (item: any) => item.id === component.id);
    if (index === -1) {
      return;
    }
    if (type === 'copy') {
      const newComp: any = {
        ...component,
        id: uuidv4(),
      };
      setPageCompList([...pageCompList, newComp]);
    }
    if (type === 'delete') {
      setPageCompList(pageCompList.filter(item => item.id !== component.id));
      notification.success({
        message: component.name + '删除成功',
      });
    }

    // initDataState();
    // updateCompLineNumber();
  };

  const handleComponentChange = (updatedComponent: FormComponent) => {
    console.log(updatedComponent, 'updatedComponent');
    setPageCompList(prevList =>
      prevList.map(item => (item.id === updatedComponent.id ? updatedComponent : item))
    );
  };

  const handleAddItem = (type: string, id: string) => {
    const isNewBool = type === 'new';
    const isOtherBool = type === 'other';
    const newDataItem = isNewBool
      ? {
          label: '选项',
          value: '选项',
        }
      : {
          subType: 'other',
          label: '其他',
          value: '',
        };

    if (['new', 'other'].includes(type)) {
      const updatedList = pageCompList.map(item => {
        if (item.id === id) {
          const updatedItem = {
            ...item,
            dataList: [...(item.dataList || []), newDataItem],
          };
          return updatedItem;
        }
        return item;
      });
      setPageCompList(updatedList);
    }
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
                    key={`${componentsItem.type}-${component.type}`}
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
                    [styles.activeComponentItem]: activeCompId === component.id,
                  })}
                  onClick={() => {
                    handleSelectComponent(component);
                  }}
                >
                  <FormComponentWrapper
                    key={component.id}
                    component={component}
                    selectedComp={getActiveComp() || null}
                    type={component.type}
                    lineNumber={String(index + 1)}
                    formConfig={globalFormConfig}
                    isDev={true}
                    onCompControl={handleCompControl}
                    onAddItem={handleAddItem}
                    onDataChange={handleComponentChange}
                  />
                </div>
              ))
            )}
          </div>
        </div>
        <div className={styles.rightFormConfig}>
          <FormSetting
            currentCompId={activeCompId}
            selectForm={selectForm}
            selectComp={getActiveComp()}
          ></FormSetting>
        </div>
      </div>
    </div>
  );
};

export default FormEditor;
