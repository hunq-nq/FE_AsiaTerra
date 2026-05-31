export const dictionaries = {
  en: {
    nav: {
      home: 'Home',
      tours: 'Tours',
      destinations: 'Destinations',
      admin: 'Admin',
      search: 'Search',
    },
    hero: {
      title: 'Discover the Wonders of Southeast Asia',
      subtitle: 'Curated experiences across Vietnam, Cambodia, Thailand, and Laos. Book your immersive local guide today.',
      searchPlaceholder: 'Where do you want to go?',
      btn_search: 'Search Tours',
    },
    destinations: {
      title: 'Popular Destinations',
      subtitle: 'Explore the heart of Southeast Asia with our tailored journeys.',
    },
    tours: {
      title: 'Our Top Tours',
      book_now: 'Book Now',
      view_details: 'View Details',
      duration: 'days',
      reviews: 'reviews',
      filters: {
        title: 'Filter By',
        location: 'Location',
        price: 'Max Price',
      }
    },
    admin: {
      title: 'Admin Dashboard',
      manage_tours: 'Manage Tours',
      add_tour: 'Add New Tour',
      stats: 'Overview Statistics',
      total_bookings: 'Total Bookings',
      revenue: 'Revenue',
      active_tours: 'Active Tours',
    },
    footer: {
      rights: '© 2026 AsiaTerra Travel. All rights reserved.',
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      tours: 'Circuits',
      destinations: 'Destinations',
      admin: 'Administrateur',
      search: 'Rechercher',
    },
    hero: {
      title: 'Découvrez les Merveilles de l\'Asie du Sud-Est',
      subtitle: 'Des expériences sur mesure au Vietnam, Cambodge, Thaïlande et Laos. Réservez votre guide local immersif dès aujourd\'hui.',
      searchPlaceholder: 'Où voulez-vous aller?',
      btn_search: 'Rechercher',
    },
    destinations: {
      title: 'Destinations Populaires',
      subtitle: 'Explorez le cœur de l\'Asie du Sud-Est avec nos voyages sur mesure.',
    },
    tours: {
      title: 'Nos Meilleurs Circuits',
      book_now: 'Réserver',
      view_details: 'Voir les Détails',
      duration: 'jours',
      reviews: 'avis',
      filters: {
        title: 'Filtrer Par',
        location: 'Lieu',
        price: 'Prix Maximum',
      }
    },
    admin: {
      title: 'Tableau de Bord Admin',
      manage_tours: 'Gérer les Circuits',
      add_tour: 'Ajouter un Circuit',
      stats: 'Statistiques Globales',
      total_bookings: 'Réservations Totales',
      revenue: 'Revenus',
      active_tours: 'Circuits Actifs',
    },
    footer: {
      rights: '© 2026 AsiaTerra Travel. Tous droits réservés.',
    }
  }
};

export type Language = 'en' | 'fr';
export type Dictionary = typeof dictionaries['en'];
