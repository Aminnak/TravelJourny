export interface DataInterface {
    id: number;
    userProfile : string;
    userName : string;
    publishedDate : string;
    journeyTitle : string;
    journeyLocation : string;
    journeyDescription : string;
    journeyImage : string;
}

const Data : Array<DataInterface> = [
    {
        id: 1,
        userProfile : '/favProfile.jpg',
        userName : 'aminnak',
        publishedDate : '15 years ago',
        journeyTitle : 'my beloving Germany Tour',
        journeyLocation : '📍 Neuschwanstein Castle, Germany',
        journeyImage : '/sample.jpg',
        journeyDescription : `
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi dolore odio sapiente
                                    quam saepe, vero neque autem provident incidunt voluptas soluta porro error sunt ullam
                                    odit officia magni cupiditate ut! Magni enim unde aperiam error ducimus officiis tempori
                                    bus tempora quo blanditiis eligendi voluptatum nisi cumque, sint ipsa qui fuga! Voluptatum
                                    iusto doloribus consequuntur corrupti sapiente fugit perferendis obcaecati. Placeat tenetur
                                    magni non nulla dolorum iure exercitationem similique provident quae iusto.
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, provident?
                                    Cum quis, id numquam rerum assumenda obcaecati commodi officiis ab voluptatibus dolorem mollitia.
                                    Exercitationem minima facilis repellat architecto quod sapiente iure vitae quidem eveniet pariatur
                                    excepturi explicabo iusto sit soluta labore optio et, laudantium, similique quasi rem neque tempore.
                                    Non mollitia, quaerat quae sapiente tempore deleniti consectetur quam inventore, ex cumque atque
                                    architecto veniam sequi explicabo saepe error iste numquam?
        `,

    },
    {
        id: 2,
        userProfile : '/favProfile.jpg',
        userName : 'Fiona',
        publishedDate : '2 years ago',
        journeyTitle : "Hallstatt: Austria's Hidden Gem",
        journeyLocation : '📍 Hallstatt, Austria 🇦🇹',
        journeyImage : '/sample2.jpg',
        journeyDescription : `vero neque autem provident incidunt voluptas soluta porro error sunt ullam
                                    odit officia magni cupiditate ut! Magni enim unde aperiam error ducimus officiis tempori
                                    bus tempora quo blanditiis eligendi voluptatum nisi cumque, sint ipsa qui fuga! Voluptatum
                                    iusto doloribus consequuntur corrupti sapiente fugit perferendis obcaecati. Placeat tenetur
                                    magni non nulla dolorum iure exercitationem similique provident quae iusto.
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, provident?
                                    Cum quis, id numquam rerum assumenda obcaecati commodi officiis ab voluptatibus dolorem mollitia.
                                    Exercitationem minima facilis repellat architecto quod sapiente iure vitae quidem eveniet pariatur
                                    excepturi explicabo iusto sit soluta labore optio et
        `,

    },
    // {
    //     id: 3,
    //     userProfile : '',
    //     userName : '',
    //     publishedDate : '',
    //     journeyTitle : '',
    //     journeyLocation : '',
    //     journeyDescription : '',
    //     journeyImage : '',

    // }
];
export default Data;
