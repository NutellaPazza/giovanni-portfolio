export type ContentKind = "experience" | "project" | "article" | "education" | "skill";

export type LinkItem = {
  label: string;
  href: string;
};

export type MediaItem = {
  src: string;
  alt: string;
  caption?: string;
};

export type RelatedItem = {
  kind: ContentKind;
  slug: string;
  title: string;
};

export type Skill = {
  id: string;
  name: string;
  category: "Finance" | "Data" | "Technology" | "Quantitative" | "Tools" | "Soft Skills";
  usedIn: RelatedItem[];
};

export type Experience = {
  id: string;
  slug: string;
  organization: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  category: "Work Experience" | "Associations" | "Sideworks" | "Competitions";
  summary: string;
  overview?: string;
  responsibilities?: string[];
  contributions?: string[];
  learned?: string;
  skills: string[];
  image?: MediaItem;
  links?: LinkItem[];
  relatedProjects?: RelatedItem[];
  relatedArticles?: RelatedItem[];
  documents?: LinkItem[];
  gallery?: MediaItem[];
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: "Projects" | "Research" | "Hackathons";
  year: string;
  status: string;
  summary: string;
  overview?: string;
  context?: string;
  idea?: string;
  approach?: string;
  contribution?: string;
  process?: string[];
  results?: string;
  learned?: string;
  skills: string[];
  collaborators?: string[];
  cover?: MediaItem;
  links?: LinkItem[];
  documents?: LinkItem[];
  relatedArticles?: RelatedItem[];
  relatedExperiences?: RelatedItem[];
  relatedProjects?: RelatedItem[];
  gallery?: MediaItem[];
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  category: "Articles" | "Research" | "Publications";
  topic: string;
  date: string;
  authors: string[];
  organization?: string;
  readingTime: string;
  summary: string;
  body: string[];
  cover?: MediaItem;
  links?: LinkItem[];
  documents?: LinkItem[];
  relatedProjects?: RelatedItem[];
  relatedExperiences?: RelatedItem[];
  relatedArticles?: RelatedItem[];
};

export type Education = {
  id: string;
  institution: string;
  program: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  coursework: string[];
  activities: string[];
  achievements: string[];
  certifications: string[];
  relatedProjects?: RelatedItem[];
  relatedArticles?: RelatedItem[];
};
