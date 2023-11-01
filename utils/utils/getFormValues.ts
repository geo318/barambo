export const getFormValues = <TObj extends { [K in keyof TObj]: TObj[K] }>(
  formData: FormData
): [{ [K in keyof TObj]: TObj[K] extends Blob ? never : TObj[K] }, Blob[]] => {
  const formDataEntries = Array.from(formData.entries()) as Array<
    [keyof TObj, TObj[keyof TObj] | any]
  >

  const mappedEntries = {} as TObj
  let fileList: Blob[] = []

  for (const [key, val] of formDataEntries) {
    if (val instanceof Blob) {
      fileList.push(val)
      continue
    }

    mappedEntries[key] = val
  }

  return [mappedEntries, fileList]
}
