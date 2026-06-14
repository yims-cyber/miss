import { Candidate, CalendarStep, MissionCard, ValueCard, Partner } from "./types";

export const APP_NAME = "Miss Nationale DRC 2026";

export const HERO_ASSETS = {
  heroImage: "/src/assets/images/miss_nationale_hero_1781411186171.jpg",
  carPrize: "/src/assets/images/miss_car_prize_1781411202180.jpg",
  kingCrown: "/src/assets/images/king_crown_prize_1781411217666.jpg"
};

export const NAVIGATION_LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#apropos" },
  { label: "Casting", href: "#casting" },
  { label: "Candidates", href: "#candidates" },
  { label: "Vote", href: "#vote" },
  { label: "Partenaires", href: "#partenaires" },
  { label: "Contact", href: "#contact" }
];

export const HERO_STATS = [
  { value: "26", label: "Provinces", description: "Toutes les provinces unies" },
  { value: "20", label: "Finalistes", description: "L'élite de la sélection" },
  { value: "500+", label: "Candidats", description: "Postulantes nationales" },
  { value: "100K+", label: "Votes attendus", description: "Participation populaire" }
];

export const ABOUT_INFO = {
  tagline: "À PROPOS & MISSIONS",
  title: "MISS NATIONALE DRC - Révéler la grandeur, porter la RDC au sommet du monde.",
  visionTitle: "VISION",
  visionText: "Devenir la référence nationale et internationale de la beauté, de l'intelligence et de la culture congolaise.",
  mainParagraph: "Le concours de Miss Nationale République Démocratique du Congo vise à magnifier non seulement l'esthétique, mais surtout l'intelligence, la dignité et le leadership de la jeune femme congolaise. Notre plateforme forme les ambassadrices de demain qui inspireront la nation et porteront haut ses couleurs à l'international."
};

export const MISSIONS_LIST: MissionCard[] = [
  {
    id: "01",
    title: "Représentation internationale",
    iconName: "Globe",
    description: "Devenir la voix officielle et élégante du Congo sur les scènes internationales les plus prestigieuses."
  },
  {
    id: "02",
    title: "Valorisation de la femme",
    iconName: "UserCheck",
    description: "Célébrer et autonomiser l'esprit d'initiative, l'intelligence et l'indépendance de la femme."
  },
  {
    id: "03",
    title: "Rayonnement national",
    iconName: "Compass",
    description: "Promouvoir la culture, la mode et le patrimoine des 26 provinces de notre beau pays."
  },
  {
    id: "04",
    title: "Formation",
    iconName: "GraduationCap",
    description: "Offrir un accompagnement intensif en leadership, prise de parole, maintien et relations diplomatiques."
  },
  {
    id: "05",
    title: "Impact social",
    iconName: "Heart",
    description: "S'engager concrètement dans le développement d'initiatives philanthropiques à l'échelle nationale."
  },
  {
    id: "06",
    title: "Édition annuelle",
    iconName: "Calendar",
    description: "Maintenir des standards mondiaux d'organisation pour faire de chaque édition un triomphe."
  }
];

export const VALUES_LIST: ValueCard[] = [
  {
    title: "Élégance",
    description: "Incarne la grâce et la sophistication congolaise.",
    iconName: "Sparkles"
  },
  {
    title: "Diversité",
    description: "Célébre la richesse culturelle de nos 26 provinces.",
    iconName: "Users"
  },
  {
    title: "Confiance",
    description: "Inspire par l'assurance et le leadership.",
    iconName: "Award"
  },
  {
    title: "Engagement",
    description: "Dévouement aux causes sociales et humanitaires.",
    iconName: "HeartHandshake"
  }
];

export const REGULATION_INFO = {
  requirements: [
    "Pièce d'identité",
    "Photo récente",
    "Formulaire rempli",
    "Certificat médical"
  ],
  table: [
    { label: "Nationalité", value: "Congolaise (RDC)" },
    { label: "Taille", value: "1m60 min" },
    { label: "Âge", value: "18-30 ans" },
    { label: "Statut", value: "Célibataire" }
  ],
  targetDate: "2026-05-27T00:00:00"
};

export const REWARDS_INFO = [
  {
    rank: "MISS NATIONALE DRC 2026",
    image: HERO_ASSETS.carPrize,
    perks: [
      "Voiture IST",
      "Contrats Publicitaires",
      "Visibilité Médiatique Internationale"
    ]
  },
  {
    rank: "LES 5 DAUPHINES",
    image: HERO_ASSETS.kingCrown,
    perks: [
      "Bourses d'Études",
      "Contrats de Partenariat",
      "Opportunités de Carrière"
    ]
  }
];

