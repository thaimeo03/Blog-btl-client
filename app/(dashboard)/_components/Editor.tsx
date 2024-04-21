'use client'
import ReactQuill from 'react-quill'
import '@/styles/quill.snow.css'

interface EditorProps {
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
}

export default function Editor({ content, setContent }: EditorProps) {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean']
    ]
  }

  return (
    <ReactQuill
      theme='snow'
      value={content}
      onChange={setContent}
      modules={modules}
      className='bg-white dark:text-black w-full h-full'
    />
  )
}
