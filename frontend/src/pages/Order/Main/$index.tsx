import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'umi';
import request from '@/utils/request';
import { Dispatch, SetStateAction } from 'react';
import ChatBox from './ChatBox';
import styles from './index.less';

export default function Main(props: mainProps) {
  return (
    <div className={styles.main}>
      <ChatBox />
      <Outlet />
    </div>
  );
}

type mainProps = {};