export const CANDIDATES_LIST: Candidate[] = [
  {
    id: "cand1",
    name: "Daniella M.",
    province: "KINSHASA",
    number: "N°01",
    image: "/src/assets/images/candidate_daniella_1781411235051.jpg"
  },
  {
    id: "cand2",
    name: "Djenny K.",
    province: "LUBUMBASHI",
    number: "N°02",
    image: "/src/assets/images/candidate_djenny_1781411252428.jpg"
  },
  {
    id: "cand3",
    name: "Danena A.",
    province: "LUBUMBASHI",
    number: "N°03",
    image: "/src/assets/images/candidate_danena_1781411268128.jpg"
  },
  {
    id: "cand4",
    name: "Juanna G.",
    province: "KINSHASA",
    number: "N°04",
    image: "/src/assets/images/candidate_daniella_1781411235051.jpg" // Reusable high fidelity portrait
  },
  {
    id: "cand5",
    name: "Barusa E.",
    province: "KINSHASA",
    number: "N°05",
    image: "/src/assets/images/candidate_djenny_1781411252428.jpg" // Reusable high-fidelity portrait
  },
  {
    id: "cand6",
    name: "Nana A.",
    province: "KINSHASA",
    number: "N°06",
    image: "/src/assets/images/candidate_danena_1781411268128.jpg" // Reusable high-fidelity portrait
  }
];

export const CALENDAR_STEPS: CalendarStep[] = [
  {
    step: "STEP 01",
    date: "10 AVRIL",
    title: "Lancement des Inscriptions",
    status: "OUVERT",
    description: "Appel de candidature sur l'ensemble du territoire national et pour la diaspora."
  },
  {
    step: "STEP 02",
    date: "15 MAI",
    title: "Clôture des Inscriptions",
    status: "À VENIR",
    description: "Date limite de soumission des dossiers de candidature complets."
  },
  {
    step: "STEP 03",
    date: "1 JUIN",
    title: "Présélection Provinciale",
    status: "À VENIR",
    description: "Phases d'audition dans les chefs-lieux des provinces de la RDC."
  },
  {
    step: "STEP 04",
    date: "15 JUIN",
    title: "Formation des Finalistes",
    status: "À VENIR",
    description: "L'académie d'excellence commence avec le coaching intensif de nos reines."
  },
  {
    step: "STEP 05",
    date: "1 JUILLET",
    title: "Shooting Officiel",
    status: "À VENIR",
    description: "Séances de portrait officiel et réalisation des fiches de communication."
  },
  {
    step: "STEP 06",
    date: "15 JUILLET",
    title: "Lancement du Vote Public",
    status: "À VENIR",
    description: "Le public congolais commence à voter en ligne pour soutenir sa candidate."
  },
  {
    step: "STEP 07",
    date: "1 AOÛT",
    title: "Activités Sociales",
    status: "À VENIR",
    description: "Travaux humanitaires et projets d'impact social des finalistes."
  },
  {
    step: "STEP 08",
    date: "15 AOÛT",
    title: "Répétitions Finales",
    status: "À VENIR",
    description: "Pratique des chorégraphies et des interventions orales de la finale."
  },
  {
    step: "STEP 09",
    date: "1 SEPT",
    title: "Défilé de Mode National",
    status: "À VENIR",
    description: "Passage préliminaire mettant en valeur les créateurs et designers congolais."
  },
  {
    step: "STEP 10",
    date: "15 SEPT",
    title: "Soirée de Gala",
    status: "À VENIR",
    description: "Événement mondain de bienfaisance au profit de causes communautaires."
  },
  {
    step: "STEP 11",
    date: "1 OCT",
    title: "Demi-Finale Régionale",
    status: "À VENIR",
    description: "Sélection restreinte pour déterminer les grandes ambassadrices nationales."
  },
  {
    step: "STEP 12",
    date: "15 OCT",
    title: "Annonce du Top 10",
    status: "À VENIR",
    description: "Révélation des 10 candidates qualifiées pour la nuit sacrée du verdict."
  },
  {
    step: "STEP 13",
    date: "1 NOV",
    title: "GRANDE FINALE KINSHASA",
    status: "À VENIR",
    description: "Couronnement de Miss Nationale DRC 2026 à Kinshasa."
  }
];

export const PARTNERS_LIST: Partner[] = [
  { name: "africell" },
  { name: "CANAL+" },
  { name: "Pupicity" },
  { name: "Sodal" },
  { name: "Zodal" },
  { name: "Microsoft" }
];
