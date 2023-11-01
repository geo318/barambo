import { useClickOutSide } from '/hooks'

export const useDropDown = ({ handleClose }: { handleClose: () => void }) => {
  const containerRef = useClickOutSide<HTMLDivElement>({ cb: handleClose })

  return { handleClose, containerRef }
}
