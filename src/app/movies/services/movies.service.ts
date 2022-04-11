import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieModel } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  api = 'https://api.themoviedb.org/3/';
  endpoint = 'search/movie';
  apiKey = '?api_key=e157adc6692daf67abef1c53f82424ea';
  language = 'pt-BR';
  region = 'BR';

  constructor(private httpClient: HttpClient) {}

  searchMovie(data: string, page: number): Observable<MovieModel> {
    return this.httpClient.get<MovieModel>(
      `${this.api}${this.endpoint}${this.apiKey}&query=${data}&page=${page}`
    );
  }
}
