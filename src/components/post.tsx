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
import { Calendar, CalendarProps } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
import { useState } from 'react';

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, '비밀번호는 최소 5자리 입니다'),
  confirmPassword: z.string(),
  coNum: z.string(),
  position: z.string(),
});
const organSchema = z.object({
  coNum: z.string(),
  position: z.string(),
});

const formSchema = z
  .object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(5, '비밀번호는 최소 5자리 입니다.'),
    confirmPassword: z.string(),
    dates: z.date({
      required_error: '날짜를 선택하세요',
      description: '설명',
    }),
    /*     dates: z.object({
      from: z.date(),
      to: z.date(),
    }), */
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호를 확인하세요.',
    path: ['confirmPassword'],
  });

type SignupSchema = z.infer<typeof signUpSchema> & z.infer<typeof organSchema>;

const OrgamSchema = signUpSchema.merge(organSchema.partial());

const FullSchema = OrgamSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: '비밀번호가 같아야 합니다.',
    path: ['confrimPassword'],
  }
);

export default function Post() {
  /* 
  보통 화면의 높이를 설정할 때 vh를 사용한다
  vh는 viewport height로 스크린 크기에 맞게 height가 결정된다.
  하지만 모바일 브라우저에 따라 viewport가 다르기 때문에 화면이 짤리는 경우가 있다 (ex. safari)
  vh 종류로는 svh (Short Viewport Height),  lvh (Large Viewport Height), dvh (Dynamic Viewport Height)가 있다.
  해당 브라우저의 viewport에 맞게 설정해 주려면 dvh를 사용해주면 된다. (너비인 vw도 동일하게 사용 가능)
  */

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

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

  const onSubmit = (data: z.infer<typeof FullSchema>) => {
    console.log(data);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      dates: undefined,
      /*  dates: {
        from: undefined,
        to: undefined,
      }, */
    },
  });

  const email = watch('email');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const coNum = watch('coNum');
  const position = watch('position');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email')}
        type='email'
        placeholder='Email'
        value={email}
      />
      <input
        {...register('password')}
        type='password'
        placeholder='Password'
        value={password}
      />
      {errors.password && <div>{errors.password.message}</div>}
      <input
        {...register('confirmPassword')}
        type='password'
        placeholder='ConfirmPassword'
        value={confirmPassword}
      />
      <input
        {...register('coNum')}
        type='text'
        placeholder='coNum'
        value={coNum}
      />
      <input
        {...register('position')}
        type='text'
        placeholder='Position'
        value={position}
      />
      <button type='submit'>제출</button>
    </form>
    /*     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='이름' {...field} type='text' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='이메일' {...field} type='email' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='비밀번호' {...field} type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>ConfirmPassword</FormLabel>
              <FormControl>
                <Input placeholder='비밀번호 확인' {...field} type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='dates'
          render={({ field }) => (
            <FormItem>
              <FormMessage />
              <Popover open={isOpen} onOpenChange={toggleOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-[280px] justify-start text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {field.value ? (
                      format(field.value, 'yyyy-MM-dd', { locale: ko })
                    ) : (
                      <span>날짜 선택</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    defaultMonth={field.value}
                    selected={field.value}
                    onSelect={field.onChange}
                    onDayClick={toggleOpen}
                    locale={ko}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
       <FormField
          control={form.control}
          name='dates'
          render={({ field }) => (
            <FormItem>
              <FormLabel>ConfirmPassword</FormLabel>
              <FormMessage />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-[280px] justify-start text-left font-normal',
                      !field.value.from && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {field.value.from ? (
                      field.value?.to ? (
                        <>
                          {format(field.value?.from, 'LLL dd, y')}{' '}
                          {format(field.value?.to, 'LLL dd, y')}
                        </>
                      ) : (
                        format(field.value?.from, 'LLL dd, y')
                      )
                    ) : (
                      <span>Select your dates</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='range'
                    defaultMonth={field.value.from}
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        /> 
        <Button type='submit'>Submit</Button>
      </form>
    </Form> */
  );
}
