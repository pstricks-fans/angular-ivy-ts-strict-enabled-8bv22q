import { Injectable } from "@angular/core";
import { SimpleDataSource } from "./datasource";
import { Product } from "./product";

@Injectable()
export class Repo {
    private products: Product[];

    constructor(private dataSource: SimpleDataSource) {
        this.products = [...this.dataSource.getData()];
    }

    getProducts(): Product[] {
        //return this.products;
        return this.dataSource.getData();
    }

   
}
