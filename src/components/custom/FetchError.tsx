import Image from "next/image";
import Link from "next/link";
import { GiAlienBug } from "react-icons/gi";

interface ErrorProps {
  message: string;
  error: string;
}

export default function FetchError({ message, error }: Readonly<ErrorProps>) {
  return (
    <div className='flex flex-col w-full items-center justify-center md:pt-24 md:pb-52 pt-36 pb-52 overflow-hidden bg-gradient-to-r from-gray-900 via-neutral-800 to-rose-900'>
      <div id='Polygon-1'>
        <Image
          src='/icon404_1.png'
          alt='page not found'
          width={180}
          height={203}
        />
      </div>
      <div id='Polygon-2'>
        <Image
          src='/icon404_2.png'
          alt='page not found'
          width={180}
          height={203}
        />
      </div>
      <div id='Polygon-3'>
        <Image
          src='/icon404_2.png'
          alt='page not found'
          width={180}
          height={203}
        />
      </div>
      <div id='Polygon-4'>
        <Image
          src='/icon404_1.png'
          alt='page not found'
          width={180}
          height={203}
        />
      </div>
      <div id='Polygon-5'>
        <Image
          src='/icon404_1.png'
          alt='page not found'
          width={180}
          height={203}
        />
      </div>
      <div className='flex flex-col items-center justify-center'>
        <div className='space-y-4 bg-gradient-to-t from-neutral-700 to-slate-900 md:p-16 p-8 border-4 border-rose-300'>
          <h1 className=' font-extrabold text-8xl text-slate-50'>
            <GiAlienBug />
          </h1>
          <h1 className='lg:text-4xl text-xl font-bold text-slate-50'>
            Oops!! {message}
          </h1>
          <p className='lg:text-lg text-sm text-gray-50'>
            This is an error page. Please try again.
          </p>
          <p className='text-rose-300 italic font-medium'>{error}</p>
        </div>
      </div>
      <Link href='/' className='mt-8 z-20'>
        <button className='flex items-center mx-auto text-white bg-gradient-to-r from-slate-700 to-pink-600 hover:from-slate-800 hover:to-pink-800 border-0 py-2 px-8 focus:outline-none rounded-3xl md:text-lg text-sm'>
          Go Back
        </button>
      </Link>
    </div>
  );
}
