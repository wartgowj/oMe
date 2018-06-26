export const AUTH_CONFIG = {
  domain: 'eyl91.auth0.com',
  clientId: '4mTvn96ESd5wqdsRc5qLHSyHKagKZT38',
  callbackUrl: process.env.NODE_ENV === 'production' ? 'https://cxchange.herokuapp.com/callback' : 'http://localhost:3000/callback'
}
