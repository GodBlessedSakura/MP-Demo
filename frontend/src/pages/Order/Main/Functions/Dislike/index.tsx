import styles from './index.less';
import { history, Outlet } from 'umi';

export default function Dislike() {
  return (
    <div className={styles.wrapper}>
      <h2>拉黑商家</h2>
    </div>
  );
}
