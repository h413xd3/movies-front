import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
    form: FormGroup;
    @Input() title: string = '';
    @Input() error: string | null = null;
    @Output() auth: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
        });
    }

    onSubmit() {
        if (this.form.valid) {
            this.auth.emit(this.form.value);
        }
    }
}
