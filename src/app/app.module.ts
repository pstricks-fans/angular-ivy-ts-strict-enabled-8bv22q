import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PaIteratorDirective } from './iterator';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, PaIteratorDirective],
  bootstrap: [AppComponent],
})
export class AppModule {}
