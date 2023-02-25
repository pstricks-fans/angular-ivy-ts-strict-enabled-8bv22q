import { Component } from '@angular/core';
import { SimpleDataSource } from './datasource';
import { Product } from './product';
import { Repo } from './repo';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(public repo: Repo, public ds: SimpleDataSource) {}

  getProducts(): Product[] {
    return this.repo.getProducts();
    //return this.ds.getData();
  }
}
