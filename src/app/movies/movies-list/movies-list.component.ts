import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { MovieModel } from '../models/movie.model';
import { GenresService } from '../services/genres.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit, OnDestroy {
  readonly posterPathPrefix = 'https://image.tmdb.org/t/p/w200';
  searchText = new FormControl('');
  unsubscribe$ = new Subject();
  genres: string[] = [];
  page = 1;
  movies: MovieModel;
  placeholder = 'Search a movie by name...';

  constructor(
    private moviesService: MoviesService,
    private genreService: GenresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchMovie(this.page);
    this.getGenres();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  searchMovie(page: number): void {
    this.searchText.valueChanges
      .pipe(debounceTime(500), takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.page = 1;
        const isValue = value.trim();
        if (!isValue) {
          this.movies = null;
          return;
        }
        this.moviesService
          .searchMovie(value, page)
          .pipe(
            tap((result) => {
              this.movies = result;
            })
          )
          .subscribe();
      });
  }

  getGenres(): void {
    this.genreService
      .getGenres()
      .pipe(
        tap((result) => {
          result.genres.forEach((genre) => {
            this.genres[genre.id] = genre.name;
          });
        })
      )
      .subscribe();
  }

  movieDetails(id: number): void {
    this.router.navigateByUrl('/details/' + id);
  }

  currentPage(event: any) {
    this.page = event;
    const text = this.searchText.value;
    if (!text) {
      return;
    }
    this.moviesService
      .searchMovie(text, this.page)
      .pipe(
        tap((result) => {
          this.movies = result;
        })
      )
      .subscribe();
  }
}
