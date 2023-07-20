import styles from './index.less';
import { Button, message } from 'antd';
import { history, Outlet } from 'umi';

export default function History() {
  return <div className={styles.wrapper}>历史订单</div>;
}
