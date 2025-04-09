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
                
                // Always use the topartists data from the response
                const lastFmArtists = lastFmData?.topartists?.artist?.slice(0, 10) || [];
                
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
        return (
            <div className="mb-12">
                <h3 className="text-xl font-body font-extrabold text-primary mb-4">
                    My top artists this week
                </h3>
                <p className="font-body font-light">Loading music data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mb-12">
                <h3 className="text-xl font-body font-extrabold text-primary mb-4">
                    My top artists this week
                </h3>
                <p className="font-body font-light text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="mb-12">
            <h3 className="text-xl font-body font-extrabold text-primary mb-4">
                My top artists this week
            </h3>
            {artists.length > 0 ? (
                <div className="space-y-3">
                    {artists.map((artist, index) => (
                        <div 
                            key={`${artist.name}-${index}`} 
                            className="bg-light2 dark:bg-gray-800 px-4 py-3 rounded-lg flex items-center hover:bg-light3 transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full mr-3 flex-shrink-0 overflow-hidden">
                                <img
                                    src={artist.imageUrl}
                                    alt={artist.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = '/default-artist.png';
                                    }}
                                />
                            </div>
                            <span className="font-body font-medium">{artist.name}</span>
                            {artist.playcount && (
                                <span className="ml-auto text-sm text-gray-500">
                                    {artist.playcount} plays
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="font-body font-light">No artist data available.</p>
            )}
        </div>
    );
}

export default LastFm;