import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
     <div></div>
  )
}

export async function getServerSideProps() {
  return {
    redirect:{
      destination:'/en',
      permanent:true
    }
  }
}
