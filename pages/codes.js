
import { NextSeo } from "next-seo";
import Layout from "@components/layout";
import Container from "@components/container";
// import Subpagehero from "@components/sections/subpagehero";
// import Categories from "@components/categories";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "@lib/sanity";
import defaultOG from "../public/img/opengraph.jpg";
import { codesquery, configQuery } from "@lib/groq";
import GetImage from "@utils/getImage";
import CodesList from "@components/codelist";

export default function Code(props) {
  const { codedata, siteconfig, preview } = props;

  const router = useRouter();
  //console.log(router.query.category);

  const ogimage = siteconfig?.openGraphImage
    ? GetImage(siteconfig?.openGraphImage).src
    : defaultOG.src;
  return (
    <>
      {codedata && siteconfig && (
        <Layout {...siteconfig}>
          <NextSeo
            title={`Blog — ${siteconfig?.title}`}
            description={siteconfig?.description || ""}
            canonical={siteconfig?.url}
            openGraph={{
              url: siteconfig?.url,
              title: `Blog — ${siteconfig?.title}`,
              description: siteconfig?.description || "",
              images: [
                {
                  url: ogimage,
                  width: 800,
                  height: 600,
                  alt: "",
                },
              ],
              site_name: "Code Flow",
            }}
            twitter={{
              cardType: "summary_large_image",
            }}
          />
          <Container>
            <h1 className="text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
              Code Bank
            </h1>
            <div className="text-center">
              <p className="mt-2 text-lg">See all Codes written by us</p>
            </div>
            <div className="grid gap-2 mt-10 lg:gap-6 md:grid-cols-3 xl:grid-cols-3 divide-y divide-orange-500">
              {codedata.map((code) => (
                <CodesList key={code._id} codes={code} aspect="square" />
              ))}
            </div>
          </Container>
        </Layout>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const code = await getClient(preview).fetch(codesquery);
  const config = await getClient(preview).fetch(configQuery);

  // const categories = (await client.fetch(catquery)) || null;

  return {
    props: {
      codedata: code,
      // categories: categories,
      siteconfig: { ...config },
      preview,
    },
    revalidate: 10,
  };
}
