// Pic , country , publisher , title , description , date posted , likes ,publisher profile
import { useEffect, useState } from 'react'

import UserJourney from './UserJourneyTemplate'
import axios from 'axios'

interface postAPI {
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
    // const [loading , setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/posts/', {withCredentials : true})
                console.log(res)
                setPosts(res.data.results)
            } catch (err) {
                console.log(err)
            }finally {
                // setLoading(false)
            }
        }
        fetchPosts()
    },[])


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
            </div>
        </section>
    </>
  )
}

export default Journey
