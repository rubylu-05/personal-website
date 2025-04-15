'use client';
import LastFm from './LastFm'
import Letterboxd from './Letterboxd';
import AlbumCollage from './AlbumCollage';
import Movies from './Movies';
import { useState } from 'react';

const artGroups = [
    {
        title: 'Digital',
        pieces: [
            {
                description: 'Street under a pink sky, drawn digitally',
                image: '/images/art/street.png',
                fullWidth: true
            }
        ]
    },
    {
        title: 'Alcohol Markers',
        pieces: [
            {
                description: 'I bought some grayscale Tombow alcohol markers from Dollarama and watched Mad Max: Fury Road for the first time, inspiring me to draw this',
                image: '/images/art/fury_road.png'
            },
            {
                description: 'A quaint storefront, drawn with Tombow alcohol markers and fineliner pens',
                image: '/images/art/storefront.png'
            },
            {
                description: 'I drew a Corvette for a family friend who really likes cars',
                image: '/images/art/car.png'
            }
        ]
    },
    {
        title: 'Cats!',
        description: 'I found a bunch of cute photos of cats on Pinterest as reference.',
        pieces: [
            {
                description: 'A sleepy cat, painted with acrylics',
                image: '/images/art/cat.png'
            },
            {
                description: 'Sleepy gray cats, drawn with alcohol markers and fineliner pens',
                image: '/images/art/cats.png'
            }
        ]
    },
    {
        title: 'Creatures & Cryptids',
        description: 'These are some illustrations inspired by famous cryptids and mythical creatures - I\'ve always found cryptids to be interesting since they exist somewhere between folklore and modern myth. Plus they\'re fun to draw since their depictions are very open to interpretation.',
        pieces: [
            {
                description: 'Wendigo (one of my favourite cryptids), drawn digitally',
                image: '/images/art/wendigo.png'
            },
            {
                description: 'Mothman (another one of my favourites), drawn with pencils',
                image: '/images/art/mothman.jpg'
            },
        ]
    },
    {
        pieces: [
            {
                description: 'Death worm, drawn digitally',
                image: '/images/art/deathworm.png'
            },
            {
                description: 'Original (?), drawn digitally',
                image: '/images/art/creature.png'
            },
            {
                description: 'Dragon, drawn digitally',
                image: '/images/art/dragon.png'
            },
        ]
    },
    {
        title: 'Needle Felting',
        description: 'Needle felting is pretty fun! I\'ve made a bunch of little animals, but here are my personal favourites.',
        pieces: [
            {
                description: 'Bunny!',
                image: '/images/art/bunny.jpg'
            },
            {
                description: 'Frog!',
                image: '/images/art/frog.jpg'
            },
            {
                description: 'Dinosaur!',
                image: '/images/art/dinosaur.jpg'
            }
        ]
    }
];

export default function ArtGallery() {
    const [watchRec, setWatchRec] = useState('');
    const [listenRec, setListenRec] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/send_recs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    watchRec,
                    listenRec
                }),
            });

            if (response.ok) {
                setSubmitMessage('Thanks for your recommendations!');
                setWatchRec('');
                setListenRec('');
            } else {
                setSubmitMessage('Failed to send. Please try again.');
            }
        } catch (error) {
            setSubmitMessage('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitMessage(''), 5000);
        }
    };

    return (
        <div className="mt-6 ml-6 mr-20">
            <h1 className="text-4xl font-heading font-extralight text-secondary mb-4">Artistic Work</h1>
            <p className="font-body font-light">
                A gallery of miscellaneous drawings, paintings, and crafts!
            </p>

            {artGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="mb-4">
                    {group.title && <h2 className="text-xl font-heading font-extrabold text-primary mb-2 mt-10">{group.title}</h2>}
                    {group.description && <p className="mb-4 font-body font-light">{group.description}</p>}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {group.pieces.map((piece, pieceIndex) => (
                            <div key={pieceIndex} className={piece.fullWidth ? "col-span-full" : ""}>
                                <img
                                    src={piece.image}
                                    alt=""
                                    className={`w-full h-auto object-fill mb-3 rounded-lg shadow-[0_0_30px_15px_rgba(175,139,106,0.1)] hover:shadow-[0_0_30px_15px_rgba(175,139,106,0.25)] hover:scale-[1.02] duration-500 ease-out w-full`}
                                />
                                <p className="font-body font-light text-xs">{piece.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <h1 className="text-4xl font-heading font-extralight text-secondary mb-4 mt-20">Recent Watching & Listening</h1>
            <p className="font-body font-light mb-2">
                I like to watch movies when I have free time. I’ve always had a lot of love for the horror genre in particular, from campy 80’s horror (I love the practical effects from that era!) to atmospheric slow-burns. But my taste is super wide and I enjoy movies from pretty much any genre.
            </p>
            <p className="font-body font-light mb-6 ">
                Below are my most recently watched movies (pulled from my Letterboxd activity), as well as my top played artists this week (pulled from my Spotify listening).
            </p>
            <div className="mb-4">
                <Letterboxd />
            </div>
            <LastFm />
            <h1 className="text-4xl font-heading font-extralight text-secondary mb-4 mt-20">Favourites!</h1>
            <p className="font-body font-light mb-4">
                Since I shared my recent watching & listening, I wanted to share my favourites as well, though this can all be subject to change.
            </p>
            <div className="mb-4">
                <Movies />
            </div>
            <div className="mb-12">
                <AlbumCollage />
            </div>

            <div className="mt-20 mb-12">
                <p className="font-body font-light mb-6">
                    If you've made it this far, feel free to give me recommendations :) I'm not picky and I love watching & listening to new things.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                            <label className="block font-body font-light mb-2">Tell me what to watch:</label>
                            <input
                                type="text"
                                value={watchRec}
                                onChange={(e) => setWatchRec(e.target.value)}
                                className="w-full p-2 border border-light2 rounded-lg font-body font-light focus:outline-none focus:ring-1 focus:ring-black placeholder-secondary/50"
                                placeholder="Movie, TV show, etc."
                            />
                        </div>
                        <div>
                            <label className="block font-body font-light mb-2">Tell me what to listen to:</label>
                            <input
                                type="text"
                                value={listenRec}
                                onChange={(e) => setListenRec(e.target.value)}
                                className="w-full p-2 border border-light2 rounded-lg font-body font-light focus:outline-none focus:ring-1 focus:ring-black placeholder-secondary/50"
                                placeholder="Artist, album, song, etc."
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-secondary text-white rounded-lg text-sm font-body hover:bg-primary transition-colors disabled:opacity-50 transition-all hover:scale-105"
                    >
                        {isSubmitting ? 'Sending...' : 'Send!'}
                    </button>
                    {submitMessage && (
                        <p className="mt-2 font-body font-light text-sm text-primary">
                            {submitMessage}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}