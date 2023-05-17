import React, { useEffect } from 'react'

import { Outlet, useLoaderData, useSubmit } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../util/auth';

const RootPage = () => {
  const token = useLoaderData();
  const submit = useSubmit();
  
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === 'EXPIRED') {
      submit(null, {action: '/logout', method: 'post'})
    }

    const tokenDuration = getTokenDuration();

    const tokenTimer = setTimeout(() => {
      submit(null, {action: '/logout', method: 'post'})
    }, tokenDuration);
  }, [token, submit])



  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default RootPage;