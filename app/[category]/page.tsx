"use client"
import Category from '@/components/Category';
import Participant from '@/components/Participant';
import { addVote, fetchCategories, fetchCategory, fetchClubs } from '@/util/db';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { auth } from '@/util/firebase';
import { useRouter } from 'next/navigation';

const Page = () => {
  
  interface Props {
    clubs: Club[]
    name: string
    picks: string[],
    setPicks: (picks: string[]) => void
  }
  
  const List = ({ clubs, name, picks, setPicks }: Props) => {
    return (
      <>
        <h1 className="text-start w-full text-lg mt-4">
          {name}{" "}
          <b className="text-lg opacity-20">{clubs.length}</b>
        </h1>
        <div className="w-full flex flex-col h-full gap-3 ">
          {clubs ?
            clubs.map((club) => (
              <>
                <Participant
                  key={club.id}
                  club={club}
                  picks={picks}
                  setPicks={setPicks}
                />
              </>
            )) : null}
        </div>
      </>
    )
  }
  const pathname = usePathname().charAt(1).trim()
  const [metadata, setMetadata] = useState<Category>()
  const [clubs, setClubs] = useState<Club[]>([])
  const [picks, setPicks] = useState<string[]>([])
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser
    if(!user) {
      router.push("/auth")
    }
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User: ", user)
      } else {
        router.push('/auth')
      }
    })

  }, [])


  useEffect(() => {
    const fetch = async () => {
      const m = await fetchCategory(pathname);
      const c = await fetchClubs(pathname);
      console.log(c)
      setMetadata(m)
      setClubs(c)
    }
    fetch()
  }, [pathname])



if (auth.currentUser != null) {
    const uid = auth.currentUser.uid

    return (
      <>
        <div className="h-full flex-1 p-4">
          <div className="p-4 h-full bg-secondary rounded-[32px] relative flex flex-col gap-2 items-center">
            {clubs && metadata ? <>
              <div
                className="w-16 h-2 bg-tertiary rounded-[32px] absolute top-3 "
                style={{ left: "calc(50% - 32px)" }}></div>
              <List clubs={clubs} name={metadata.name} picks={picks} setPicks={setPicks} />
              {picks.length == 3 ? <button
                onClick={async () => {
                  const result = await addVote({
                    userId: uid,
                    category: pathname,
                    first: picks[0],
                    second: picks[1],
                    third: picks[2]
                  })

                  if (result) {
                    alert("Thanks for voting !")
                    router.push('/')
                  }



                }}
                className="bg-primary w-full rounded-[32px] text-md text-center p-2">
                VOTE
              </button> : <button disabled className="bg-tertiary w-full rounded-[32px] text-md text-center p-2">
                VOTE
              </button>
              }
            </>
              : null}
          </div>
        </div>
      </>
    );
  }
};

export default Page;
