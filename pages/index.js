import { NextSeo } from "next-seo";
import Layout from "@components/layout";
import Container from "@components/container";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "@lib/sanity";
import defaultOG from "../public/img/opengraph.jpg";
import { homePostquery, configQuery } from "@lib/groq";
import GetImage from "@utils/getImage";
import PostList from "@components/postlist";

export default function Post(props) {
  const { postdata, siteconfig, preview } = props;

  const router = useRouter();

  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined,
  });
  const ogimage = siteConfig?.openGraphImage
    ? GetImage(siteConfig?.openGraphImage).src
    : defaultOG.src;
  return (
    <>
      {postdata && siteConfig && (
        <Layout {...siteConfig}>
          <NextSeo
            title={`${siteConfig?.title}`}
            description={siteConfig?.description || ""}
            canonical={siteConfig?.url}
            openGraph={{
              url: siteConfig?.url,
              title: `${siteConfig?.title}`,
              description: siteConfig?.description || "",
              images: [
                {
                  url: ogimage,
                  width: 800,
                  height: 600,
                  alt: "",
                },
              ],
              site_name: "Coding Flow",
            }}
            twitter={{
              cardType: "summary_large_image",
            }}
          />

          {/* Adding elements here _______________________________*/}
          {/* <section className=" flex-col justify-center items-start p-0 min-h-screen mx-auto my-0 max-w-4xl">
            <div className="transition delay-100 block">
              <h1 className=" text-cyan-300 font-medium font-mono mb-7 ml-1 leading-3">Hi, my name is</h1>
            </div>
            <div className="transition delay-200 block">
              <h2 className=" text-4xl text-slate-300 font-bold m-0">Aman Kumar</h2>
            </div>
            <div className="transition delay-300 block" >
              <h3 className="text-4xl text-slate-400 font-semibold mt-3">I have started building things for the web.</h3>
            </div>
            <div className="transition delay-400" >
              <p className=" max-w-lg font-sans leading-4 font-light mt-8">
                I’m a software engineer specializing in building (and
                occasionally designing) exceptional digital experiences.
                Currently, I’m focused on building accessible, human-centered
                products at{" "}
                <a
                  href="https://upstatement.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Upstatement
                </a>
                .
              </p>
            </div>
            <div className="transition delay-500" >
              <a
                className="email-link"
                href="https://www.newline.co/courses/build-a-spotify-connected-app"
                target="_blank"
                rel="noreferrer"
              >
                Check out my course!
              </a>
            </div>
          </section> */}

          <Container>
            <div className="grid gap-10 lg:gap-10 md:grid-cols-2 ">
              {postdata.slice(0, 2).map((post) => (
                <PostList
                  key={post._id}
                  post={post}
                  aspect="landscape"
                  preloadImage={true}
                />
              ))}
            </div>
            <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
              {postdata.slice(2).map((post) => (
                <PostList key={post._id} post={post} aspect="square" />
              ))}
            </div>
          </Container>
        </Layout>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(homePostquery());
  const config = await getClient(preview).fetch(configQuery);
  return {
    props: {
      postdata: post,
      // categories: categories,
      siteconfig: { ...config },
      preview,
    },
    revalidate: 10,
  };
}
