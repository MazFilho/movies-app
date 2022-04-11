import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenreListModel } from '../models/genre.model';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  api = 'https://api.themoviedb.org/3/';
  endpoint = 'genre/movie/list';
  apiKey = '?api_key=e157adc6692daf67abef1c53f82424ea';

  constructor(private httpClient: HttpClient) {}

  getGenres(): Observable<GenreListModel> {
    return this.httpClient.get<GenreListModel>(
      `${this.api}${this.endpoint}${this.apiKey}`
    );
  }
}
