import { Suspense } from 'react'
import {
  CloseModal,
  H,
  Portal,
  PostForm,
  SearchParamsWrapper,
  Spinner,
  SwitchForms,
} from '/components'
import { routes } from '/config'
import { createPost, deletePost, editPost, getPosts } from '/server'
import { Post, SubCategory } from '/types'
import { getImage } from '/utils'
import Image from 'next/image'
import Link from 'next/link'

export default async function SubCategory() {
  const posts = await getPosts()

  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <SwitchForms name='Post' />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <SearchParamsWrapper query={['edit', 'edit-item']} not>
          <section className='pb-10'>
            <H tag='h1' size='md' className='mb-20 text-center'>
              Add new blog post
            </H>
            <PostForm action={createPost} />
          </section>
        </SearchParamsWrapper>
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <SearchParamsWrapper query={['edit', 'edit-item']}>
          <section>
            <H tag='h1' size='md' className='mb-20 text-center'>
              Posts
            </H>
            <div className='grid grid-cols-3 gap-5 capitalize'>
              {posts.map((post) => (
                <div
                  key={post.id}
                  className='flex flex-col gap-3 border border-slate-400 rounded-lg hover:shadow-lg p-5'
                >
                  <div className='flex flex-col'>
                    <h3>
                      title eng: <strong>{post.title_eng}</strong>
                    </h3>
                    <h3>
                      title geo: <strong>{post.title_geo}</strong>
                    </h3>
                  </div>
                  <div className='flex flex-col editor gap-2 py-5 border-y border-slate-600 '>
                    Description eng
                    <div
                      className='line-clamp-2 text-ellipsis'
                      dangerouslySetInnerHTML={{ __html: post.content_eng }}
                    />
                    Description geo
                    <div
                      className='line-clamp-2 text-ellipsis'
                      dangerouslySetInnerHTML={{ __html: post.content_geo }}
                    />
                  </div>

                  {post.thumbnail && (
                    <Image
                      src={getImage`${post.thumbnail}`}
                      alt={post.title_eng}
                      className='w-full object-contain max-h-full max-w-full'
                      width='300'
                      height='100'
                    />
                  )}
                  <p>Type: {post.type}</p>
                  {post.link && <p>Link: {post.link}</p>}
                  <Link
                    href={`?edit=${post.id}`}
                    className='hover:underline text-blue-800 font-medium text-xl border border-black text-center rounded-md mt-4'
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </SearchParamsWrapper>
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <SearchParamsWrapper query={['edit']}>
          <Portal>
            <div className='flex flex-col bg-white max-w-3xl mx-auto mt-20 py-5 rounded-xl'>
              <div className='max-h-[80vh] overflow-y-auto px-10 pt-2 pb-10'>
                <div className='flex py-3'>
                  <h3 className='font-lg font-bold'>Edit Post</h3>
                  <CloseModal
                    closeKey={`${routes.addPost}?edit-post`}
                    className='p-0'
                  />
                </div>
                <PostForm
                  action={editPost}
                  deleteAction={deletePost}
                  query='edit'
                  defaultValues={posts as Post[]}
                />
              </div>
            </div>
          </Portal>
        </SearchParamsWrapper>
      </Suspense>
    </div>
  )
}
