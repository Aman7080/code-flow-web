import Container from "@components/container";
import Layout from "@components/layout";
import { getClient } from "@lib/sanity";
import { configQuery } from "@lib/groq";
import Image from "next/image";
import Link from "next/link";
import imageeg from "../public/img/opengraph.jpg";
import { myLoader } from "@utils/all";

export default function About({ siteconfig }) {
  return (
    <Layout {...siteconfig}>
      <Container>
        <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
          About
        </h1>
        <div className="text-center">
          <p className="text-lg">We are a small passionate team.</p>
        </div>

        <div className="grid grid-cols-6  mt-6 mb-12 md:mt-16 md:mb-20 md:gap-16">
          <div className="col-start-2 col-span-4">
            <Image
              src={imageeg}
              loader={myLoader}
              alt="image"
              layout="responsive"
              objectFit="cover"
              sizes="(max-width: 320px) 100vw, 320px"
            />
          </div>
        </div>

        <div className="mx-auto prose text-center dark:prose-invert mt-10">
          <p>
            We provide real-time connectivity to enable software providers and
            financial institutions to build integrated products for their small
            business customers.
          </p>
          <p>
            Our API infrastructure is leveraged by clients ranging from lenders
            to corporate card providers and business forecasting tools, with use
            cases including automatic reconciliation, business dashboarding, and
            loan decisioning.
          </p>
          <p>
            <Link href="/contact">Get in touch</Link>
          </p>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const config = await getClient(preview).fetch(configQuery);
  return {
    props: {
      siteconfig: { ...config },
      preview,
    },
    revalidate: 100,
  };
}
