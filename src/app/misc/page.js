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
        const loadArtData = async () => {
            try {
                const response = await fetch('/data/art.json');
                const data = await response.json();
                setArtGroups(data);
            } catch (error) {
                console.error('Error loading art data:', error);
            }
        };
        loadArtData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!watchRec && !listenRec) return;

        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const response = await fetch('/api/send_recs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ watchRec, listenRec }),
            });

            setSubmitMessage(response.ok
                ? 'Thanks for your recommendations!'
                : 'Failed to send. Please try again.'
            );

            if (response.ok) {
                setWatchRec('');
                setListenRec('');
            }
        } catch {
            setSubmitMessage('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitMessage(''), 5000);
        }
    };

    return (
        <div className="overflow-x-hidden px-10 py-8 sm:p-20 sm:pt-16">
            <ArtGallery artGroups={artGroups} />

            <RecentMediaSection />

            <FavoritesSection />

            <RecommendationForm
                watchRec={watchRec}
                listenRec={listenRec}
                isSubmitting={isSubmitting}
                submitMessage={submitMessage}
                onWatchRecChange={(e) => setWatchRec(e.target.value)}
                onListenRecChange={(e) => setListenRec(e.target.value)}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

const ArtGallery = ({ artGroups }) => (
    <>
        <h1 className="text-4xl font-heading font-extralight text-secondary mb-4">Artistic Work</h1>
        <p className="font-body font-light">
            A gallery of miscellaneous drawings, paintings, and crafts!
        </p>

        {artGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-4">
                {group.title && (
                    <h2 className="text-xl font-heading font-extrabold text-primary mb-2 mt-10">
                        {group.title}
                    </h2>
                )}
                {group.description && (
                    <p className="mb-4 font-body font-light">{group.description}</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.pieces.map((piece, pieceIndex) => (
                        <ArtPiece key={pieceIndex} piece={piece} />
                    ))}
                </div>
            </div>
        ))}
    </>
);

const ArtPiece = ({ piece }) => (
    <div className={piece.fullWidth ? "col-span-full" : ""}>
        <img
            src={piece.image}
            alt=""
            className={`w-full h-auto object-fill mb-3 rounded-lg shadow-[0_0_30px_15px_rgba(175,139,106,0.1)] hover:shadow-[0_0_30px_15px_rgba(175,139,106,0.12)] hover:scale-[1.02] duration-500 ease-out`}
        />
        <p className="font-body font-light text-xs">{piece.description}</p>
    </div>
);

const RecentMediaSection = () => (
    <>
        <h1 className="text-4xl font-heading font-extralight text-secondary mb-4 mt-20">
            Recent Watching & Listening
        </h1>
        <p className="font-body font-light mb-2">
            I like to watch movies when I have free time. I've always had a lot of love for the horror genre in particular, from campy 80's horror (I love the practical effects from that era!) to atmospheric slow-burns. But my taste is super wide and I enjoy movies from pretty much any genre.
        </p>
        <p className="font-body font-light mb-6">
            Below are my most recently watched movies (fetched from my Letterboxd activity), as well as my top played artists this week (fetched from my Spotify listening).
        </p>
        <div className="mb-10">
            <Letterboxd />
        </div>
        <LastFm />
    </>
);

const FavoritesSection = () => (
    <>
        <h1 className="text-4xl font-heading font-extralight text-secondary mb-4 mt-20">
            Favourites!
        </h1>
        <p className="font-body font-light mb-4">
            Since I shared my recents, I wanted to share my favourites as well, though this will probably change once in a while.
        </p>
        <div className="mb-10">
            <Movies />
        </div>
        <div className="mb-12">
            <AlbumCollage />
        </div>
    </>
);

const RecommendationForm = ({
    watchRec,
    listenRec,
    isSubmitting,
    submitMessage,
    onWatchRecChange,
    onListenRecChange,
    onSubmit
}) => (
    <div className="mt-20 mb-12">
        <p className="font-body font-light mb-6">
            If you've made it this far, feel free to give me recommendations :) I'm not picky and I love watching & listening to new things.
        </p>

        <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <RecommendationInput
                    label="Tell me what to watch:"
                    value={watchRec}
                    onChange={onWatchRecChange}
                    placeholder="Movie, TV show, etc."
                />
                <RecommendationInput
                    label="Tell me what to listen to:"
                    value={listenRec}
                    onChange={onListenRecChange}
                    placeholder="Artist, album, song, etc."
                />
            </div>
            <SubmitButton isSubmitting={isSubmitting} />
            {submitMessage && (
                <p className="mt-2 font-body font-light text-sm text-primary">
                    {submitMessage}
                </p>
            )}
        </form>
    </div>
);

const RecommendationInput = ({ label, value, onChange, placeholder }) => (
    <div>
        <label className="block font-body font-light mb-2">{label}</label>
        <input
            type="text"
            value={value}
            onChange={onChange}
            className="w-full p-2 border border-light2 rounded-lg font-body font-light focus:outline-none focus:ring-1 focus:ring-black placeholder-secondary/50"
            placeholder={placeholder}
        />
    </div>
);

const SubmitButton = ({ isSubmitting }) => (
    <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-secondary text-white rounded-lg text-sm font-body hover:bg-primary transition-colors disabled:opacity-50 transition-all hover:scale-105"
    >
        {isSubmitting ? 'Sending...' : 'Send!'}
    </button>
);