import type { Locale } from '@/i18n/config';

export type RoomText = {
  name: string;
  description: string;
  /** Positional alt texts matching the room's image array in the client component. */
  imageAlts: string[];
};

export type AmenityText = { name: string; description: string };
export type HighlightText = { title: string; description: string };

export type PropertyText = {
  title: string;
  location: string;
  description: string;
  longDescription: string;
  propertyType: string;
  rooms: RoomText[];
  amenities: AmenityText[];
  highlights: HighlightText[];
};

const enUi = {
  notFoundTitle: 'Property Not Found',
  backToProperties: 'Back to Properties',
  backAria: 'Back to properties',
  priceUnavailable: 'Dynamic price is temporarily unavailable.',
  priceUnexpected: 'Unable to calculate price',
  errors: {
    selectProperty: 'Please select a valid property before sending your request.',
    availabilityUnavailable: 'Airbnb availability is temporarily unavailable. Please try again shortly.',
    waitPriceLoading: 'Please wait for the price estimate to finish.',
    waitValidPrice: 'Please wait for a valid price estimate before sending your request.',
    nameRequired: 'Please enter your full name.',
    emailRequired: 'Please enter your email address.',
    emailInvalid: 'Please enter a valid email address.',
    phoneRequired: 'Please enter your phone number.',
    guestsRequired: 'Please enter the number of guests.',
    guestsMin: 'Please enter at least 1 guest.',
    guestsMax: (max: number) => `This property can host up to ${max} guests.`,
    fixHighlighted: 'Please fix the highlighted details before sending.',
    submitFailed: 'Failed to send reservation request.',
    submitError: 'Failed to submit reservation. Please try again.',
  },
  success: 'Thank you. Your reservation request was sent and our team will contact you within 24 hours.',
  successToast: 'Reservation request sent successfully!',
  form: {
    checkIn: 'Check-in',
    checkout: 'Checkout',
    addDate: 'Add date',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    guests: 'Guests',
    preferredContact: 'Preferred Contact Method',
    contactEmail: 'Email',
    contactPhone: 'Phone',
    contactWhatsapp: 'WhatsApp',
    sending: 'SENDING...',
    bookNow: 'BOOK NOW',
    responseGuarantee: 'Response within 24 hours guaranteed',
    quoteByEmail: 'Receive your quote by email',
  },
  gallery: {
    heroPhotoAlt: (title: string, n: number) => `${title} — photo ${n}`,
    prevPhotoAria: 'Show previous photo',
    nextPhotoAria: 'Show next photo',
    viewAllPhotosAria: 'View all photos',
    openGalleryAria: (n: number) => `Open photo gallery (photo ${n})`,
    showAllPhotos: (n: number) => `Show all ${n} photos`,
    photosByRoom: 'Photos by room',
    viewRoomPhotosAria: (name: string) => `View ${name} photos`,
    photosCount: (n: number) => `${n} photos`,
    allPhotosTitle: (title: string) => `${title} — All photos`,
    closePhotosAria: 'Close photos',
  },
  facts: {
    guests: (n: number) => `${n} guest${n === 1 ? '' : 's'}`,
    bedrooms: (n: number) => `${n} bedroom${n === 1 ? '' : 's'}`,
    beds: (n: number) => `${n} bed${n === 1 ? '' : 's'}`,
    baths: (n: number) => `${n} bath${n === 1 ? '' : 's'}`,
    typeIn: (type: string, location: string) => `${type} in ${location}`,
  },
  sections: {
    planYourStay: 'Plan your stay',
    addTravelDates: 'Add your travel dates for exact pricing.',
    aboutThisSpace: 'About this space',
    showMore: 'Show more',
    showLess: 'Show less',
    whatThisPlaceOffers: 'What this place offers',
    showAllAmenities: (n: number) => `Show all ${n} amenities`,
    closeAmenitiesAria: 'Close amenities',
  },
  bookingPanel: {
    kicker: 'Reservation',
    heading: 'Book your stay',
    subheading: 'Pick your dates and send your request — we reply within 24 hours.',
    requestToBook: 'Request to book',
    addDatesForPricing: 'Add dates for pricing',
    nightsSummary: (n: number) => `${n} night${n === 1 ? '' : 's'}`,
    inquire: 'Inquire',
    closeReservationAria: 'Close reservation',
  },
};

type PropertyDetailsUi = typeof enUi;

export type PropertyDetailsMessages = {
  ui: PropertyDetailsUi;
  properties: Record<'penthouse-jacuzzi' | 'cozy-studio', PropertyText>;
};

