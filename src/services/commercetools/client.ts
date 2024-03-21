import { createApiBuilderFromCtpClient as createImportApiBuilderFromCtpClient } from "@commercetools/importapi-sdk";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
    AuthMiddlewareOptions,
    ClientBuilder,
    HttpMiddlewareOptions,
    PasswordAuthMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import { ByProjectKeyRequestBuilder as ApiRoot } from "@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder";
import { ByProjectKeyRequestBuilder as ImportApiRoot } from "@commercetools/importapi-sdk/dist/declarations/src/generated/client/by-project-key-request-builder";
import { ByProjectKeyInStoreKeyByStoreKeyRequestBuilder as StoreMyApiRoot } from "@commercetools/platform-sdk/dist/declarations/src/generated/client/in-store/by-project-key-in-store-key-by-store-key-request-builder"
import { Config, readConfig } from "./config";

const createApiClient = () => {
    const { clientId, clientSecret, host, oauthHost, projectKey } = readConfig(
    );

    console.log(clientId);

    const authMiddlewareOptions: AuthMiddlewareOptions = {
        credentials: {
            clientId,
            clientSecret
        },
        host: oauthHost,
        projectKey,
        fetch,
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
        host,
        fetch,
    };

    const client = new ClientBuilder()
        .withClientCredentialsFlow(authMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build();

    return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey});
};

const createImportApiClient = () => {
    const { clientId, clientSecret, host, oauthHost, projectKey } = readConfig(
    );

    const authMiddlewareOptions: AuthMiddlewareOptions = {
        credentials: {
            clientId,
            clientSecret,
        },
        host: oauthHost,
        projectKey,
        fetch,
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
        host,
        fetch,
    };

    const client = new ClientBuilder()
        .withClientCredentialsFlow(authMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build();

    return createImportApiBuilderFromCtpClient(client).withProjectKeyValue({
        projectKey,
    });
};

const createStoreApiClient = () => {
    const { clientId, clientSecret, host, oauthHost, projectKey } = readConfig(
    );

    const authMiddlewareOptions: AuthMiddlewareOptions = {
        credentials: {
            clientId,
            clientSecret,
        },
        host: oauthHost,
        projectKey,
        fetch,
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
        host,
        fetch,
    };

    const client = new ClientBuilder()
        .withClientCredentialsFlow(authMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build();

    return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

const createMyApiClient = () => {
    const {
        clientId,
        clientSecret,
        host,
        oauthHost,
        projectKey,
        username,
        password,
    } = readConfig();

    const authMiddlewareOptions: PasswordAuthMiddlewareOptions = {
        credentials: {
            clientId,
            clientSecret,
            user: {
                username,
                password,
            },
        },
        host: oauthHost,
        projectKey,
        fetch,
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
        host,
        fetch,
    };

    const client = new ClientBuilder()
        .withPasswordFlow(authMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build();

    return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

const createStoreMyApiClient = () => {
    const {
        clientId,
        clientSecret,
        host,
        oauthHost,
        projectKey,
        storeKey,
        username,
        password,
    } = readConfig();

    const authMiddlewareOptions: PasswordAuthMiddlewareOptions = {
        credentials: {
            clientId,
            clientSecret,
            user: {
                username,
                password,
            },
        },
        host: oauthHost,
        oauthUri: `/oauth/${projectKey}/in-store/key=${storeKey}/customers/token`,
        projectKey,
        fetch,
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
        host,
        fetch,
    };

    const client = new ClientBuilder()
        .withPasswordFlow(authMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build();

    return createApiBuilderFromCtpClient(client)
        .withProjectKey({ projectKey })
        .inStoreKeyWithStoreKeyValue({ storeKey });
};

export const apiRoot: ApiRoot = createApiClient();
export const importApiRoot: ImportApiRoot = createImportApiClient();
export const storeApiRoot: ApiRoot = createStoreApiClient();
export const myApiRoot: ApiRoot = createMyApiClient();
export const storeMyApiRoot: StoreMyApiRoot = createStoreMyApiClient();