export const BlogPostsSkeleton = () => {
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className='flex aspect-square rounded-3xl overflow-hidden'>
          <div className='object-cover h-full w-full animate-pulse bg-zinc-200' />
        </div>
      ))}
    </>
  )
}
