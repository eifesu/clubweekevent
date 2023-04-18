'use client'
import useAuth from "@/hooks/useAuth";
import { auth } from "@/util/firebase";
import { usePathname, useRouter } from "next/navigation";

function Button() {
  const pathname = usePathname();
  const router = useRouter();
  switch (pathname) {
    case "/home":
      return <button 
      onClick={() => auth.signOut()}
      className='border-[32] flex items-center justify-center border-2 border-white bg-transparent text-white text-[8px] p-2 px-4 rounded-[32px] active:border-transparent active:bg-primary hover:bg-primary hover:border-transparent transition-all ease-out'>
      Logout
  </button>
    default:
      return <button 
      onClick={() => router.push('/home')}
      className='border-[32] flex items-center justify-center border-2 border-white bg-transparent text-white text-[8px] p-2 px-4 rounded-[32px] active:border-transparent active:bg-primary hover:bg-primary hover:border-transparent transition-all ease-out'>
      Back
  </button>
  }
}
function Navigation() {
  const {user, loading} = useAuth();
  const pathname = usePathname();
  if (pathname == "/") return null
  return (
    <div>
        <div className="bg-quaternary text-white p-2 text-[8px] opacity-50">@chrisyesso</div>
        <nav className='flex items-center justify-between p-4'>
            <div className="text-white">
                <h1>{ user ? auth.currentUser?.displayName?.split(" ")[auth.currentUser?.displayName?.split(" ").length - 1] : ''}</h1>
                <h2 className='text-[8px] opacity-50'>{user ? auth.currentUser?.displayName?.split(" ")[auth.currentUser.displayName?.split(" ").length - 2] : ''}</h2>
            </div>
            <Button />
        </nav>
    </div>
  )
}

export default Navigation