export default function Footer() {
  return (
    <footer className='relative bottom-0 left-0 right-0 bg-white rounded-lg shadow m-4 dark:bg-gray-800'>
      <div className='w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between'>
        <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          © 2024{' '}
          <a href='https://www.facebook.com/hongthai.tran.56808/' className='hover:underline'>
            Tran Hong Thai
          </a>
          . Ordinary, but not trivial
        </span>
      </div>
    </footer>
  )
}
