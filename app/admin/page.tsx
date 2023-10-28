import { SwitchForms } from '/components'

export default function Admin() {
  return (
    <div>
      <div className='relative'>
        <h1 className='pb-0 text-xl font-semibold text-center'>
          Upload new track info
        </h1>
      </div>
      <div className='flex mt-20'>
        <SwitchForms />
      </div>
    </div>
  )
}
