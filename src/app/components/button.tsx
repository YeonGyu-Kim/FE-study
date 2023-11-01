'use client';

export default function Button() {
  return (
    <button
      onClick={() => console.log('Hello Word')}
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rouned'
    >
      Click Me
    </button>
  );
}
