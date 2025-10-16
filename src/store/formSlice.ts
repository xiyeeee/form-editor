import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormComponent {
  id: string;
  type: string;
  title: string;
  description?: string;
  dataValue?: any;
  defaultValue?: string | null;
  dataList?: any[];
  dataOtherList?: any[];
  useOtherDataList?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  placeholderRange?: [string, string];
  isCustomErrorMessage?: boolean;
  customErrorMessage?: string;
  formValidationFormat?: string;
  formValidationFormatRegex?: string;
  lineNumber?: string;
  // Layout and positioning
  position?: 'left' | 'right' | 'center';
  layoutType?: 'horizontal' | 'vertical';
  // Divider specific
  dividerValue?: string;
  // Paging specific
  pagingValue?: string;
  pageSubTitle?: string;
  pageSubDescription?: string;
  // Button specific
  buttonText?: string;
  size?: 'large' | 'middle' | 'small';
  buttonIconShowBool?: boolean;
  // Rate specific
  rateCount?: number;
  rateCharacter?: string;
  rateColor?: string;
  rateAllowHalf?: boolean;
  // NPS specific
  startValue?: number;
  startValueList?: number[];
  // Address specific
  address?: string[];
  address_detail?: string;
  address_default?: string[];
  address_detail_default?: string;
  address_placeholder?: string;
  address_detail_placeholder?: string;
  // Title specific
  titleValue?: string;
  titleSize?: string;
  titleDescription?: string;
  titleImageUrl?: string;
  titleDescriptionShow?: boolean;
  titleImageShow?: boolean;
  titleDescriptionPosition?: string;
  // Validation
  minValue?: number;
  maxValue?: number;
  // Sign specific
  sign_create_type?: string;
  // Watermark specific
  waterMarkText?: string;
  // Layout component flag
  isLayoutComp?: boolean;
}

export interface FormConfig {
  /* 全局 表单按钮配置*/
  displayFormBtn?: boolean;
  displayNumberSort?: boolean;
  displayDescription?: boolean;
  displayTitle?: boolean;
  displayWaterMark?: boolean;
  displaySerialNumber?: boolean;
  dividerBorderType?: boolean;
}

export interface FormState {
  globalFormConfig: FormConfig;
  currentComponent: FormComponent | null;
  currentCompKey: string;
}

const initialState: FormState = {
  globalFormConfig: {
    displayNumberSort: true,
    displayDescription: true,
    displayTitle: true,
    displayWaterMark: false,
    displaySerialNumber: true,
  },
  currentComponent: null,
  currentCompKey: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    initGlobalFormConfig: (state, action: PayloadAction<FormConfig>) => {
      state.globalFormConfig = { ...state.globalFormConfig, ...action.payload };
    },
    /* 更新全局配置 , 左侧栏 */
    updateGlobalFormConfig: (state, action: PayloadAction<Partial<FormConfig>>) => {
      state.globalFormConfig = { ...state.globalFormConfig, ...action.payload };
    },
    /* 初始化 */
    initCurrentComponent: (state, action: PayloadAction<FormComponent>) => {
      state.currentComponent = action.payload;
    },
    /* 选中 */
    setCurrentComponent: (state, action: PayloadAction<FormComponent>) => {
      state.currentComponent = action.payload;
    },
    /* 更新 */
    updateComponent: (state, action: PayloadAction<Partial<FormComponent>>) => {
      state.currentComponent = { ...state.currentComponent, ...action.payload } as FormComponent;
    },
    /* key */
    setCurrentCompKey: (state, action: PayloadAction<string>) => {
      state.currentCompKey = action.payload;
    },
  },
});

export const {
  initGlobalFormConfig,
  updateGlobalFormConfig,
  setCurrentComponent,
  updateComponent,
  setCurrentCompKey,
  initCurrentComponent,
} = formSlice.actions;

export default formSlice.reducer;
