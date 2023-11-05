/*
크키가 큰 써드파티 라이브러리를 사용하거나
데이터를 서버에서 가져온다거나 
상황에 따라 서버 컴포넌트로 사용할 수 있다.
*/

import { z } from 'zod';
import { Range } from 'react-date-range';

export default function Post() {
  /* 
  보통 화면의 높이를 설정할 때 vh를 사용한다
  vh는 viewport height로 스크린 크기에 맞게 height가 결정된다.
  하지만 모바일 브라우저에 따라 viewport가 다르기 때문에 화면이 짤리는 경우가 있다 (ex. safari)
  vh 종류로는 svh (Short Viewport Height),  lvh (Large Viewport Height), dvh (Dynamic Viewport Height)가 있다.
  해당 브라우저의 viewport에 맞게 설정해 주려면 dvh를 사용해주면 된다. (너비인 vw도 동일하게 사용 가능)
  */
  return <article className='h-[100dvh]'>Post Content</article>;
}
