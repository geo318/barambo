export const objToFormData = <T>(data: { [K in keyof T]: T[K] }) => {
  const formData = new FormData()

  for (const key in data) {
    if (key in data) {
      formData.append(key, data[key] as string | Blob)
    }
  }
  return formData
}

//refactor this code to be senior quality below please
export const objToFormData2 = <T>(data: { [K in keyof T]: T[K] }) => {
  const formData = new FormData()

  for (const key in data) {
    if (key in data) {
      formData.append(key, data[key] as string | Blob)
    }
  }
  return formData
}
