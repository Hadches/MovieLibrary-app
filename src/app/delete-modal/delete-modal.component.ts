import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MoviesService } from 'src/services/movies.service';
import { DeleteDialogData } from 'src/models/DeleteDialogData.model';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent  {

  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA)public data: DeleteDialogData, public movieService:MoviesService) {}

  deleteMovie(){
    this.movieService.deletePost(this.data.id);
  }
}

