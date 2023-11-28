import Link from 'next/link'
import { footer, locales } from '/config'
import { SharedText } from '/types'

export const FooterUl: React.FC<{
  items: (typeof footer)[number]['list']
  text: SharedText['footer']
  heading: string
  lang: (typeof locales)[number]
  sec: (typeof footer)[number]['name']
}> = ({ items, text, heading, lang }) => {
  return (
    <div className='text-secondary'>
      <h5 className='font-medium lg:text-2xl text-md lg:mb-7 mb-4'>
        {heading}
      </h5>
      <ul className='flex flex-col lg:gap-5 gap-2'>
        {items.map(({ name, link }) => (
          <li key={name} className='lg:text-lg text-xs'>
            <Link href={`/${lang}${link}` || '#'} className='balanced'>
              {text.list[name]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
