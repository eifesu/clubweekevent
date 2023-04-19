'use client'
import Category from "@/components/Category";
import useAuth from "@/hooks/useAuth";
import { fetchCategories, fetchUserVotes } from "@/util/db";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
  

const Home = () => {
  interface Props {
    categories: Category[]
    votes: Vote[]
  }
  const Categories = ({ categories, votes }: Props) => {
    return (
      <>
        <h1 className="text-start w-full text-xl mt-4">
          CATEGORIES{" "}
          <b className="text-lg opacity-20">{categories.length}</b>
        </h1>
        <div className="w-full h-full grid grid-cols-2 gap-2">
          {categories &&
            categories.map((category) => (
              <Category
                key={category.id}
                category={category}
                voted={votes.some(vote => vote.category === category.id)}
              />
            ))}
        </div>
      </>
    )
  }

  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([])
  const [votes, setVotes] = useState<Vote[]>([])
  const { user, loading } = useAuth()
  
  useEffect(() => {
   console.log("Logging user from Home page: ", user)
   if(!user && loading) {
    console.log("User not defined", user)
     router.push("/") 
   }
  }, [user]);

  useEffect(() => {
    async function fetchData() {
      const categories = await fetchCategories();
      const votes = await fetchUserVotes()
      setCategories(categories)
      setVotes(votes)
    }
    fetchData() 
  }

  , [])

  return (
    <div className="h-full flex-1 p-4">
      <div className="p-4 h-full bg-secondary rounded-[32px] relative flex flex-col gap-2 items-center">
        <div
          className="w-16 h-2 bg-tertiary rounded-[32px] absolute top-3 "
          style={{ left: "calc(50% - 32px)" }}></div>
        <Categories categories={categories} votes={votes} />
        <div className="bg-tertiary w-full rounded-[32px] text-xs text-center p-2">
          SUPPORT YOUR FAVORITE CLUB
        </div>
      </div>
    </div>
  );
};

export default Home;
