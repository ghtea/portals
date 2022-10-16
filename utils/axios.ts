// https://khendrikse.netlify.app/blog/nextjs-auth-with-httponly-cookies-incl-refresh/
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

let requestToken: string;

export const setRequestToken = (token: string) => {
  requestToken = token
}

export const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_HOST,
  headers: {
    'content-type': 'application/json'
  },
  responseType: 'json',
  withCredentials: true, // WIP:
});

// WIP:
const refreshAccessToken = () => {
  const newServerAxios = axios.create({
    baseURL: process.env.NEXT_CLIENT_HOST,
    headers: {
      'content-type': 'application/json'
    },
    responseType: 'json',
    withCredentials: true, // WIP:
  });

  return newServerAxios.post<{accessToken: string, refreshToken: string}>('/api/refresh')
}

const refreshAuthLogic = (failedRequest: any) =>
  refreshAccessToken().then((tokenRefreshResponse) => {
    if (failedRequest){
      // eslint-disable-next-line no-param-reassign
      failedRequest.response.config.headers.Authorization = `Bearer ${tokenRefreshResponse.data.accessToken}`;
    }
    setRequestToken(tokenRefreshResponse.data.accessToken)

    return Promise.resolve();
  });

createAuthRefreshInterceptor(serverAxios, refreshAuthLogic);

// WIP
serverAxios.interceptors.request.use(async (request) => {
  if (!requestToken) {
    const tokenRefreshResponse = await refreshAccessToken()

    setRequestToken(tokenRefreshResponse.data.accessToken)

    console.log('tokenRefreshResponse.data: ', tokenRefreshResponse.data); // TODO: remove
  }

  if (request.headers){
    console.log('requestToken: ', requestToken); // TODO: remove
    request.headers.Authorization = `Bearer ${requestToken}`;
  }
  return request;
});