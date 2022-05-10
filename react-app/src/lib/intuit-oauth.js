const OAuthClient = require("intuit-oauth");

export const oauthClient = new OAuthClient({
  clientId: process.env.REACT_APP_OAUTH_CLIENT_ID,
  clientSecret: process.env.REACT_APP_OAUTH_CLIENT_SECRET,
  environment:
    process.env.NODE_ENV === "development" ? "sandbox" : "production",
  redirectUri: process.env.REACT_APP_OAUTH_REDIRECT_URI,
});

export const authUri = oauthClient.authorizeUri({
  scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
  state: "testState",
});
