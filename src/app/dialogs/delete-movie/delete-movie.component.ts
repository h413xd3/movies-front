import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface DialogData {
    title: string;
}

@Component({
  selector: 'app-delete-movie',
  templateUrl: './delete-movie.component.html',
  styleUrls: ['./delete-movie.component.scss']
})
export class DeleteMovieComponent {
    constructor(
        public dialogRef: MatDialogRef<DeleteMovieComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) { }

    onCancel() {
        this.dialogRef.close();
    }

    onDelete() {
        this.dialogRef.close(true);
    }
}
