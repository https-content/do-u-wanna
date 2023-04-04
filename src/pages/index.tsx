import Head from 'next/head'
import { Box, Button, CircularProgress, Slide, Typography, Zoom } from '@mui/material'
import { useEffect, useState } from 'react'
import myphrases from '../static/phrases.json'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function Home() {

  const [isLoading, setLoading] = useState(true)
  const [current, setCurrent] = useState<any>()

  const router = useRouter()

  useEffect(() => {
    const lastPhrase = window.localStorage.getItem("lastPhrase")
    console.log(lastPhrase)
    if (!lastPhrase) {
      setCurrent(myphrases.find((phrase) => Number(phrase.order) == 1))
    } else {
      setCurrent(JSON.parse(lastPhrase))
    }
    setLoading(false)
  }, [])

  function goToNext() {
    setLoading(true)
    setTimeout(() => {
      const currentPhrase = findPhraseByOrder(current.order + 1)
      setCurrent(currentPhrase)
      window.localStorage.setItem("lastPhrase", JSON.stringify(currentPhrase))
      setLoading(false)
    }, 1)
  }

  function goToPrevious() {
    setLoading(true)
    setTimeout(() => {
      const currentPhrase = findPhraseByOrder(current.order - 1)
      setCurrent(currentPhrase)
      window.localStorage.setItem("lastPhrase", JSON.stringify(currentPhrase))
      setLoading(false)
    }, 1)
  }

  function findPhraseByOrder(order: number) {
    return myphrases.find((phrase) => Number(phrase.order) == order)
  }

  async function yes() {
    const response = await axios.post(`/api/email`, { message: 'Giovanna aceitou ser sua namorada ❤❤' })
    console.log(response)
    if (response) router.push('/success')
  }

  async function no() {
    const response = await axios.post(`/api/email`, { message: 'Giovanna recusou o seu pedido de namoro 😞😞' })
    console.log(response)
    if (response) router.push('/failure')
  }

  return (
    <>
      <Head>
        <title>Hello, Anna</title>
        <meta name="description" content="I'm sorry if this is not the time" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/heart.svg" />
      </Head>
      <main className="w-screen h-screen bg-black text-white flex justify-center items-center p-5">
        {isLoading ? (<CircularProgress />) :
          <Zoom timeout={500} in={!isLoading}>
            <Box className="p-5">
              <Box className={`mb-3 w-full flex ${current.order > 1 ? 'justify-between' : 'justify-end'}`}>
                {current.order > 1 && <button className="text-red-500" onClick={goToPrevious}>Previous</button>}
                {current.order < myphrases.length && <button className="text-red-500" onClick={goToNext}>Next</button>}
              </Box>
              <Box className="mb-12 p-5 border-2 border-white rounded-xl">
                <Typography fontSize={24}>{current.text}</Typography>
              </Box>
              <Box className="w-full flex justify-between gap-3 mb-5">
                {current.options?.map((option: any) => (<button onClick={option.id == 1 ? yes : no} className={`bg-opacity-75 hover:bg-opacity-100 rounded-xl w-full p-3 ${option.id == 1 ? 'bg-green-500' : 'bg-red-500'}`} key={option.id}>{option.title}</button>))}
              </Box>
              {current.order == myphrases.length && <Typography fontSize={12} className="text-gray-400">Independent of your choice, I'm gratefull for all you have done in so little time</Typography>}
            </Box>
          </Zoom>}
      </main >
    </>
  )
}
