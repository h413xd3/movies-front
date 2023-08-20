import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';
import { AddMovieDto } from '../dtos/add-movie.dto';
import { AccountExistError } from '../errors/account-exist.error';
import { BadCredentialsError } from '../errors/bad-credentials.error';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = environment.apiUrl;
    private storage = localStorage;

    getToken() {
        return this.storage.getItem('token');
    }

    getAuthHeader() {
        const token = this.getToken()

        if (!token) {
            throw new Error('Bad token');
        }

        return {
            Authorization: `Bearer ${token}`,
        };
    }

    logout() {
        this.storage.removeItem('token');
    }

    async register(email: string, password: string) {
        let response;

        try {
            response = await fetch(`${this.apiUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.status === 400) {
                throw new AccountExistError();
            }
        } catch (error) {
            throw new AccountExistError();
        }
    }


    async login(email: string, password: string) {
        let response;
        
        try {
            response = await fetch(`${this.apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.status === 400) {
                throw new BadCredentialsError();
            }

            const { token } = await response.json();


            this.storage.setItem('token', token);
        } catch (error) {
            throw new BadCredentialsError();
        }
    }

    async getMovies(): Promise<Movie[]> {
        const response = await fetch(`${this.apiUrl}/movies`, {
            headers: this.getAuthHeader(),
        });

        const { items } = await response.json();

        return items;
    }

    async addMovie(movie: AddMovieDto) {
        const response = await fetch(`${this.apiUrl}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...this.getAuthHeader(),
            },
            body: JSON.stringify(movie),
        });

        const data = await response.json();

        return data;
    }

    async deleteMovie(id: string) {
        await fetch(`${this.apiUrl}/movies/${id}`, {
            method: 'DELETE',
            headers: this.getAuthHeader(),
        });
    }
}
