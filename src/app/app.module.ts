import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ImageListComponent } from './image-list/image-list.component';
import { RouterModule } from '@angular/router';
import { PhotoComponent } from './photo/photo.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ImageListComponent,
    PhotoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
   RouterModule.forRoot([
      {path:'',component:ImageListComponent},
      {path:'camera',component:PhotoComponent}
   ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
