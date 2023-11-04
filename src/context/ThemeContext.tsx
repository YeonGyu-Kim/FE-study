/*
Context Provider 처럼 children을 props로 전달할 경우에는 
use client가 하위 컴포넌트들에게 영향을 주지 않는다.
*/

'use client';

type Props = {
  children: React.ReactNode;
};

export default function ThemeContextProvider({ children }: Props) {
  return <div>{children}</div>;
}
