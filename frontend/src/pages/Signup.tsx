import { useLocation, useNavigate } from "react-router-dom";
import EarthSvgCard from "../cards/EarthCard"
import wayToHeaven  from "../assets/images/wayToHeaven.jpg"
import HomeCard from "../cards/HomeCard"

const Signup = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const pathnameStatus = location.pathname === '/sign-up' ? true : false // if the route is at sign up then true if at login then flase

    const RobotoFont = {fontFamily: "Roboto, sans-serif"}
    const Italic = {fontFamily: 'Shiga Brush, sans-serif'}
    const pageLogic = {
        buttonText : pathnameStatus ? 'Sign up' : 'Login',
        titleText : pathnameStatus ? `Welcome to Journey.com - Let's create your account for free` :
        `Welcome to Journey.com - Let's log you in and explore together`,
        routerGuide : {
            firstText : pathnameStatus ? "Don't you have an account?" : 'Already have an account?',
            secondText : pathnameStatus ? 'Log in' : 'Sign up'
        }
    }

    let navigateRoute = (route : string) => {
        navigate(route)
    }

  return (

    <>
    <div className="md:hidden flex justify-center py-4 px-5 text-white ">
        <a  onClick={() => navigateRoute('/home')} className="w-[30px] h-[30px]"><HomeCard color='#022f2e'/></a>
    </div>
    <section className="flex space-x-3 h-screen "  style={RobotoFont}>
        <div className="flex flex-col justify-center items-center lg:w-5/9 w-full rounded-lg ">
            <div className="w-[600px] max-sm:w-[450px] rounded-md ">
                <div className="flex w-full mb-6">
                    <span className="text-2xl rounded-lg w-[60px] h-[60px]"><EarthSvgCard color='#022f2e '/></span>
                </div>
                <div className="flex flex-col space-y-0.5 border-b border-b-gray-300/80 pb-8">
                    <h2 className="text-xl font-bold">Get started</h2>
                    <div className="flex justify-between">
                        <h3 className="text-gray-500/60">{pageLogic.titleText}</h3>
                        <a className="w-[25px] h-[25px] max-md:hidden"><HomeCard color='#022f2e'/></a>
                    </div>
                </div>
                <form action="#" className="flex flex-col mt-8 space-y-6">
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="" className="font-semibold">Email</label>
                        <input type="email" className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-teal-800" placeholder="example@gmail.com"/>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <div className="flex justify-between">
                            <label htmlFor="" className="font-semibold">Password</label>
                            <h3 className="font-semibold">Forgot?</h3>
                        </div>
                        <input type="password" className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-teal-800" placeholder="123456"/>
                    </div>
                    <div className="flex flex-col justify-center text-center">
                        <button type="submit" className="w-full py-3 px-4 font-bold rounded-md bg-teal-950 text-slate-100">{pageLogic.buttonText}</button>
                        <p className="mt-4">{pageLogic.routerGuide.firstText}<span className="font-semibold text-teal-950 hover:cursor-pointer"> {pageLogic.routerGuide.secondText}</span></p>
                    </div>
                </form>
            </div>
        </div>
        <div className="w-4/9 justify-center  bg-cover bg-center hidden lg:flex" style={{backgroundImage : `url(${wayToHeaven})`}}>
            <div className="flex flex-col w-full py-8 px-12 space-y-6" style={Italic}>
                <h2 className="text-5xl italic text-teal-950 max-w-[350px]">Share your amazing travel stories with us</h2>
                <div className="flex justify-center w-full text-5xl text-teal-950 max-w-[400px] pl-24">
                    <h2>we're glad to read them</h2>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Signup
