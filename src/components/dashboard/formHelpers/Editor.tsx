import { EditorContent, useEditor, type Editor as EditorType, type JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, type ReactNode } from 'react';
import type {
	FieldErrors, FieldValues, Path,
	PathValue, UseFormSetValue
} from 'react-hook-form';

interface Props <T extends FieldValues>{
    name?: Path<T>;
    setValue: UseFormSetValue<T>,
    errors: FieldErrors<T>,
    initialContent?:JSONContent
}

export const MenuBar = ({
	editor,
}: {
	editor: EditorType | null;
}) => {
	const buttonClass = (isActive: boolean) =>
		`w-8 h-7 grid place-items-center  border text-sm rounded transition-all ${
			isActive
				? 'border-blue-500 bg-blue-100 text-blue-700'
				: 'border-gray-300 bg-white text-gray-600 hover:bg-gray-100'
		}`;

	if (!editor) {
		return null;
	}

	
	return (
		<div className='flex flex-wrap gap-3'>
			<button
				onClick={() =>
					editor.chain().focus().toggleHeading({ level: 1 }).run()
				}
				className={buttonClass(
					editor.isActive('heading', { level: 1 })
				)}
				type='button'
			>
				H1
			</button>

			<button
				onClick={() =>
					editor.chain().focus().toggleHeading({ level: 2 }).run()
				}
				className={buttonClass(
					editor.isActive('heading', { level: 2 })
				)}
				type='button'
			>
				H2
			</button>

			<button
				onClick={() =>
					editor.chain().focus().toggleHeading({ level: 3 }).run()
				}
				className={buttonClass(
					editor.isActive('heading', { level: 3 })
				)}
				type='button'
			>
				H3
			</button>

			<button
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={buttonClass(editor.isActive('bold'))}
				type='button'
			>
				N
			</button>

			<button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				className={buttonClass(editor.isActive('italic'))}
				type='button'
			>
				K
			</button>

			<button
				onClick={() => editor.chain().focus().toggleStrike().run()}
				className={buttonClass(editor.isActive('strike'))}
				type='button'
			>
				S
			</button>
		</div>
	);
};

const Editor = <T extends FieldValues>({name = "description" as Path<T>,setValue,errors,initialContent}:Props<T>) => {
    const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent || "",
    onUpdate: ({ editor }) => {
      const content = editor.getJSON();

      // 2. Usamos PathValue para que coincida con el tipo esperado en T
      setValue(name, content as PathValue<T, Path<T>>, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    editorProps: {
        attributes: {
            class: 'focus:outline-none min-h-[150px] prose prose-sm sm:prose-base'
        }
    }
  });

  useEffect(()=>{
		if(initialContent && editor) {
			editor.commands.setContent(initialContent)
		}
	}, [initialContent,editor])

  const errorMessage = errors[name]?.message as string | undefined;
  return (
    <div className='space-y-3'>
        <MenuBar editor={editor}/>
      <EditorContent editor={editor} />

      {
        errorMessage && (
            <p className="text-red-500 text-xs mt-1">
                {errorMessage as ReactNode|| 'Debe escribir una descripción'}
            </p>
        )
      }
    </div>
  )
}

export default Editor
