import { BadgeOne, BadgeThree, BadgeTwo, H } from '/components'

export const Slide = ({ i = 0, title = '', description = '' }) => (
  <>
    <div className='flex gap-[2vw] shrink-1 items-center'>
      <div className='grow flex max-w-[2.5rem] max-h-[3rem]'>
        {i === 1 && <BadgeOne />}
        {i === 2 && <BadgeTwo />}
        {i === 3 && <BadgeThree />}
      </div>

      <H
        tag='h3'
        className='line-clamp-2 text-ellipsis overflow-hidden'
        size='sm'
        title={title}
      >
        {title}
      </H>
    </div>

    <p
      className='break-before-all lg:text-lg text-xs leading-normal mt-4 line-clamp-3 text-ellipsis'
      title={description}
    >
      {description}
    </p>
  </>
)
