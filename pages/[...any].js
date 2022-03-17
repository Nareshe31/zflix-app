
export default function Any() {
  return (
     <div></div>
  )
}

export async function getStaticPaths() {
    return {
      paths: [],
      fallback: true
    }
  }

export async function getStaticProps() {
  return {
    redirect:{
      destination:'/en',
      permanent:true
    }
  }
}
