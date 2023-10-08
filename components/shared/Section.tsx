import { twMerge } from 'tailwind-merge'

export const Section: React.FC<JSX.IntrinsicElements['section']> = ({
  children,
  ...props
}) => (
  <section
    {...props}
    className={twMerge('max-w-[120rem] w-full mx-auto px-[8vw]', props.className)}
  >
    {children}
  </section>
)
