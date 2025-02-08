import earthIcon from '../assets/images/globe.png'

export default function Header(): JSX.Element {
    return (
        <header>
            <img src={earthIcon} alt="globe icon" />
            <h1>my travel journal.</h1>
        </header>
    )
}
