import { Editor, IAllProps } from '@tinymce/tinymce-react'
import { ON_PASTE_MULTILINE_SEPARATOR_REGEX } from './helpers'
import { type Editor as EditorSetup } from 'tinymce'
export const WYSIWYG = ({
  name,
  height,
  placeholder,
  onInit,
  editorEventListeners,
  onEditorChange,
  onFocus,
  value,
  onBlur,
}: {
  name: string
  height: number | string
  placeholder?: string
  onInit: IAllProps['onInit']
  onEditorChange: IAllProps['onEditorChange']
  onFocus: IAllProps['onFocus']
  value: IAllProps['value']
  onBlur: IAllProps['onBlur']
  editorEventListeners: (editor: EditorSetup) => void
}) => {
  return (
    <Editor
      onInit={onInit}
      apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
      init={{
        statusbar: false,
        inline_styles: true,
        height,
        menubar: false,
        body_class: name,
        plugins: `advlist autolink lists emoticons link paste`,
        toolbar:
          'undo redo | formatselect | ' +
          'bold italic | ' +
          'bullist numlist outdent indent | link emoticons',
        content_style: 'body { font-family:Inter; font-size:16px; }',
        placeholder,
        default_link_target: '',
        link_target_list: false,
        link_quicklink: true,
        entity_encoding: 'raw',
        advlist_bullet_styles: 'disc',
        smart_paste: true,
        paste_preprocess: (_editor, args) => {
          args.content = args.content.replaceAll(
            ON_PASTE_MULTILINE_SEPARATOR_REGEX,
            '<p style="margin: 0px 0px 15px; padding: 0px; text-align: justify;"></p>'
          )
          args.content = args.content.replace(
            /style="[^"]*background-color[^"]*"/gi,
            ''
          )
        },
        setup: editorEventListeners,
      }}
      onEditorChange={onEditorChange}
      onFocus={onFocus}
      value={value}
      onBlur={onBlur}
    />
  )
}
