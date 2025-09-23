/*
 * @Author: Xiyeeee
 * @Date: 2025-08-14 21:06:02
 * @Description:
 * @LastEditors: Xiyeeee
 * @LastEditTime: 2025-09-01 21:15:27
 */
import React, { useState, useCallback, useEffect } from 'react';
import { Typography, Input, Switch, Tooltip, message, Flex } from 'antd';
import {
  CopyOutlined,
  BranchesOutlined,
  DeleteOutlined,
  HolderOutlined,
  PlusCircleOutlined,
  DiffOutlined,
} from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import type { FormComponent } from '@/store/formSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent, setCurrentComponent, setCurrentCompKey } from '@/store/formSlice';
import styles from './index.module.less';

import InputComponent from './Base/Input';
import RadioComponent from './Base/Radio';
import SelectComponent from './Base/Select';
import TextareaComponent from './Base/Textarea';
import CheckoutComponent from './Base/Checkout';
import SwitchComponent from './Base/Switch';
import BatchOptionModal from './components/BatchOptionModal';
import RateComponent from './Base/Rate';
import SelectRateComponent from './Base/SelectRate';
import TimeComponent from './Base/Time';
import TimeRangeComponent from './Base/TimeRange';
import DateComponent from './Base/Date';
import DateRangeComponent from './Base/DateRange';
import DividerComponent from './Base/Divider';
import PagingComponent from './Base/Paging';

import NameComponent from './Contact/Name';
import PhoneComponent from './Contact/Phone';
import EmailComponent from './Contact/Email';
import AddressComponent from './Contact/Address';
import GenderComponent from './Contact/Gender';
import IDCardComponent from './Contact/IDCard';
import TelePhoneComponent from './Contact/TelePhone';
import WXComponent from './Contact/WX';

import FormTitleComponent from './Show/FormTitle';
import ImageComponent from './Show/Image';
import VideoComponent from './Show/Video';

const { Title, Text } = Typography;

interface FormComponentWrapperProps {
  selectedComp: FormComponent;
  component: FormComponent;
  type: string;
  lineNumber?: string;
  formConfig?: any;
  isDev: boolean;
  renderType?: 'preview';
  previewType?: 'Phone' | 'PC';
  onCompControl?: (type: string, component: FormComponent) => void;
  onAddItem?: (type: string, id: string) => void;
  onDataChange?: (updatedComponent: FormComponent) => void;
}

