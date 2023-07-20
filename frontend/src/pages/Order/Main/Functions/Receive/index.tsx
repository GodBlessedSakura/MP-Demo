import styles from './index.less';
import { Button, message } from 'antd';
import { history, Outlet } from 'umi';

export default function Receive() {
  return (
    <div className={styles.wrapper}>
      <Button onClick={() => message.success('收餐成功')}>收餐</Button>
    </div>
  );
}
