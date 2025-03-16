import { DataInterface } from "../data/Data"
import FullscreenCard from "../iconCards/FullscreenCard"
import GoogleMapLocationCard from "../iconCards/GoogleMapLocationCard"

const UserJourney : React.FC<DataInterface> = ({userProfile , userName , publishedDate ,journeyTitle ,journeyDescription,journeyImage,journeyLocation,googleMapsLink}) => {

  return (
    <div className="flex flex-col space-y-6 px-6 pb-10 border-b border-b-gray-300 my-5 mx-4">
        <div className="flex flex-col lg:flex-row max-lg:space-y-6 lg:space-x-6">
            <div className="relative overflow-hidden lg:w-5/12 rounded group">
                <img src={journeyImage} alt="journey picture" className="rounded h-auto lg:h-[350px] object-cover hover:scale-102 hover:cursor-pointer w-full duration-300" />
                <span className="opacity-0 scale-95 duration-300 w-[25px] h-[25px] absolute group-hover:opacity-100 group-hover:scale-100 right-3 bottom-3"><FullscreenCard /></span>
            </div>
            <div className="flex flex-col justify-between text-left lg:w-7/12 space-y-5">
                <div>
                    <div className="flex max-lg:flex-col-reverse justify-between space-y-5">
                        <div className="flex flex-col max-lg:mt-3">
                            <h2 className="font-semibold text-lg">{journeyTitle}</h2>
                            <h3 className="text-sm font-medium">📍 {journeyLocation}</h3>
                        </div>
                        <div className="flex space-x-2">
                            <span>
                                <img src={userProfile} alt="" className="w-[30px] h-[30px] rounded-full" />
                            </span>
                            <div className="flex flex-col space-y-0.5">
                                <span className="font-semibold pl-1 hover:cursor-pointer">{userName}</span>
                                <h4 className="font-medium">
                                    {publishedDate}
                                </h4>
                            </div>
                        </div>
                    </div>
                    <p className="lg:line-clamp-7 line-clamp-10">
                        {journeyDescription}
                    </p>
                </div>
                <div className="flex justify-end md:justify-between">
                    <a href={googleMapsLink} target="_blank" className="flex items-end"><span className="mr-1 w-[30px] h-[30px]"><GoogleMapLocationCard /></span><span className="text-gray-500/90 hover:text-gray-500/60 duration-300 hover:cursor-pointer underline text-sm">View on Google Maps</span></a>
                    <button className="px-7 py-1.5 rounded-full bg-black text-white max-md:w-full hover:cursor-pointer focus:scale-105 duration-300">More</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserJourney
