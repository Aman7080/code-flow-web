import Image from "next/image";
import { createClient, createPreviewSubscriptionHook } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import { PortableText as PortableTextComponent } from "@portabletext/react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {a11yDark} from "react-syntax-highlighter/dist/cjs/styles/prism";

import { config } from "./config";
import GetImage from "@utils/getImage";

if (!config.projectId) {
  throw Error("The Project ID is not set. Check your environment variables.");
}
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const imageBuilder = (source) =>
  createImageUrlBuilder(config).image(source);

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

// Barebones lazy-loaded image component
const ImageComponent = ({ value }) => {
  // const {width, height} = getImageDimensions(value)
  return (
    <Image
      {...GetImage(value)}
      blurDataURL={GetImage(value).blurDataURL}
      objectFit="cover"
      sizes="(max-width: 800px) 100vw, 800px"
      alt={value.alt || " "}
      placeholder="blur"
      loading="lazy"
    />
  );
};

const components = {
  types: {
    image: ImageComponent,
    code: (props) => {
      return (
        <>
          <SyntaxHighlighter language={props.value.language} style={a11yDark} codeTagProps={{style: {fontSize:"15px"}}}>
          {props.value.code}
          </SyntaxHighlighter>
        </>
      );
    },
  },
  marks: {
    center: (props) => <div className="text-center">{props.children}</div>,
    highlight: (props) => (
      <span className="font-bold text-brand-primary">{props.children}</span>
    ),
    link: (props) => {
      return (
        <a href={props?.value?.href} target="_blank" rel="noreferrer">
          {props.children}
        </a>
      );
    },
  },
};

// Set up Portable Text serialization
export const PortableText = (props) => (
  <PortableTextComponent components={components} {...props} />
);

export const client = createClient(config);

export const previewClient = createClient({
  ...config,
  useCdn: true,
});

export const getClient = (usePreview) => (usePreview ? previewClient : client);
export default client;
