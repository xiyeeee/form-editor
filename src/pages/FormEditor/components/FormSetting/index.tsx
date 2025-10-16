import React from 'react';
import { Typography } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import styles from './index.module.less';

const { Title } = Typography;

// 基础设置
import TitleComponent from '@/components/FormComponentsSetting/base/Title';
import FormTitle from '@/components/FormComponentsSetting/show/FormTitle';
// import Video from '@/components/FormComponentsSetting/show/Video';
// import Image from '@/components/FormComponentsSetting/show/Image';
import Position from '@/components/FormComponentsSetting/base/Position';
import Size from '@/components/FormComponentsSetting/base/Size';
import ButtonText from '@/components/FormComponentsSetting/base/ButtonText';
import Description from '@/components/FormComponentsSetting/base/Description';
import Placeholder from '@/components/FormComponentsSetting/base/Placeholder';
import AddressPlaceholder from '@/components/FormComponentsSetting/base/AddressPlaceholder';
import RangePlaceholder from '@/components/FormComponentsSetting/base/RangePlaceholder';
import PageSubTitle from '@/components/FormComponentsSetting/base/PageSubTitle';
import PageSubDescription from '@/components/FormComponentsSetting/base/PageSubDescription';
import DividerText from '@/components/FormComponentsSetting/base/DividerText';
import LayoutType from '@/components/FormComponentsSetting/base/LayoutType';
import RateConfig from '@/components/FormComponentsSetting/base/RateConfig';
import NPSConfig from '@/components/FormComponentsSetting/base/NPSConfig';
import DividerBorderType from '@/components/FormComponentsSetting/base/DividerBorderType';
import Required from '@/components/FormComponentsSetting/formValidation/Required';
import ValidationSystem from '@/components/FormComponentsSetting/formValidation/ValidationFormat';
import ValidationCustom from '@/components/FormComponentsSetting/formValidation/ValidationCustom';
import CustomText from '@/components/FormComponentsSetting/formValidation/CustomText';
import NumberConfig from '@/components/FormComponentsSetting/formValidation/NumberConfig';
import SignCreateImgType from '@/components/FormComponentsSetting/data/SignCreateImgType';

// 数据设置
import UseOtherDataList from '@/components/FormComponentsSetting/data/UseOtherDataList';
import DataList from '@/components/FormComponentsSetting/data/DataList';

// 全局设置
import DisplayWaterMark from '@/components/FormComponentsSetting/GlobalConfigSetting/DisplayWaterMark';
import DisplaySerialNumber from '@/components/FormComponentsSetting/GlobalConfigSetting/DisplaySerialNumber';
import DisplayDescription from '@/components/FormComponentsSetting/GlobalConfigSetting/DisplayDescription';
import DisplayTitle from '@/components/FormComponentsSetting/GlobalConfigSetting/DisplayTitle';
import DisplayFormBtn from '@/components/FormComponentsSetting/GlobalConfigSetting/DisplayFormBtn';

import {
  hasOwnPropertyFunction,
  verifyRegularityCompList,
} from '@/pages/FormEditor/componentConfigData';
import * as _ from 'lodash';
import { JustShowCompType } from '@/pages/FormEditor/componentData';
import { CompListData } from '@/pages/FormEditor/componentData';
import Icon from '@/pages/FormEditor/icon';

interface FormSettingProps {
  selectComp?: any;
  selectForm?: any;
  currentCompId?: string;
}

