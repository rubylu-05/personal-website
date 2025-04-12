'use client';

const artGroups = [
  {
    title: 'Digital',
    pieces: [
      {
        description: 'Street under a pink sky, drawn digitally',
        image: '/images/art/street.png'
      }
    ]
  },
  {
    title: 'Alcohol Markers',
    pieces: [
      {
        description: 'I bought some grayscale Tombow alcohol markers from Dollarama and watched Mad Max: Fury Road (one of my favourite movies) for the first time, inspiring me to draw this',
        image: '/images/art/fury_road.png'
      },
      {
        description: 'A quaint little storefront, drawn with Tombow alcohol markers and fineliner pens',
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
    description: 'These are some illustrations inspired by famous cryptids and mythical creatures - I\'ve always found cryptids to be pretty interesting since they exist somewhere between folklore and modern myth. Plus they\'re fun to draw since their depictions are very open to interpretation.',
    pieces: [
      {
        description: 'Wendigo (one of my favourite cryptids), drawn digitally',
        image: '/images/art/wendigo.png'
      },
      {
        description: 'Mothman (another one of my favourites), drawn with pencils',
        image: '/images/art/mothman.jpg'
      },
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
  return (
    <div className="mt-6 ml-6 mr-20">
      <h1 className="text-4xl font-heading font-extralight text-secondary mb-4">Artistic Work</h1>
      <p className="mb-12 font-body font-light">
        A little gallery of miscellaneous drawings, paintings, and crafts!
      </p>
      
      {artGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-4">
          {group.title && <h2 className="text-xl font-heading font-extrabold text-primary mb-2">{group.title}</h2>}
          {group.description && <p className="mb-4 font-body font-light">{group.description}</p>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {group.pieces.map((piece, pieceIndex) => (
              <div key={pieceIndex} className="mb-8">
                <img 
                  src={piece.image} 
                  alt=""
                  className="w-full h-auto max-h-[500px] object-contain mb-3 rounded-lg shadow-md"
                />
                <p className="font-body font-light text-xs">{piece.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}