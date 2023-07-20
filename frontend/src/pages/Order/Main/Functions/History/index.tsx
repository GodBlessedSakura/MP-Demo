import styles from './index.less';
import { Button, message } from 'antd';
import { history, Outlet } from 'umi';

export default function History() {
  return (
    <div className={styles.wrapper}>
      <h2 style={{ margin: '20px', fontSize: '2rem' }}>历史订单</h2>
    </div>
  );
}
