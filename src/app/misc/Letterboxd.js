'use client';

import { useEffect, useState } from 'react';

function Letterboxd() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/letterboxd');
                const data = await response.json();
                
                if (data.error) {
                    throw new Error(data.error);
                }
                
                setMovies(data.slice(0, 10));
            } catch (error) {
                console.error('Fetch error:', error);
                setError('Failed to load movie data');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <p className="font-body font-light">Loading movie data...</p>;
    }

    if (error) {
        return <p className="font-body font-light text-red-500">{error}</p>;
    }

    return (
        <div>
            <h3 className="text-xl font-heading font-extrabold text-primary mb-4">Recently watched movies</h3>
            <div className="space-y-3">
                {movies.length > 0 ? (
                    movies.map((movie, index) => (
                        <div 
                            key={`${movie.title}-${index}`} 
                            className="bg-light2 dark:bg-gray-800 px-4 py-3 rounded-lg flex items-center"
                        >
                            <div className="w-8 h-8 rounded mr-3 flex-shrink-0 overflow-hidden">
                                {movie.image ? (
                                    <img
                                        src={movie.image}
                                        alt={movie.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = '/default-movie.png';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                        <span className="text-xs">No image</span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <span className="font-body font-medium">{movie.title}</span>
                                <span className="font-body font-light text-xs block">{movie.year}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="font-body font-light">No recently watched movies found.</p>
                )}
            </div>
        </div>
    );
}

export default Letterboxd;