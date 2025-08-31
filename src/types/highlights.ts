export interface JourneyStep {
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  code: string;
  language: string;
  gradient: string;
}

export interface StackCategory {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  technologies: string[];
  words: string[];
  gradient: string;
  activeGradient: string;
}