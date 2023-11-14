import { Suspense } from 'react'
import { CertForm, CloseModal, H, Portal, SliderForm } from '/components'
import { routes } from '/config'
import {
  createCertificate,
  deleteCertificate,
  editCertificate,
  getCertificates,
} from '/server'
import { SubCategory } from '/types'
import Link from 'next/link'

export default async function SubCategory({
  searchParams,
}: {
  searchParams: URLSearchParams & { edit?: number }
}) {
  const certificates = await getCertificates()

  return (
    <div>
      <section className='pb-10'>
        <H tag='h1' size='md' className='mb-20 text-center'>
          Add Certificate
        </H>
        <Suspense fallback={<div>Loading...</div>}>
          <CertForm action={createCertificate} />
        </Suspense>
      </section>

      <section>
        <H tag='h1' size='md' className='mb-20 text-center'>
          Slides
        </H>
        <div className='grid grid-cols-1 gap-5 capitalize'>
          <Suspense fallback={<div>loading...</div>}>
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className='flex flex-col gap-3 border border-slate-400 rounded-lg hover:shadow-lg p-5'
              >
                <div className='flex gap-3'>
                  <Link href={`?edit=${cert.id}`}>Edit</Link>
                  <form action={deleteCertificate}>
                    <input type='hidden' name='id' value={cert.id} />
                    <button
                      type='submit'
                      className='text-red-500 hover:underline'
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </Suspense>
        </div>
      </section>

      {'edit' in searchParams && (
        <Portal>
          <div className='flex flex-col bg-white max-w-lg mx-auto mt-20 py-5 rounded-xl'>
            <div className='max-h-[80vh] overflow-y-auto px-10 pt-2 pb-10'>
              <div className='flex py-3'>
                <h3 className='font-lg font-bold'>Edit slide</h3>
                <CloseModal
                  closeKey={`${routes.addCertificate}?edit-cert`}
                  className='p-0'
                />
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <CertForm
                  action={editCertificate}
                  defaultValues={certificates.find(
                    (p) => p.id === Number(searchParams?.edit)
                  )}
                />
              </Suspense>
            </div>
          </div>
        </Portal>
      )}
    </div>
  )
}
