import { Product } from './product';

export class Order {

    address: string;
    email: string;
    firstName: string;
    lastName: string;
    myArray: Array<Product>;
    shipmentCharges: number;
    subTotal: number;
    timestamp: number;
    totalBill: number;
    uid: string;
    key: string;
    sellerName: string;
    statusArray: Array<string>;
}
