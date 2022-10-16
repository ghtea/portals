import '../styles/globals.css';
// import { serialize } from 'cookie'
import { AppProps } from 'next/app';
// import { axiosInstance } from '../utils/axios';

const MyApp = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const appProps = await App.getInitialProps(appContext);

//   console.log('appContext.ctx: ', appContext.ctx.req?.headers.cookie); // TODO: remove

//   const { req, res } = appContext.ctx

//   if (req) {
//     axiosInstance.defaults.headers.cookie = req.headers.cookie || '';
//     axiosInstance.defaults.headers.Authorization = req.headers.Authorization || '';

//     try {
//       const resp = await axiosInstance.get('/api/refresh');
//       res?.setHeader('set-cookie', resp.headers['set-cookie']);
//       const respCookie = setCookie.parse(resp.headers['set-cookie'])[0];

//       axiosInstance.defaults.headers.cookie = serialize(respCookie.name, respCookie.value);
//       axiosInstance.defaults.headers.Authorization = `Bearer ${resp.data.accessToken}`;
//     } catch (e) {
//       console.error(e);
//     }
//   }

//   return { ...appProps }
// }

export default MyApp;
