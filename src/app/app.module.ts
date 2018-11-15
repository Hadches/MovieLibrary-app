import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from 'src/services/movies.service';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { MovieListComponent } from './movie-list/movie-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDialogModule
  } from "@angular/material";
  import {MatPaginatorModule} from '@angular/material/paginator';

import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OnlyEngPipe } from './pipes/onlyEng.pipe';
import { CleanRuntimePipe } from './pipes/cleanRuntim.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    DeleteModalComponent,
    OnlyEngPipe,
    CleanRuntimePipe,
    EditModalComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatPaginatorModule
  ],
  entryComponents: [DeleteModalComponent, EditModalComponent],
  providers: [
    MoviesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
