import { Injectable } from "@angular/core";
import { SimpleDataSource } from "./datasource";
import { Product } from "./product";

@Injectable()
export class Repo {
    private products: Product[];

    constructor(private dataSource: SimpleDataSource) {
        this.products = new Array<Product>();
        this.dataSource.getData().forEach(p => this.products.push(p));
    }

    getProducts(): Product[] {
        return this.products;
    }

   
}
