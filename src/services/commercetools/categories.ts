import { ClientResponse, CategoryPagedQueryResponse} from "@commercetools/platform-sdk";
import { apiRoot } from "./client";

// apiRoot.get().execute().then(response => {
//     console.log("API Response:", JSON.stringify(response, null, 4))
// }).catch(error => {
//     console.log("API Error:" + error)
// });

// apiRoot.categories().get().execute().then(response => {
//     console.log("API Response:", JSON.stringify(response, null, 1))
// }).catch(error => {
//     console.log("API Error:" + error)
// });

export const getCategories = (): Promise<ClientResponse<CategoryPagedQueryResponse>> => {
    return apiRoot.categories().get().execute();
}

// getCategories()
//   .then(response => {
//     console.log('Categories response:', JSON.stringify(response, null, 1));
//   })
//   .catch(error => {
//     console.error('Error fetching categories:', JSON.stringify(error, null, 1));
//   });
// apiRoot.categories().withId( {ID: ""}).get().execute().then(response => {
//     console.log("API Response:", JSON.stringify(response, null, 4))
// }).catch(error => {
//     console.log("API Error:" + error)
// });