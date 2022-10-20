import React from "react";
import Script from "next/script";
import Head from "next/head";
import { NextSeo } from "next-seo";
import GetImage from "@utils/getImage";
import Navbar from "@components/navbar";
// import defaultOG from "../public/img/og-default.jpg";

import Footer from "@components/footer";
// import PopupWidget from "../components/popupWidget";

export default function Layout(props) {
  const { children } = props;
  const ogimage = GetImage(props?.openGraphImage)?.src ?? "";
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://cdn.sanity.io/" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io//" />
      </Head>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.url}
        openGraph={{
          url: props.url,
          title: props.title,
          description: props.description,
          images: [
            {
              url: ogimage,
              width: 800,
              height: 600,
              alt: props.title,
            },
          ],
          site_name: props.title,
        }}
        twitter={{
          handle: "@metalovia",
          site: "@metalovia",
          cardType: "summary_large_image",
        }}
      />

      <div className="antialiased text-gray-800 dark:bg-gray-900 dark:text-gray-200">
        <Navbar {...props} />
        <div>{children}</div>
        <Footer {...props} />
      </div>
    </>
  );
}
