import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUP_QUERY } from "@/sanity/lib/queries";

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

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;


  // this is normal method to fetch data 
  // const posts = await client.fetch(STARTUP_QUERY);

  // this is the new to show the updated data without relaoding 
  const {data: posts} = await sanityFetch({ query: STARTUP_QUERY });
 

  // static data 
  // const posts = [
  //   {
  //     _createdAt: new Date(),
  //     views: 55,
  //     author: { _id: 1 , name  : "kanha Vishwakarma"},
  //     _id: 1,
  //     description: "this si ssssssss",
  //     image:
  //       "https://cdn.pixabay.com/photo/2025/02/17/16/04/dog-9413394_1280.jpg",
  //     category: "Robots",
  //     title: "We Robots",
  //   },
  // ];
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your StartUp <br /> connect with Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold"></p>
        {query ? `search results for ${query}` : "All StartUps"}

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post : StartupCardtype , index : number) => (
              <StartupCard key={post?._id} post={post}/>
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive/>
    </>
  );
}
