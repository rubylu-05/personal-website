'use client';
import LastFm from './LastFm';
import Letterboxd from './Letterboxd';
import AlbumCollage from './AlbumCollage';
import Movies from './Movies';
import { useState, useEffect } from 'react';

export default function Misc() {
    const [artGroups, setArtGroups] = useState([]);
    const [watchRec, setWatchRec] = useState('');
    const [listenRec, setListenRec] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    useEffect(() => {
        fetch('/data/art.json')
            .then(response => response.json())
            .then(data => setArtGroups(data))
            .catch(error => console.error('Error loading art data:', error));
    }, []);

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
        <div className="overflow-x-hidden p-20 pt-16">
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
                                    className={`w-full h-auto object-fill mb-3 rounded-lg shadow-[0_0_30px_15px_rgba(175,139,106,0.1)] hover:shadow-[0_0_30px_15px_rgba(175,139,106,0.12)] hover:scale-[1.02] duration-500 ease-out w-full`}
                                />
                                <p className="font-body font-light text-xs">{piece.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <h1 className="text-4xl font-heading font-extralight text-secondary mb-4 mt-20">Recent Watching & Listening</h1>
            <p className="font-body font-light mb-2">
                I like to watch movies when I have free time. I've always had a lot of love for the horror genre in particular, from campy 80's horror (I love the practical effects from that era!) to atmospheric slow-burns. But my taste is super wide and I enjoy movies from pretty much any genre.
            </p>
            <p className="font-body font-light mb-6">
                Below are my most recently watched movies (fetched from my Letterboxd activity), as well as my top played artists this week (fetched from my Spotify listening).
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