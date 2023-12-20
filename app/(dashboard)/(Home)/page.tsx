import FunctionalArea from './_components/FunctionalArea'
import BlogList from './_components/PostList'

export default function Home() {
  return (
    <main className='mt-3'>
      <div className='grid grid-cols-6'>
        <div className='col-span-1'>
          <div className='fixed'>
            <FunctionalArea />
          </div>
        </div>
        <div className='col-span-5'>
          <BlogList />
        </div>
      </div>
    </main>
  )
}
