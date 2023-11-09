'use client'

import { ErrorMessage } from '@hookform/error-message'
import { Editor } from '@tinymce/tinymce-react'
import { ON_PASTE_MULTILINE_SEPARATOR_REGEX } from './helpers'
import { Props } from './types'
import { useTinyMCE } from './useTinyMCE'

const TinyMCE: React.FC<Props> = (props) => {
  const {
    blurHandler,
    focusHandler,
    isFocused,
    labelRef,
    appearedOnce,
    editorRef,
    borderOverlayRef,
    bottomOverlayRef,
    topOverlayRef,
    editorIsMounted,
    setEditorIsMounted,
    editorOnChangeHandler,
    errors,
    value,
    editorEventListeners,
    isEditorLoading,
    setIsEditorLoading,
  } = useTinyMCE(
    props.inputName,
    props.externalOnChangeHandler,
    props.needsDraft,
    props.placeholder,
    props.registerOptions
  )

  const extraInitConfiguration = props.extraInitConfiguration ?? {}

  return (
    <label
      htmlFor={props.inputName}
      ref={labelRef}
      className='flex w-full flex-col space-y-2'
    >
      {appearedOnce || props.doesNotNeedScrollObserver ? (
        <>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium text-slate-650'>
              {props.labelName}
            </span>
          </div>
          <div
            className={`relative mt-2 rounded-[10px] shadow-sm disabled:bg-gray-50 disabled:text-gray-500 border-gray-300 ${
              errors?.[props.inputName] ? 'border border-red-300' : ''
            } ${
              isFocused && errors?.[props.inputName]
                ? 'ring-2 ring-red-500'
                : ''
            }`}
          >
            {props.needsLoader && !editorIsMounted && (
              <div
                style={{ height: props.height }}
                className='absolute top-0 left-0 z-50 w-full animate-pulse rounded-[10px] bg-gray-300'
              >
                &#8203;
              </div>
            )}
            {props.canNotEdit && (
              <div
                id={`${props.inputName.replaceAll('.', '-')}-disabled-cover`}
                className='pointer-events-none absolute z-10 h-full w-full bg-gray-200 bg-opacity-30'
              />
            )}
            {props.needsOverlay && (
              <>
                <div
                  ref={borderOverlayRef}
                  className='pointer-events-none absolute top-0 left-0 z-10 h-full w-full border-2 border-white'
                />
                <div
                  ref={topOverlayRef}
                  className='absolute top-0 left-0 z-10 h-[60px] w-full bg-white'
                />
                <div
                  tabIndex={0}
                  ref={bottomOverlayRef}
                  className='absolute top-full left-0 z-10 h-8 w-full -translate-y-[95%] bg-white'
                />
              </>
            )}
            {isEditorLoading && (
              <div
                className='h-full w-full my-5 bg-zinc-300 transition-opacity opacity-0 animate-pulse rounded-md'
                style={{
                  height: props.height,
                }}
              />
            )}
            <div hidden={isEditorLoading}>
              <Editor
                onInit={(_e, editor) => {
                  setEditorIsMounted(true)
                  setIsEditorLoading(false)
                  editorRef.current = editor
                }}
                apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                init={{
                  statusbar: false,
                  inline_styles: true,
                  selector: 'textarea#emoticons',
                  height: props.height,
                  menubar: false,
                  body_class: props.inputName,
                  plugins: `advlist autolink lists emoticons link paste ${props.extraPlugins}`,
                  toolbar:
                    'undo redo | formatselect | ' +
                    'bold italic | ' +
                    'bullist numlist outdent indent | link emoticons',
                  content_style: 'body { font-family:Inter; font-size:16px; }',
                  placeholder: props.placeholder,
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
                  ...(extraInitConfiguration as any),
                }}
                onEditorChange={editorOnChangeHandler}
                onFocus={focusHandler}
                value={value}
                onBlur={blurHandler}
                disabled={props.canNotEdit}
                data-test-id={props.inputName}
              />
            </div>
          </div>
          {errors && (
            <div
              data-test-id={`${props.inputName}-error`}
              className='mt-1 h-4 min-h-[1rem] text-xs text-red-500 text-left'
            >
              <ErrorMessage name={props.inputName} errors={errors} />
            </div>
          )}
        </>
      ) : (
        <div
          style={{ height: props.height }}
          className='block w-full animate-pulse bg-gray-300'
        >
          &#8203;
        </div>
      )}
    </label>
  )
}

export default TinyMCE
