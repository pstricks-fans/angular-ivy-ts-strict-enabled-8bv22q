import { Component } from '@angular/core';
import { Product } from './product';
import { Repo } from './repository';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(public repo: Repo) {}

  getProducts(): Product[] {
    return this.repo.getProducts();
  }
}
