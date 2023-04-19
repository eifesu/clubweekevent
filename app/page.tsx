'use client'
import Image from 'next/image'
import { GoogleAuthProvider, getAdditionalUserInfo, getRedirectResult, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth } from '@/util/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useSound from 'use-sound';

const Page = () => {
  const [play] = useSound("/tap.wav", {volume: 0.15});
  const router = useRouter()
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    'login_hint': 'name@student.iugb.edu.ci',
    'hd': 'student.iugb.edu.ci'
  });


  function authenticate() {
    play();
    signInWithPopup(auth, provider).then((res) => {
      router.push('/home')
    }
    )
  };

  const {user, loading} = useAuth();


  useEffect(() => {
    console.log("User from page: ", user);
    console.log("Loading from page: ", loading);
  }, [user, loading])
  

  useEffect(() => {
    async function listen() {
      const result = await getRedirectResult(auth)
      if (result) {
        router.push("/home")
        console.log(result)
        const details = getAdditionalUserInfo(result)
        console.log(details) // details.isNewUser to determine if a new or returning user
      } else {
        // Everything is fine
      }
    }
    listen()
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 gap-8">
      <Image src="/cwe.svg" className="animate-pulse" width={100} height={100} alt="Logo" />
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