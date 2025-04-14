'use client';

const albums = [
    {
        title: 'Illmatic',
        artist: 'Nas'
    },
    {
        title: 'Currents',
        artist: 'Tame Impala'
    },
    {
        title: 'Discovery',
        artist: 'Daft Punk'
    },
    {
        title: 'Is This It',
        artist: 'The Strokes'
    },
    {
        title: '1999',
        artist: 'Joey Bada$$'
    },
    {
        title: 'Madvillainy',
        artist: 'Madvillain, Madlib, MF DOOM'
    },
    {
        title: 'Norman Fucking Rockwell!',
        artist: 'Lana Del Rey'
    },
    {
        title: 'In Rainbows',
        artist: 'Radiohead'
    },
    {
        title: 'Metallica',
        artist: 'Metallica'
    },
    {
        title: 'Without Warning',
        artist: '21 Savage, Offset, Metro Boomin'
    },
    {
        title: 'Starboy',
        artist: 'The Weeknd'
    },
    {
        title: 'Visions',
        artist: 'Grimes'
    },
    {
        title: 'Souvlaki',
        artist: 'Slowdive'
    },
    {
        title: 'Playboi Carti',
        artist: 'Playboi Carti'
    },
    {
        title: 'Disintegration',
        artist: 'The Cure'
    },
    {
        title: 'Demon Days',
        artist: 'Gorillaz'
    },
    {
        title: 'Evil Empire',
        artist: 'Rage Against the Machine'
    },
    {
        title: 'Rodeo',
        artist: 'Travis Scott'
    },
    {
        title: 'Favourite Worst Nightmare',
        artist: 'Arctic Monkeys'
    },
    {
        title: 'MM..FOOD',
        artist: 'MF DOOM'
    },
    {
        title: 'Stankonia',
        artist: 'Outkast'
    },
    {
        title: 'Random Access Memories',
        artist: 'Daft Punk'
    },
    {
        title: 'OK Computer',
        artist: 'Radiohead'
    },
    {
        title: 'Nevermind',
        artist: 'Nirvana'
    },
    {
        title: 'Room on Fire',
        artist: 'The Strokes'
    },
    {
        title: 'Astroworld',
        artist: 'Travis Scott'
    },
    {
        title: 'Did you know that there\'s a tunnel under Ocean Blvd',
        artist: 'Lana Del Rey'
    },
    {
        title: 'Plastic Beach',
        artist: 'Gorillaz'
    },
    {
        title: 'Bleach',
        artist: 'Nirvana'
    },
    {
        title: 'Black Holes and Revelations',
        artist: 'Muse'
    },
    {
        title: 'Big Fish Theory',
        artist: 'Vince Staples'
    },
    {
        title: 'Saturation II',
        artist: 'BROCKHAMPTON'
    },
    {
        title: 'Melodrama',
        artist: 'Lorde'
    },
    {
        title: 'Heroes & Villains',
        artist: 'Metro Boomin'
    },
    {
        title: 'good kid, m.A.A.d city',
        artist: 'Kendrick Lamar'
    },
    {
        title: 'The Slow Rush',
        artist: 'Tame Impala'
    },
    {
        title: 'Rumours',
        artist: 'Fleetwood Mac'
    },
    {
        title: 'Around the Fur',
        artist: 'Deftones'
    },
    {
        title: 'Lullabies to Paralyze',
        artist: 'Queens of the Stone Age'
    },
    {
        title: 'IGOR',
        artist: 'Tyler, the Creator'
    },
];


export default function AlbumCollage() {
    const getImagePath = (title) => {
        const formattedTitle = title
            .replace(/[^\w\s]/g, '')
            .replace(/\s+/g, '')
            .toLowerCase();
        return `/images/fav_albums/${formattedTitle}.png`;
    };

    return (
        <div>
            <h3 className="text-xl font-heading font-extrabold text-primary mb-4">Favourite Albums</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
                {albums.map((album, index) => (
                    <div key={index} className="relative group">
                        <div className="aspect-square">
                            <img
                                src={getImagePath(album.title)}
                                alt={`${album.artist} - ${album.title}`}
                                className="w-full h-full object-cover transition-all duration-300 rounded-lg hover:scale-105"
                            />
                        </div>

                        <div className="absolute hidden sm:flex flex-col -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-white p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-xs rounded-md whitespace-nowrap border border-gray-200 w-auto min-w-[120px] max-w-[300px] pointer-events-none">
                            <p className="font-semibold text-center text-wrap" title={album.title}>{album.title}</p>
                            <p className="text-gray-600 dark:text-gray-300 text-center text-wrap" title={album.artist}>{album.artist}</p>
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-800 dark:border-t-gray-200"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}