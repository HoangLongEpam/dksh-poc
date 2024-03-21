import { Product } from "@commercetools/platform-sdk";
import { apiRoot } from "./client";

export const getProductsApi = async (): Promise<Product[]> => {
  const data = await apiRoot.products().get().execute();
  return data.body.results;
};

export const getProductsByProductSelectionIdApi = async (ID: string) => {
  const data = await apiRoot
    .productSelections()
    .withId({
      ID,
    })
    .products()
    .get({
      queryArgs: {
        expand: "name",
      },
    })
    .execute();
  return data.body.results;
};

export const getProductByIdApi = async (ID: string) => {
  const data = await apiRoot.products().withId({ ID }).get().execute();
  return data.body;
}
