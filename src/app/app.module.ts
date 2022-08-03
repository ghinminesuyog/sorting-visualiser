import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MergeSortComponent } from './merge-sort/merge-sort.component';

@NgModule({
  declarations: [
    AppComponent,
    MergeSortComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
