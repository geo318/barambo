import Link from 'next/link'
import { footer, locales } from '/config'
import { SharedText } from '/types'

export const FooterUl: React.FC<{
  items: (typeof footer)[number]['list']
  text: SharedText['footer']
  heading: string
  lang: (typeof locales)[number]
  sec: (typeof footer)[number]['name']
}> = ({ items, text, heading, lang, sec }) => {
  return (
    <div className='text-secondary'>
      <h5 className='font-medium text-2xl mb-7'>{heading}</h5>
      <ul className='flex flex-col gap-5'>
        {items.map(({ name, link }) => (
          <li key={name} className='text-lg'>
            {sec === 'col_3' ? (
              <a
                target='_blank'
                href={
                  name === 'email'
                    ? `mailto:${link}`
                    : name === 'phone'
                    ? `tel:${link}`
                    : link
                }
              >
                {text.list[name]}
              </a>
            ) : (
              <Link href={`/${lang}${link}` || '#'} className='balanced'>
                {text.list[name]}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
