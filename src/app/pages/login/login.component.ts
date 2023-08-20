import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthDto } from 'src/app/dtos/auth.dto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    public error: string | null = null;

    constructor(
        private router: Router,
        private api: ApiService,
        private snackBar: MatSnackBar,
    ) { }

    async onLogin(auth: AuthDto) {
        const { email, password } = auth;

        try {
            await this.api.login(email, password);
        } catch (error) {
            this.error = 'Bad credentials !';
            return;
        }

        this.router.navigate(['/']);
    }
}
