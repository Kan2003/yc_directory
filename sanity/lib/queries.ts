import {defineQuery} from 'next-sanity'

export const STARTUP_QUERY = defineQuery(`*[_type == "startup" && defined(slug.current)] | order(_createdAt desc){
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id,
    image,
    name,
    bio
  },
  description,
  image,
  views,
  category
}`)