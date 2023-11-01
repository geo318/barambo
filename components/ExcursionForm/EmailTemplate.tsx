import { EmailForm } from '/types'

export const EmailTemplate: React.FC<Readonly<Partial<EmailForm>>> = ({
  name,
  phone,
  class: nameOfClass,
  school,
  description,
}) => (
  <div className='max-w-2xl mx-auto p-4 border border-gray-300 rounded'>
    <header className='bg-gray-200 py-4 text-center'>
      <h1 className='text-2xl font-semibold'>Excursion</h1>
    </header>
    <main className='py-4 text-xl'>
      <ul className='mb-4 flex flex-col list-disc'>
        <li>
          <span className='text-base font-semibold'>Name:</span> {name}
        </li>
        <li>
          <span className='text-base font-semibold'>Phone:</span> {phone}
        </li>
        <li>
          <span className='text-base font-semibold'>Class:</span> {nameOfClass}
        </li>
        <li>
          <span className='text-base font-semibold'>description:</span>:{' '}
          {description}
        </li>
      </ul>
    </main>
    <footer className='bg-gray-200 py-4 text-center'>
      <p className='text-gray-600'>Contact us at info@barambo.ge</p>
    </footer>
  </div>
)
