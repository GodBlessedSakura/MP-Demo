import styles from './index.less';
import { Button, message } from 'antd';
import { history, Outlet } from 'umi';

export default function Menu() {
  return (
    <div className={styles.wrapper}>
      <h2>全部菜单</h2>
    </div>
  );
}
