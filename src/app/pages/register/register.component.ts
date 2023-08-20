import { Component, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthDto } from 'src/app/dtos/auth.dto';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    error: string | null = null;

    constructor(
        private router: Router,
        private api: ApiService,
        private snackBar: MatSnackBar,
    ) { }

    async onRegister(auth: AuthDto) {
        const { email, password } = auth;

        try {
            await this.api.register(email, password);
        } catch (error) {
            this.error = 'Account already exists';
            return;
        }

        this.snackBar.open('Account created !', 'Close', {
            duration: 4000,
        });

        this.router.navigate(['/login']);
    }
}
