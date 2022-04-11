import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { DetailsModel } from '../models/details.model';
import { DetailsService } from '../services/details.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  id: number;
  movieDetails: DetailsModel;
  readonly posterPathPrefix = 'https://image.tmdb.org/t/p/w300';
  readonly videoPathPrefix = 'https://www.youtube.com/watch?v=';

  constructor(
    private detailsService: DetailsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getMoviedetails();
  }

  getMoviedetails(): void {
    this.detailsService
      .getMoviedetails(this.id)
      .pipe(
        tap((result) => {
          this.movieDetails = result;
        })
      )
      .subscribe();
  }

  backSearchMovie(): void {
    this.router.navigateByUrl('movie');
  }

  formatDuration(totalMinutes: number): string {
    const hours = totalMinutes / 60;
    const minutes = totalMinutes % 60;
    if (hours < 1) {
      return `${minutes}min`;
    }
    if (minutes === 0) {
      return `${hours}h`;
    }
    return `${Math.trunc(hours)}h ${minutes}min`;
  }
}
