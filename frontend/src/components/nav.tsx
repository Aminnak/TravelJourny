import EarthSvg from "../cards/EarthCard"
import SearchCard from "../cards/SearchCard"

const Nav = () => {
    // creating the list items in navbar dinamically
    const NavListItemTitles = ['Hotel','Flight','Train','Travel','Car Rental']
    const NavListItems = NavListItemTitles.map((title ,index)=> (
        <li
            key={index}
            className="hover:text-neutral-400 hover:cursor-pointer hover:scale-97 duration-300 max-md:hidden"
        >
            {title}
        </li>
    ))

  return (
    // Navbar which include three parts (icon and navigation links, search bar, login and sign up buttons)
    <nav className="flex justify-between items-center w-full text-slate-50 px-5 mt-3">
        {/*  first part: icon and navigation links */}
        <div className="flex">
            <ul className="flex justify-center items-center w-full font-semibold list-none space-x-7">
                <li className="flex items-center group space-x-1 hover:scale-97 duration-300">
                    <span className="w-[35px] ">
                        <EarthSvg />
                    </span>
                    <h3 className="group-hover:text-neutral-400 duration-300 max-lg:hidden">Horiza</h3>
                </li>
                {NavListItems}
            </ul>
        </div>
        {/*  second part: search bar */}
        <div className="flex justify-center items-center w-1/4 bg-gray-50/50 rounded max-md:hidden">
            <input
                placeholder="Serach destination..."
                className="
                    w-full rounded py-1.5 px-3 placeholder:text-stone-100
                    focus:outline-1 focus:outline-gray-100"
            />
            <span className="px-1 md:hidden">
                <SearchCard />
            </span>
            <span className="px-1 md:block">
                <SearchCard />
            </span>
        </div>
        {/*  third part: login and sign up buttons */}
        <div className="flex space-x-6">
            <button className="font-medium text-lg">
                Log In
            </button>
            <button className="bg-gray-100 text-black rounded-md py-1.5 px-3 font-medium">
                Sign Up
            </button>
        </div>
    </nav>
  )
}

export default Nav
