/*
 * @Author: Xiyeeee
 * @Date: 2025-08-17 22:00:02
 * @Description:
 * @LastEditors: Xiyeeee
 * @LastEditTime: 2025-09-01 20:54:07
 */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Button, notification, Tooltip, Typography } from 'antd';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { HolderOutlined } from '@ant-design/icons';
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
import { IgnoreLineNumberTypeList, CompType } from './componentData';
import * as _ from 'lodash-es';
import { getDefaultConfig } from './componentConfigData';
const { Text } = Typography;
import { v4 as uuidv4 } from 'uuid';
import { FormComponent, setCurrentComponent, updateComponent } from '@/store/formSlice';
import { useDispatch } from 'react-redux';
// 侧边栏拖拽组件项
interface DraggableComponentItemProps {
  component: any;
  onClick: () => void;
}

const DraggableComponentItem: React.FC<DraggableComponentItemProps> = ({ component, onClick }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-${component.type}`,
  });

  const style = {
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'move' : 'default',
  };

  // 防止拖拽后触发点击生成：记录是否发生过拖拽
  const suppressClickRef = useRef(false);
  useEffect(() => {
    if (isDragging) {
      suppressClickRef.current = true;
    }
  }, [isDragging]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={classNames(styles.item, {})}
      {...attributes}
      {...listeners}
      onClick={e => {
        e.stopPropagation();
        if (suppressClickRef.current) {
          suppressClickRef.current = false;
          return;
        }
        // 防止拖拽时触发点击
        if (!isDragging) {
          e.stopPropagation();
          onClick();
        }
      }}
    >
      {component.icon && <img className={styles.icon} src={component.icon} alt="" />}
      {component.label}
    </div>
  );
};

// 拖拽组件
interface DraggableFormComponentProps {
  id: string;
  item: FormComponent;
  index: number;
  isActive: boolean;
  onSelect: (component: FormComponent) => void;
  onCompControl: (type: string, component: FormComponent) => void;
  onAddItem: (type: string, id: string) => void;
  onDataChange: (updatedComponent: FormComponent) => void;
  formConfig: any;
  selectedComp: FormComponent | null;
}

// 画布放置区域
interface CanvasDropZoneProps {
  children: React.ReactNode;
  onDrop: (event: any) => void;
}

const CanvasDropZone: React.FC<CanvasDropZoneProps> = ({ children }) => {
  const { setNodeRef } = useDroppable({
    id: 'canvas-drop-zone',
  });

  return (
    <div ref={setNodeRef} style={{ minHeight: '200px', position: 'relative' }}>
      {children}
    </div>
  );
};

// 侧边栏放置区域
interface SidebarDropZoneProps {
  children: React.ReactNode;
}

const SidebarDropZone: React.FC<SidebarDropZoneProps> = ({ children }) => {
  const { setNodeRef } = useDroppable({
    id: 'sidebar-drop-zone',
  });

  return (
    <div ref={setNodeRef} className={styles.components}>
      {children}
    </div>
  );
};

const DraggableFormComponent: React.FC<DraggableFormComponentProps> = ({
  id,
  item,
  index,
  isActive,
  onSelect,
  onCompControl,
  onAddItem,
  onDataChange,
  formConfig,
  selectedComp,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled: !isActive,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={classNames(styles.componentItem, {
        [styles.activeComponentItem]: isActive,
        [styles.dragging]: isDragging,
      })}
      onClick={() => onSelect(item)}
    >
      {/* 拖拽手柄 */}
      <div
        className={styles.dragHandle}
        {...(isActive ? attributes : {})}
        {...(isActive ? listeners : {})}
        aria-disabled={!isActive}
        style={{ cursor: isActive ? 'move' : 'default', opacity: isActive ? 1 : 0.5 }}
      ></div>

      <div style={{ flex: 1 }}>
        <FormComponentWrapper
          component={item}
          selectedComp={selectedComp}
          type={item.type}
          lineNumber={String(index + 1)}
          formConfig={formConfig}
          isDev={true}
          onCompControl={onCompControl}
          onAddItem={onAddItem}
          onDataChange={onDataChange}
        />
      </div>
    </div>
  );
};
const compList = [...CompListData]; // 组件列表

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

// 占位组件（icon + label），样式见 index.module.less
const Placeholder: React.FC<{ icon?: string; label?: string; tail?: boolean }> = ({
  icon,
  label,
  tail = false,
}) => (
  <div className={classNames(styles.placeholder, { [styles.placeholderTail]: tail })}>
    <div className={styles.placeholderInner}>
      {icon && <img className={styles.icon} src={icon} alt="" />}
      <span>{label}</span>
    </div>
  </div>
);
const FormEditor: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { globalFormConfig, currentComponent } = useSelector((state: RootState) => state.form);
  // 当前选中的分类
  const [activeType, setActiveType] = useState('basic');
  const [selectForm, setSelectForm] = useState({});
  const [activeCompId, setActiveCompId] = useState('');
  const [pageCompList, setPageCompList] = useState<FormComponent[]>([]);
  // 防止 useEffect 覆盖本地更新的 ref 标志
  const isLocalUpdate = useRef(false);

  // 拖拽相关状态
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<FormComponent | null>(null);
  const [draggedItemType, setDraggedItemType] = useState<'canvas' | 'sidebar'>('canvas');
  const [overId, setOverId] = useState<string | null>(null);

  // 拖拽传感器：提高点击容错，避免轻点被判为拖拽
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 监听 currentComponent 变化，同步更新 pageCompList
  useEffect(() => {
    if (currentComponent && currentComponent.id && !isLocalUpdate.current) {
      setPageCompList(prevList =>
        prevList.map(item => (item.id === currentComponent.id ? { ...currentComponent } : item))
      );
    }
    // 重置标志
    isLocalUpdate.current = false;
  }, [currentComponent]);

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

  const handleCreateFormComponents = (component: any) => {
    const element = createByClickOrDrag(component);
    isLocalUpdate.current = true;
    /* 新增 */
    const newList = updateCompLineNumber([...pageCompList, element]);
    setPageCompList(newList);
    setActiveCompId(element.id);
    dispatch(setCurrentComponent(element));
  };
  // 更新组件行号
  const updateCompLineNumber = (arr: FormComponent[]): FormComponent[] => {
    let lineNumber = 0;
    let pageNumber = 0;

    // 预先计算分页总数
    const pageCount = arr.filter(comp => comp.type === CompType.paging).length;

    return arr.map(item => {
      // 检查是否需要忽略行号
      if (IgnoreLineNumberTypeList.includes(item.type as CompType)) {
        if (item.type === CompType.paging) {
          pageNumber++;
          return {
            ...item,
            pagingValue: `第 ${pageNumber} 页 / 共 ${pageCount} 页`,
          };
        }
        return { ...item };
      }

      lineNumber++;
      return {
        ...item,
        lineNumber: lineNumber.toString().length === 1 ? `0${lineNumber}` : lineNumber.toString(),
      };
    });
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

      const newList = updateCompLineNumber([...pageCompList, newComp]);
      setPageCompList(newList);
    }
    if (type === 'delete') {
      const filteredList = pageCompList.filter(item => item.id !== component.id);
      const newList = updateCompLineNumber(filteredList);
      setPageCompList(newList);

      notification.success({
        message: component.name + '删除成功',
      });
    }

    // initDataState();
  };

  const handleComponentChange = (updatedComponent: FormComponent) => {
    // 标记这是本地更新
    isLocalUpdate.current = true;

    // 先更新本地状态
    setPageCompList(prevList =>
      prevList.map(item => (item.id === updatedComponent.id ? updatedComponent : item))
    );

    // 再更新 Redux
    dispatch(setCurrentComponent(updatedComponent));
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
      // 找到要更新的组件
      const currentComponent = pageCompList.find(item => item.id === id);

      if (currentComponent) {
        // 创建更新后的组件
        const updatedComponent = {
          ...currentComponent,
          dataList: [...(currentComponent.dataList || []), newDataItem],
        };

        // 标记这是本地更新
        isLocalUpdate.current = true;

        // 先更新本地状态
        setPageCompList(prevList =>
          prevList.map(item => (item.id === updatedComponent.id ? updatedComponent : item))
        );

        // 再更新 Redux
        dispatch(setCurrentComponent(updatedComponent));
      }
    }
  };

  // 拖拽开始事件
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
    // 检查是否是侧边栏组件（以 'sidebar-' 开头）
    if (active.id.toString().startsWith('sidebar-')) {
      setDraggedItemType('sidebar');
      // 从组件数据中找到对应的组件类型
      const componentType = active.id.toString().replace('sidebar-', '');
      const componentData = compList
        .flatMap(group => group.children)
        .find(comp => comp.type === componentType);

      if (componentData) {
        // 创建临时组件用于拖拽预览
        const tempComponent = createByClickOrDrag(componentData);
        setDraggedItem(tempComponent);
      }
    } else {
      setDraggedItemType('canvas');
      // 找到被拖拽的画布组件
      const draggedComponent = pageCompList.find(item => item.id === active.id);
      setDraggedItem(draggedComponent || null);
    }
  };

  // 拖拽经过（用于计算画布中的占位位置）
  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (!over || !over.id) {
      return;
    }
    const oId = over?.id?.toString();
    setOverId(oId);
  };

  // 拖拽结束事件
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    // Guard: 从侧栏拖拽时，只有松手位于画布（包含画布项）才允许创建
    if (draggedItemType === 'sidebar') {
      const overIdStr = over?.id?.toString();
      const validCanvasIds = new Set<string>(['canvas-drop-zone', ...pageCompList.map(i => i.id)]);
      if (!overIdStr || !validCanvasIds.has(overIdStr)) {
        handleResetDragEnd();
        return;
      }
    }
    // 处理从侧边栏拖拽到画布的情况
    if (draggedItemType === 'sidebar' && over) {
      const componentType = active.id.toString().replace('sidebar-', '');
      const componentData = compList
        .flatMap(group => group.children)
        .find(comp => comp.type === componentType);

      if (componentData) {
        // 创建新组件
        const newComponent = createByClickOrDrag(componentData);

        // 插入新组件到指定位置
        let insertIndex = pageCompList.findIndex(item => item.id === over.id);
        if (over.id === 'canvas-drop-zone') {
          insertIndex = pageCompList.length;
        }
        const newList = [...pageCompList];
        newList.splice(insertIndex, 0, newComponent);
        // 重新计算行号
        const updatedList = updateCompLineNumber(newList);
        // 标记这是本地更新
        isLocalUpdate.current = true;
        // 更新本地状态
        setPageCompList(updatedList);

        // 选中新添加的组件
        setActiveCompId(newComponent.id);
        dispatch(setCurrentComponent(newComponent));
      }
    }
    // 处理画布内组件重新排序
    else if (draggedItemType === 'canvas' && over && active.id !== over.id) {
      const oldIndex = pageCompList.findIndex(item => item.id === active.id);
      const newIndex = pageCompList.findIndex(item => item.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        // 使用 arrayMove 重新排序
        const newList = arrayMove(pageCompList, oldIndex, newIndex);

        // 重新计算行号
        const updatedList = updateCompLineNumber(newList);

        // 标记这是本地更新
        isLocalUpdate.current = true;

        // 更新本地状态
        setPageCompList(updatedList);

        // 更新 Redux 中的当前组件
        if (currentComponent) {
          const updatedCurrentComponent = updatedList.find(item => item.id === currentComponent.id);
          if (updatedCurrentComponent) {
            dispatch(setCurrentComponent(updatedCurrentComponent));
          }
        }
      }
    }

    // 清理状态
    handleResetDragEnd();
  };
  const handleResetDragEnd = () => {
    setActiveId(null);
    setDraggedItem(null);
    setDraggedItemType('canvas');
    setOverId(null);
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
              编辑于 2024-11-03 09:12
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
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <FormSideBar activeType={activeType} setActiveType={setActiveType}></FormSideBar>
          {/* 拖拽组件 */}
          <SidebarDropZone>
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
                    <DraggableComponentItem
                      key={`${componentsItem.type}-${component.type}`}
                      component={component}
                      onClick={() => handleCreateFormComponents(component)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </SidebarDropZone>
          <div className={styles.comps}>
            <div className={styles.formPreview}>
              <CanvasDropZone onDrop={() => {}}>
                <SortableContext
                  items={pageCompList.map(item => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {pageCompList.length === 0 ? (
                    <div className={styles.emptyState}>
                      <Text type="secondary">暂无表单组件，点击或拖拽添加</Text>
                    </div>
                  ) : (
                    pageCompList.map((item, index) => (
                      <React.Fragment key={item.id}>
                        {draggedItemType === 'sidebar' &&
                          draggedItem &&
                          overId === item.id &&
                          overId !== 'canvas-drop-zone' &&
                          (() => {
                            const meta = compList
                              .flatMap(group => group.children)
                              .find(c => c.type === draggedItem?.type);
                            return <Placeholder icon={meta?.icon} label={meta?.label} />;
                          })()}
                        <DraggableFormComponent
                          id={item.id}
                          item={item}
                          index={index}
                          isActive={activeCompId === item.id}
                          onSelect={handleSelectComponent}
                          onCompControl={handleCompControl}
                          onAddItem={handleAddItem}
                          onDataChange={handleComponentChange}
                          formConfig={globalFormConfig}
                          selectedComp={(getActiveComp() as FormComponent) || null}
                        />
                      </React.Fragment>
                    ))
                  )}
                  {draggedItemType === 'sidebar' &&
                    draggedItem &&
                    overId &&
                    overId === 'canvas-drop-zone' &&
                    (() => {
                      const meta = compList
                        .flatMap(group => group.children)
                        .find(c => c.type === draggedItem?.type);
                      return (
                        <>
                          <Placeholder icon={meta?.icon} label={meta?.label} />
                        </>
                      );
                    })()}
                </SortableContext>
              </CanvasDropZone>

              {/* 拖拽时的遮罩层 */}
              <DragOverlay>
                {draggedItem ? (
                  draggedItemType === 'sidebar' ? (
                    (() => {
                      const meta = compList
                        .flatMap(group => group.children)
                        .find(c => c.type === draggedItem.type);
                      return (
                        <div
                          style={{
                            width: 150,
                            cursor: 'move',
                            transform: 'none',
                            opacity: 0.95,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: 8,
                            borderRadius: 6,
                            background: '#fff',
                            boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
                          }}
                        >
                          {meta?.icon && <img className={styles.icon} src={meta.icon} alt="" />}
                          <span>{meta?.label}</span>
                        </div>
                      );
                    })()
                  ) : (
                    <div style={{ transform: 'none', padding: 0, opacity: 0.95 }}>
                      <FormComponentWrapper
                        component={draggedItem}
                        selectedComp={getActiveComp()}
                        type={draggedItem.type}
                        lineNumber={draggedItem.lineNumber}
                        formConfig={globalFormConfig}
                        isDev={true}
                        onCompControl={() => {}}
                        onAddItem={() => {}}
                        onDataChange={() => {}}
                      />
                    </div>
                  )
                ) : null}
              </DragOverlay>
            </div>
          </div>
          <div className={styles.rightFormConfig}>
            <FormSetting
              currentCompId={activeCompId}
              selectForm={selectForm}
              selectComp={getActiveComp()}
            ></FormSetting>
          </div>
        </DndContext>
      </div>
    </div>
  );
};

export default FormEditor;
