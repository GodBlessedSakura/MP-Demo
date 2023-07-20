import styles from './index.less';
import { history, Outlet } from 'umi';
import { useEffect, useState } from 'react';
import request from '@/utils/request';

export default function Danmaku() {
  const [danmakuContents, setDanmakus] = useState([]);
  const initDanmakus = async () => {
    const response = await request.get('/danmaku/get_all');
    if (response) {
      const { danmakus } = response;
      setDanmakus(danmakus);
    }
  };
  useEffect(() => {
    initDanmakus();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2>弹幕</h2>
      {danmakuContents.map((item: any) => item.content + ' ')}
    </div>
  );
}
