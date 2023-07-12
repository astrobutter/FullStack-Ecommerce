// import { SanityClient } from "@sanity/client";           ->kinda depreciated
import { createClient } from "next-sanity";
// import { ImageUrlBuilder } from "next-sanity-image";     ->kinda depreciated
import imageUrlBuilder from '@sanity/image-url'


export const client = createClient({
    projectId:'rbev1nvc',
    dataset:'production',
    apiVersion:'2023-04-09',
    useCdn:true,
    //sanity token is a sensitive piece of data that shouldn't be made public easily, that's why it should be saved in a .env file for maintaining security
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
//allows for using images stored in sanity 
// const builder = ImageUrlBuilder(client);

const builder = imageUrlBuilder(client)
//allows access to images stored in the url
export const urlFor = (source) => builder.image(source);