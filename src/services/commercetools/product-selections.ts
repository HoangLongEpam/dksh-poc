import { apiRoot } from "./client";

export const getProductSelectionByIdApi = async (ID: string) => {
  const data = await apiRoot
    .productSelections()
    .withId({
      ID,
    })
    .get()
    .execute();

  return data.body;
};
