import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'movies-front';

    constructor (
        private router: Router,
        private apiService: ApiService,
    ) {}

    logout() {
        this.apiService.logout();
        this.router.navigate(['login']);
    }
}
