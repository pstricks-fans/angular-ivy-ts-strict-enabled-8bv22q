import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { PaIteratorDirective } from './iterator';
import { AppComponent } from './app.component';
import { SimpleDataSource } from './datasource';
import { Repo } from './repo';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, PaIteratorDirective],
  bootstrap: [AppComponent],
  providers: [SimpleDataSource, Repo],
})
export class AppModule {}
