// src/authConfig.js
import { PublicClientApplication } from "@azure/msal-browser";

const msalConfigProd = {
    auth: {
        clientId: "d32d00a5-d256-47a9-bd92-c040e3dcbfa1", // Azure AD App Registration Client ID
        authority: "https://login.microsoftonline.com/0c77cdef-93be-4929-86b8-9c52cd567fed", // Replace 'your-tenant-id' with your Azure AD Tenant ID
        redirectUri: 'https://scope-webapp.azurewebsites.net/district'
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true,
    }
};

// for Local
const msalConfigDev = {
    auth: {
        clientId: "d32d00a5-d256-47a9-bd92-c040e3dcbfa1", // Azure AD App Registration Client ID
        authority: "https://login.microsoftonline.com/0c77cdef-93be-4929-86b8-9c52cd567fed", // Replace 'your-tenant-id' with your Azure AD Tenant ID
        redirectUri: 'http://localhost:3000/district'
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true,
    }
};

// export const msalInstance = new PublicClientApplication(msalConfigDev); //dev
export const msalInstance = new PublicClientApplication(msalConfigProd); //Prod
