import { Dispatch, SetStateAction, useState } from 'react';
import { Form, Input, Spin, Select, message } from 'antd';
import request from '@/utils/request';
import MyIcon from '@/components/Icons';
import { history } from 'umi';
import styles from './index.less';

const { TextArea } = Input;
const { Option } = Select;

export default function ChatBox(props: chatBoxProps) {
  const [form] = Form.useForm();
  const [isProcessing, setProcessing] = useState<boolean>(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (isProcessing) return;
    const values = await form.validateFields();
    setProcessing(true);
    const { text } = values;
    const response = await request.post('/user/instruct', {
      data: {
        conversation: text,
      },
    });
    if (response) {
      form.setFieldValue('text', '');
      setProcessing(false);
      console.log(response);
      const { flag, additionalInfo } = response;
      switch (flag) {
        case '1':
          message.success('识别为：推荐菜品' + '\n' + additionalInfo);
          history.push('/order/instruct/recommend');
          break;
        case '2':
          message.success('识别为：查看历史订单');
          history.push('/order/instruct/history');
          break;
        case '3':
          message.success('识别为：展示全部商家餐品' + '\n' + additionalInfo);
          history.push('/order/instruct/menu');
          break;
        case '4':
          message.success('识别为：拉黑商家');
          history.push('/order/instruct/dislike');
          break;
        case '5':
          message.success('识别为：出餐');
          history.push('/order/instruct/give');
          break;
        case '6':
          message.success('识别为：收餐');
          history.push('/order/instruct/receive');
          break;
        case '7':
          message.success('识别为：查看弹幕');
          history.push('/order/instruct/danmaku');
          break;
        default:
          message.error('无法识别的指令呢');
          break;
      }
    }
  };

  return (
    <div className={styles.chatbox}>
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
  );
}

interface chatBoxProps {}
