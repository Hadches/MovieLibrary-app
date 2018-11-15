export class Movie {
    constructor(
        public id: string = null,
        public Title: string = null,
        public Year: number = null,
        public Runtime: string = null,
        public Genre: string = null,
        public Director: string = null,
        public Poster: string = './assets/images/Placeholder.jpg') { }
}