/*  
    원시 타입 
    type O interface X
*/

type Address = string;

const address: Address = '서울시 노원구';

// interface Address = string; => 불가능

/*
    유니온 타입
    type O interface X
*/

type Phone = string | number;

const phone: Phone = 12345678;

// interface Phone = string | number; => 불가능

// type은 모든 타입 선언 가능, interface는 객체(object)에 대한 타입 선언만 가능

type UserProps = {
  name: string;
  age: number;
  createdAt: Date;
};

/*
    Omit 사용하여 특정 값 제외
    type O > interface O
*/

type OmitProps = Omit<UserProps, 'name' | 'age'>; // name, age 제외
// interface OmitProps extends Omit<UserProps, 'name' | 'age'> {}
const omit: OmitProps = { createdAt: new Date() };

/*
    Partial
    모든 타입 옵셔널 하게 사용 가능
*/

type PartialProps = Partial<UserProps>;
// interface PartialProps extends Partial<UserProps, 'name' | 'age'> {}
const partial: PartialProps = { age: 27 }; // name, age, createdAt 3개중 optional

/*
    Pick
    특정 타입 선택하여 사용
*/

type PickProps = Pick<UserProps, 'name' | 'age'>; // age, name 두 가지 선택
//interface PickProps extends Pick<UserProps, 'name' | 'age'> {}
const pick: PickProps = { age: 27, name: 'Kim' };

/*
    Tuples
    type O > interface O
*/

type AddressProps = [number, string];
/* interface AddressProps extends Array<number | string>{
    0: number;
    1: string;
} */

const addresss: AddressProps = [2, 'Other St.'];

/*
    extracting type
    특정 값 추출
*/

const project = {
  title: 'Project 1',
  specification: {
    areaSize: 1000,
    room: 3,
  },
} as const; // 고정 값으로 변경 가능

type Specification = (typeof project)['specification']; // or typeof project.specification

/*
    타입 중복 선언
    type X interface O
*/

/* type User = {
  name: string;
  age: number;
};

type User = {
  role: string;
};

=> 불가능
*/

interface User {
  name: string;
  age: number;
}

interface User {
  role: string;
}

let user: User = {
  name: 'Kim',
  age: 27,
  role: 'FE',
}; // interface로 선언한 타입은 중복 선언 및 병합 가능

type User1 = {
  name: string;
  age: number;
};

type User2 = User1 & {
  role: string;
}; // type alias는 이렇게 병합

/*
    use with Class
    type O interface O
*/

type TUser = {
  name: string;
  age: number;
};

interface IUser {
  name: string;
  age: number;
}

class Users implements TUser {
  // type interface 둘다 가능
  name: string;
  age: number;

  constructor(name: string, age: number) {
    (this.name = name), (this.age = age);
  }
}
