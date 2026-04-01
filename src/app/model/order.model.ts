import { ProductModel } from "./product.model";

export interface OrderModel {
    idOrder:     number;
    user:        User;
    client:      Client;
    orderDetail: OrderDetail[];
    createdAt:   Date;
    modifiedAt:  Date;
    state:       string;
}

export interface Client {
    idClient?:   number;
    name:        string;
    idProduct?:  number;
    idUserType?: number;
    createdAt:   Date;
    modifiedAt:  Date;
}

export interface OrderDetail {
    idOrderDetail: number;
    product:       ProductModel;
    quantity:      number;
    createdAt:     Date;
    modifiedAt:    Date;
}

export interface User {
    idUser:     number;
    username:   string;
    password:   string;
    firstName:  string;
    lastName:   string;
    userType:   Client;
    createdAt:  Date;
    modifiedAt: Date;
}