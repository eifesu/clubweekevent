'use client'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'
interface Props {
    club: Club,
    picks: string[],
    setPicks: any
}



function Participant({club, picks, setPicks} : Props) {
  const router = useRouter()
  function pick() {
    
    if (picks.includes(club.id)) {
      setPicks(picks.filter((pick) => pick != club.id))
    } 
     else {
       if(picks.length < 3) {
        setPicks((prevState : any) => [...prevState, club.id])
       }
    }
  }
  return (
    <div 
    onClick ={() => pick()}
    key={club.id} className="bg-tertiary relative active:bg-quaternary transition-all ease-out p-4 rounded-xl flex items-center justify-center gap-4">
    <Icon icon={club.emoji} fontSize={20}/>
    <h1 className="text-center" style={{fontSize: 12}}>{club.name}</h1>
    <div className= {`w-8 h-8 rounded-full absolute transition-all ease-out duration-300 right-4 text-xs flex items-center justify-center bg-${picks.some((vote) => vote == club.id) ? 'primary' : 'secondary'}`}>
      {picks.some((vote) => vote == club.id) ? picks.findIndex((pick) => pick == club.id ) + 1 : null}
    </div>
  </div>
  )
}

export default Participant