import { routes } from './routes'

export const navList = [
  { name: 'home', link: routes.home, menu: [] },
  { name: 'about', link: routes.about, menu: [] },
  { name: 'product', link: routes.product, menu: [] },
  { name: 'blog', link: routes.blog, menu: [] },
  { name: 'excursion', link: routes.excursion, menu: [] },
  { name: 'contact', link: routes.contact, menu: [] },
] as const

export const adminNavList = [
  { name: 'Category', link: routes.addCategory, menu: [] },
  { name: 'SubCategory', link: routes.addSubCategory, menu: [] },
  { name: 'Product', link: routes.addProduct, menu: [] },
  { name: 'Slider', link: routes.addSlider, menu: [] },
  { name: 'Post', link: routes.addPost, menu: [] },
  { name: 'Certificates', link: routes.addCertificate, menu: [] },
  { name: 'headline', link: routes.addHeadline, menu: [] },
  { name: 'Upload', link: routes.addFile, menu: [] },
  { name: 'Discover', link: routes.addDiscover, menu: [] },
  { name: 'Home Category', link: routes.homeCategory, menu: []}
] as const
