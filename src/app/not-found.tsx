import Image from "next/image";
import Link from "next/link";

export default function NotFoundRoot() {
  return (
    <div className='flex flex-col w-full items-center justify-center pt-52 md:pb-64 pb-72 overflow-hidden bg-gradient-to-r from-gray-900 via-neutral-800 to-rose-900'>
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
      <div className=' text-slate-200'>
        <h1 className=' font-extrabold text-8xl'>404</h1>
        <div className=' font-semibold text-center'>Page not found</div>
      </div>
      <Link href='/' className='mt-8 z-20'>
        <button className='flex items-center mx-auto text-white bg-gradient-to-r from-slate-700 to-pink-600 hover:from-slate-800 hover:to-pink-800 border-0 py-2 px-8 focus:outline-none rounded-3xl md:text-lg text-sm'>
          Go Back Home
        </button>
      </Link>
    </div>
  );
}
