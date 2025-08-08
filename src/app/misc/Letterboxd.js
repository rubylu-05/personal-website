'use client';

import { useEffect, useState, useRef } from 'react';

function Letterboxd() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const containerRef = useRef(null);
    const itemRefs = useRef([]);
    const autoScrollInterval = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const componentRef = useRef(null);
    const [touchStartX, setTouchStartX] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/letterboxd');
                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                setMovies(data.slice(0, 20));
            } catch (error) {
                console.error('Fetch error:', error);
                setError('Failed to load movie data');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
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

    const getStarRating = (rating) => {
        if (!rating) return null;
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        return (
            <span className="dark:text-[var(--secondary)] text-xs">
                {'★'.repeat(fullStars)}
                {hasHalfStar && '½'}
            </span>
        );
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

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextMovie();
            } else {
                prevMovie();
            }
        }
    };

    if (loading) {
        return <p className="font-body font-light">Loading movie data...</p>;
    }

    if (error) {
        return <p className="font-body font-light">{error}</p>;
    }

    return (
        <div ref={componentRef}>
            <h3 className="text-2xl font-body font-bold text-primary dark:text-darkSecondary mb-1 tracking-tight dark:neon-glow">Recently Watched Movies</h3>
            <div className="relative">
                <div
                    className="flex items-center"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <button
                        onClick={prevMovie}
                        className="text-[var(--primary)] transition-all absolute left-0 z-10 flex items-center justify-center w-10 h-14 group"
                        style={{ transform: 'translateX(-70%)' }}
                        aria-label="Previous movie"
                    >
                        <div className="group-hover:scale-[1.2] transition-transform">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </div>
                    </button>

                    <div className="relative w-full overflow-x-hidden overflow-y-visible min-h-[19rem] p-1">
                        <div
                            ref={containerRef}
                            className="flex transition-all pl-0"
                            style={{
                                transform: `translateX(${-offset * (itemRefs.current[0]?.offsetWidth + 16)}px)`
                            }}
                        >
                            {movies.map((movie, index) => (
                                <div
                                    key={`${movie.title}-${index}`}
                                    ref={el => itemRefs.current[index] = el}
                                    className="relative flex-shrink-0 w-40 mx-2 cursor-pointer first:ml-0"
                                    onClick={() => goToMovie(index)}
                                >
                                    {/* Shadow Layer */}
                                    <div className="absolute top-[4px] left-[4px] z-0 w-full h-full bg-primary dark:bg-darkSecondary rounded-2xl"></div>

                                    {/* Main Card Layer */}
                                    <div className="relative z-10 transition-all bg-background dark:bg-darkBackground2 border border-primary dark:border-darkBackground2 p-3 md:hover:-translate-y-0.5 md:hover:-translate-x-0.5 rounded-2xl">
                                        <div className="w-full mb-3 overflow-hidden border border-primary dark:border-darkBackground2 rounded-xl">
                                            {movie.image ? (
                                                <img
                                                    src={movie.image}
                                                    alt={movie.title}
                                                    className="w-full h-auto object-contain"
                                                    onError={(e) => {
                                                        e.target.src = '/default-movie.png';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full bg-gray-300 flex items-center justify-center" style={{ aspectRatio: '2/3' }}>
                                                    <span className="text-xs">No image</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex justify-between items-baseline">
                                                <span
                                                    className="font-body font-bold truncate w-full tracking-tighter"
                                                    title={movie.title}
                                                >
                                                    {movie.title}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div className="font-body text-xs flex items-center">
                                                    {movie.year}
                                                </div>
                                                {movie.rating && (
                                                    <div className="font-sans flex items-center">
                                                        {getStarRating(movie.rating)}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="font-body text-xs">
                                                Watched {movie.watchedDate}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={nextMovie}
                        className="text-[var(--primary)] transition-all absolute right-0 z-10 flex items-center justify-center w-10 h-14 group"
                        style={{ transform: 'translateX(70%)' }}
                        aria-label="Next movie"
                    >
                        <div className="group-hover:scale-[1.2] transition-transform">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </div>
                    </button>

                </div>

                <div className="flex justify-center mt-2 space-x-2 overflow-x-auto py-2 no-scrollbar">
                    {movies.map((_, index) => (
                        <button
                            key={`indicator-${index}`}
                            onClick={() => goToMovie(index)}
                            className={`flex-shrink-0 w-2 h-2 transition-all rounded-full md:hover:scale-[1.2] ${index === offset ? 'bg-primary dark:bg-darkSecondary w-4 dark:drop-shadow-[0_0_4px_rgba(230,220,224,0.3)]' : 'bg-background dark:bg-darkPrimary border border-primary dark:border-0'}`}
                            aria-label={`Go to movie ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Letterboxd;