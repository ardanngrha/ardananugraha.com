export interface JourneyStep {
  year: string;
  title: string;
  description: string;
  icon: string;
  code: string;
  language: string;
  gradient: string;
}

export interface StackCategory {
  id: string;
  title: string;
  icon: string;
  technologies: string[];
  words: string[];
  gradient: string;
  activeGradient: string;
}
