'use client'

import { sendMessageGeminiApi } from '@/apis/gemini.api'
import { Button } from '@/components/ui/button'
import { IGeminiContent } from '@/interfaces/gemini.interface'
import { useMutation } from '@tanstack/react-query'
import { marked } from 'marked'

interface ContentSuggestionProps {
  title: string
  setContent: React.Dispatch<React.SetStateAction<string>>
}

export default function ContentSuggestion({ title, setContent }: ContentSuggestionProps) {
  // Hard code
  const geminiBlogContent: IGeminiContent = {
    contents: [
      {
        parts: [
          {
            text: `Viết một bài blog ngắn về chủ đề ${title}`
          }
        ]
      }
    ]
  }

  const generateSuggestionMutation = useMutation({
    mutationFn: () => sendMessageGeminiApi(geminiBlogContent),
    onSuccess: (data) => {
      const rawContent = data.candidates[0].content.parts[0].text

      // const contentFormatted = formatContent(rawContent)
      const contentFormatted = marked.parse(rawContent, {
        breaks: true,
        gfm: true
      })

      setContent(contentFormatted as string)
    }
  })

  const handleClick = () => {
    if (title.length > 0) {
      generateSuggestionMutation.mutate()
    }
  }

  return (
    <Button onClick={handleClick} type='button' className='text-xs bg-blue-600 p-0 h-[30px] px-2 hover:bg-blue-900'>
      Suggest content
    </Button>
  )
}