const en: PropertyDetailsMessages = {
  ui: enUi,
  properties: {
    'penthouse-jacuzzi': {
      title: 'Luxury Penthouse',
      location: 'Kerem HaTeimanim, Tel Aviv',
      description:
        'Luxurious penthouse featuring a private jacuzzi, BBQ area, and breathtaking sea views.',
      longDescription: `This unique penthouse located in the heart of Tel Aviv, just steps from the beach and the Carmel Market.

Perfect for both friendly or family stays equipped with amenities like the jacuzzi and barbecue, and live a unforgettable experience in a special place.

All bedrooms are equipped with a queen size bed, storage cupboards and curtains for total darkness if desired, the large bedroom is equipped with a baby bed. The kitchen is fully equipped; coffee machine, microwave, oven…

The outdoor dining area is perfect for BBQ evenings.

The main feature of this apartment is the terrace, with amenities such as BBQ, jacuzzi and sea views you can be sure to have an unforgettable experience and leave with wonderful memories!`,
      propertyType: 'Entire penthouse',
      rooms: [
        {
          name: 'Living Room',
          description: 'Bright open-plan lounge with a large sofa and rooftop access',
          imageAlts: [
            'Living room with sofa and round mirror',
            'Lounge with balcony access',
            'Open living and dining area',
            'Living room with smart TV',
          ],
        },
        {
          name: 'Kitchen',
          description: 'Fully equipped kitchen with a city-view window and modern appliances',
          imageAlts: [
            'Kitchen with city view',
            'Kitchen worktop and sink',
            'Kitchen with fridge',
            'Coffee machine, kettle and toaster',
          ],
        },
        {
          name: 'Dining Area',
          description: 'Round dining table for shared meals next to the kitchen',
          imageAlts: ['Dining table with smart TV', 'Dining table by the kitchen'],
        },
        {
          name: 'Bedroom 1',
          description: 'Master bedroom with a queen bed, wardrobe and blackout curtains',
          imageAlts: [
            'Master bedroom with queen bed',
            'Master bedroom with pendant light',
            'Master bedroom, second angle',
            'Bedroom wardrobe and door',
          ],
        },
        {
          name: 'Bedroom 2',
          description: 'Comfortable bedroom with a queen bed and natural light',
          imageAlts: ['Second bedroom with queen bed', 'Second bedroom with terrace access'],
        },
        {
          name: 'Bedroom 3',
          description: 'Cosy bedroom with a queen bed, wardrobe and full-length mirror',
          imageAlts: ['Third bedroom with queen bed', 'Third bedroom with mirror', 'Bedroom wardrobe'],
        },
        {
          name: 'Full Bathroom 1',
          description: 'Full bathroom with a walk-in shower and vanity',
          imageAlts: ['Bathroom with walk-in shower and sink'],
        },
        {
          name: 'Full Bathroom 2',
          description: 'Second full bathroom with a rain shower',
          imageAlts: ['Walk-in rain shower'],
        },
        {
          name: 'Toilet with Sink',
          description: 'Separate WC with a vessel sink',
          imageAlts: ['Vessel sink and vanity', 'Toilet with sink'],
        },
        {
          name: 'Terrace',
          description: 'Private rooftop terrace with lounge seating, BBQ, sea views and aerial views',
          imageAlts: [
            'Rooftop terrace at sunset',
            'Terrace high table and bench',
            'Terrace high table with city view',
            'Sea view down the street',
            'Aerial view of the rooftop terrace',
            'Rooftop terrace from above',
            'Terrace and jacuzzi from above',
            'Rooftop and city view',
            'Aerial view of the building and street',
          ],
        },
        {
          name: 'Laundry Area',
          description: 'Utility area with a washer and sink',
          imageAlts: ['Laundry area with washing machine'],
        },
        {
          name: 'Jacuzzi',
          description: 'Private rooftop jacuzzi with panoramic city views',
          imageAlts: ['Rooftop jacuzzi', 'Jacuzzi with city skyline'],
        },
      ],
      amenities: [
        { name: 'Beach Access', description: '2 minutes walk to the beach' },
        { name: 'BBQ Area', description: 'Outdoor BBQ with all utensils' },
        { name: 'Jacuzzi', description: 'Private rooftop jacuzzi' },
        { name: 'Air Conditioning', description: 'Central air throughout' },
        { name: 'Coffee Station', description: 'Espresso machine & coffee maker' },
        { name: 'Family Friendly', description: 'Baby cot and high chair available' },
        { name: 'Fitness Equipment', description: 'Basic exercise equipment' },
        { name: 'Laundry', description: 'Washer/dryer in unit' },
        { name: 'Work Space', description: 'Dedicated desk and chair' },
        { name: 'High-speed WiFi', description: 'Throughout the property' },
      ],
      highlights: [
        {
          title: 'Panoramic sea views',
          description: 'A full Tel Aviv coastline panorama from the private rooftop.',
        },
        {
          title: 'Private rooftop jacuzzi',
          description: 'Soak under the stars on your own terrace, no shared space.',
        },
        {
          title: 'Heart of Kerem HaTeimanim',
          description: 'Steps from the beach, the Carmel Market, and the city center.',
        },
      ],
    },
    'cozy-studio': {
      title: 'Spacious & Cosy Apartment',
      location: 'Kerem HaTeimanim, Tel Aviv',
      description: 'Completely renovated studio perfect for short to long term stays.',
      longDescription: `This renovated apartment is perfect for short, medium, and long-term stays. Fully equipped and located 2 minutes walk from the beach, the Shouk Hacarmel and the entrance of Kerem Hateimanim, live a unique experience.

Enjoy the comfort of this cosy studio apartment in the heart of Tel Aviv ☀️

The apartment is a large room divided into two parts: on one side you'll find the entrance, equipped with an opening sofa, a table with chairs, a TV hanging on the wall and the bathroom just behind it. On the other side you'll find the bed, the wardrobe and the mini-kitchen with everything you need to prepare your meals.

The studio is located on the 1st floor of a unique building that is described as a historical monument dating from the Ottoman Empire.`,
      propertyType: 'Entire studio apartment',
      rooms: [
        {
          name: 'Living Room',
          description: 'Open-plan lounge by the entrance with a comfortable sofa',
          imageAlts: [
            'Living room with sofa and dining table',
            'Lounge area near the entrance',
            'Living room sofa and dining table',
          ],
        },
        {
          name: 'Kitchenette',
          description: 'Compact kitchen fully equipped for everyday cooking',
          imageAlts: ['Kitchenette with sink and oven', 'Kitchenette with fridge', 'Cooktop and toaster oven'],
        },
        {
          name: 'Dining Area',
          description: 'Round dining table by the window',
          imageAlts: ['Dining table by the window'],
        },
        {
          name: 'Bedroom',
          description: 'Comfortable queen bed with storage',
          imageAlts: [
            'Bedroom with queen bed',
            'Bed with fresh towels',
            'Bedroom with arched window',
            'Bedroom with mirror and dresser',
            'Bedroom with TV and desk',
          ],
        },
        {
          name: 'Bathroom',
          description: 'Private bathroom with walk-in shower',
          imageAlts: ['Walk-in shower', 'Vanity with arched window'],
        },
        {
          name: 'Workspace',
          description: 'Dedicated desk and chair for remote work',
          imageAlts: ['Desk with wall-mounted TV', 'Workspace with desk and chair'],
        },
        {
          name: 'Sofa Bed Area',
          description: 'Convertible sofa near the entrance for additional sleeping space',
          imageAlts: ['Convertible sofa bed made up', 'Sofa bed area'],
        },
      ],
      amenities: [
        { name: 'Beach Access', description: '2 minutes to beach' },
        { name: 'Air Conditioning', description: 'Central air conditioning' },
        { name: 'Coffee Setup', description: 'Electric kettle & coffee maker' },
        { name: 'Mini Kitchen', description: 'Equipped for meal prep' },
        { name: 'Smart TV', description: 'Wall-mounted TV' },
        { name: 'Convertible Sofa', description: 'Additional sleeping space' },
        { name: 'Comfortable Bed', description: 'Quality bedding provided' },
        { name: 'Full Amenities', description: 'All essentials provided' },
        { name: 'High-speed WiFi', description: 'Throughout the studio' },
      ],
      highlights: [
        {
          title: 'Steps from everything',
          description: '2 minutes to the beach, the Shouk HaCarmel, and the Kerem entrance.',
        },
        {
          title: 'Sleeps four comfortably',
          description: 'Queen bed plus a convertible sofa near the entrance.',
        },
        {
          title: 'Set up to work',
          description: 'Fully renovated and equipped — ideal for medium and long stays.',
        },
      ],
    },
  },
};

