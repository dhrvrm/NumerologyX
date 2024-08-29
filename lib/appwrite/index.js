import { Account, Client, Databases } from 'appwrite';
import { getProjectID } from '../constants';

const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject(getProjectID());

export const account = new Account(client);
export const databases = new Databases(client);

export { client };
