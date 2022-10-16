import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "@components/layout";
import Container from "@components/container";
import Comments from "@components/comments";
import Form from "@components/form";
import { useRouter } from "next/router";
import client, {
  getClient,
  usePreviewSubscription,
  PortableText,
} from "@lib/sanity";
import ErrorPage from "next/error";
import GetImage from "@utils/getImage";
import { parseISO, format } from "date-fns";
import { NextSeo } from "next-seo";
import defaultOG from "/public/img/opengraph.jpg";

import { singleCodequery, configQuery, codePathquery } from "@lib/groq";
import CategoryLabel from "@components/blog/category";
import AuthorCard from "@components/blog/authorCard";

export default function Code(props) {
  const { codedata, siteconfig, preview } = props;

  const router = useRouter();
  const { slug } = router.query;


  if (!router.isFallback && !codedata?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const AuthorimageProps = codedata?.author?.image
    ? GetImage(codedata.author.image)
    : null;

  const ogimage = siteconfig?.openGraphImage
    ? GetImage(siteconfig?.openGraphImage).src
    : defaultOG.src;

  return (
    <>
      {codedata && siteconfig && (
        <Layout {...siteconfig}>
          <NextSeo
            title={`${codedata.title} - ${siteconfig.title}`}
            description={codedata.excerpt || ""}
            canonical={`${siteconfig?.url}/codes/${codedata.slug.current}`}
            openGraph={{
              url: `${siteconfig?.url}/codes/${codedata.slug.current}`,
              title: `${codedata.title} - ${siteconfig.title}`,
              description: codedata.excerpt || "",
              site_name: siteconfig.title,
            }}
            twitter={{
              cardType: "summary_large_image",
            }}
          />
          <Container className="!pt-0">
            <div className="max-w-screen-md mx-auto ">
              <div className="text-center">
                <CategoryLabel categories={codedata.categories} />
              </div>

              <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
                {codedata.title}
              </h1>

              <div className="flex justify-center mt-3 space-x-3 text-gray-500 ">
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0 w-10 h-10">
                    {AuthorimageProps && (
                      <Image
                        src={AuthorimageProps.src}
                        blurDataURL={AuthorimageProps.blurDataURL}
                        loader={AuthorimageProps.loader}
                        objectFit="cover"
                        alt={codedata?.author?.name}
                        placeholder="blur"
                        layout="fill"
                        className="rounded-full"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-400">
                      {codedata.author.name}
                    </p>
                    <div className="flex items-center space-x-2 text-sm">
                      <time
                        className="text-gray-500 dark:text-gray-400"
                        dateTime={codedata?.publishedAt || codedata._createdAt}
                      >
                        {format(
                          parseISO(codedata?.publishedAt || codedata._createdAt),
                          "MMMM dd, yyyy"
                        )}
                      </time>
                      <span>· {codedata.estReadingTime || "5"} min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>

          {/* {post?.mainImage && <MainImage image={post.mainImage} />} */}
          <Container>
            <article className="max-w-screen-md mx-auto ">
              <div className="mx-auto my-3 prose prose-base dark:prose-invert prose-a:text-blue-500">
                {codedata.body && <PortableText value={codedata.body} />}
              </div>
              <div>
                <Comments comments={codedata.comments} />
                <Form _id={codedata._id} />
              </div>
              <div className="flex justify-center mt-7 mb-7">
                <Link href="/">
                  <a className="px-5 py-2 text-sm text-blue-600 rounded-full dark:text-blue-500 bg-brand-secondary/20 ">
                    ← View all codes
                  </a>
                </Link>
              </div>
              {codedata.author && <AuthorCard author={codedata.author} />}
            </article>
          </Container>
        </Layout>
      )}
    </>
  );
}



export async function getStaticProps({ params, preview = false }) {
  const code = await getClient(preview).fetch(singleCodequery, {
    slug: params.slug,
  });

  const config = await getClient(preview).fetch(configQuery);

  return {
    props: {
      codedata: { ...code },
      siteconfig: { ...config },
      preview,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const allCodes = await client.fetch(codePathquery);
  return {
    paths:
      allCodes?.map((page) => ({
        params: {
          slug: page.slug,
        },
      })) || [],
    fallback: true,
  };
}
