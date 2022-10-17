import { groq } from "next-sanity";

export const postquery = groq`
*[_type == "post"] | order(_createdAt desc) {
  ...,
  author->,
  categories[]->
}
`;

export const homePostquery = ()=>{
  return groq`
*[_type == "post"]| order(_createdAt desc) {
  ...,
  author->,
  categories[]->
}[0...2]
`};

export const codesquery = groq`
*[_type == "codes"] | order(_createdAt desc) {
  ...,
  author->,
  categories[]->
}
`;

export const configQuery = groq`
*[_type == "siteconfig"][0] {
  ...,
}
`;

export const singlequery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ...,
  author->,
  categories[]->,
  "estReadingTime": round(length(pt::text(body)) / 5 / 180 ),
  'comments': *[
    _type == "comment" && 
    post._ref == ^._id && 
    approved == true] {
_id, 
name, 
email, 
comment, 
_createdAt
},
}
`;

export const singleCodequery = groq`
*[_type == "codes" && slug.current == $slug][0] {
  ...,
  author->,
  categories[]->,
  "estReadingTime": round(length(pt::text(body)) / 5 / 180 ),
  'comments': *[
    _type == "comment" && 
    post._ref == ^._id && 
    approved == true] {
_id, 
name, 
email, 
comment, 
_createdAt
},
}
`;


export const pathquery = groq`
*[_type == "post"] {
  'slug': slug.current,
}
`;

export const codePathquery = groq`
*[_type == "codes"] {
  'slug': slug.current,
}
`;

export const authorsquery = groq`
*[_type == "author"] {
 ...
}
`;

// test below
// to delete later

export const listquery = groq`
*[_type == "listing"] | order(_createdAt desc) [$start..$end] {
  ...,
  category->
 }
`;

export const productquery = groq`
*[_type == "listing" && slug.current == $slug][0] {
  ...,
  category-> {
    ...,
    enqform->,
    vendorform->
  }
 }
`;
