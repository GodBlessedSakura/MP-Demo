import styles from './index.less';
import { Button, message } from 'antd';
import { history, Outlet } from 'umi';

export default function Give() {
  return (
    <div className={styles.wrapper}>
      <Button onClick={() => message.success('出餐成功')}>出餐</Button>
    </div>
  );
}
