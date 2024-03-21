import { Store } from "@commercetools/platform-sdk";
import { apiRoot } from "./client";

export const getStoresById = async (ID: string): Promise<Store> => {
  const data = await apiRoot.stores().withId({ ID }).get().execute();
  return data.body;
};

export const getStoresApi = async (): Promise<Store[]> => {
  const data = await apiRoot.stores().get().execute();
  return data.body.results;
};
