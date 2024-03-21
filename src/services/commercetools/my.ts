import { ClientResponse, Customer, OrderPagedQueryResponse, Cart } from "@commercetools/platform-sdk";
import { myApiRoot, storeMyApiRoot } from "./client";

export const getMe = (): Promise<ClientResponse<Customer>> => {
    return myApiRoot
        .me()
        .get()
        .execute();
}

export const getMyOrders = (): Promise<ClientResponse<OrderPagedQueryResponse>> => {
    return myApiRoot
        .me()
        .orders()
        .get()
        .execute();
}

export const createMyCart = (customerEmail: string): Promise<ClientResponse<Cart>> =>
    myApiRoot
        .me()
        .carts()
        .post({
            body: {
                currency: "EUR",
                country: "DE",
                customerEmail
            }
        })
        .execute();

export const getMyActiveCart = (): Promise<ClientResponse<Cart>> =>
    myApiRoot
        .me()
        .activeCart()
        .get()
        .execute();