import { GenreModel } from "./genre.model";

export class DetailsModel {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsCollectionModel;
  budget: number;
  genres: GenreModel[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompanies[];
  production_countries: ProductionCountries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos: VideosModel;
  vote_average: number;
  vote_count: number;
}

export class BelongsCollectionModel {
  backdrop_path: string;
  id: number;
  name: string;
  poster_path: string;
}

export class ProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export class ProductionCountries {
  iso_3166_1: string;
  name: string;
}

export class SpokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export class VideosModel {
  results: ResultsVideosModel[];
}

export class ResultsVideosModel {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}
