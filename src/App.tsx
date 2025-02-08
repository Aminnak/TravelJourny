import Header from './components/Header';
import Entry from './components/Entry';
import data from './data/data';

export interface EntryProps {
    id: number;
    img: { src: string; alt: string };
    country: string;
    title: string;
    text: string;
    googleMapsLink: string;
    dates: string;
}


export type EntryComponentProps = Omit<EntryProps, 'id'>;

export default function App() {
    return (
        <>
            <Header />
            <main className="container">
                {data.map((entry: EntryProps): JSX.Element => {
                    const { id, ...entryProps } = entry;
                    return (
                        <Entry
                            key={id}
                            {...entryProps}
                        />
                    );
                })}
            </main>
        </>
    );
}
