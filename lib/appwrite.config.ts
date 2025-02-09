import * as sdk from 'node-appwrite';

export const {
    PROYECT_ID,
    API_KEY,
    DATABASE_ID,
    PASAGERO_COLLECTION_ID,
    EMPLEADOS_COLLECTION_ID,
    APPOIMETN_COLLECTION_ID,
    NEXT_PUBLIC_BUKET_ID : BUKED_ID,
    NEXT_PUBLIC_ENDPOINT : ENDPOINT,

} =process.env;

const client = new sdk.Client();

client
.setEndpoint(ENDPOINT!)
.setProject(PROYECT_ID!)
.setKey(API_KEY!);

export const database = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export  const users = new sdk.Users(client);
