import { Injectable } from "@angular/core";
import { Product } from "./product";

@Injectable()
export class SimpleDataSource {
    private data: Product[];
    private p!: Product;
    constructor() {
        this.data = new Array<Product>(
            new Product(1, "Kayak", "Watersports", 275),
            new Product(2, "Lifejacket", "Watersports", 48.95),
            new Product(3, "Soccer Ball", "Soccer", 19.50),
            new Product(4, "Corner Flags", "Soccer", 34.95),
            new Product(5, "Thinking Cap", "Chess", 16)
        );
        setInterval(() => {
            this.p = this.data.shift()!;
            this.data.push(this.p);
            this.data[0]!.price = this.data[0]!.price! + 1;
        }, 200);
    }

    getData(): Product[] {
        return this.data;
    }
}
