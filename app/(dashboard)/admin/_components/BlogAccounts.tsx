'use client'
import { IUserInfoForAdmin } from '@/interfaces/users.interface'
import { columns } from './BloggerColumn'
import { DataTable } from './DataTable'
import { ROLE } from '@/common/constants/role.constant'
import { useQuery } from '@tanstack/react-query'
import { getAllBloggersApi } from '@/apis/admin.api'
import { useState } from 'react'
import { bloggerFiltersInitialValue } from '@/common/constants/defaultValues.constant'
import { Button } from '@/components/ui/button'
import Input from '@/components/Input'

export default function BlogAccounts() {
  const [bloggerFilters, setBloggerFilters] = useState(bloggerFiltersInitialValue)
  const [searchTermName, setSearchTermName] = useState('')

  const { data } = useQuery({
    queryKey: ['bloggers_accounts', bloggerFilters],
    queryFn: () => getAllBloggersApi(bloggerFilters)
  })

  const handleSeeMore = () => {
    setBloggerFilters({
      ...bloggerFilters,
      limit: bloggerFilters.limit + bloggerFiltersInitialValue.limit
    })
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBloggerFilters({
      ...bloggerFilters,
      searchNameTerm: searchTermName
    })
    setSearchTermName('')
  }

  return (
    <div>
      <div className='flex justify-between'>
        <h2 className='text-xl font-bold'>Blogger accounts</h2>
        <form onSubmit={handleSearch}>
          <Input placeholder='Search' value={searchTermName} onChange={(e) => setSearchTermName(e.target.value)} />
        </form>
      </div>

      <div className='mt-5'>
        <DataTable columns={columns} data={data?.data || []} />
        <Button
          onClick={handleSeeMore}
          className='mt-5 bg-transparent border border-neutral-800 text-black hover:text-white'
        >
          See More ...
        </Button>
      </div>
    </div>
  )
}
