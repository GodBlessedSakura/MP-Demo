import styles from './index.less';
import { Button, message } from 'antd';
import { history, Outlet } from 'umi';

export default function History() {
  return (
    <div className={styles.wrapper}>
      <h2>历史订单</h2>
    </div>
  );
}
