export interface Tour {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  duration: number;
  description: string;
}

export let toursDb: Tour[] = [
  {
    id: 't-1',
    title: 'Halong Bay Majestic Cruise',
    location: 'Vietnam',
    price: 350,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1555661530-68c8e98db4e6?auto=format&fit=crop&w=800&h=600',
    duration: 3,
    description: 'Immerse yourself in the stunning limestone karsts of Halong Bay on a luxury traditional junk boat.',
  },
  {
    id: 't-2',
    title: 'Angkor Wat Sunrise Discovery',
    location: 'Cambodia',
    price: 120,
    rating: 4.9,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1529154036614-a60975f5c760?auto=format&fit=crop&w=800&h=600',
    duration: 1,
    description: 'A breathtaking early morning exploration of the ancient temple complexes of Angkor with an expert historian.',
  },
  {
    id: 't-3',
    title: 'Chiang Mai Jungle Trek',
    location: 'Thailand',
    price: 180,
    rating: 4.7,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=800&h=600',
    duration: 2,
    description: 'Wander through dense forests, visit hill tribes, and experience the lush nature of Northern Thailand.',
  },
  {
    id: 't-4',
    title: 'Luang Prabang Heritage Tour',
    location: 'Laos',
    price: 210,
    rating: 4.6,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?auto=format&fit=crop&w=800&h=600',
    duration: 4,
    description: 'Discover the peaceful fusion of traditional Lao architecture and French colonial charm.',
  },
  {
    id: 't-5',
    title: 'Mekong Delta River Safari',
    location: 'Vietnam',
    price: 280,
    rating: 4.5,
    reviews: 201,
    image: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=800&h=600',
    duration: 3,
    description: 'Navigate the vibrant floating markets and endless waterways of the majestic Mekong Delta.',
  },
  {
    id: 't-6',
    title: 'Phuket Island Hopper',
    location: 'Thailand',
    price: 450,
    rating: 4.8,
    reviews: 410,
    image: 'https://images.unsplash.com/photo-1498307833015-e7b400441eb8?auto=format&fit=crop&w=800&h=600',
    duration: 5,
    description: 'Sail across the crystal-clear waters of the Andaman Sea, exploring secret beaches and coves.',
  }
];
