'use client'
import Category from "@/components/Category";
import { fetchCategories, fetchUserVotes, fetchVotes } from "@/util/db";
import { auth } from "@/util/firebase";
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

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User: ", user)
      } else {
        router.push('/auth')
      }
    })

  }, [])

  useEffect(() => {
    async function fetchData() {
      const categories = await fetchCategories();
      const votes = await fetchUserVotes()
      setCategories(categories)
      setVotes(votes)
    }
    fetchData()

  }, [])

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
