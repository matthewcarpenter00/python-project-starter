const OAuthClient = require("intuit-oauth");

export const oauthClient = new OAuthClient({
  clientId: process.env.REACT_APP_OAUTH_CLIENT_ID,
  clientSecret: process.env.REACT_APP_OAUTH_CLIENT_SECRET,
  environment: "sandbox",
  redirectUri: "http://localhost:3000/profile/user",
});

export const authUri = oauthClient.authorizeUri({
  scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
  state: "testState",
});