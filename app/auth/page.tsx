'use client'
import Image from 'next/image'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '@/util/firebase';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter()
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
        'login_hint': 'name@student.iugb.edu.ci',
        'hd': 'student.iugb.edu.ci'
    });

    function authenticate() {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                router.push('/')
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorCode, errorMessage, email)
                // ...
            });
    }
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