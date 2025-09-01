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
}

export interface FormConfig {
  /* 全局 表单按钮配置*/
  displayFormBtn?: boolean;
  displayNumberSort?: boolean;
  displayDescription?: boolean;
  displayTitle?: boolean;
  displayWaterMark?: boolean;
  displaySerialNumber?: boolean;
}

export interface FormState {
  globalFormConfig: FormConfig;
  currentComponent: FormComponent | null;
  components: FormComponent[];
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
  components: [],
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
    setCurrentComponent: (state, action: PayloadAction<FormComponent | null>) => {
      state.currentComponent = action.payload;
    },
    updateCurrentComponent: (state, action: PayloadAction<Partial<FormComponent>>) => {
      if (state.currentComponent) {
        state.currentComponent = { ...state.currentComponent, ...action.payload };
      }
    },
    addComponent: (state, action: PayloadAction<FormComponent>) => {
      state.components.push(action.payload);
    },
    updateComponent: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<FormComponent> }>
    ) => {
      const { id, updates } = action.payload;
      const index = state.components.findIndex(comp => comp.id === id);
      if (index !== -1) {
        state.components[index] = { ...state.components[index], ...updates };
      }
    },
    removeComponent: (state, action: PayloadAction<string>) => {
      state.components = state.components.filter(comp => comp.id !== action.payload);
    },
    setCurrentCompKey: (state, action: PayloadAction<string>) => {
      state.currentCompKey = action.payload;
    },
    setComponents: (state, action: PayloadAction<FormComponent[]>) => {
      state.components = action.payload;
    },
  },
});

export const {
  initGlobalFormConfig,
  updateGlobalFormConfig,
  setCurrentComponent,
  updateCurrentComponent,
  addComponent,
  updateComponent,
  removeComponent,
  setCurrentCompKey,
  setComponents,
} = formSlice.actions;

export default formSlice.reducer;