const FormComponentWrapper: React.FC<FormComponentWrapperProps> = ({
  component,
  selectedComp,
  type,
  // lineNumber,
  formConfig,
  isDev,
  renderType,
  previewType,
  onCompControl,
  onAddItem,
  onDataChange,
}) => {
  const dispatch = useDispatch();
  const { currentComponent } = useSelector((state: RootState) => state.form);
  const [isSelected, setIsSelected] = useState<Boolean>(false);
  const [openBatchOperation, setOpenBatchOperation] = useState(false);

  const getComponent = useCallback((componentType: string) => {
    const components: Record<string, React.ComponentType<any>> = {
      // Base components
      Input: InputComponent,
      Radio: RadioComponent,
      Select: SelectComponent,
      Textarea: TextareaComponent,
      Checkout: CheckoutComponent,
      Switch: SwitchComponent,
      Rate: RateComponent,
      SelectRate: SelectRateComponent,
      Time: TimeComponent,
      TimeRange: TimeRangeComponent,
      Date: DateComponent,
      DateRange: DateRangeComponent,
      Divider: DividerComponent,
      Paging: PagingComponent,
      // Contact components
      Name: NameComponent,
      Phone: PhoneComponent,
      Email: EmailComponent,
      Address: AddressComponent,
      Gender: GenderComponent,
      IDCard: IDCardComponent,
      TelePhone: TelePhoneComponent,
      WX: WXComponent,

      // Show components
      FormTitle: FormTitleComponent,
      Image: ImageComponent,
      Video: VideoComponent,
    };

    return components[componentType] || InputComponent;
  }, []);

  const Component = getComponent(type);
  useEffect(() => {
    setIsSelected(component.id === selectedComp?.id);
  }, [selectedComp, component]);

  const displaySection = !['Divider', 'Paging', 'FormTitle'].includes(type);

  const handleChangeValue = (field: string, value: any) => {
    console.log(field, value, 'field');
    // 创建更新后的组件
    const updatedComponent = { ...component, [field]: value };
    // 更新 Redux 状态
    dispatch(updateComponent({ [field]: value }));
    dispatch(setCurrentCompKey(uuidv4()));

    // 通知父组件更新 pageCompList
    if (onDataChange) {
      console.log(updatedComponent, 'updatedComponent');
      onDataChange(updatedComponent);
    }
  };

  const handleCompControl = (type: string, component: FormComponent) => {
    onCompControl?.(type, component);
  };

  const handleAddItem = (type: string, id: string) => {
    onAddItem?.(type, id);
  };

  const handleBatchOperation = (isOk: boolean, dataList: any[]) => {
    setOpenBatchOperation(false);
    if (isOk) {
      handleChangeValue('dataList', dataList);
    }
  };

  const JustShowCompType = ['Divider', 'Paging', 'FormTitle', 'Button'];
  const HasSettingTypeList = ['Radio', 'Select', 'Checkout'];

  const isIgnoreEditor = () => {
    return JustShowCompType.includes(type);
  };

  return (
    <div className={`${styles.compItem} ${isSelected ? styles.selected : ''}`}>
      {displaySection && (
        <div className={styles.compItemTitle}>
          <Title level={5} className={styles.titleValue}>
            {formConfig?.displayNumberSort && (
              <span
                className={`${styles.number} ${
                  component.isRequired ? styles.titleValueIsRequired : ''
                }`}
              >
                {component.lineNumber}
              </span>
            )}
            <span className={styles.titleValue}>
              {isDev && component.id === currentComponent?.id ? (
                <Input.TextArea
                  className={styles.inputComp}
                  autoSize={{ minRows: 1, maxRows: 5 }}
                  maxLength={50}
                  value={component.title}
                  onChange={e => handleChangeValue('title', e.target.value)}
                  placeholder="请输入标题"
                  allowClear
                />
              ) : (
                <Text type="secondary">
                  <div className={`${styles.description} ${styles.inputComp}`}>
                    {component.title}
                  </div>
                </Text>
              )}
            </span>
          </Title>
        </div>
      )}

      {displaySection && formConfig?.displayDescription && (
        <div className={styles.compItemDescription}>
          {component.id !== currentComponent?.id && isDev ? (
            <div className={styles.description}>{component.description}</div>
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

      <div className={styles.component}>
        {/* 原子组件 */}
        <Component
          key={type}
          isSelected={component.id === currentComponent?.id}
          isPreviewRender={renderType === 'preview'}
          isDev={isDev}
          previewType={previewType}
          {...component}
          onChange={(value: any) => handleChangeValue('dataValue', value)}
          onDataChange={(newDataList: any[]) => {
            handleChangeValue('dataList', newDataList);
          }}
        />
      </div>

      {isSelected && !isIgnoreEditor() && (
        <div className={styles.activeCompSetting}>
          <div className={styles.bottomSetting}>
            {HasSettingTypeList.includes(component.type) && (
              <div className={styles.dataListSetting}>
                <span
                  className={styles.addItem}
                  onClick={() => handleAddItem('new', selectedComp?.id)}
                >
                  <PlusCircleOutlined style={{ fontSize: 12, color: ' #49608d' }} />
                  <span className={styles.addLabel}>添加单项</span>
                </span>
                <span
                  className={styles.addItem}
                  onClick={() => handleAddItem('other', selectedComp?.id)}
                >
                  <PlusCircleOutlined style={{ fontSize: 12, color: ' #49608d' }} />
                  <span className={styles.addLabel}>添加其他</span>
                </span>
                <span className={styles.addItem} onClick={() => setOpenBatchOperation(true)}>
                  <DiffOutlined style={{ fontSize: 12, color: ' #49608d' }} />
                  <span className={styles.addLabel}>批量操作</span>
                </span>
              </div>
            )}

            <span className={styles.settingItem}>
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
          <div className={styles.activeDrag}>
            <HolderOutlined />
          </div>
          <div className={styles.activeCompSettingSideBar}>
            <Tooltip placement="left" title="复制">
              <div className={styles.control} onClick={e => handleCompControl('copy', component)}>
                <CopyOutlined />
              </div>
            </Tooltip>
            <Tooltip placement="left" title="逻辑">
              <div className={styles.control} onClick={e => handleCompControl('logic', component)}>
                <BranchesOutlined />
              </div>
            </Tooltip>
            <Tooltip placement="left" color="#f50" title="删除">
              <div className={styles.control} onClick={e => handleCompControl('delete', component)}>
                <DeleteOutlined />
              </div>
            </Tooltip>
          </div>
        </>
      )}

      <BatchOptionModal
        open={openBatchOperation}
        dataList={component.dataList || []}
        onBatchOperation={handleBatchOperation}
      />
    </div>
  );
};

export default FormComponentWrapper;
