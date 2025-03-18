import { SubmitHandler , useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import EarthSvgCard from "../iconCards/EarthCard"
import HomeCard from "../iconCards/HomeCard"
import wayToHeaven  from "../assets/images/wayToHeaven.jpg"

interface formInterface {
    email : string;
    password : string;
}

const Signup = () => {
    const { register , handleSubmit , formState : { errors,isSubmitting }} = useForm<formInterface>();
    const onFormSubmit : SubmitHandler<formInterface> =async (data) => {
        await new Promise<void>((resolve) => setTimeout(resolve,1000));
        console.log(data);
    }

    const Location = useLocation()
    const Navigate = useNavigate()
    const PathnameStatus = Location.pathname === '/sign-up' ? true : false // if the route is at sign up then true if at login then flase

    const Fonts = {
        RobotoFont : {fontFamily: "Roboto, sans-serif"},
        ShigaBrushFont : {fontFamily: 'Shiga Brush, sans-serif'}
    }
    const pageTexts = {
        buttonText : PathnameStatus ? 'Sign up' : 'Login',
        titleText : PathnameStatus ? `Welcome to Journey.com - Let's create your account for free` :
        `Welcome to Journey.com - Let's log you in and explore together`,
        routerGuide : {
            firstText : PathnameStatus ? "Don't you have an account?" : 'Already have an account?',
            secondText : PathnameStatus ? 'Log in' : 'Sign up'
        }
    }

    const Navigator = (route : string) => {
        Navigate(route)
    }

  return (

    <>
    <div className="md:hidden flex justify-center py-4 px-5 text-white ">
        <a  onClick={() => Navigator('/home')} className="w-[30px] h-[30px]"><HomeCard color='#022f2e'/></a>
    </div>
    <section className="flex space-x-3 h-screen "  style={Fonts.RobotoFont}>
        <div className="flex flex-col justify-center items-center lg:w-5/9 w-full rounded-lg ">
            <div className="w-[600px] max-sm:w-[450px] rounded-md ">
                <div className="flex w-full mb-6">
                    <span className="text-2xl rounded-lg w-[60px] h-[60px]"><EarthSvgCard color='#022f2e '/></span>
                </div>
                <div className="flex flex-col space-y-0.5 border-b border-b-gray-300/80 pb-8">
                    <h2 className="text-xl font-bold">Get started</h2>
                    <div className="flex justify-between">
                        <h3 className="text-gray-500/60">{pageTexts.titleText}</h3>
                        <a onClick={() => Navigator('/home')} className="w-[25px] h-[25px] max-md:hidden"><HomeCard color='#022f2e'/></a>
                    </div>
                </div>
                <form className="flex flex-col mt-8 space-y-6" onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="" className="font-semibold">Email</label>
                        <input type="email" {...register("email" , {required : "Email is required"})} className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-teal-800" placeholder="example@gmail.com"/>
                        {errors.email && <div className="text-red-600">{errors.email?.message}</div>}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <div className="flex justify-between">
                            <label htmlFor="" className="font-semibold">Password</label>
                            <h3 className="font-semibold">Forgot?</h3>
                        </div>
                        <input type="password" {...register("password" , {
                            required : "Password is required",
                            ...(PathnameStatus && {
                                    pattern : {
                                        value : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                        message : 'Password must be at least 8 characters long and include at least one letter and one number'
                                    }
                                }
                            )
                        })} className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-teal-800" placeholder={'\u2022'.repeat(6)}/>
                        {errors.password && <div className="text-red-600">{errors.password.message}</div>}
                    </div>
                    <div className="flex flex-col justify-center text-center">
                        <button disabled={isSubmitting} type="submit" className="w-full py-3 px-4 font-bold rounded-md bg-teal-950 text-slate-100">{isSubmitting ? 'Loading' : pageTexts.buttonText}</button>
                        <p className="mt-4">{pageTexts.routerGuide.firstText}<span className="font-semibold text-teal-950 hover:cursor-pointer" onClick={() => Navigator(PathnameStatus ? '/login' : '/sign-up')}> {pageTexts.routerGuide.secondText}</span></p>
                    </div>
                </form>
            </div>
        </div>
        <div className="w-4/9 justify-center  bg-cover bg-center hidden lg:flex" style={{backgroundImage : `url(${wayToHeaven})`}}>
            <div className="flex flex-col w-full py-8 px-12 space-y-6" style={Fonts.ShigaBrushFont}>
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
