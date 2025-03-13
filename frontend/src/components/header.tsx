import valley from '../assets/images/valley.jpg'
import Nav from './nav'

const Header = () => {
  return (
    <div className='bg-cover bg-center' style={{backgroundImage : `url(${valley})`}}>
        <header className="flex flex-col justify-between items-start h-full w-full bg-black/40 rounded" >
            <Nav />
            <div className='text-white'>some text</div>
            <div className='text-white'>some another text</div>
        </header>
    </div>
  )
}

export default Header
