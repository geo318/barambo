export type Props = {
  toggleModal: () => void
  isDeleting: boolean
  children: React.ReactNode
  handleDelete: () => Promise<void>
  toggleDeleteDialog: () => void
}
