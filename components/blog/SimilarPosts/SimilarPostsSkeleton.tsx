export const SimilarPostsSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i}>
          <div className='relative w-full aspect-square'>
            <div className='rounded-[1rem] h-full w-full aspect-square animate-pulse bg-zinc-200' />
          </div>
          <div className='flex flex-col gap-2 mt-5'>
            <p className='text-lg text-secondary line-clamp-2 text-ellipsis leading-relaxed h-6 rounded-md animate-pulse bg-zinc-200' />
          </div>
        </div>
      ))}
    </>
  )
}
