import { client } from '@/sanity/lib/client'
import { STARTUP_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard from './StartupCard'

interface StartupCardtype {
    _id: string;
    title: string;
    slug: string;
    _createdAt: string;
    author: {
      _id: string;
      image: string;
      name: string;
      bio: string;
    };
    description: string;
    image: string;
    views: number;
    category: string;
  }

const UserStartups = async({id} : {id : string}) => {
    const startups = await client.fetch(STARTUP_BY_AUTHOR_QUERY, {id})
  return (
    <>
    {startups.length > 0 ? startups.map((startup : StartupCardtype) => (
        <StartupCard key={startup._id} post={startup} />
    )) : <p className='no-result'>No posts yet</p>}
    </>
  )
}

export default UserStartups
