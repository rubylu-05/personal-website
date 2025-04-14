'use client';

import { useEffect, useState, useRef } from 'react';

function Movies() {
    const [movies] = useState([
        {
            title: 'Inglorious Basterds',
            year: '2009',
        },
        {
            title: 'The Fly',
            year: '1986',
        },
        {
            title: 'Mad Max: Fury Road',
            year: '2015',
        },
        {
            title: 'Fantastic Mr. Fox',
            year: '2009',
        },
        {
            title: 'Godzilla Minus One',
            year: '2023',
        },
        {
            title: 'Jaws',
            year: '1975',
        },
        {
            title: 'Possession',
            year: '1980',
        },
        {
            title: 'Perfect Blue',
            year: '1997',
        },
        {
            title: 'Requiem for a Dream',
            year: '2001',
        },
        {
            title: 'Misery',
            year: '1990',
        },
        {
            title: 'Eternal Sunshine of the Spotless Mind',
            year: '2004',
        },
        {
            title: 'The Social Network',
            year: '2010',
        },
        {
            title: 'Re-Animator',
            year: '1985',
        },
        {
            title: 'Prisoners',
            year: '2013',
        },
        {
            title: 'White Chicks',
            year: '2005',
        },
        {
            title: 'Ratatouille',
            year: '2007',
        }
    ]);
    const [offset, setOffset] = useState(0);
    const containerRef = useRef(null);
    const itemRefs = useRef([]);
    const autoScrollInterval = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const componentRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    startAutoScroll();
                } else {
                    stopAutoScroll();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        if (componentRef.current) {
            observer.observe(componentRef.current);
        }

        return () => {
            if (componentRef.current) {
                observer.unobserve(componentRef.current);
            }
            stopAutoScroll();
        };
    }, [movies.length]);

    const startAutoScroll = () => {
        if (autoScrollInterval.current) return;
        if (movies.length === 0) return;

        autoScrollInterval.current = setInterval(() => {
            setOffset(prev => (prev + 1) % movies.length);
        }, 5000);
    };

    const stopAutoScroll = () => {
        if (autoScrollInterval.current) {
            clearInterval(autoScrollInterval.current);
            autoScrollInterval.current = null;
        }
    };

    const nextMovie = () => {
        setOffset(prev => (prev + 1) % movies.length);
        resetAutoScroll();
    };

    const prevMovie = () => {
        setOffset(prev => (prev - 1 + movies.length) % movies.length);
        resetAutoScroll();
    };

    const goToMovie = (index) => {
        setOffset(index);
        resetAutoScroll();
    };

    const resetAutoScroll = () => {
        stopAutoScroll();
        startAutoScroll();
    };

    useEffect(() => {
        if (isHovered) {
            stopAutoScroll();
        } else if (componentRef.current) {
            const observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    startAutoScroll();
                }
            }, { threshold: 0.1 });
            observer.observe(componentRef.current);
            return () => observer.disconnect();
        }
    }, [isHovered]);

    return (
        <div ref={componentRef}>
            <h3 className="text-xl font-heading font-extrabold text-primary mb-4">Favourite Movies</h3>

            <div className="relative">
                <div
                    className="flex items-center"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <button
                        onClick={prevMovie}
                        className="text-secondary hover:text-primary transition-colors p-2 mr-1 absolute left-0 z-10"
                        style={{ transform: 'translateX(-100%)' }}
                        aria-label="Previous movie"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <div className="relative w-full overflow-hidden" style={{ height: '16rem' }}>
                        <div
                            ref={containerRef}
                            className="flex transition-transform duration-500 ease-in-out pl-0"
                            style={{
                                transform: `translateX(${-offset * (itemRefs.current[0]?.offsetWidth + 24)}px)`
                            }}
                        >
                            {movies.map((movie, index) => (
                                <div
                                    key={`${movie.title}-${index}`}
                                    ref={el => itemRefs.current[index] = el}
                                    className="flex-shrink-0 w-40 mx-3 bg-light2 rounded-lg p-3 transition-shadow cursor-pointer first:ml-0"
                                    onClick={() => goToMovie(index)}
                                >
                                    <div className="w-full h-48 rounded-md mb-3 overflow-hidden">
                                        <img
                                            src={`/images/fav_movies/${movie.title.replace(/[^\w\s]/g, '').replace(/\s+/g, '').toLowerCase()}.png`}
                                            alt={movie.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="space-y-0.5">
                                        <div className="flex justify-between items-baseline">
                                            <span
                                                className="font-body font-medium text-sm truncate flex-1"
                                                title={movie.title}
                                            >
                                                {movie.title}
                                            </span>
                                            <span className="font-body font-light text-xs whitespace-nowrap ml-2">
                                                ({movie.year})
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={nextMovie}
                        className="text-secondary hover:text-primary transition-colors p-2 ml-1 absolute right-0 z-10"
                        style={{ transform: 'translateX(100%)' }}
                        aria-label="Next movie"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                <div className="flex justify-center mt-2 space-x-1.5">
                    {movies.map((_, index) => (
                        <button
                            key={`indicator-${index}`}
                            onClick={() => goToMovie(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === offset ? 'bg-primary w-3' : 'bg-secondary opacity-50'}`}
                            aria-label={`Go to movie ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Movies;