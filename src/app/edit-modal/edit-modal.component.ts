import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MoviesService } from 'src/services/movies.service';
import { DeleteDialogData } from 'src/models/DeleteDialogData.model';
import { Movie } from 'src/models/movie.model';
import { Subscription } from 'rxjs';
import { NgForm, FormControl, Validators } from "@angular/forms";


@Component({
    selector: 'app-edit-modal',
    templateUrl: './edit-modal.component.html',
    styleUrls: ['./edit-modal.component.css']
})

export class EditModalComponent implements OnInit {
   
    mode = 'create';
    postId: string;
    movie: Movie;
    isLoading = false;
    movies: Movie[] = [];
    currentYear = new Date().getFullYear();
    minError = false;
    maxError = false;
    poster: string;
    movieTite: boolean = false;
    runtimeError = false;
    genreError = false;


    constructor(
        public dialogRef: MatDialogRef<EditModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Movie, public movieService: MoviesService) { }

    ngOnInit() {
        this.movie = this.data["movie"];

        // Checking whether this is a 'create' new movie state or 'edit' movie state
        if (this.movie.id != "-1") {
            this.mode = 'edit';
            this.postId = this.movie.id;
            this.poster = this.movie.Poster;
            this.isLoading = true;

        } else if (this.movie.id === "-1") {
            this.mode = 'create';
            this.postId = null;
        }
    }

// handle form validation and send request to server 
    onAddMovie(form: NgForm) {
        let sendReq = this.formValidation(form);
        if (form.value.title && sendReq) {
            let title = this.clean(form.value.title);
            this.movieService.getTitleMovie(title).subscribe(
                data => {
                    if (data.Error) {
                        if (this.mode === 'edit') {
                            this.movieTite = false;
                            this.movieService.updateMovie(this.postId, title, form.value.runtime, form.value.genre, form.value.year, this.poster, form.value.director);
                        }
                        else {
                            this.poster = './assets/images/Placeholder.jpg';
                            this.postId = this.guid();
                            this.movieService.addMovie(this.postId, title, form.value.runtime, form.value.genre, form.value.year, this.poster, form.value.director);
                        }
                        this.movieTite = false;
                        this.reset(form);
                    }
                    else if (data.Title) {
                        console.log("data : ", data);
                        form.controls['title'].setErrors({ 'incorrect': true });
                        this.movieTite = true;
                    }
                },
                error => {
                    //TODO handle error from server
                })}}
        

    // create unique id for new movie
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    // reset all form/modal variables 
    reset(form) {
        this.isLoading = true;
        this.maxError = false;
        this.minError = false;
        this.runtimeError = false;
        form.controls['runtime'].setErrors(null);
        form.controls['year'].setErrors(null);
        form.controls['title'].setErrors(null);
        form.resetForm();
        setTimeout(() => this.dialogRef.close(), 200);
    }

    // form validation
    formValidation(form){
        if (form.invalid) {
            return false;
        }
        if (form.value.year < 1900) {
            form.controls['year'].setErrors({ 'incorrect': true });
            this.minError = true;
            return false;
        }
        if (form.value.year > this.currentYear) {
            form.controls['year'].setErrors({ 'incorrect': true });
            this.maxError = true;
            return false;
        }
        if (form.value.runtime) {
            let runtime = this.hasNumber(form.value.runtime);
            if (runtime == "") {
                form.controls['runtime'].setErrors({ 'incorrect': true });
                this.runtimeError = true;
                return false;
            }
        }
        return true;
    }

    // handle title 
    clean(str) {
        return str.replace(/[^0-9a-z-A-Z ]/g, "").replace(/ +/, " ")
    }

    // handle runtime 
    hasNumber(myString) {
        let a = myString.replace(/\D/g, '');
        return a;
    }
}
