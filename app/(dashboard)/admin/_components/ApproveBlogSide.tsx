'use client'
import { DataTable } from './DataTable'
import { columns } from './ApproveBlogColumn'
import { BLOG_STATUS } from '@/common/constants/role.constant'
import { useQuery } from '@tanstack/react-query'
import { getAllBlogsForAdminApi } from '@/apis/admin.api'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { IBlogsForAdminFilter } from '@/interfaces/posts.interface'
import { formatDateFromISO } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { blogsFiltersInitialValue } from '@/common/constants/defaultValues.constant'

interface IItemSelection {
  value: BLOG_STATUS
  text: string
}

export default function ApproveBlogSide() {
  const itemSelection: IItemSelection[] = [
    { value: BLOG_STATUS.PENDING, text: 'Pending' },
    { value: BLOG_STATUS.ACCEPTED, text: 'Accepted' },
    { value: BLOG_STATUS.REJECTED, text: 'Rejected' }
  ]

  const [filters, setFilter] = useState<IBlogsForAdminFilter>(blogsFiltersInitialValue)

  const { data, isSuccess } = useQuery({
    queryKey: ['blogs_admin', filters],
    queryFn: () => getAllBlogsForAdminApi(filters)
  })

  const handleItemValueChange = (value: BLOG_STATUS) => {
    setFilter({ ...filters, status: value })
  }

  const handleSeeMore = () => {
    setFilter({ ...filters, limit: filters.limit + blogsFiltersInitialValue.limit })
  }

  const dataFormatted = data?.data.map((blog) => {
    return {
      id: blog.id,
      status: blog.status,
      title: blog.title,
      createdAt: formatDateFromISO(blog.createdAt)
    }
  })

  return (
    <div>
      <div className='flex justify-between'>
        <h2 className='text-xl font-bold'>Approve blogs</h2>
        <Select onValueChange={handleItemValueChange}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Filter' />
          </SelectTrigger>
          <SelectContent>
            {itemSelection.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='mt-5'>{isSuccess && <DataTable columns={columns} data={dataFormatted || []} />}</div>

      <Button
        onClick={handleSeeMore}
        className='mt-5 bg-transparent border border-neutral-800 text-black hover:text-white'
      >
        See More ...
      </Button>
    </div>
  )
}
