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

    const getStarRating = (rating) => {
        if (!rating) return null;
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        return (
            <span className="text-secondary text-xs">
                {'★'.repeat(fullStars)}
                {hasHalfStar && '½'}
            </span>
        );
    };

    if (loading) {
        return <p className="font-body font-light">Loading movie data...</p>;
    }

    if (error) {
        return <p className="font-body font-light">{error}</p>;
    }

    return (
        <div>
            <h3 className="text-xl font-heading font-extrabold text-primary mb-4">Recently watched movies</h3>
            <div className="space-y-3">
                {movies.length > 0 ? (
                    movies.map((movie, index) => (
                        <div 
                            key={`${movie.title}-${index}`} 
                            className="bg-light2 px-4 py-3 rounded-lg flex pl-0 pt-0 pb-0"
                        >
                            <div className="w-12 h-16 rounded-md mr-3 flex-shrink-0 overflow-hidden">
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
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                {/* First line - Title and Rating */}
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <span 
                                        className="font-body font-medium truncate mr-2"
                                        title={movie.title}
                                    >
                                        {movie.title}
                                    </span>
                                    {movie.rating && (
                                        <span className="font-body font-medium text-sm whitespace-nowrap">
                                            {getStarRating(movie.rating)}
                                        </span>
                                    )}
                                </div>
                                
                                {/* Second line - Year and Watched Date */}
                                <div className="flex justify-between items-baseline">
                                    <span className="font-body font-light text-xs">
                                        {movie.year}
                                    </span>
                                    <span className="font-body font-light text-xs whitespace-nowrap">
                                        Watched {movie.watchedDate}
                                    </span>
                                </div>
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