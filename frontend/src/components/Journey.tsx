// Pic , country , publisher , title , description , date posted , likes ,publisher profile
import { useEffect, useState } from 'react'

import UserJourney from './UserJourneyTemplate'
import axios from 'axios'

export interface postAPI {
    id : number;
    title : string;
    description : string;
    google_map_link : string;
    username : string;
    picture : string;
    published_at : string;
    location : string;
    year : number;
    user_profile : string;
}

const Journey = () => {
    const RobotoFont = {
        fontFamily: "Roboto, sans-serif",
    }

    const [posts , setPosts] = useState<postAPI[]>([])
    const [nextUrl , setNextUrl] = useState<string>()
    // const [loading , setLoading] = useState<boolean>(true)

    const fetchPosts = async (url : string) => {
        try {
            const res = await axios.get(url, {withCredentials : true})
            console.log(res)
            setPosts(prev => [...prev , ...res.data.results])
            setNextUrl(res.data.next)
        } catch (err) {
            console.log(err)
        }finally {
            // setLoading(false)
        }
    }
    useEffect(() => {
        fetchPosts('http://localhost:8000/api/posts/')
    },[])

    const loadMore = () => {
        if(nextUrl){
            fetchPosts(nextUrl)
        }
    }

    const UserPosts = posts.map(post => (
        <UserJourney
            key={post.id}
            id={post.id}
            user_profile={post.user_profile}
            username={post.username}
            published_at={post.published_at}
            title={post.title}
            location={post.location}
            picture={post.picture}
            description={post.description}
            google_map_link={post.google_map_link}
            year={post.year}

        />
    ))
  return (
    <>
        <section className='flex w-full' style={RobotoFont}>
            <div className="flex flex-col justify-center text-center w-full bg-slate-50/90 rounded mx-6 my-6 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-950 pt-6 pb-4 border-b border-b-gray-500/70 mx-16">
                    What's our journey on this website?
                </h2>
                {UserPosts}
                <div className='flex justify-center items-center py-6'>
                    <button onClick={() => loadMore()} className='bg-black rounded-md text-white py-2 px-4'>More</button>
                </div>
            </div>
        </section>
    </>
  )
}

export default Journey
