/*
크키가 큰 써드파티 라이브러리를 사용하거나
데이터를 서버에서 가져온다거나 
상황에 따라 서버 컴포넌트로 사용할 수 있다.
*/

'use client';

import { z } from 'zod';
import { Range } from 'react-date-range';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(5, '비밀번호는 최소 5자리 입니다'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 같아야 합니다.',
    path: ['confrimPassword'],
  });

type SignupSchema = z.infer<typeof signUpSchema>;

export default function Post() {
  /* 
  보통 화면의 높이를 설정할 때 vh를 사용한다
  vh는 viewport height로 스크린 크기에 맞게 height가 결정된다.
  하지만 모바일 브라우저에 따라 viewport가 다르기 때문에 화면이 짤리는 경우가 있다 (ex. safari)
  vh 종류로는 svh (Short Viewport Height),  lvh (Large Viewport Height), dvh (Dynamic Viewport Height)가 있다.
  해당 브라우저의 viewport에 맞게 설정해 주려면 dvh를 사용해주면 된다. (너비인 vw도 동일하게 사용 가능)
  */

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    getValues,
  } = useForm<SignupSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} type='email' placeholder='Email' />
      <input {...register('password')} type='password' placeholder='Password' />
      {errors.password && <div>{errors.password.message}</div>}
      <input
        {...register('confirmPassword')}
        type='password'
        placeholder='ConfirmPassword'
      />
      <button type='submit'>제출</button>
    </form>
  );
}
