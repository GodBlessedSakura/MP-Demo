import styles from './index.less';
import { Button, message } from 'antd';
import { history, Outlet } from 'umi';

export default function Receive() {
  return (
    <div className={styles.wrapper}>
      <h2>推荐餐品</h2>
    </div>
  );
}
