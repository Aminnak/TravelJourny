// import valley from '../assets/images/valley.jpg'
import DateCard from '../cards/DateCard'
import ListItem from '../cards/ListItem'
import LocationCard from '../cards/LocationCard'
import UserCard from '../cards/UserCard'
import Nav from './Nav'

const Header = () => {
    const RobotoFont = {
        fontFamily: "Roboto, sans-serif",
    }

  return (

        <header className="flex flex-col justify-between items-start w-full rounded" >
            {/* first part: Navbar */}
            <Nav />
            {/* second part: the title on the center of the center of the header */}
            <div className='flex flex-col justify-center items-center w-full text-white text-center space-y-4 py-16 max-lg:min-h-[500px] min-h-[350px]'>
                <h1 className='max-w-[500px] text-5xl text-gray-200 font-bold font-tahoma'>Discover Your Next Great Adventure</h1>
                <h3 className='max-w-[470px] text-lg text-gray-100/60 font-medium' style={RobotoFont}>
                    Immerse yourself in a extraordinary with us takes you on a journey to uncover the world's hidden gems
                </h3>
            </div>
            {/* third part: the list of items */}
            <div className='w-full md:px-8 px-3'>
                <div className='flex flex-col w-full bg-stone-100/60 rounded-lg my-6 md:px-4 py-6'>
                    {/* title and navigation links */}
                    <div className='flex justify-between items-center max-lg:flex-col max-lg:space-y-6'>
                        <h3 className='text-2xl font-semibold '>
                            Explore people's journeys
                        </h3>
                        <ul className='flex space-x-2.5'>
                            <ListItem
                                backgroundColor='bg-black'
                                title='Personal'
                                textColor='text-slate-100'
                                padding='px-4'
                            />
                            <ListItem title='Cultural'/>
                            <ListItem title='Adventure'/>
                            <ListItem title='Historical'/>
                            <ListItem title='Spiritual'/>
                        </ul>
                    </div>
                    {/* inputs */}
                    <div className='flex w-full gap-4 mt-6 max-lg:flex-wrap max-lg:items-center max-lg:justify-center max-md:flex-col'>
                        <div className='flex flex-col w-3/8 space-y-1 max-lg:w-5/12 max-md:w-full max-md:px-4'>
                            <h4 className='font-semibold text-black/80' style={RobotoFont}>Country</h4>
                            <div className='flex items-center w-full bg-gray-200/60 rounded-md inset-shadow-sm'>
                                <span className='pl-2 pr-1'>
                                    <LocationCard />
                                </span>
                                <input type="text" className='w-full py-3 px-3 focus:outline-none focus:inset-shadow-sm rounded text-gray-700 placeholder:text-gray-700/70' placeholder='United State'/>
                            </div>
                        </div>
                        <div className='flex flex-col w-2/8 space-y-1 max-lg:w-5/12 max-md:w-full max-md:px-4'>
                            <h4 className='font-semibold text-black/80' style={RobotoFont}>Year</h4>
                            <div className='flex items-center w-full bg-gray-200/60 rounded-md inset-shadow-sm'>
                                <span className='pl-2 pr-1'>
                                    <DateCard />
                                </span>
                                <input type="text" className='w-full py-3 px-3 focus:outline-none focus:inset-shadow-sm rounded text-gray-700 placeholder:text-gray-700/70' placeholder='Enter a year (e.g., 2005)'/>
                            </div>
                        </div>
                        <div className='flex flex-col w-3/8 space-y-1 max-lg:w-5/12 max-md:w-full max-md:px-4'>
                            <h4 className='font-semibold text-black/80' style={RobotoFont}>By Publisher</h4>
                            <div className='flex items-center w-full bg-gray-200/60 rounded-md inset-shadow-sm'>
                                <span className='pl-2 pr-1'>
                                    <UserCard />
                                </span>
                                <input type="text" className='w-full py-3 px-3 focus:outline-none focus:inset-shadow-sm text-gray-700 placeholder:text-gray-700/70 rounded' placeholder='Aminnak'/>
                            </div>
                        </div>
                    </div>
                    {/* search button */}
                    <div className='flex justify-end items-center mt-5 mb-2 pr-6'>
                        <button className='bg-black text-white py-2 px-4 rounded-md font-semibold focus:scale-95 duration-300'>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </header>
  )
}

export default Header
