import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Menu, Space, Input } from 'antd';
import styles from './index.less';
import type { MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import MyIcon from '@/components/Icons';
import request from '@/utils/request';
import { clearTokens } from '@/utils/token';
import { history, useParams } from 'umi';

export default function Nav() {
  const getUserInfo = async () => {
    const response = await request.get('/user/get');
    if (response) {
      console.log(response);
    }
  };
  const handleLogOut = () => {
    clearTokens();
    history.push('/login');
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className={styles.nav}>
      <div className={styles.menu}>
        <Menu>
          <Menu.Item
            key="a"
            onClick={() => {
              history.push('/order/instruct');
            }}
            icon={<MyIcon type="icon-moon" />}
          >
            点餐
          </Menu.Item>
          <Menu.Item
            key="b"
            onClick={() => {
              history.push('/order/history');
            }}
            icon={<MyIcon type="icon-account" />}
          >
            历史订单
          </Menu.Item>
          <Menu.Item
            key="c"
            onClick={() => {
              history.push('/order/danmaku');
            }}
            icon={<MyIcon type="icon-forward" />}
          >
            吐槽墙
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<MyIcon type="icon-logout" />}
            onClick={handleLogOut}
          >
            登出
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
}
