export interface AnimeDefaultData {
  code: number;
  message: string;
  page: Page;
  results: Result[];
}

interface Page {
  currentPage: number;
  hasNextPage: boolean;
}

interface Result {
  id: string;
  malId: number;
  status: string;
  title: Title;
  bannerImage: string;
  trailer: Trailer;
  description: string;
  coverImage: CoverImage;
  rating: number;
  releaseDate: number;
  color: string;
  genres: string[];
  totalEpisodes: number;
  duration: number;
  type: string;
  tags: Tag[];
  format: string;
  episodes: number;
  meanScore: number;
  season: string;
  seasonYear: number;
  averageScore: number;
  nextAiringEpisode: any;
}

interface Tag {
  id: number;
  name: string;
}

interface Title {
  romaji: string;
  english: string;
  native: string;
  userPreferred: string;
}

interface Trailer {
  id: string;
  site: string;
  thumbnail: string;
}

export interface AnimeInfo {
  code: number;
  message: string;
  id: number;
  idMal: number;
  id_provider: IdProvider;
  title: Title;
  dub: boolean;
  description: string;
  coverImage: CoverImage;
  bannerImage: string;
  genres: string[];
  status: string;
  format: string;
  episodes: number;
  year: number;
  season: string;
  duration: number;
  startIn: DateDetail;
  endIn: DateDetail;
  nextair: NextAir;
  score: Score;
  popularity: number;
  siteUrl: string;
  trailer: Trailer;
  studios: Studio[];
}

interface IdProvider {
  idGogo: string;
  idZoro: string;
  id9anime: string;
  idPahe: string;
}

interface Title {
  romaji: string;
  english: string;
  native: string;
  userPreferred: string;
}

interface CoverImage {
  large: string;
  medium: string;
  color: string;
}

interface DateDetail {
  year: number;
  month: number;
  day: number;
}

interface NextAir {
  airingAt: number;
  timeUntilAiring: number;
  episode: number;
}

interface Score {
  averageScore: number;
  decimalScore: number;
}

interface Trailer {
  id: string;
  site: string;
  thumbnail: string;
}

interface Studio {
  name: string;
}

export interface AnimeEpisodes {
  code: number;
  message: string;
  episodes: Episode[];
}

interface Episode {
  id: string;
  title: string;
  description: string;
  number: number;
  image: string;
}

export interface AnimeSearchResult {
  code: number;
  message: string;
  pageInfo: PageInfo;
  results: AnimeData[];
}

interface PageInfo {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
}

export interface AnimeData {
  id: number;
  idMal: number;
  status: string;
  title: Title;
  bannerImage: string;
  coverImage: CoverImage;
  episodes: number;
  season: string;
  format: string;
  seasonYear: number;
  averageScore: number;
  nextAiringEpisode: any; // Use appropriate type if structure of nextAiringEpisode is known
}

interface Title {
  userPreferred: string;
  romaji: string;
  english: string;
  native: string;
}

interface CoverImage {
  extraLarge: string;
  large: string;
  medium: string;
  color: string;
}
