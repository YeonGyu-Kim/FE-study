/*
'use client';
페이지 최상단에 클라이언트 컴포넌트로 지정했을 때에는
import한 컴포넌트들도 클라이언트 컴포넌트가 된다. (하위 컴포넌트가 서버 컴포넌트여도)
이럴경우 클라이언트/서버 컴포넌트 나누는 의미가 없어짐
*/

import TestButton from '@/components/testButton';
import { Button } from '../components/button';
import Post from '../components/post';
import Basic from '@/components/basic';
import TabsDemo from '@/components/ui/tab';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center gap-y-5 p-24'>
      <h1>Home Page</h1>
      {/* <Button>Enter</Button> */}
      <TestButton color='secondary' variant='contained'>
        Enter
      </TestButton>
      <Post />
      <Basic />
      <TabsDemo />
    </main>
  );
}
