import axios from "axios"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { postAPI } from "../components/Journey"
import UserJourney from "../components/UserJourneyTemplate"

const TravelJourney = () => {
    const [posts , setPosts] = useState<postAPI[]>([])
    const {id} = useParams()
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let allResults : postAPI[] = []
                let url : string = 'http://localhost:8000/api/posts/'
                while (url) {
                    const response = await axios.get(url);
                    allResults = [...allResults, ...response.data.results];
                    url = response.data.next; // move to the next page if available
                }

                setPosts(allResults)
            } catch (err : unknown) {
                console.log(err)
            }
        }
        fetchPosts()
    },
    [])
    const post = posts.find(post => post.id === Number(id))
  return (
    <>
      {post ? (
        <UserJourney
            google_map_link={post.google_map_link}
            user_profile={post.user_profile}
            username={post.username}
            published_at={post.published_at}
            title={post.title}
            location={post.location}
            picture={post.picture}
            description={post.description}
            year={post.id}
            id={post.id}
            key={post.id}
        />
      ) : (
        <p>Post not found</p>
      )}
    </>
  )
}

export default TravelJourney