const FormSetting: React.FC<FormSettingProps> = ({ selectComp, selectForm, currentCompId }) => {
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);
  const globalFormConfig = useSelector((state: RootState) => state.form.globalFormConfig);

  const actualSelectComp = selectComp || currentComponent;
  const actualSelectForm = selectForm || globalFormConfig;

  const currCompIcon = React.useMemo(() => {
    let _list: any[] = [];
    CompListData.map(item => {
      _list = [..._list, ...item.children];
    });
    const comp = _.filter(_list, {
      type: actualSelectComp?.type,
    })?.[0]?.icon;

    return comp || (actualSelectComp?.type === 'Button' && Icon.Button);
  }, [actualSelectComp?.type]);

  const showParams = (params: string): boolean => {
    return hasOwnPropertyFunction(actualSelectComp, params);
  };

  const showRegParams = (): boolean => {
    const compList = verifyRegularityCompList();
    return compList.includes(actualSelectComp?.type);
  };

  const renderComponentName = () => {
    return (
      actualSelectComp?.name || (actualSelectComp?.type === 'Button' && '提交按钮') || '表单配置'
    );
  };

  return (
    <div className={styles.setting}>
      <div className={styles.compName}>
        <Title level={5} className={styles.titleVal}>
          {currCompIcon ? (
            <img src={currCompIcon} className={styles.compIcon} alt="" />
          ) : (
            <span className={styles.compIcon}>🍋</span>
          )}
          <span className={styles.name}>{renderComponentName()}</span>
        </Title>
      </div>
      <div className={styles.settingBase}>
        {currentCompId && (
          <>
            <div className={styles.categoryName}>基础设置</div>
            <div className={`${styles.content} ${styles.mb0}`}>
              {actualSelectComp?.type === 'FormTitle' && (
                <FormTitle comp={actualSelectComp} key={actualSelectComp._selectedId} />
              )}
              {showParams('name') &&
                !showParams('isLayoutComp') &&
                !['FormTitle'].includes(actualSelectComp?.type) && (
                  <TitleComponent comp={actualSelectComp} key={actualSelectComp._selectedId} />
                )}
              {showParams('buttonText') && (
                <ButtonText comp={actualSelectComp} key={actualSelectComp._selectedId} />
              )}
              {showParams('description') && !['FormTitle'].includes(actualSelectComp?.type) && (
                <Description comp={actualSelectComp} key={actualSelectComp._selectedId} />
              )}
              {showParams('pageSubTitle') && (
                <PageSubTitle comp={actualSelectComp} key={actualSelectComp._selectedId} />
              )}
              {showParams('pageSubDescription') && (
                <PageSubDescription comp={actualSelectComp} key={actualSelectComp._selectedId} />
              )}
              {showParams('placeholder') && (
                <Placeholder comp={actualSelectComp} key={actualSelectComp._selectedId} />
              )}
              {showParams('address_placeholder') && (
                <AddressPlaceholder comp={actualSelectComp} key={actualSelectComp._selectedId} />
              )}
              {showParams('placeholderRange') && (
                <RangePlaceholder comp={actualSelectComp} key={actualSelectComp._selectedId} />
              )}
              {showParams('layoutType') && <LayoutType comp={actualSelectComp} />}
              {showParams('dividerValue') && (
                <>
                  <DividerText comp={actualSelectComp} />
                  <DividerBorderType comp={actualSelectComp} />
                </>
              )}
              {showParams('position') && <Position comp={actualSelectComp} />}
              {showParams('size') && <Size comp={actualSelectComp} />}
              {actualSelectComp?.type === 'Rate' && <RateConfig comp={actualSelectComp} />}
              {['NPS', 'SelectRate'].includes(actualSelectComp?.type) && (
                <NPSConfig comp={actualSelectComp} />
              )}
              {showParams('dataList') && <DataList comp={actualSelectComp} />}
              {showParams('useOtherDataList') && <UseOtherDataList comp={actualSelectComp} />}
              {showParams('sign_create_type') && <SignCreateImgType comp={actualSelectComp} />}
            </div>

            {actualSelectComp?.type && !JustShowCompType.includes(actualSelectComp?.type) && (
              <>
                <div className={styles.categoryName}>表单验证</div>
                <div className={styles.content}>
                  {showParams('maxValue') && <NumberConfig comp={actualSelectComp} />}
                  {showParams('isRequired') && <Required comp={actualSelectComp} />}
                  {showRegParams() && <ValidationSystem comp={actualSelectComp} />}
                  {showParams('isCustomErrorMessage') && (
                    <ValidationCustom comp={actualSelectComp} />
                  )}
                  {actualSelectComp?.isCustomErrorMessage && <CustomText comp={actualSelectComp} />}
                </div>
              </>
            )}
          </>
        )}

        <div className={styles.categoryName}>全局表单配置</div>
        <div className={styles.content}>
          {actualSelectForm && (
            <>
              <DisplayFormBtn form={actualSelectForm} />
              <DisplaySerialNumber form={actualSelectForm} />
              <DisplayDescription form={actualSelectForm} />
              <DisplayWaterMark form={actualSelectForm} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormSetting;
