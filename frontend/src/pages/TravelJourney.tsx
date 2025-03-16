import { useParams } from "react-router-dom"
import Data from "../data/Data"
import UserJourney from "../components/UserJourneyTemplate"

const TravelJourney = () => {
    const {id} = useParams()
    const post = Data.find(post => post.id === Number(id))
  return (
    <>
      {post ? (
        <UserJourney
            googleMapsLink={post.googleMapsLink}
            userProfile={post.userProfile}
            userName={post.userName}
            publishedDate={post.publishedDate}
            journeyTitle={post.journeyTitle}
            journeyLocation={post.journeyLocation}
            journeyImage={post.journeyImage}
            journeyDescription={post.journeyDescription}
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
