import Head from 'next/head'
import axios from 'axios'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import ShowFood from '@/components/ShowFood'

interface Food {
  id?: number;
  name?: string;
  img?: string;
  link?: string;
}

export default function Home() {
  const [loadState, setLoadState] = useState<number>(0)
  const [food, setfood] = useState<Food>({})
  const [timeLimit, setTimeLimit] = useState(0)
  useEffect(() => {
    if (loadState > 0 && loadState < 100) {
      setTimeout(() => {
        setLoadState(loadState + 1)
      }, timeLimit);
    }
  }, [loadState])
  return (
    <div className={styles.container}>
      <Head>
        <title>next food random</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="text-4xl text-slate-800">คิดไม่ออกจะกินอะไรดี🥗</h1>
        <h3 className="text-lg">งั้นไม่ต้องคิด สุ่มเอา</h3>
        <div className='text-center'>
          <button onClick={() => {
            if(loadState !== 0 && loadState !== 100) return;
            setTimeLimit(Math.floor(Math.random() * 100))
            setLoadState(1)
            axios.get('/api/food').then(res => {
              setfood(res.data)
            })

          }} className="bg-zinc-100 py-2 px-3 rounded border border-zinc-300 my-3">
            สุ่ม
          </button>
          {loadState === 100 ? (
            <ShowFood id={food.id ?? 0} img={food.img ?? ""} link={food.link ?? ""} name={food.name ?? ""} />
          ) : (
            <div>
              <div className="bg-zinc-200 w-[50vh] h-2 rounded-lg">
                <div style={{ width: `${loadState}%` }} className='rounded-lg bg-orange-400 h-2'></div>
                <div>กำลังโหลด {loadState}%</div>
              </div>
            </div>

          )}
        </div>
      </main >

      <footer className={styles.footer}></footer>
    </div >
  )
}
