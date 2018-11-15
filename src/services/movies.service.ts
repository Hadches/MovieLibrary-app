import { Injectable } from '@angular/core';
import { Movie } from 'src/models/movie.model';
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import 'rxjs/add/operator/map';



@Injectable({
    providedIn: 'root'
})
export class MoviesService {




    asyncEvents$: Observable<any[]>;

    private movies: Movie[] = [];
    private moviesUpdated = new Subject<Movie[]>();
    private movieSearched = new Subject<any>();
    movie: Movie;

    constructor(private http: HttpClient) { }

    getMovies(movieName: any) {
        movieName = movieName.trim();
        this.movieSearched.next(movieName);
         this.http
            .get<{Search: any}>(
                "http://www.omdbapi.com/?type=movie&r=json&s=" + movieName + "&page=1&apikey=c60cf6c7"
            ).pipe(map((data) => {
                return data.Search.map(data => {
                    return {
                        Year: data.Year,
                        Title: data.Title,
                        id: data.imdbID,
                        Poster: data.Poster
                    }
                },
                )
            }))
            .subscribe(
                movieData => {
                    if (movieData != null) {
                        movieData = this.handleMovieList(movieData);
                        this.movies = movieData;
                        this.moviesUpdated.next([...this.movies]);
                    }
                },
                error => {
                    this.movieSearched.next('');
                    this.movies= [];
                    this.moviesUpdated.next([...this.movies]);
                }
            );
    }

    getMoviesUpdateListener() {
        return this.moviesUpdated.asObservable();
    }

    getMovieSerchedListener() {
        return this.movieSearched.asObservable();
    }


    deletePost(id: string): any {
        const updatedMovies = this.movies.filter(movie => movie.id !== id);
        this.movies = updatedMovies;
        this.moviesUpdated.next([...this.movies]);
    }

    getMovie(id: string) {
        return this.http.get<{ Year: number, Title: string, imdbID: string, Runtime: string, Genre: string, Director: string, Poster: string }>("http://www.omdbapi.com/?type=movie&r=json&i=" + id + "&apikey=c60cf6c7");
    }

    updateMovie(postId: string, title: any, runtime: any, genre: any, year: any, poster: any, director: any): any {
        const movie = { id: postId, Title: title, Year: year, Runtime: runtime, Genre: genre, Director: director, Poster: poster };
        const updateMovies = [...this.movies];
        const oldMovieIndex = updateMovies.findIndex(p => p.id === movie.id);
        updateMovies[oldMovieIndex] = movie;
        this.movies = updateMovies;
        this.moviesUpdated.next([...this.movies]);
    }

    getTitleMovie(title: any): any {
        title = title.trim();
        return this.http.get("http://www.omdbapi.com/?type=movie&r=json&t=" + title + "&apikey=c60cf6c7");
    }


    addMovie(postId: string, title: any, runtime: any, genre: any, year: any, poster: string, director: any): any {
        const movie = { id: postId, Title: title, Year: year, Runtime: runtime, Genre: genre, Director: director, Poster: poster };
        this.movies.push(movie);
        this.moviesUpdated.next([...this.movies]);
    }

    handlePoster(link: any) {
        link.forEach((keys: any) => {
            if (keys.Poster == null || keys.Poster == undefined || keys.Poster == '' || keys.Poster == 'N/A') {
                keys.Poster = "./assets/images/Placeholder.jpg";
            }
        });
    }

    handleMovieList(movieList: any) {
        this.handlePoster(movieList);
        for (let i in movieList) {
            this.getMovie(movieList[i].id).subscribe(
                data => {
                    movieList[i].Runtime = data.Runtime,
                        movieList[i].Genre = data.Genre,
                        movieList[i].Director = data.Director
                }
            )
        }
        return movieList;
    }
}
