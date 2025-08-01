'use client';
import LastFm from './LastFm';
import Letterboxd from './Letterboxd';
import AlbumCollage from './AlbumCollage';
import Movies from './Movies';
import ExternalLink from '@/components/ExternalLink';
import SectionHeading from '@/components/SectionHeading';
import { useEffect, useRef, useState } from 'react';

const artData = [
  {
    "title": "Digital",
    "pieces": [
      {
        "description": "Street under a pink sky, drawn digitally",
        "image": "/images/art/street.png",
        "fullWidth": true
      }
    ]
  },
  {
    "title": "Alcohol Markers",
    "pieces": [
      {
        "description": "I bought some grayscale Tombow alcohol markers from Dollarama and watched Mad Max: Fury Road for the first time, inspiring me to draw this",
        "image": "/images/art/fury_road.jpg"
      },
      {
        "description": "A quaint storefront, drawn with Tombow alcohol markers and fineliner pens",
        "image": "images/art/storefront.jpeg"
      },
      {
        "description": "I drew a Corvette for a family friend who really likes cars",
        "image": "images/art/car.jpeg"
      }
    ]
  },
  {
    "title": "Cats!",
    "description": "I found a bunch of cute photos of cats on Pinterest as reference.",
    "pieces": [
      {
        "description": "A sleepy cat, painted with acrylics",
        "image": "/images/art/cat.jpg"
      },
      {
        "description": "Sleepy gray cats, drawn with alcohol markers",
        "image": "/images/art/cats.jpg"
      }
    ]
  },
  {
    "title": "Creatures & Cryptids",
    "description": "These are some illustrations inspired by famous cryptids and mythical creatures - I've always found cryptids to be interesting since they exist somewhere between folklore and modern myth. Plus they're fun to draw since their appearances are open to interpretation.",
    "pieces": [
      {
        "description": "Wendigo (one of my favourite cryptids), drawn digitally",
        "image": "images/art/wendigo.png"
      },
      {
        "description": "Mothman (another one of my favourites), drawn with pencils",
        "image": "images/art/mothman.jpg"
      }
    ]
  },
  {
    "pieces": [
      {
        "description": "Death worm, drawn digitally",
        "image": "images/art/deathworm.png"
      },
      {
        "description": "Original (?), drawn digitally",
        "image": "images/art/creature.png"
      },
      {
        "description": "Dragon, drawn digitally",
        "image": "images/art/dragon.png"
      }
    ]
  },
  {
    "title": "Needle Felting",
    "description": "Needle felting is pretty fun! I've made a bunch of little animals, but here are my favourites.",
    "pieces": [
      {
        "description": "Bunny!",
        "image": "images/art/bunny.jpg"
      },
      {
        "description": "Frog!",
        "image": "images/art/frog.jpg"
      },
      {
        "description": "Dinosaur!",
        "image": "images/art/dinosaur.jpg"
      }
    ]
  }
];

export default function Misc() {
  const [watchRec, setWatchRec] = useState('');
  const [listenRec, setListenRec] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

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
        ? 'Thanks!'
        : 'Failed to send :('
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
    <div>
      <div className="overflow-x-hidden p-6 bg-[var(--background)] transition-all">
        <ArtGallery artGroups={artData} />
      </div>
      <div className="overflow-x-hidden p-6 bg-[var(--background)] transition-all mt-8">
        <RecentMediaSection />
      </div>
      <div className="overflow-x-hidden p-6 bg-[var(--background)] transition-all mt-8">
        <FavoritesSection />
      </div>
      <div className="overflow-x-hidden p-6 bg-[var(--background)] transition-all mt-8">
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
    </div >
  );
}

