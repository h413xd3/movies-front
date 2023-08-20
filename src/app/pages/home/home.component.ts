import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddMovieComponent } from 'src/app/dialogs/add-movie/add-movie.component';
import { DeleteMovieComponent } from 'src/app/dialogs/delete-movie/delete-movie.component';
import { Movie } from 'src/app/models/movie';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    public movies: Movie[] = [];

    constructor(
        private router: Router,
        private apiService: ApiService,
        public dialog: MatDialog,
    ) { }

    async loadMovies() {    
        try {
            this.movies = await this.apiService.getMovies();
        } catch (error) {
            this.router.navigate(['login']);
        }
    }

    async deleteMovie(movie: Movie) {
        const dialogRef = this.dialog.open(DeleteMovieComponent, {
            data: { title: movie.title },
        });
    
        dialogRef.afterClosed().subscribe(async result => {
            if (result !== true) {
                return;
            }

            try {
                await this.apiService.deleteMovie(movie._id);
            } catch (error) {
                console.error(error);
                return;
            }
    
            await this.loadMovies();
        });

    }

    addMovie() {
        const dialogRef = this.dialog.open(AddMovieComponent, {
            width: '400px',
        });

        dialogRef.afterClosed().subscribe(async result => {
            if (result !== true) {
                return;
            }

            await this.loadMovies();
        });
    }

    async ngOnInit() {
        await this.loadMovies();
    }
}
