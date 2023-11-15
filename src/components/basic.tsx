'use client';

import { useEffect, useState } from 'react';

export default function Basic() {
  /* const [state, setState] = useState(0);
  console.log('state', state);
  // 0 1 1 출력
  // 0 1 차례대로 출력 이후 state가 변경 되었음으로 한번 더 출력
  useEffect(() => {
    setState(1);
  }, [state]); */

  const [state, setState] = useState(0);
  // console.log('state', state);
  // 0 1 0 1 출력
  // 0 1 출력 이후 cleanup 함수에서의 0 출력
  // 이후 state가 변경 되었음으로 1 한번 더 출력
  // cleanup 함수는 컴포넌트가 없어질 때(unmount) 호출

  /*  useEffect(() => {
    setState(1);
    return () => {
      console.log('cleanup', state); // 컴포넌트가 없어질 때 해야하는 일들 정의 가능
    };
  }, [state]); */
  // dependency array가 있다면 dependency가 변경 될 때마다 cleanup 함수도 같이 호출됨
  return <div></div>;
}
