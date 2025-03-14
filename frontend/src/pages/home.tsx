import Header from "../components/Header"
import valley from '../assets/images/valley.jpg'
import Journey from "../components/Journey"

const home = () => {
  return (
    <div className='bg-cover bg-center bg-fixed' style={{backgroundImage : `url(${valley})`}}>
        <div className="bg-black/40">
            <Header />
            <Journey />
        </div>
    </div>
  )
}

export default home
