import { useState } from 'react';
import { history } from 'umi';
import { Form, Input, Button } from 'antd';
import request from '@/utils/request';
import styles from './index.less';

export default function SignUp() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    // TODO: 处理登录逻辑
    const { username, password } = values;
    const response = await request.post('/user/create', {
      data: {
        username,
        password,
      },
    });
    if (response) {
      setLoading(false);
      history.push('/login');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles['form-wrapper']}>
        <h3 className={styles.title}>美餐Plus</h3>
        <Form onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please enter a valid username',
              },
              {
                min: 3,
                max: 20,
              },
            ]}
          >
            <Input placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, max: 20 },
            ]}
          >
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>
          <div className={styles['btn-wrapper']}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
            >
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
