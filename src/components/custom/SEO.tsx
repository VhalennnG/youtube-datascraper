import Head from "next/head";
import { NextPage } from "next";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  author?: string;
  image?: string;
  url?: string;
  siteName?: string;
}

const SEO: NextPage<SEOProps> = ({
  title,
  description,
  keywords,
  author,
  image,
  url,
  siteName,
}) => {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      {description && <meta name='description' content={description} />}
      {keywords && <meta name='keywords' content={keywords} />}

      {/* Open Graph / Facebook */}
      <meta property='og:type' content='website' />
      <meta property='og:url' content={url || ""} />
      <meta property='og:title' content={title} />
      {description && <meta property='og:description' content={description} />}
      {image && <meta property='og:image' content={image} />}
      {siteName && <meta property='og:site_name' content={siteName} />}
      <meta property='og:locale' content='Indonesia' />

      {/* Twitter */}
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={url || ""} />
      <meta property='twitter:title' content={title} />
      {description && (
        <meta property='twitter:description' content={description} />
      )}
      {image && <meta property='twitter:image' content={image} />}

      {/* Other Meta Tags */}
      {author && <meta name='author' content={author} />}
      <link rel='canonical' href={url || ""} />
      <meta name='robots' content='index, follow' />

      {/* Additional Meta Tags */}
      <meta name='application-name' content={siteName || "Nama Situs Anda "} />
      <meta http-equiv='content-language' content='Indonesia' />
      <meta name='google-site-verification' content='Indonesia' />
    </Head>
  );
};

export default SEO;
