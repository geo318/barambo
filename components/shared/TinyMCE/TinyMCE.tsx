'use client'

import { ErrorMessage } from '@hookform/error-message'
import { Props } from './types'
import { useTinyMCE } from './useTinyMCE'
import { WYSIWYG } from './Editor'

const TinyMCE: React.FC<Props> = (props) => {
  const {
    blurHandler,
    focusHandler,
    isFocused,
    labelRef,
    editorRef,
    editorOnChangeHandler,
    errors,
    value,
    editorEventListeners,
    isEditorLoading,
    setIsEditorLoading,
  } = useTinyMCE(
    props.inputName,
    props.externalOnChangeHandler,
    props.placeholder,
    props.registerOptions
  )

  return (
    <label
      htmlFor={props.inputName}
      ref={labelRef}
      className='flex w-full flex-col space-y-2'
    >
      <div className='flex items-center justify-between'>
        <span className='text-sm font-medium text-slate-650'>
          {props.labelName}
        </span>
      </div>
      <div
        className={`relative mt-2 rounded-[10px] shadow-sm disabled:bg-gray-50 disabled:text-gray-500 border-gray-300 ${
          errors?.[props.inputName] ? 'border border-red-300' : ''
        } ${
          isFocused && errors?.[props.inputName] ? 'ring-2 ring-red-500' : ''
        }`}
      >
        {isEditorLoading && (
          <div
            className='h-full w-full my-5 bg-zinc-300 transition-opacity opacity-0 animate-pulse rounded-md'
            style={{
              height: props.height,
            }}
          />
        )}
        <input hidden name={props.inputName} value={value} readOnly/>
        <div hidden={isEditorLoading}>
          <WYSIWYG
            editorEventListeners={editorEventListeners}
            height={props.height}
            name={props.inputName}
            onInit={(_e, editor) => {
              setIsEditorLoading(false)
              editorRef.current = editor
            }}
            onEditorChange={editorOnChangeHandler}
            onFocus={focusHandler}
            value={value}
            onBlur={blurHandler}
            placeholder={props.placeholder}
          />
        </div>
      </div>
      {errors && (
        <div className='mt-1 h-4 min-h-[1rem] text-xs text-red-500 text-left'>
          <ErrorMessage name={props.inputName} errors={errors} />
        </div>
      )}
    </label>
  )
}

export default TinyMCE
