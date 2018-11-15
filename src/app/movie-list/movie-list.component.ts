import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { Movie } from 'src/models/movie.model';
import { MoviesService } from 'src/services/movies.service';
import { MatDialog } from '@angular/material';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {

    movies: Movie[] = [];
    private movieSub: Subscription;
    private movieNameSub: Subscription;
    isLoading = false;
    movieName = "harry potter";
    notFound = false;

    constructor(public movieService: MoviesService, public dialog: MatDialog) { }

    ngOnInit() {
        // initialize the movie list
        this.movieService.getMovies(this.movieName);
        this.isLoading = true;

        // get the movie list
        this.movieSub = this.movieService.getMoviesUpdateListener()
            .subscribe((movies: Movie[]) => {
                this.isLoading = false;
                this.notFound = false;
                this.movies = movies;
            },
                error => {
                    this.isLoading = false;
                    this.notFound = true;
                }
            );

        // get the search movie title
        this.movieNameSub = this.movieService.getMovieSerchedListener()
            .subscribe((name) => {
                this.movieName = name;
            },
                error => {
                    this.movieName = 'harry potter';
                }
            )
    }

    // open delete modal
    onDelete(id: string, movieName: string) {
        this.dialog.open(DeleteModalComponent, {
            width: '350px',
            data: { id: id, movieName: movieName }
        })
    }

    // open edit modal
    onEdit(id: string) {
        const index = this.movies.findIndex(m => m.id === id);
        const movie = this.movies[index];
        this.dialog.open(EditModalComponent, {
            width: '350px',
            data: { movie: movie }
        })
    }

// unsubscribe from Observable
    ngOnDestroy() {
        this.movieSub.unsubscribe();
        this.movieNameSub.unsubscribe();
    }
}
