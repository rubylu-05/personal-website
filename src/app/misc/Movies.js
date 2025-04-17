'use client';

import { useEffect, useState, useRef } from 'react';

function Movies() {
    const [movies, setMovies] = useState([]);
    const [offset, setOffset] = useState(0);
    const containerRef = useRef(null);
    const itemRefs = useRef([]);
    const autoScrollInterval = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const componentRef = useRef(null);

    useEffect(() => {
        fetch('/data/movies.json')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error loading movies data:', error));
    }, []);

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

    if (movies.length === 0) {
        return <div>Loading movies...</div>;
    }

    return (
        <div ref={componentRef}>
            <h3 className="text-xl font-heading font-bold text-primary mb-4">Favourite Movies</h3>

            <div className="relative">
                <div
                    className="flex items-center"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <button
                        onClick={prevMovie}
                        className="text-primary hover:text-secondary transition-all p-2 mr-1 absolute left-0 z-10"
                        style={{ transform: 'translateX(-100%)' }}
                        aria-label="Previous movie"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <div className="relative w-full overflow-hidden" style={{ height: '17rem' }}>
                        <div
                            ref={containerRef}
                            className="flex transition-all pl-0"
                            style={{
                                transform: `translateX(${-offset * (itemRefs.current[0]?.offsetWidth + 24)}px)`
                            }}
                        >
                            {movies.map((movie, index) => (
                                <div
                                    key={`${movie.title}-${index}`}
                                    ref={el => itemRefs.current[index] = el}
                                    className="flex-shrink-0 w-40 mx-3 bg-primary text-background border border-primary p-3 cursor-pointer first:ml-0"
                                    onClick={() => goToMovie(index)}
                                >
                                    <div className="w-full h-48 border border-primary mb-3 overflow-hidden">
                                        <img
                                            src={movie.image}
                                            alt={movie.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="space-y-0.5">
                                        <span
                                            className="font-body font-medium text-sm block truncate"
                                            title={movie.title}
                                        >
                                            {movie.title}
                                        </span>
                                        <span className="font-body font-light text-xs block">
                                            {movie.year}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={nextMovie}
                        className="text-primary hover:text-secondary transition-all p-2 ml-1 absolute right-0 z-10"
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