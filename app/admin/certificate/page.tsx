import { Suspense } from 'react'
import {
  CertForm,
  CloseModal,
  H,
  Portal,
  SearchParamsWrapper,
  Spinner,
} from '/components'
import {
  createCertificate,
  deleteCertificate,
  editCertificate,
  getCertificates,
} from '/server'
import Link from 'next/link'

export default async function Certificate() {
  const certificates = await getCertificates()

  return (
    <div className='grid grid-cols-10 gap-10'>
      <section className='pb-10 col-span-7'>
        <H tag='h1' size='md' className='mb-20 text-center'>
          Add Certificate
        </H>
        <Suspense fallback={<Spinner />}>
          <CertForm action={createCertificate} />
        </Suspense>
      </section>

      <section className='max-h-[80vh] overflow-y-auto col-span-3'>
        <H tag='h1' size='md' className='mb-20 text-center'>
          Slides
        </H>
        <div className='grid grid-cols-1 gap-5 capitalize'>
          <Suspense fallback={<Spinner />}>
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className='flex gap-3 border border-slate-400 rounded-lg hover:shadow-lg p-5'
              >
                <h3 className='font-bold'>{cert.title_eng}</h3>
                <div className='flex gap-3 ml-auto'>
                  <Link href={`?edit=${cert.id}`}>Edit</Link>
                </div>
              </div>
            ))}
          </Suspense>
        </div>
      </section>

      <Suspense fallback={<div>Loading...</div>}>
        <SearchParamsWrapper query={['edit']}>
          <Portal>
            <div className='flex flex-col bg-white max-w-lg mx-auto mt-20 py-5 rounded-xl'>
              <div className='max-h-[80vh] overflow-y-auto px-10 pt-2 pb-10'>
                <div className='flex py-3'>
                  <h3 className='font-lg font-bold'>Edit Certificate</h3>
                  <CloseModal className='p-0' />
                </div>
                <CertForm
                  action={editCertificate}
                  deleteAction={deleteCertificate}
                  defaultValues={certificates}
                  query='edit'
                />
              </div>
            </div>
          </Portal>
        </SearchParamsWrapper>
      </Suspense>
    </div>
  )
}
