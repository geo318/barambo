import { EmailForm } from '/types'

export const EmailTemplate: React.FC<Readonly<Partial<EmailForm>>> = ({
  name,
  last_name,
  email,
  personal_id,
  address,
  message,
}) => (
  <div className='max-w-2xl mx-auto p-4 border border-gray-300 rounded'>
    <header className='bg-gray-200 py-4 text-center'>
      <h1 className='text-2xl font-semibold'>New order</h1>
    </header>
    <main className='py-4 text-xl'>
      <ul className='mb-4 flex flex-col list-disc'>
        <li>
          <span className='text-base font-semibold'>Name:</span>{' '}
          {`${name} ${last_name}`}
        </li>
        <li>
          <span className='text-base font-semibold'>Email:</span> {email}
        </li>
        <li>
          <span className='text-base font-semibold'>Id:</span> {personal_id}
        </li>
        <li>
          <span className='text-base font-semibold'>Address:</span>: {address}
        </li>
        {message && (
          <li>
            <span className='text-base font-semibold'>Comment</span> {message}
          </li>
        )}
      </ul>
    </main>
    <footer className='bg-gray-200 py-4 text-center'>
      <p className='text-gray-600'>Contact us at support@wallypay.eu</p>
    </footer>
  </div>
)
