import Head from "next/head";
import React from "react";

type Props = {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogImage?: string;
  ogImageType?: string;
  ogImageWidth?: string;
  ogImageHeight?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  ogUrl?: string;
};

const CustomHead = ({
  title = "Workspace | Digitalize invoices with AI",
  description = "An All-in-All Software Development Company in Bangladesh that Transforms Ideas into Technology",
  ogTitle = "Workspace | Digitalize invoices with AI",
  ogDescription = "An All-in-All Software Development Company in Bangladesh that Transforms Ideas into Technology",
  ogType = "website",
  // ogImage = '',
  // ogImageType = 'image/png',
  // ogImageHeight = '2000',
  // ogImageWidth = '2000',
  // twitterCard = 'summary_large_image',
  // twitterSite = '@Workspace',
  // twitterCreator = '@Workspace',
  // twitterTitle = 'Workspace | Digitalize invoices with AI',
  // twitterDescription = "An All-in-All Software Development Company in Bangladesh that Transforms Ideas into Technology",
  // twitterImage = '',
  ogUrl,
}: Props) => {
  return (
    <Head>
      <meta charSet="utf-8" />

      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="apple-touch-icon" sizes="150x150" href="/mstile-150x150.png" />

      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1f1f1f" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#1f1f1f" />

      <title>{title}</title>

      <meta name="description" content={description} />

      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content={ogType} />
      {ogUrl != null ? <meta property="og:url" content={ogUrl} /> : null}
      {ogUrl != null ? <link rel="canonical" href={ogUrl} /> : null}

      {/* <meta property="og:image" content={`${ogImage}`} itemProp="image" />

      <meta property="og:image:type" content={ogImageType} />
      <meta property="og:image:height" content={ogImageHeight} />
      <meta property="og:image:width" content={ogImageWidth} /> */}

      {/* <meta property="fb:app_id" content="1733127810177735" />
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:image" content={`https://${twitterImage}`} /> */}
    </Head>
  );
};

export default CustomHead;
