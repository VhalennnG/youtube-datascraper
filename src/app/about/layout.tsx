import SEO from "@/components/custom/SEO";

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <SEO
        title='YT Datascraper'
        description="Hi I'm Vhalen G. I'm a freelance web developer based in Indonesia. I'm a 100% self-taught engineer, a fast learner, and a detail-oriented creator. My passion is to work with extremely talented people collaborate to make products that would make an immediate impact."
        keywords='YT Datascraper'
        author='Vhalentino Gamgenora'
        image='/v.png'
        url='https://ytdatascraper.vercel.app'
        siteName='https://ytdatascraper.vercel.app'
      />
      {children}
    </main>
  );
}
