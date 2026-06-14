export interface Candidate {
  id: string;
  name: string;
  province: string;
  number: string;
  image: string;
}

export interface CalendarStep {
  step: string;
  date: string;
  title: string;
  status: "OUVERT" | "À VENIR" | "TERMINÉ" | "EN COURS";
  description?: string;
}

export interface MissionCard {
  id: string;
  title: string;
  iconName: string;
  description?: string;
}

export interface ValueCard {
  title: string;
  description: string;
  iconName: string;
}

export interface Partner {
  name: string;
  logoUrl?: string;
  isCustomSvg?: boolean;
}
