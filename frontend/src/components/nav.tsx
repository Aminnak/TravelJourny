import EarthSvg from "../cards/earthCard"
import SearchCard from "../cards/searchCard"

const Nav = () => {

    const NavListItemTitles = ['Hotel','Flight','Train','Travel','Car Rental']
    const NavListItems = NavListItemTitles.map((title ,index)=> (
        <li key={index} className="hover:text-neutral-400 hover:cursor-pointer hover:scale-97 duration-300">{title}</li>
    ))

  return (
    <nav className="flex justify-between items-center w-full text-slate-50 px-5 mt-3">
        <div className="flex">
            <ul className="flex justify-center items-center w-full font-semibold list-none space-x-7">
                <li className="flex items-center group space-x-1">
                    <span className="w-[35px] ">
                        <EarthSvg />
                    </span>
                    <h3 className="group-hover:text-neutral-400 duration-300">Horiza</h3>
                </li>
                {NavListItems}
            </ul>
        </div>
        <div className="flex justify-center items-center w-1/4 bg-gray-50/50 rounded">
            <input className="w-full rounded  py-1.5 px-3 placeholder:text-stone-100 focus:outline-1 focus:outline-gray-100" placeholder="Serach destination..."/>
            <span className="px-1">
                <SearchCard />
            </span>
        </div>
        <div className="flex space-x-6">
            <button className="font-medium text-lg">Log In</button>
            <button className="bg-gray-100 text-black rounded-md py-1.5 px-3 font-medium">Sign Up</button>
        </div>
    </nav>
  )
}

export default Nav
