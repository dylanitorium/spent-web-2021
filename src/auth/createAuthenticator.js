import { google } from "./providers";

const providers = {
  google,
};

export default function createAuthenticator(firebase) {
  return async function auth(providerName) {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const provider = providers[providerName];
    return firebase.auth().signInWithRedirect(provider());
  };
}
