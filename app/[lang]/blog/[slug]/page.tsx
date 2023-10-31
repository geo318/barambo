export default function Post({ params }: { params: { slug: string } }) {
  return <div>New Blog Post: {params.slug}</div>
}
