// Pic , country , publisher , title , description , date posted , likes ,publisher profile
import Data from '../cards/Data'
import UserJourney from './UserJourney'

const Journey = () => {
    const RobotoFont = {
        fontFamily: "Roboto, sans-serif",
    }

    const UserPosts = Data.map(data => (
        <UserJourney
            key={data.id}
            id={data.id}
            userProfile={data.userProfile}
            userName={data.userName}
            publishedDate={data.publishedDate}
            journeyTitle={data.journeyTitle}
            journeyLocation={data.journeyLocation}
            journeyImage={data.journeyImage}
            journeyDescription={data.journeyDescription}

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
