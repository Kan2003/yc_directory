import {defineQuery} from 'next-sanity'

export const STARTUP_QUERY = defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || category match $search || auth->name match $search || title match $search] | order(_createdAt desc){
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


export const STARTUP_BY_ID_QUERY = defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id ,
    _createdAt,
  title ,
  slug ,
  author -> {
    _id ,image , name , bio
  } ,
  description ,
  image ,
  views ,
  category,
    pitch
}`)