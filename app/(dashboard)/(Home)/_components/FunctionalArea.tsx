'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import PostSideFeature from '../../_components/PostSideFeature'
import FilterSelection from '../../_components/FilterSelection'
import { useContext, useState } from 'react'
import { FilterContext, FilterContextType } from '@/components/FilterContextProvider'
import { IPostItem } from '@/interfaces/posts.interface'

export default function FunctionalArea() {
  const { postFilters } = useContext(FilterContext) as FilterContextType<IPostItem>
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      {/* Create new blog */}
      <div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant='outline'>Create new blog</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px] min-w-[800px] p-9 h-[90vh]'>
            <ScrollArea className='w-full h-full'>
              <PostSideFeature setIsOpen={setIsOpen} />
              <ScrollBar orientation='horizontal' />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <FilterSelection filterContexts={postFilters} />
    </div>
  )
}
