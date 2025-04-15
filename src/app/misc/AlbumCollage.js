'use client';

import { useEffect, useState } from 'react';

export default function AlbumCollage() {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        fetch('/data/albums.json')
            .then(response => response.json())
            .then(data => setAlbums(data))
            .catch(error => console.error('Error loading albums data:', error));
    }, []);

    if (albums.length === 0) {
        return <div>Loading albums...</div>;
    }

    return (
        <div>
            <h3 className="text-xl font-heading font-extrabold text-primary mb-4">Favourite Albums</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
                {albums.map((album, index) => (
                    <div key={index} className="relative group">
                        <div className="aspect-square">
                            <img
                                src={album.image}
                                alt={`${album.artist} - ${album.title}`}
                                className="w-full h-full object-cover transition-all duration-300 rounded-lg hover:scale-105"
                            />
                        </div>

                        <div className="absolute hidden sm:flex flex-col -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-xs rounded-md whitespace-nowrap w-auto min-w-[120px] max-w-[300px] pointer-events-none shadow-[0_0_30px_15px_rgba(175,139,106,0.15)]">
                            <p className="font-bold font-heading text-sm text-center text-wrap leading-tight" title={album.title}>{album.title}</p>
                            <p className="font-extralight text-center text-wrap" title={album.artist}>{album.artist}</p>
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-secondary"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}