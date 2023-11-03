'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Button() {
  const [pending, setPending] = useState(true);

  return (
    <button
      onClick={() => console.log('Hello Word')}
      /*
        tailwind에서는 먼저 선언 된 것이 적용된다. (ex. bg 색상을 두 번 작성하면 첫번 째 색상 적용)
      */
      //className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rouned bg-amber-300'
      /*
        twMerge를 사용하면 마지막에 선언한 것이 적용된다. (ex. bg 색상을 두 번 작성하면 두번 째 색상 적용)
      */
      //className={twMerge(
      //  'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rouned bg-amber-300'
      //)}
      className={twMerge(`bg-amber-900 ${pending && 'bg-blue-500'}`)}
    >
      Click Me
    </button>
  );
}
