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
    <div>
      <h5 className='font-bold mb-5'>{heading}</h5>
      <ul className='flex flex-col gap-3'>
        {items.map(({ name, link }) => (
          <li key={name} className='text-sm'>
            {sec === 'contact' ? (
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
