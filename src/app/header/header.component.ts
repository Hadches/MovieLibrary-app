import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { Movie } from 'src/models/movie.model';
import { NgForm, FormControl, Validators } from "@angular/forms";
import { MoviesService } from 'src/services/movies.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    movie: Movie = new Movie();
    search = ' ';
    constructor(public dialog: MatDialog, private movieService: MoviesService) { }

 

    // open edit modal
    onCreate() {
        this.movie.id = '-1';
        this.dialog.open(EditModalComponent, {
            width: '350px',
            data: { movie: this.movie }
        })
    }

    // initialize the movie list with a new movie list title
    onSearch() {
        let name = this.search;
        this.movieService.getMovies(name);
        window.scrollTo({
            top: 500,
            left: 1000,
            behavior: 'smooth'
        });
        this.search = ' ';
    }
}
