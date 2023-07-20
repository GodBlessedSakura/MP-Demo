import { Dispatch, SetStateAction, useState } from 'react';
import { Form, Input, Spin, Select, message } from 'antd';
import request from '@/utils/request';
import MyIcon from '@/components/Icons';
import { history } from 'umi';
import styles from './index.less';

const { TextArea } = Input;
const { Option } = Select;
export default function Danmaku() {
  const [form] = Form.useForm();
  const [isProcessing, setProcessing] = useState<boolean>(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (isProcessing) return;
    const values = await form.validateFields();
    setProcessing(true);
    const { text } = values;
    const response = await request.post('/danmaku/create', {
      data: {
        content: text,
      },
    });
    if (response) {
      form.setFieldValue('text', '');
      message.success('弹幕发送成功');
      setProcessing(false);
      console.log(response);
    }
  };
  return (
    <div
      style={{
        flex: '1',
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        paddingTop: '50px',
      }}
    >
      <div style={{ fontSize: '2rem', fontWeight: 500 }}>下方输入弹幕</div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '75%',
          marginTop: '100px',
        }}
      >
        <Form style={{ width: '60%' }} form={form}>
          <div style={{ position: 'relative', padding: '0 8px 8px 8px' }}>
            <Form.Item
              style={{ marginBottom: '0px' }}
              name="text"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Message cannot be empty',
                },
              ]}
            >
              <TextArea
                autoSize={{ minRows: 1, maxRows: 4 }}
                style={{
                  resize: 'none',
                  padding: '8px',
                  height: '40px',
                  maxHeight: '200px',
                }}
                onPressEnter={handleSendMessage}
              />
            </Form.Item>
            {isProcessing ? (
              <Spin
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '20px',
                  fontSize: '2rem',
                }}
                spinning={isProcessing}
              />
            ) : (
              <MyIcon
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  fontSize: '2rem',
                }}
                type="icon-send"
                onClick={handleSendMessage}
              />
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}