const fr: PropertyDetailsMessages = {
  ui: {
    notFoundTitle: 'Propriété introuvable',
    backToProperties: 'Retour aux appartements',
    backAria: 'Retour aux appartements',
    priceUnavailable: 'Le prix dynamique est temporairement indisponible.',
    priceUnexpected: 'Impossible de calculer le prix',
    errors: {
      selectProperty: 'Veuillez sélectionner une propriété valide avant d’envoyer votre demande.',
      availabilityUnavailable:
        'Les disponibilités Airbnb sont temporairement indisponibles. Veuillez réessayer sous peu.',
      waitPriceLoading: 'Veuillez attendre la fin de l’estimation du prix.',
      waitValidPrice: 'Veuillez attendre une estimation de prix valide avant d’envoyer votre demande.',
      nameRequired: 'Veuillez saisir votre nom complet.',
      emailRequired: 'Veuillez saisir votre adresse e-mail.',
      emailInvalid: 'Veuillez saisir une adresse e-mail valide.',
      phoneRequired: 'Veuillez saisir votre numéro de téléphone.',
      guestsRequired: 'Veuillez indiquer le nombre de voyageurs.',
      guestsMin: 'Veuillez indiquer au moins 1 voyageur.',
      guestsMax: (max: number) => `Cette propriété peut accueillir jusqu'à ${max} voyageurs.`,
      fixHighlighted: 'Veuillez corriger les informations signalées avant d’envoyer.',
      submitFailed: "Échec de l'envoi de la demande de réservation.",
      submitError: "Échec de l'envoi de la réservation. Veuillez réessayer.",
    },
    success:
      'Merci. Votre demande de réservation a bien été envoyée ; notre équipe vous contactera sous 24 heures.',
    successToast: 'Demande de réservation envoyée !',
    form: {
      checkIn: 'Arrivée',
      checkout: 'Départ',
      addDate: 'Choisir une date',
      fullName: 'Nom complet',
      emailAddress: 'Adresse e-mail',
      phoneNumber: 'Numéro de téléphone',
      guests: 'Voyageurs',
      preferredContact: 'Mode de contact préféré',
      contactEmail: 'E-mail',
      contactPhone: 'Téléphone',
      contactWhatsapp: 'WhatsApp',
      sending: 'ENVOI...',
      bookNow: 'RÉSERVER',
      responseGuarantee: 'Réponse garantie sous 24 heures',
      quoteByEmail: 'Recevez votre devis par e-mail',
    },
    gallery: {
      heroPhotoAlt: (title: string, n: number) => `${title} — photo ${n}`,
      prevPhotoAria: 'Photo précédente',
      nextPhotoAria: 'Photo suivante',
      viewAllPhotosAria: 'Voir toutes les photos',
      openGalleryAria: (n: number) => `Ouvrir la galerie photo (photo ${n})`,
      showAllPhotos: (n: number) => `Voir les ${n} photos`,
      photosByRoom: 'Photos par pièce',
      viewRoomPhotosAria: (name: string) => `Voir les photos : ${name}`,
      photosCount: (n: number) => `${n} photos`,
      allPhotosTitle: (title: string) => `${title} — Toutes les photos`,
      closePhotosAria: 'Fermer les photos',
    },
    facts: {
      guests: (n: number) => `${n} voyageur${n === 1 ? '' : 's'}`,
      bedrooms: (n: number) => `${n} chambre${n === 1 ? '' : 's'}`,
      beds: (n: number) => `${n} lit${n === 1 ? '' : 's'}`,
      baths: (n: number) => `${n} salle${n === 1 ? '' : 's'} de bain`,
      typeIn: (type: string, location: string) => `${type} à ${location}`,
    },
    sections: {
      planYourStay: 'Préparez votre séjour',
      addTravelDates: 'Ajoutez vos dates de voyage pour un prix exact.',
      aboutThisSpace: 'À propos de ce logement',
      showMore: 'Voir plus',
      showLess: 'Voir moins',
      whatThisPlaceOffers: 'Ce que propose ce logement',
      showAllAmenities: (n: number) => `Voir les ${n} équipements`,
      closeAmenitiesAria: 'Fermer les équipements',
    },
    bookingPanel: {
      kicker: 'Réservation',
      heading: 'Réservez votre séjour',
      subheading: 'Choisissez vos dates et envoyez votre demande — nous répondons sous 24 heures.',
      requestToBook: 'Demande de réservation',
      addDatesForPricing: 'Ajoutez vos dates pour voir le prix',
      nightsSummary: (n: number) => `${n} nuit${n === 1 ? '' : 's'}`,
      inquire: 'Réserver',
      closeReservationAria: 'Fermer la réservation',
    },
  },
  properties: {
    'penthouse-jacuzzi': {
      title: 'Penthouse de luxe',
      location: 'Kerem HaTeimanim, Tel Aviv',
      description:
        'Penthouse luxueux avec jacuzzi privé, espace barbecue et vue imprenable sur la mer.',
      longDescription: `Ce penthouse unique est situé au cœur de Tel Aviv, à quelques pas de la plage et du marché du Carmel.

Parfait pour des séjours entre amis ou en famille, équipé de prestations comme le jacuzzi et le barbecue, pour vivre une expérience inoubliable dans un lieu à part.

Toutes les chambres disposent d'un lit queen size, de placards de rangement et de rideaux occultants pour une obscurité totale si vous le souhaitez ; la grande chambre est équipée d'un lit bébé. La cuisine est entièrement équipée : machine à café, micro-ondes, four…

Le coin repas extérieur est parfait pour les soirées barbecue.

L'atout majeur de cet appartement est sa terrasse : avec le barbecue, le jacuzzi et la vue mer, vous êtes certains de vivre une expérience inoubliable et de repartir avec de merveilleux souvenirs !`,
      propertyType: 'Penthouse entier',
      rooms: [
        {
          name: 'Salon',
          description: 'Salon lumineux et ouvert avec grand canapé et accès au toit-terrasse',
          imageAlts: [
            'Salon avec canapé et miroir rond',
            'Salon avec accès au balcon',
            'Espace salon-salle à manger ouvert',
            'Salon avec Smart TV',
          ],
        },
        {
          name: 'Cuisine',
          description: 'Cuisine entièrement équipée avec fenêtre sur la ville et électroménager moderne',
          imageAlts: [
            'Cuisine avec vue sur la ville',
            'Plan de travail et évier',
            'Cuisine avec réfrigérateur',
            'Machine à café, bouilloire et grille-pain',
          ],
        },
        {
          name: 'Coin repas',
          description: 'Table ronde pour les repas partagés, à côté de la cuisine',
          imageAlts: ['Table à manger avec Smart TV', 'Table à manger près de la cuisine'],
        },
        {
          name: 'Chambre 1',
          description: 'Chambre principale avec lit queen size, armoire et rideaux occultants',
          imageAlts: [
            'Chambre principale avec lit queen size',
            'Chambre principale avec suspension',
            'Chambre principale, autre angle',
            'Armoire et porte de la chambre',
          ],
        },
        {
          name: 'Chambre 2',
          description: 'Chambre confortable avec lit queen size et lumière naturelle',
          imageAlts: ['Deuxième chambre avec lit queen size', 'Deuxième chambre avec accès terrasse'],
        },
        {
          name: 'Chambre 3',
          description: 'Chambre chaleureuse avec lit queen size, armoire et miroir en pied',
          imageAlts: ['Troisième chambre avec lit queen size', 'Troisième chambre avec miroir', 'Armoire de la chambre'],
        },
        {
          name: 'Salle de bain 1',
          description: "Salle de bain complète avec douche à l'italienne et meuble vasque",
          imageAlts: ["Salle de bain avec douche à l'italienne et lavabo"],
        },
        {
          name: 'Salle de bain 2',
          description: 'Deuxième salle de bain complète avec douche à effet pluie',
          imageAlts: ["Douche à l'italienne à effet pluie"],
        },
        {
          name: 'WC avec lavabo',
          description: 'WC séparés avec vasque à poser',
          imageAlts: ['Vasque à poser et meuble', 'WC avec lavabo'],
        },
        {
          name: 'Terrasse',
          description: 'Terrasse privée sur le toit avec salon extérieur, barbecue, vue mer et vues aériennes',
          imageAlts: [
            'Terrasse sur le toit au coucher du soleil',
            'Table haute et banc de la terrasse',
            'Table haute avec vue sur la ville',
            'Vue mer au bout de la rue',
            'Vue aérienne de la terrasse',
            "Terrasse vue d'en haut",
            "Terrasse et jacuzzi vus d'en haut",
            'Toit et vue sur la ville',
            "Vue aérienne de l'immeuble et de la rue",
          ],
        },
        {
          name: 'Buanderie',
          description: 'Espace utilitaire avec lave-linge et évier',
          imageAlts: ['Buanderie avec lave-linge'],
        },
        {
          name: 'Jacuzzi',
          description: 'Jacuzzi privé sur le toit avec vue panoramique sur la ville',
          imageAlts: ['Jacuzzi sur le toit', 'Jacuzzi avec la skyline de la ville'],
        },
      ],
      amenities: [
        { name: 'Accès plage', description: '2 minutes à pied de la plage' },
        { name: 'Espace barbecue', description: 'Barbecue extérieur avec tous les ustensiles' },
        { name: 'Jacuzzi', description: 'Jacuzzi privé sur le toit' },
        { name: 'Climatisation', description: 'Climatisation centralisée partout' },
        { name: 'Coin café', description: 'Machine à expresso et cafetière' },
        { name: 'Adapté aux familles', description: 'Lit bébé et chaise haute disponibles' },
        { name: 'Équipement fitness', description: "Matériel d'exercice de base" },
        { name: 'Buanderie', description: "Lave-linge/sèche-linge dans l'appartement" },
        { name: 'Espace de travail', description: 'Bureau et chaise dédiés' },
        { name: 'WiFi haut débit', description: 'Dans tout le logement' },
      ],
      highlights: [
        {
          title: 'Vue mer panoramique',
          description: 'Un panorama complet du littoral de Tel Aviv depuis le toit privé.',
        },
        {
          title: 'Jacuzzi privé sur le toit',
          description: 'Détendez-vous sous les étoiles sur votre propre terrasse, sans espace partagé.',
        },
        {
          title: 'Au cœur de Kerem HaTeimanim',
          description: 'À quelques pas de la plage, du marché du Carmel et du centre-ville.',
        },
      ],
    },
    'cozy-studio': {
      title: 'Appartement spacieux et chaleureux',
      location: 'Kerem HaTeimanim, Tel Aviv',
      description: 'Studio entièrement rénové, parfait pour les séjours courts comme longs.',
      longDescription: `Cet appartement rénové est parfait pour les séjours courts, moyens et longs. Entièrement équipé et situé à 2 minutes à pied de la plage, du Shouk Hacarmel et de l'entrée de Kerem Hateimanim, vivez une expérience unique.

Profitez du confort de ce studio chaleureux au cœur de Tel Aviv ☀️

L'appartement est une grande pièce divisée en deux parties : d'un côté l'entrée, équipée d'un canapé convertible, d'une table avec chaises, d'une TV murale et de la salle de bain juste derrière. De l'autre côté, le lit, l'armoire et la mini-cuisine avec tout le nécessaire pour préparer vos repas.

Le studio se trouve au 1er étage d'un immeuble unique, classé monument historique datant de l'Empire ottoman.`,
      propertyType: 'Studio entier',
      rooms: [
        {
          name: 'Salon',
          description: "Salon ouvert près de l'entrée avec canapé confortable",
          imageAlts: [
            'Salon avec canapé et table à manger',
            "Coin salon près de l'entrée",
            'Canapé du salon et table à manger',
          ],
        },
        {
          name: 'Kitchenette',
          description: 'Cuisine compacte entièrement équipée pour le quotidien',
          imageAlts: ['Kitchenette avec évier et four', 'Kitchenette avec réfrigérateur', 'Plaque de cuisson et mini-four'],
        },
        {
          name: 'Coin repas',
          description: 'Table ronde près de la fenêtre',
          imageAlts: ['Table à manger près de la fenêtre'],
        },
        {
          name: 'Chambre',
          description: 'Lit queen size confortable avec rangements',
          imageAlts: [
            'Chambre avec lit queen size',
            'Lit avec serviettes propres',
            'Chambre avec fenêtre en arche',
            'Chambre avec miroir et commode',
            'Chambre avec TV et bureau',
          ],
        },
        {
          name: 'Salle de bain',
          description: "Salle de bain privée avec douche à l'italienne",
          imageAlts: ["Douche à l'italienne", 'Meuble vasque avec fenêtre en arche'],
        },
        {
          name: 'Espace de travail',
          description: 'Bureau et chaise dédiés pour le télétravail',
          imageAlts: ['Bureau avec TV murale', 'Espace de travail avec bureau et chaise'],
        },
        {
          name: 'Coin canapé-lit',
          description: "Canapé convertible près de l'entrée pour un couchage supplémentaire",
          imageAlts: ['Canapé-lit déplié', 'Coin canapé-lit'],
        },
      ],
      amenities: [
        { name: 'Accès plage', description: '2 minutes de la plage' },
        { name: 'Climatisation', description: 'Climatisation centralisée' },
        { name: 'Coin café', description: 'Bouilloire électrique et cafetière' },
        { name: 'Mini-cuisine', description: 'Équipée pour cuisiner' },
        { name: 'Smart TV', description: 'TV murale' },
        { name: 'Canapé convertible', description: 'Couchage supplémentaire' },
        { name: 'Lit confortable', description: 'Literie de qualité fournie' },
        { name: 'Tout équipé', description: "Tout l'essentiel fourni" },
        { name: 'WiFi haut débit', description: 'Dans tout le studio' },
      ],
      highlights: [
        {
          title: 'À deux pas de tout',
          description: "2 minutes de la plage, du Shouk HaCarmel et de l'entrée du Kerem.",
        },
        {
          title: 'Couchage pour quatre',
          description: "Lit queen size plus un canapé convertible près de l'entrée.",
        },
        {
          title: 'Prêt pour le télétravail',
          description: 'Entièrement rénové et équipé — idéal pour les séjours moyens et longs.',
        },
      ],
    },
  },
};

