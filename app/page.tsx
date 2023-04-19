'use client'
import Image from 'next/image'
import { GoogleAuthProvider, getRedirectResult, signInWithRedirect } from "firebase/auth";
import { auth } from '@/util/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';

const Page = () => {
  const router = useRouter()
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    'login_hint': 'name@student.iugb.edu.ci',
    'hd': 'student.iugb.edu.ci'
  });


  function authenticate() {
    signInWithRedirect(auth, provider).then((res) => {
      router.push('/home')
    }
    )
  };

  const {user, loading} = useAuth();

 useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if ((user || auth.currentUser) && !loading) {
        // If user is logged in, redirect to dashboard page
        router.push('/home'); // Replace current URL with '/dashboard'
      } else {
      }
    });
  }, [user, loading]);


  useEffect(() => {
    console.log("User from page: ", user);
    console.log("Loading from page: ", loading);
  }, [])
  

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        // The user is authenticated, handle the result
        if(result) {
          router.replace('/home')
        }
      })
      .catch((error) => {
        // The user is not authenticated, handle the error
        console.log("Redirect error:", error);
      });
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 gap-8">
      <Image src="/cwe.svg" width={100} height={100} alt="Logo" />
      <button
        onClick={() => authenticate()}
        className="bg-primary w-full rounded-md text-md text-center p-4 active:brightness-50">
        <h1 className='text-xl'>LOG IN</h1>
        <h1 className="text-[8px] opacity-50">Use your name@student.iugb.edu.ci account</h1>
      </button>
    </div>
  )
}

export default Page