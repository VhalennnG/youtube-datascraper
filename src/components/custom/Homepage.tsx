"use client";
import { extractYouTubeID } from "@/data/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsRocketTakeoff } from "react-icons/bs";
import { toast } from "react-toastify";

export default function Homepage() {
  const [link, setLink] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const videoId = extractYouTubeID(link);
    if (videoId) {
      router.push("/datascrape/" + videoId);
    } else {
      toast.error("Invalid YouTube link", {
        theme: "dark",
        position: "top-center",
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <section className='text-gray-600 body-font relative w-full'>
      <div className='container lg:px-5 md:py-28 py-24 mx-auto w-5/6'>
        <div className='flex flex-col text-center w-full lg:mb-12'>
          <div className='md:text-5xl text-xl font-extrabold title-font mb-4 text-slate-50'>
            Extract YouTube Video Data
          </div>
          <div className='mx-auto text-slate-50 leading-relaxed md:text-xl text-base font-medium'>
            Extract Data From Any YouTube Video, quickly and easily!
          </div>
        </div>
        <div className='mx-auto'>
          <div className='flex flex-wrap justify-center'>
            <div className='p-2 lg:w-1/2 w-full'>
              <form action='' onSubmit={handleSubmit}>
                <div className=' bg-white rounded-lg lg:p-8 p-4 flex flex-col md:ml-auto w-full my-10 md:mt-0 relative z-10 shadow-md'>
                  <div className='relative mb-4'>
                    <label
                      htmlFor='message'
                      className='leading-7 text-sm font-semibold text-gray-600'>
                      Youtube Video URL
                    </label>
                    <input
                      type='text'
                      id='url'
                      name='url'
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder='https://www.youtube.com/watch?...'
                      className='w-full bg-white rounded border border-gray-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                      required
                    />
                  </div>
                </div>
                <button
                  type='submit'
                  className='flex items-center mx-auto text-white bg-gradient-to-r from-slate-700 to-pink-600 hover:from-slate-800 hover:to-pink-800 border-0 py-2 px-8 focus:outline-none rounded-3xl text-lg'>
                  <span className='mr-2'>Scrape</span>
                  <BsRocketTakeoff />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
