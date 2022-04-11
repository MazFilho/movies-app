import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailsModel } from '../models/details.model';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  api = 'https://api.themoviedb.org/3/';
  endpoint = 'movie/';
  apiKey = '?api_key=e157adc6692daf67abef1c53f82424ea';

  constructor(private httpClient: HttpClient) {}

  getMoviedetails(id: number): Observable<DetailsModel> {
    return this.httpClient.get<DetailsModel>(
      `${this.api}${this.endpoint}${id}${this.apiKey}&append_to_response=videos`
    );
  }
}