const ArtGallery = ({ artGroups }) => (
  <>
    <SectionHeading>Artistic Work</SectionHeading>
    <p className="font-body font-light text-lg">
      A gallery of miscellaneous drawings, paintings, and crafts!
    </p>

    {artGroups.map((group, groupIndex) => (
      <div key={groupIndex} className="mb-4">
        {group.title && (
          <h2 className="text-2xl font-body font-bold text-primary dark:text-darkSecondary mb-2 mt-10 tracking-tighter dark:neon-glow">
            {group.title}
          </h2>
        )}
        {group.description && (
          <p className="mb-4 font-body font-light text-lg">{group.description}</p>
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
  <div className={`${piece.fullWidth ? "col-span-full" : ""}`}>
    <div className="relative">
      {/* Shadow effect */}
      <div className="relative before:absolute before:content-[''] before:top-[4px] before:left-[4px] 
                      before:w-full before:h-full before:bg-primary dark:before:bg-darkSecondary 
                      before:rounded-xl before:z-0">
        {/* Main image */}
        <div className="relative z-10 transition-transform duration-300 
                        border border-primary dark:border-0 rounded-xl
                        md:hover:-translate-y-0.5 md:hover:-translate-x-0.5">
          <img
            src={piece.image}
            alt=""
            className="w-full h-auto object-fill rounded-xl"
          />
        </div>
      </div>
    </div>
    {/* Description text */}
    <p className="font-body text-xs mt-2">{piece.description}</p>
  </div>
);

const RecentMediaSection = () => (
  <>
    <SectionHeading ellipseRotation={5}>Recent Watching & Listening</SectionHeading>
    <p className="font-body font-light mb-2 text-lg">
      I like to watch movies. I've always had a lot of interest in the horror genre in particular, from campy 80's horror (I love the practical effects from that era!) to slow-burn atmospheric dread. But my taste is super wide and I enjoy movies from pretty much any genre.
    </p>
    <p className="font-body font-light mb-6 text-lg">
      Below are my most recently watched movies (synced with my <ExternalLink href="https://letterboxd.com/rubylu/">Letterboxd</ExternalLink> account), as well as my top played artists this week (synced with my <ExternalLink href="https://open.spotify.com/user/xpikg3hgljzcxdwltg3zoebtp?si=111b33842cdf497f">Spotify</ExternalLink> listening).
    </p>
    <div className="mb-10">
      <Letterboxd />
    </div>
    <LastFm />
  </>
);

const FavoritesSection = () => (
  <>
    <SectionHeading ellipseRotation={-6}>Favourites!</SectionHeading>
    <p className="font-body font-light mb-4 text-lg">
      Since I shared my recents, I wanted to share my favourites as well, though this will probably change once in a while.
    </p>
    <div className="mb-10">
      <Movies />
    </div>
    <div className="mb-4">
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
  <div>
    <p className="font-body font-light mb-6 text-lg">
      If you've made it this far, feel free to give me recommendations if you have any :) I'm not picky and I love watching & listening to new things.
    </p>

    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 text-lg">
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
        <p className="mt-2 font-body font-light text-sm text-[var(--primary)]">
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
      className="w-full px-4 py-2 border bg-background dark:bg-darkBackground2 border-primary dark:border-0 font-body font-light focus:outline-none focus:ring-1 focus:ring-[var(--primary)] placeholder-[var(--secondary)] rounded-full"
      placeholder={placeholder}
    />
  </div>
);

const SubmitButton = ({ isSubmitting }) => (
  <div className="relative inline-block">
    {/* Shadow Layer */}
    <div className="absolute top-[4px] left-[4px] z-0">
      <div className="py-2 px-4 pt flex items-center whitespace-nowrap bg-primary dark:bg-darkSecondary rounded-full">
        <span className="font-body text-base text-[var(--primary)]">
          {isSubmitting ? 'Sending...' : 'Send!'}
        </span>
      </div>
    </div>
    {/* Main Button Layer */}
    <button
      type="submit"
      disabled={isSubmitting}
      className="relative z-10 transition-all bg-background dark:bg-darkBackground2 py-2 px-4 flex items-center whitespace-nowrap border border-[var(--primary)] dark:border-darkBackground2 md:hover:-translate-y-0.5 md:hover:-translate-x-0.5 rounded-full"
    >
      <span className="font-body text-base text-[var(--primary)]">
        {isSubmitting ? 'Sending...' : 'Send!'}
      </span>
    </button>
  </div>
);