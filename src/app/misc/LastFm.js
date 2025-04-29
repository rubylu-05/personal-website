'use client';

import { useEffect, useState } from 'react';

function LastFm() {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const lastFmResponse = await fetch('/api/lastfm');
                const lastFmData = await lastFmResponse.json();
                const lastFmArtists = lastFmData?.topartists?.artist?.slice(0, 20) || [];

                const enhancedArtists = await Promise.all(
                    lastFmArtists.map(async (artist) => {
                        try {
                            const deezerProxyResponse = await fetch(
                                `/api/deezer?artist=${encodeURIComponent(artist.name)}`
                            );
                            const deezerData = await deezerProxyResponse.json();

                            return {
                                ...artist,
                                imageUrl: deezerData.picture_small || '/default-artist.png'
                            };
                        } catch (e) {
                            console.error(`Deezer error for ${artist.name}:`, e);
                            return {
                                ...artist,
                                imageUrl: '/default-artist.png'
                            };
                        }
                    })
                );

                setArtists(enhancedArtists);
            } catch (error) {
                console.error('Fetch error:', error);
                setError('Failed to load artist data');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <p className="font-body font-light">Loading music data...</p>;
    }

    if (error) {
        return <p className="font-body font-light">{error}</p>;
    }

    return (
        <div className="mb-12">
            <h3 className="text-xl font-heading font-extrabold text-[var(--primary)] mb-4">Top artists this week</h3>
            {artists.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                    {artists.map((artist, index) => (
                        <div
                            key={`${artist.name}-${index}`}
                            className="sm:hover:scale-105 transition-all bg-background dark:bg-darkBackground2 px-4 py-2 pl-2 border border-primary dark:border-darkSecondary flex items-center whitespace-nowrap text-[var(--primary)]"
                        >
                            <div className="w-6 h-6 mr-2 flex items-center justify-center border border-primary dark:border-darkSecondary">
                                <img
                                    src={artist.imageUrl}
                                    alt={artist.name}
                                    className="w-6 h-6 object-contain"
                                    onError={(e) => {
                                        e.target.src = '/default-artist.png';
                                    }}
                                />
                            </div>
                            <span className="font-body font-medium text-sm">{artist.name}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="font-body font-light">Couldn't load music data at the moment.</p>
            )}
        </div>
    );
}

export default LastFm;