const he: PropertyDetailsMessages = {
  ui: {
    notFoundTitle: 'הנכס לא נמצא',
    backToProperties: 'חזרה לדירות',
    backAria: 'חזרה לדירות',
    priceUnavailable: 'המחיר הדינמי אינו זמין כרגע.',
    priceUnexpected: 'לא ניתן לחשב מחיר',
    errors: {
      selectProperty: 'אנא בחרו נכס תקין לפני שליחת הבקשה.',
      availabilityUnavailable: 'זמינות Airbnb אינה זמינה כרגע. אנא נסו שוב בעוד רגע.',
      waitPriceLoading: 'אנא המתינו לסיום הערכת המחיר.',
      waitValidPrice: 'אנא המתינו להערכת מחיר תקינה לפני שליחת הבקשה.',
      nameRequired: 'אנא הכניסו שם מלא.',
      emailRequired: 'אנא הכניסו כתובת אימייל.',
      emailInvalid: 'אנא הכניסו כתובת אימייל תקינה.',
      phoneRequired: 'אנא הכניסו מספר טלפון.',
      guestsRequired: 'אנא הכניסו את מספר האורחים.',
      guestsMin: 'אנא הכניסו לפחות אורח אחד.',
      guestsMax: (max: number) => `הנכס יכול לארח עד ${max} אורחים.`,
      fixHighlighted: 'אנא תקנו את הפרטים המסומנים לפני השליחה.',
      submitFailed: 'שליחת בקשת ההזמנה נכשלה.',
      submitError: 'שליחת ההזמנה נכשלה. אנא נסו שוב.',
    },
    success: 'תודה. בקשת ההזמנה נשלחה והצוות שלנו ייצור איתכם קשר תוך 24 שעות.',
    successToast: 'בקשת ההזמנה נשלחה בהצלחה!',
    form: {
      checkIn: 'צ׳ק-אין',
      checkout: 'צ׳ק-אאוט',
      addDate: 'בחרו תאריך',
      fullName: 'שם מלא',
      emailAddress: 'כתובת אימייל',
      phoneNumber: 'מספר טלפון',
      guests: 'אורחים',
      preferredContact: 'דרך התקשרות מועדפת',
      contactEmail: 'אימייל',
      contactPhone: 'טלפון',
      contactWhatsapp: 'וואטסאפ',
      sending: 'שולח...',
      bookNow: 'להזמנה',
      responseGuarantee: 'מענה מובטח תוך 24 שעות',
      quoteByEmail: 'קבלו את ההצעה שלכם במייל',
    },
    gallery: {
      heroPhotoAlt: (title: string, n: number) => `${title} — תמונה ${n}`,
      prevPhotoAria: 'התמונה הקודמת',
      nextPhotoAria: 'התמונה הבאה',
      viewAllPhotosAria: 'צפייה בכל התמונות',
      openGalleryAria: (n: number) => `פתיחת גלריית התמונות (תמונה ${n})`,
      showAllPhotos: (n: number) => `הצגת כל ${n} התמונות`,
      photosByRoom: 'תמונות לפי חדר',
      viewRoomPhotosAria: (name: string) => `צפייה בתמונות: ${name}`,
      photosCount: (n: number) => `${n} תמונות`,
      allPhotosTitle: (title: string) => `${title} — כל התמונות`,
      closePhotosAria: 'סגירת התמונות',
    },
    facts: {
      guests: (n: number) => (n === 1 ? 'אורח אחד' : `${n} אורחים`),
      bedrooms: (n: number) => (n === 1 ? 'חדר שינה' : `${n} חדרי שינה`),
      beds: (n: number) => (n === 1 ? 'מיטה אחת' : `${n} מיטות`),
      baths: (n: number) => (n === 1 ? 'חדר רחצה' : `${n} חדרי רחצה`),
      typeIn: (type: string, location: string) => `${type} ב${location}`,
    },
    sections: {
      planYourStay: 'תכננו את השהות',
      addTravelDates: 'הוסיפו תאריכים לקבלת מחיר מדויק.',
      aboutThisSpace: 'על המקום',
      showMore: 'להצגת עוד',
      showLess: 'להצגת פחות',
      whatThisPlaceOffers: 'מה המקום מציע',
      showAllAmenities: (n: number) => `הצגת כל ${n} המתקנים`,
      closeAmenitiesAria: 'סגירת המתקנים',
    },
    bookingPanel: {
      kicker: 'הזמנה',
      heading: 'הזמינו את השהות שלכם',
      subheading: 'בחרו תאריכים ושלחו בקשה — אנחנו עונים תוך 24 שעות.',
      requestToBook: 'בקשת הזמנה',
      addDatesForPricing: 'הוסיפו תאריכים לקבלת מחיר',
      nightsSummary: (n: number) => (n === 1 ? 'לילה אחד' : `${n} לילות`),
      inquire: 'להזמנה',
      closeReservationAria: 'סגירת ההזמנה',
    },
  },
  properties: {
    'penthouse-jacuzzi': {
      title: 'פנטהאוז יוקרה',
      location: 'כרם התימנים, תל אביב',
      description: 'פנטהאוז יוקרתי עם ג׳קוזי פרטי, פינת מנגל ונוף עוצר נשימה לים.',
      longDescription: `פנטהאוז ייחודי בלב תל אביב, צעדים ספורים מהים ומשוק הכרמל.

מושלם לשהות עם חברים או משפחה, מאובזר בג׳קוזי ובמנגל — חוויה בלתי נשכחת במקום מיוחד.

בכל חדרי השינה מיטה זוגית רחבה, ארונות אחסון ווילונות האפלה מלאה למי שמעוניין; בחדר הגדול יש גם מיטת תינוק. המטבח מאובזר במלואו: מכונת קפה, מיקרוגל, תנור…

פינת האוכל החיצונית מושלמת לערבי מנגל.

הייחוד הגדול של הדירה הוא המרפסת: עם מנגל, ג׳קוזי ונוף לים, מובטחת לכם חוויה בלתי נשכחת וזיכרונות נפלאים!`,
      propertyType: 'פנטהאוז שלם',
      rooms: [
        {
          name: 'סלון',
          description: 'סלון מואר ופתוח עם ספה גדולה וגישה לגג',
          imageAlts: [
            'סלון עם ספה ומראה עגולה',
            'סלון עם גישה למרפסת',
            'חלל מגורים ואוכל פתוח',
            'סלון עם טלוויזיה חכמה',
          ],
        },
        {
          name: 'מטבח',
          description: 'מטבח מאובזר במלואו עם חלון לנוף עירוני ומכשירי חשמל מודרניים',
          imageAlts: [
            'מטבח עם נוף לעיר',
            'משטח עבודה וכיור',
            'מטבח עם מקרר',
            'מכונת קפה, קומקום ומצנם',
          ],
        },
        {
          name: 'פינת אוכל',
          description: 'שולחן אוכל עגול לארוחות משותפות, צמוד למטבח',
          imageAlts: ['שולחן אוכל עם טלוויזיה חכמה', 'שולחן אוכל ליד המטבח'],
        },
        {
          name: 'חדר שינה 1',
          description: 'חדר שינה ראשי עם מיטה זוגית רחבה, ארון ווילונות האפלה',
          imageAlts: [
            'חדר שינה ראשי עם מיטה זוגית',
            'חדר שינה ראשי עם מנורה תלויה',
            'חדר שינה ראשי, זווית נוספת',
            'ארון ודלת חדר השינה',
          ],
        },
        {
          name: 'חדר שינה 2',
          description: 'חדר שינה נוח עם מיטה זוגית רחבה ואור טבעי',
          imageAlts: ['חדר שינה שני עם מיטה זוגית', 'חדר שינה שני עם יציאה למרפסת'],
        },
        {
          name: 'חדר שינה 3',
          description: 'חדר שינה נעים עם מיטה זוגית, ארון ומראה בגובה מלא',
          imageAlts: ['חדר שינה שלישי עם מיטה זוגית', 'חדר שינה שלישי עם מראה', 'ארון חדר השינה'],
        },
        {
          name: 'חדר רחצה 1',
          description: 'חדר רחצה מלא עם מקלחון וארון אמבטיה',
          imageAlts: ['חדר רחצה עם מקלחון וכיור'],
        },
        {
          name: 'חדר רחצה 2',
          description: 'חדר רחצה שני עם מקלחת גשם',
          imageAlts: ['מקלחון עם מקלחת גשם'],
        },
        {
          name: 'שירותים עם כיור',
          description: 'שירותים נפרדים עם כיור מונח',
          imageAlts: ['כיור מונח וארונית', 'שירותים עם כיור'],
        },
        {
          name: 'מרפסת גג',
          description: 'מרפסת גג פרטית עם פינת ישיבה, מנגל, נוף לים ותצפיות אוויריות',
          imageAlts: [
            'מרפסת הגג בשקיעה',
            'שולחן בר וספסל במרפסת',
            'שולחן בר עם נוף לעיר',
            'נוף לים במורד הרחוב',
            'מבט אווירי על מרפסת הגג',
            'מרפסת הגג מלמעלה',
            'המרפסת והג׳קוזי מלמעלה',
            'הגג ונוף העיר',
            'מבט אווירי על הבניין והרחוב',
          ],
        },
        {
          name: 'פינת כביסה',
          description: 'פינת שירות עם מכונת כביסה וכיור',
          imageAlts: ['פינת כביסה עם מכונת כביסה'],
        },
        {
          name: 'ג׳קוזי',
          description: 'ג׳קוזי פרטי על הגג עם נוף פנורמי לעיר',
          imageAlts: ['ג׳קוזי על הגג', 'ג׳קוזי עם קו הרקיע של העיר'],
        },
      ],
      amenities: [
        { name: 'גישה לים', description: '2 דקות הליכה מהים' },
        { name: 'פינת מנגל', description: 'מנגל חיצוני עם כל הכלים' },
        { name: 'ג׳קוזי', description: 'ג׳קוזי פרטי על הגג' },
        { name: 'מיזוג אוויר', description: 'מיזוג מרכזי בכל הדירה' },
        { name: 'פינת קפה', description: 'מכונת אספרסו וכלי קפה' },
        { name: 'ידידותי למשפחות', description: 'מיטת תינוק וכיסא אוכל זמינים' },
        { name: 'ציוד כושר', description: 'ציוד אימון בסיסי' },
        { name: 'כביסה', description: 'מכונת כביסה ומייבש בדירה' },
        { name: 'פינת עבודה', description: 'שולחן עבודה וכיסא' },
        { name: 'WiFi מהיר', description: 'בכל הדירה' },
      ],
      highlights: [
        {
          title: 'נוף פנורמי לים',
          description: 'פנורמה מלאה של קו החוף של תל אביב מהגג הפרטי.',
        },
        {
          title: 'ג׳קוזי פרטי על הגג',
          description: 'השרו תחת הכוכבים במרפסת משלכם, ללא שטח משותף.',
        },
        {
          title: 'בלב כרם התימנים',
          description: 'צעדים ספורים מהים, משוק הכרמל וממרכז העיר.',
        },
      ],
    },
    'cozy-studio': {
      title: 'דירה מרווחת ונעימה',
      location: 'כרם התימנים, תל אביב',
      description: 'סטודיו משופץ כולו, מושלם לשהות קצרה או ארוכה.',
      longDescription: `דירה משופצת, מושלמת לשהות קצרה, בינונית וארוכה. מאובזרת במלואה וממוקמת 2 דקות הליכה מהים, משוק הכרמל ומהכניסה לכרם התימנים — חוויה ייחודית.

תיהנו מהנוחות של סטודיו נעים בלב תל אביב ☀️

הדירה היא חדר גדול המחולק לשניים: בצד אחד הכניסה, עם ספה נפתחת, שולחן וכיסאות, טלוויזיה תלויה על הקיר וחדר הרחצה ממש מאחור. בצד השני המיטה, הארון והמטבחון עם כל מה שצריך להכנת ארוחות.

הסטודיו נמצא בקומה הראשונה של בניין ייחודי המוכרז כאתר מורשת מתקופת האימפריה העות׳מאנית.`,
      propertyType: 'דירת סטודיו שלמה',
      rooms: [
        {
          name: 'סלון',
          description: 'סלון פתוח ליד הכניסה עם ספה נוחה',
          imageAlts: [
            'סלון עם ספה ושולחן אוכל',
            'פינת ישיבה ליד הכניסה',
            'ספת הסלון ושולחן האוכל',
          ],
        },
        {
          name: 'מטבחון',
          description: 'מטבח קומפקטי מאובזר במלואו לבישול יומיומי',
          imageAlts: ['מטבחון עם כיור ותנור', 'מטבחון עם מקרר', 'כיריים וטוסטר אובן'],
        },
        {
          name: 'פינת אוכל',
          description: 'שולחן אוכל עגול ליד החלון',
          imageAlts: ['שולחן אוכל ליד החלון'],
        },
        {
          name: 'חדר שינה',
          description: 'מיטה זוגית רחבה ונוחה עם אחסון',
          imageAlts: [
            'חדר שינה עם מיטה זוגית',
            'מיטה עם מגבות נקיות',
            'חדר שינה עם חלון מקושת',
            'חדר שינה עם מראה ושידה',
            'חדר שינה עם טלוויזיה ושולחן עבודה',
          ],
        },
        {
          name: 'חדר רחצה',
          description: 'חדר רחצה פרטי עם מקלחון',
          imageAlts: ['מקלחון', 'ארון אמבטיה עם חלון מקושת'],
        },
        {
          name: 'פינת עבודה',
          description: 'שולחן עבודה וכיסא לעבודה מרחוק',
          imageAlts: ['שולחן עבודה עם טלוויזיה על הקיר', 'פינת עבודה עם שולחן וכיסא'],
        },
        {
          name: 'פינת ספה נפתחת',
          description: 'ספה נפתחת ליד הכניסה למקום שינה נוסף',
          imageAlts: ['ספה נפתחת פתוחה ומוצעת', 'פינת הספה הנפתחת'],
        },
      ],
      amenities: [
        { name: 'גישה לים', description: '2 דקות מהים' },
        { name: 'מיזוג אוויר', description: 'מיזוג מרכזי' },
        { name: 'פינת קפה', description: 'קומקום חשמלי וכלי קפה' },
        { name: 'מטבחון', description: 'מאובזר להכנת ארוחות' },
        { name: 'טלוויזיה חכמה', description: 'טלוויזיה תלויה על הקיר' },
        { name: 'ספה נפתחת', description: 'מקום שינה נוסף' },
        { name: 'מיטה נוחה', description: 'מצעים איכותיים' },
        { name: 'אבזור מלא', description: 'כל מה שצריך' },
        { name: 'WiFi מהיר', description: 'בכל הסטודיו' },
      ],
      highlights: [
        {
          title: 'צעדים מהכול',
          description: '2 דקות מהים, משוק הכרמל ומהכניסה לכרם.',
        },
        {
          title: 'שינה נוחה לארבעה',
          description: 'מיטה זוגית רחבה ועוד ספה נפתחת ליד הכניסה.',
        },
        {
          title: 'מוכן לעבודה',
          description: 'משופץ ומאובזר במלואו — אידיאלי לשהיות בינוניות וארוכות.',
        },
      ],
    },
  },
};

export const propertyDetailsMessages: Record<Locale, PropertyDetailsMessages> = { en, fr, he };
