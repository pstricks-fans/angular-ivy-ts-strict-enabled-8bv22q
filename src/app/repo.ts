import { Injectable } from "@angular/core";
import { SimpleDataSource } from "./datasource";
import { Product } from "./product";

@Injectable()
export class Repo {

    constructor(private dataSource: SimpleDataSource) {}

    getProducts(): Product[] {
        return this.dataSource.getData();
    }   
}
