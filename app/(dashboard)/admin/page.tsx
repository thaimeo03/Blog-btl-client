import ApproveBlogSide from './_components/ApproveBlogSide'
import BlogAccounts from './_components/BlogAccounts'
import Charts from './_components/Charts'

export default function Admin() {
  return (
    <div className='min-h-screen'>
      <Charts />
      <div className='grid grid-cols-2 mt-10'>
        <div className='col-span-1 border-r-2 border-blue-500 pt-4 pr-4'>
          <ApproveBlogSide />
        </div>
        <div className='col-span-1 pl-4 pt-4'>
          <BlogAccounts />
        </div>
      </div>
    </div>
  )
}
