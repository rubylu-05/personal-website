'use client';
import LastFm from './LastFm';
import Letterboxd from './Letterboxd';
import AlbumCollage from './AlbumCollage';
import Movies from './Movies';
import ExternalLink from '@/components/ExternalLink';
import SectionHeading from '@/components/SectionHeading';
import { useState } from 'react';

const artData = [
  {
    "title": "Digital Art",
    "columns": 1,
    "pieces": [
      {
        "image": "/images/art/street.png",
        "fullWidth": true
      }
    ]
  },
  {
    "title": "Creature Design", 
    "columns": 2,
    "description": "I love seeing creative creature design when I watch sci-fi or horror media, so I sometimes experiment by making concept art of my own. These are just some amateur sketches and a fun way for me to get a bit creative. I use alcohol markers, a black pen, and a white gel pen.",
    "pieces": [
      {
        "image": "images/art/creaturedesign2.png"
      },
      {
        "image": "images/art/creaturedesign1.png"
      }
    ]
  },
  {
    "title": "Cryptids & Mythical Creatures",
    "columns": 2,
    "description": "These are some illustrations inspired by famous cryptids and mythical creatures — I've always found cryptids to be interesting since they exist somewhere between folklore and modern myth. Plus they're fun to draw since their appearances are open to interpretation.",
    "pieces": [
      {
        "image": "images/art/wendigo.png"
      },
      {
        "image": "images/art/mothman.jpg"
      }
    ]
  },
  {
    "columns": 3,
    "pieces": [
      {
        "image": "images/art/deathworm.png"
      },
      {
        "image": "images/art/creature.png"
      },
      {
        "image": "images/art/dragon.png"
      }
    ]
  },
  {
    "title": "Acrylic Markers",
    "columns": 2,
    "pieces": [
      {
        "image": "/images/art/bugs.png"
      },
      {
        "image": "images/art/bag.png"
      },
      {
        "image": "images/art/burger.png"
      },
      {
        "image": "images/art/oyster.png"
      }
    ]
  },
  {
    "title": "Oil Pastels",
    "columns": 2,
    "pieces": [
      {
        "image": "/images/art/goldfish_bag.png"
      },
      {
        "image": "images/art/lilies.png"
      },
      {
        "image": "images/art/goldfish.png"
      },
      {
        "image": "images/art/cat_oranges.png"
      }
    ]
  },
  {
    "title": "Alcohol Markers",
    "columns": 3,
    "pieces": [
      {
        "image": "/images/art/fury_road.jpg"
      },
      {
        "image": "images/art/storefront.jpeg"
      },
      {
        "image": "images/art/car.jpeg"
      }
    ]
  },
  {
    "title": "Cats!",
    "columns": 3,
    "pieces": [
      {
        "image": "/images/art/cat.jpg"
      },
      {
        "image": "/images/art/cats.jpg"
      }
    ]
  },
  {
    "title": "Needle Felting",
    "columns": 3,
    "pieces": [
      {
        "image": "images/art/bunny.jpg"
      },
      {
        "image": "images/art/frog.jpg"
      },
      {
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

      setSubmitMessage(response.ok ? 'Thanks!' : 'Failed to send :(');

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
      <div className="overflow-x-hidden p-6 py-4 bg-[var(--background)] transition-all mb-10">
        <div className="flex flex-wrap gap-4 items-center">
          <span className="font-body font-light text-lg">Jump to:</span>
          <div className="flex flex-wrap gap-2">
            <JumpToLink href="#art" label="Artistic Work" />
            <JumpToLink href="#recent" label="Recent Watching & Listening" />
            <JumpToLink href="#favourites" label="Favourite Movies & Albums" />
          </div>
        </div>
      </div>

      <div id="art" className="overflow-x-hidden p-6 bg-[var(--background)] transition-all">
        <ArtGallery artGroups={artData} />
      </div>
      <div id="recent" className="overflow-x-hidden p-6 bg-[var(--background)] transition-all mt-8">
        <RecentMediaSection />
      </div>
      <div id="favourites" className="overflow-x-hidden p-6 bg-[var(--background)] transition-all mt-8">
        <FavouritesSection />
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
    </div>
  );
}

const JumpToLink = ({ href, label }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <a href={href} onClick={handleClick} className="relative inline-block group">
      <div className="absolute top-[4px] left-[4px] z-0">
        <div className="py-1 px-3 flex items-center whitespace-nowrap bg-primary dark:bg-darkSecondary rounded-full">
          <span className="font-body text-sm text-[var(--primary)]">{label}</span>
        </div>
      </div>
      <div className="relative z-10 transition-all bg-background dark:bg-darkBackground2 py-1 px-3 flex items-center whitespace-nowrap border border-[var(--primary)] dark:border-darkBackground2 group-hover:-translate-y-0.5 group-hover:-translate-x-0.5 rounded-full">
        <span className="font-body text-sm text-[var(--primary)]">{label}</span>
      </div>
    </a>
  );
};

const ArtGallery = ({ artGroups }) => (
  <>
    <SectionHeading ellipseRotation={-7} ellipseLength={230}>Artistic Work</SectionHeading>
    <p className="font-body font-light lg:text-lg">
      A gallery of miscellaneous drawings, paintings, and crafts!
    </p>

    {artGroups.map((group, groupIndex) => {
      const desktopCols = group.columns === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3';
      
      return (
        <div key={groupIndex} className="mb-4">
          {group.title && (
            <h2 className="text-2xl font-body font-bold text-primary dark:text-darkSecondary mb-2 mt-10 tracking-tighter dark:neon-glow">
              {group.title}
            </h2>
          )}
          {group.description && (
            <p className="mb-4 font-body font-light lg:text-lg">{group.description}</p>
          )}

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${desktopCols}`}>
            {group.pieces.map((piece, pieceIndex) => (
              <ArtPiece key={pieceIndex} piece={piece} />
            ))}
          </div>
        </div>
      );
    })}
  </>
);

const ArtPiece = ({ piece }) => (
  <div className={`${piece.fullWidth ? "col-span-full" : ""}`}>
    <div className="relative">
      <div className="relative before:absolute before:content-[''] before:top-[4px] before:left-[4px] 
                      before:w-full before:h-full before:bg-primary dark:before:bg-darkSecondary 
                      before:rounded-xl before:z-0">
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
    <p className="font-body text-xs mt-2">{piece.description}</p>
  </div>
);

const RecentMediaSection = () => (
  <>
    <SectionHeading ellipseRotation={5} ellipseLength={300}>Recent Watching & Listening</SectionHeading>
    <p className="font-body font-light mb-2 lg:text-lg">
      I'm a big movie lover! I especially love the horror genre in all its glorious (or sometimes absurd) forms, from campy 80's horror to slow-burn atmospheric dread. But my taste is super wide and I enjoy movies from pretty much any genre.
    </p>
    <p className="font-body font-light mb-6 lg:text-lg">
      Below are my most recently watched movies (synced with my <ExternalLink href="https://letterboxd.com/rubylu/">Letterboxd</ExternalLink> account), as well as my top played artists this week (synced with my <ExternalLink href="https://open.spotify.com/user/xpikg3hgljzcxdwltg3zoebtp?si=111b33842cdf497f">Spotify</ExternalLink> listening).
    </p>
    <div className="mb-10">
      <Letterboxd />
    </div>
    <LastFm />
  </>
);

const FavouritesSection = () => (
  <>
    <SectionHeading ellipseRotation={-6} ellipseLength={200}>Favourites!</SectionHeading>
    <p className="font-body font-light mb-4 lg:text-lg">
      Here are some movies I love! It was really hard to choose only 20. This list is probably full of recency bias and will change pretty often.
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
    <p className="font-body font-light mb-6 lg:text-lg">
      If you've made it this far, feel free to give me recommendations if you have any :) I'm not picky and I love watching/listening to new things.
    </p>

    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 lg:text-lg">
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
    <div className="absolute top-[4px] left-[4px] z-0">
      <div className="py-2 px-4 pt flex items-center whitespace-nowrap bg-primary dark:bg-darkSecondary rounded-full">
        <span className="font-body text-base text-[var(--primary)]">
          {isSubmitting ? 'Sending...' : 'Send!'}
        </span>
      </div>
    </div>
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
