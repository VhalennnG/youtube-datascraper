import Homepage from "@/components/custom/Homepage";
import SEO from "@/components/custom/SEO";
import Waves from "@/components/interface/Waves";

export default function Home() {
  return (
    <main className=' pb-20'>
      <SEO
        title='YT Datascraper'
        description='Extract Data From Any YouTube Video, quickly and easily!'
        keywords='YT Datascraper'
        author='Vhalentino Gamgenora'
        image='/v.png'
        url='https://ytdatascraper.vercel.app'
        siteName='https://ytdatascraper.vercel.app'
      />
      <Waves />
      <Homepage />
    </main>
  );
}
