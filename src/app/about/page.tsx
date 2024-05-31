import Image from "next/image";
import "./style/custom.css";
import {
  FaTelegram,
  FaGithub,
  FaLinkedin,
  FaDiscord,
  FaGlobe,
} from "react-icons/fa6";
import { ImGoogle3 } from "react-icons/im";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className=' bg-gradient-to-r from-gray-900 via-neutral-800 to-rose-900 w-full'>
      <section className=''>
        <div className='container px-5 md:py-10 py-16 mx-auto'>
          <div className='lg:w-4/5 w-11/12 mx-auto flex flex-wrap'>
            <div className='lg:w-1/2 w-full md:p-16'>
              <div className='bg-gradient-to-t from-neutral-700 to-slate-900 md:p-10 p-8 rounded-lg border-4 border-slate-300'>
                <Image
                  alt='Profile Picture'
                  className='lg:h-auto h-64 object-cover object-center rounded-3xl'
                  src='/vh.png'
                  width={800}
                  height={1000}
                />
              </div>
            </div>
            <div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 items-center content-center'>
              <div className='text-slate-200'>
                <h1 className='lg:text-3xl text-2xl title-font font-medium mb-1'>
                  Vhalentino Gamgenora
                </h1>
                <h2 className='lg:text-sm text-xs title-font tracking-widest'>
                  Web Developer
                </h2>

                <div className='md:my-16 my-10'>
                  <div className='leading-relaxed lg:text-base text-sm'>
                    Hi I'm <span>Vhalen G</span>. I'm a freelance web developer
                    based in Indonesia. I'm a 100% self-taught engineer, a fast
                    learner, and a detail-oriented creator. My passion is to
                    work with extremely talented people collaborate to make
                    products that would make an immediate impact.
                  </div>
                </div>
              </div>
              <div className='flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5'>
                <div className='flex md:flex-row flex-col md:items-center items-start'>
                  <span className='md:mr-3 lg:text-base text-sm text-slate-200 md:mb-0 mb-4'>
                    Find Me :
                  </span>
                  <ul className='wrapper-icon'>
                    <Link href='https://t.me/Vhalen_G' target='_blank'></Link>
                    <li className='icon facebook'>
                      <span className='tooltip'>Telegram</span>
                      <span className='lg:text-2xl text-xl'>
                        <FaTelegram />
                      </span>
                    </li>
                    <Link
                      href='https://www.linkedin.com/in/vhalentino-gamgenora-0b701a221'
                      target='_blank'>
                      <li className='icon twitter'>
                        <span className='tooltip'>LinkedIn</span>
                        <span className='lg:text-2xl text-xl'>
                          <FaLinkedin />
                        </span>
                      </li>
                    </Link>
                    <Link href='mailto:vhalentinog@gmail.com' target='_blank'>
                      <li className='icon instagram'>
                        <span className='tooltip'>Gmail</span>
                        <span className='lg:text-2xl text-xl'>
                          <ImGoogle3 />
                        </span>
                      </li>
                    </Link>
                    <Link
                      href='https://discord.com/users/688687260148957185'
                      target='_blank'>
                      <li className='icon discord'>
                        <span className='tooltip'>Discord</span>
                        <span className='lg:text-2xl text-xl'>
                          <FaDiscord />
                        </span>
                      </li>
                    </Link>
                    <Link href='https://github.com/VhalennnG' target='_blank'>
                      <li className='icon github'>
                        <span className='tooltip'>Github</span>
                        <span className='lg:text-2xl text-xl'>
                          <FaGithub />
                        </span>
                      </li>
                    </Link>
                    <Link
                      href='https://vhalentinogamgenora.com'
                      target='_blank'>
                      <li className='icon website'>
                        <span className='tooltip'>Website</span>
                        <span className='lg:text-2xl text-xl'>
                          <FaGlobe />
                        </span>
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
