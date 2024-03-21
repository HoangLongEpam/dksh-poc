
export const readConfig = () => {
    return {
        clientId: "5_Jq8bKblT3DRqVnPzhYw-dE",
        clientSecret: "2vvcxIlBO1hLuRGMttQm3KTaKPvYnnfp",
        projectKey: "migration-test",
        oauthHost: "https://auth.australia-southeast1.gcp.commercetools.com",
        host: "https://api.australia-southeast1.gcp.commercetools.com",
        username: "",
        password: "",
        storeKey: "",
    };
};

export type Config = {
    clientId: string;
    clientSecret: string;
    projectKey: string;
    oauthHost: string;
    host: string;
    username?: string;
    password?: string;
    storeKey?: string;
};
