import Link from "next/link";
import React from "react";
import { Button } from "../interface/CustomButton";
import Image from "next/image";

export default function Header() {
  return (
    <div className='bg-gradient-to-r from-gray-900 via-neutral-800 to-rose-900 w-full'>
      <div className=' border-gray-200 mx-auto py-4 w-5/6'>
        <div className='flex flex-wrap justify-between items-center mx-auto'>
          <Link href='/' className='flex items-center'>
            <Image
              src='/logo.png'
              alt='YT Data Scraper'
              className='md:w-44 w-36'
              width={300}
              height={200}
            />
          </Link>
          <div className='flex items-center lg:order-2'>
            <Link href='/about'>
              <Button text='About Me' addStyles='w-28 md:w-24 h-10' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
