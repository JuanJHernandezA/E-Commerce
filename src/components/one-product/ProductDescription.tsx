import React from 'react'
import {EditorContent, useEditor} from '@tiptap/react'
import type {JSONContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import type { Json } from '../../supabase/supabase';

interface Props {
    content: JSONContent | Json;
}
const ProductDescription = ({content}:Props) => {

    const editor = useEditor({
        extensions:[StarterKit],
        content: content as JSONContent,
        editable: false,
        editorProps:{
            attributes:{
                class:'prose max-w-none prose-sm sm:prose-base'
            }
        },

    })
  return (
    <div className='mt-12'>
      <h2 className="text-2xl font-bold text-center mb-8 underline">
        Descripción
      </h2>
      <EditorContent editor={editor} />
    </div>
  )
}

export default ProductDescription
