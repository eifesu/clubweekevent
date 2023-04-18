'use client'
import React, { useEffect, } from 'react'
import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';
import { auth, db } from '@/util/firebase';
import { fetchUserVotes } from '@/util/db';
import { DocumentData, collection, onSnapshot, query, where } from 'firebase/firestore';

function Tracker() {
  const [votes, setVotes] = React.useState<number>(0)
  const pathname = usePathname();

  useEffect(() => {
    if(auth.currentUser?.uid != null) {
      const q = query(collection(db, "votes"), where("userId", "==", auth.currentUser.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const arr: Vote[] = [];
        querySnapshot.forEach((doc : any) => {
          arr.push(doc.data());
        });
        console.log(arr)
        setVotes(arr.length)
      });

      return unsubscribe;
    }

  }, [])

  if (pathname == "/auth") return null
  if (auth.currentUser == null) return null


  return (
    <div className="w-full p-4">
      <div className="bg-quaternary p-4 py-6 relative rounded-md flex items-center justify-center">
        <p className="text-xs absolute z-10">You have {4 - votes} votes remaining <Icon className="inline" fontSize={20} icon="fluent-emoji:timer-clock" /></p>
        <div style={{ width: (votes / 4 * 100) + '%' }} className={`rounded-md bg-primary h-full absolute left-0 transition-all ease-out duration-1000 `}></div>
      </div>
    </div>
  )
}

export default Tracker