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
    _id ,image , name , bio , username
  } ,
  description ,
  image ,
  views ,
  category,
    pitch
}`)


export const STARTUP_VIEW_QUERY = defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id , 
  views
  }`)

  export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
    *[_type == "author" && id == $id][0]{
        _id,
        id,
        name,
        username,
        email,
        image,
        bio
    }
    `);
  export const AUTHOR_BY_ID_QUERY = defineQuery(`
    *[_type == "author" && _id == $id][0]{
        _id,
        id,
        name,
        username,
        email,
        image,
        bio
    }
    `);

    export const STARTUP_BY_AUTHOR_QUERY = defineQuery(`*[_type == "startup" && author._ref == $id] | order(_createdAt desc){
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
    