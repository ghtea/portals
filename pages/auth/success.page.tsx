import cookie from 'cookie';
import type { NextPage, GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { serverAxios, setRequestToken } from '../../utils/axios';

type AuthSuccessPageProps = {
  accessToken: string | undefined
}

const AuthSuccessPage: NextPage<AuthSuccessPageProps> = ({
  accessToken
}) => {
  useEffect(()=>{
    if (accessToken){
      setRequestToken(accessToken)
    }
  },[accessToken])

  const handleUserDataClick = async () =>{
    const response = await serverAxios.get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/auth`)

    console.log('response: ', response); // TODO: remove
  }

  const handleProtectedClick = async () =>{
    const response = await serverAxios.get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/protected`)

    console.log('response: ', response); // TODO: remove
  }

  return (
    <div>
    auth success
      <button type='button' onClick={handleUserDataClick}>get user data</button>
      <button type='button' onClick={handleProtectedClick}>get protected data</button>

    </div>
  )
};

export default AuthSuccessPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const parsedCookie = req.headers.cookie ? cookie.parse(req.headers.cookie) : null
  const accessToken = parsedCookie ? parsedCookie.access_token : null

  if (accessToken){
    setRequestToken(accessToken)
  }

  return { props: { accessToken } }
}