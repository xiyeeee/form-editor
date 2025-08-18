import React, { useState, useCallback } from 'react';
import { Typography, Input, Switch, Tooltip, message } from 'antd';
import { CopyOutlined, BranchesOutlined, DeleteOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import type { FormComponent } from '@/store/formSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent, setCurrentComponent, setCurrentCompKey } from '@/store/formSlice';

import InputComponent from './Base/Input';
import RadioComponent from './Base/Radio';
import SelectComponent from './Base/Select';
import TextareaComponent from './Base/Textarea';
import NameComponent from './Contact/Name';
import PhoneComponent from './Contact/Phone';
import EmailComponent from './Contact/Email';

const { Title, Text } = Typography;

interface FormComponentWrapperProps {
  component: FormComponent;
  type: string;
  lineNumber?: string;
  formConfig?: any;
  isDev: boolean;
  renderType?: 'preview';
  previewType?: 'Phone' | 'PC';
  onCompControl?: (type: string, component: FormComponent) => void;
  onAddItem?: (type: string) => void;
}

const FormComponentWrapper: React.FC<FormComponentWrapperProps> = ({
  component,
  type,
  lineNumber,
  formConfig,
  isDev,
  renderType,
  previewType,
  onCompControl,
  onAddItem,
}) => {
  const dispatch = useDispatch();
  const { currentComponent } = useSelector((state: RootState) => state.form);

  const [openBatchOperation, setOpenBatchOperation] = useState(false);

  const getComponent = useCallback((componentType: string) => {
    const components: Record<string, React.ComponentType<any>> = {
      // Base components
      Input: InputComponent,
      Radio: RadioComponent,
      Select: SelectComponent,
      Textarea: TextareaComponent,

      // Contact components
      Name: NameComponent,
      Phone: PhoneComponent,
      Email: EmailComponent,
    };

    return components[componentType] || InputComponent;
  }, []);

  const CurrentComponent = getComponent(type);

  const displaySection = !['Divider', 'Paging', 'FormTitle'].includes(type);

  const handleChangeValue = (field: string, value: any) => {
    dispatch(
      updateComponent({
        id: component.id,
        updates: { [field]: value },
      })
    );
    dispatch(setCurrentCompKey(uuidv4()));
  };

  const handleCompControl = (type: string, component: FormComponent) => {
    onCompControl?.(type, component);
  };

  const handleAddItem = (type: string) => {
    onAddItem?.(type);
  };

  const handleBatchOperation = (isOk: boolean, dataList: any[]) => {
    setOpenBatchOperation(false);
    if (isOk) {
      handleChangeValue('dataList', dataList);
    }
  };

  const isSelected = currentComponent?.id === component.id;
  const JustShowCompType = ['Divider', 'Paging', 'FormTitle'];
  const HasSettingTypeList = ['Radio', 'Select', 'Checkout'];

  const isIgnoreEditor = () => {
    return JustShowCompType.includes(type);
  };

  return (
    <div className="comp-item">
      {displaySection && (
        <div className="comp-item-title">
          <Title level={5} className="title-value">
            {formConfig?.displayNumberSort && (
              <span className={`number ${component.isRequired ? 'title-value-isRequired' : ''}`}>
                {component.lineNumber}.
              </span>
            )}
            <span className="title-value">
              {isDev && component.id === currentComponent?.id ? (
                <Input.TextArea
                  className="input-comp"
                  autoSize={{ minRows: 1, maxRows: 5 }}
                  maxLength={50}
                  value={component.title}
                  onChange={e => handleChangeValue('title', e.target.value)}
                  placeholder="请输入标题"
                  allowClear
                />
              ) : (
                <Text type="secondary">
                  <div className="description input-comp">{component.title}</div>
                </Text>
              )}
            </span>
          </Title>
        </div>
      )}

      {displaySection && formConfig?.displayDescription && (
        <div className="comp-item-description">
          {component.id !== currentComponent?.id && isDev ? (
            <div className="description">{component.description}</div>
          ) : (
            <Input.TextArea
              autoSize={{ minRows: 1, maxRows: 5 }}
              value={component.description}
              onChange={e => handleChangeValue('description', e.target.value)}
              placeholder="请输入描述"
              allowClear
            />
          )}
        </div>
      )}

      <div className="component">
        <CurrentComponent
          key={type}
          isSelected={component.id === currentComponent?.id}
          isPreviewRender={renderType === 'preview'}
          isDev={isDev}
          previewType={previewType}
          {...component}
          onChange={(value: any) => handleChangeValue('dataValue', value)}
        />
      </div>

      {isSelected && !isIgnoreEditor() && (
        <div className="active-comp-setting">
          <div className="bottom-setting">
            {HasSettingTypeList.includes(type) && (
              <div className="data-list-setting">
                <span className="add-item" onClick={() => handleAddItem('new')}>
                  <Text type="warning">
                    <CopyOutlined style={{ fontSize: '16px', color: '#646a73' }} />
                    <span className="add-label">添加单项</span>
                  </Text>
                </span>
                <span className="add-item" onClick={() => handleAddItem('other')}>
                  <Text type="warning">
                    <CopyOutlined style={{ fontSize: '16px', color: '#646a73' }} />
                    <span className="add-label">添加其他</span>
                  </Text>
                </span>
                <span className="add-item" onClick={() => setOpenBatchOperation(true)}>
                  <Text type="warning">
                    <CopyOutlined style={{ fontSize: '16px', color: '#646a73' }} />
                    <span className="add-label">批量操作</span>
                  </Text>
                </span>
              </div>
            )}

            <span className="setting-item">
              <Switch
                checked={component.isRequired}
                onChange={checked => handleChangeValue('isRequired', checked)}
              />
              <label>必填</label>
            </span>
          </div>
        </div>
      )}

      {isSelected && (
        <>
          <div className="active-drag handle">
            <img src="/assets/form/drag.svg" alt="drag" />
          </div>
          <div className="active-comp-setting-side-bar">
            <Tooltip placement="left" title="复制">
              <div className="control" onClick={e => handleCompControl('copy', component)}>
                <CopyOutlined />
              </div>
            </Tooltip>
            <Tooltip placement="left" title="逻辑">
              <div className="control" onClick={e => handleCompControl('logic', component)}>
                <BranchesOutlined />
              </div>
            </Tooltip>
            <Tooltip placement="left" color="#f50" title="删除">
              <div className="control" onClick={e => handleCompControl('delete', component)}>
                <DeleteOutlined />
              </div>
            </Tooltip>
          </div>
        </>
      )}
    </div>
  );
};

export default FormComponentWrapper;
