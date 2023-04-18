'use client'
import Image from 'next/image'
import { GoogleAuthProvider, getRedirectResult, signInWithRedirect } from "firebase/auth";
import { auth } from '@/util/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
  const router = useRouter()
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    'login_hint': 'name@student.iugb.edu.ci',
    'hd': 'student.iugb.edu.ci'
  });


  function authenticate() {
    signInWithRedirect(auth, provider)
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result : any) => {
        console.log("Logged in as ", result.user)
        router.push("/home")
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }, [])
  


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