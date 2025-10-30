import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Radio } from 'antd';
import { Rule } from 'antd/es/form';
import styles from './index.module.less';

const { Item } = Form;

interface CreateFormProps {
  openState: boolean;
  onHandleCreateForm: (state: boolean) => void;
}

interface FormState {
  formName: string;
  formType: 'defaultForm' | 'slideshowForm';
}

interface FormTypeOption {
  label: string;
  type: 'defaultForm' | 'slideshowForm';
  disabled?: boolean;
}

const CreateForm: React.FC<CreateFormProps> = ({ openState, onHandleCreateForm }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const formTypeList: FormTypeOption[] = [
    {
      label: '默认表单',
      type: 'defaultForm',
    },
    {
      label: '幻灯片表单',
      type: 'slideshowForm',
      disabled: true,
    },
  ];

  const handleOk = () => {
    console.log('ok');
  };

  const handleCancel = () => {
    setOpen(false);
    onHandleCreateForm(false);
  };

  useEffect(() => {
    setOpen(openState);
  }, [openState]);

  return (
    <Modal
      open={open}
      title="创建表单"
      cancelText="取消"
      okText="确定"
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        name="formCreate"
        className={styles['create-from-modal']}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 21 }}
      >
        <Item label="名称" name="formName" rules={[{ required: true, message: '请输入表单名称' }]}>
          <Input placeholder="请输入表单名称" />
        </Item>

        <Item label="类型" name="formType" rules={[{ required: true }]}>
          <Radio.Group>
            {formTypeList.map(item => (
              <Radio.Button key={item.type} value={item.type} disabled={item.disabled}>
                {item.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Item>
      </Form>
    </Modal>
  );
};

export default CreateForm;

