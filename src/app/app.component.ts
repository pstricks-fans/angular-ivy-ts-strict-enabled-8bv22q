import { Component } from '@angular/core';
import { Product } from './product';
import { Repo } from './repo';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(public repo: Repo) {}

  getProducts(): Product[] {
    return this.repo.getProducts();
  }

  getKey(id: number, product: Product) { return product.id; }
}
