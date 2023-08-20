import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-add-movie',
    templateUrl: './add-movie.component.html',
    styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent {
    public form: FormGroup;

    constructor(
        private api: ApiService,
        public dialogRef: MatDialogRef<AddMovieComponent>,
    ) {
        this.form = new FormGroup({
            title: new FormControl('', [Validators.required]),
            year: new FormControl('', [Validators.required]),
            rating: new FormControl('', [Validators.required]),
        });
    }

    onCancel() {
        this.dialogRef.close();
    }

    async onAdd() {

        console.log(this.form.value);
        if (!this.form.valid) {
            return;
        }

        await this.api.addMovie(this.form.value);

        this.dialogRef.close(true);
    }

}
