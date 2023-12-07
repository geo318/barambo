'use server'

import sharp from 'sharp'
import { writeFile } from '/utils'
import { db, productsToSubcategories } from '/server'
import { revalidatePath } from 'next/cache'
import { and, eq } from 'drizzle-orm'
import { SQLiteTableWithColumns, TableConfig } from 'drizzle-orm/sqlite-core'

type Cruds = {
  model: SQLiteTableWithColumns<TableConfig & any>
  revalidate: string[]
  formData: FormData
  imgOptions?: Parameters<typeof writeFile>['3']
}

export const createModel = async ({
  model,
  revalidate,
  formData,
  imgOptions,
}: Cruds) => {
  try {
    const mappedEntries = await prepareFormData(formData, imgOptions)
    if ('error' in mappedEntries) return { error: mappedEntries.error }

    const res = await db.insert(model).values(mappedEntries)
    revalidate.forEach((path) => revalidatePath(path, 'page'))

    const subCategoryIds = formData.get('categoryIds')

    if (typeof subCategoryIds === 'string') {
      subCategoryIds.split(',').map(Number)
      for (const subCategoryId of subCategoryIds) {
        await saveProductToSubcategory(
          Number(res.lastInsertRowid),
          Number(subCategoryId)
        )
      }
    }

    return { success: 'record added' }
  } catch (e) {
    return {
      error: 'record already exists or something went wrong',
    }
  }
}

export const updateModel = async ({
  model,
  revalidate,
  formData,
  imgOptions,
}: Cruds) => {
  const categoryIds = formData.get('categoryIds')

  if (typeof categoryIds === 'string') {
    const subCategoryIds = categoryIds.split(',').map(Number)
    const categoryProducts = await db
      .select()
      .from(productsToSubcategories)
      .where(eq(productsToSubcategories.productId, Number(formData.get('id'))))
      .execute()

    for (const ci of subCategoryIds) {
      if (categoryProducts.some((cp) => cp.subCategoryId === ci)) continue
      else await saveProductToSubcategory(Number(formData.get('id')), ci)
    }

    for (const cp of categoryProducts) {
      if (subCategoryIds.some((ci) => ci === cp.subCategoryId)) continue
      else
        await db
          .delete(productsToSubcategories)
          .where(
            and(
              eq(productsToSubcategories.productId, Number(formData.get('id'))),
              eq(productsToSubcategories.subCategoryId, cp.subCategoryId)
            )
          )
    }
  }

  try {
    const updateValues = await prepareFormData(formData, imgOptions)
    if ('error' in updateValues) return { error: updateValues.error }

    await db
      .update(model)
      .set(updateValues)
      .where(eq(model.id, Number(formData.get('id'))))

    revalidate.forEach((path) => revalidatePath(path, 'page'))
    return { success: 'record updated' }
  } catch (e) {
    return {
      error: 'error updating record',
    }
  }
}

export const deleteModel = async ({ model, revalidate, formData }: Cruds) => {
  try {
    await db.delete(model).where(eq(model.id, Number(formData.get('id'))))
    revalidate.forEach((path) => revalidatePath(path, 'page'))

    return { success: 'record deleted' }
  } catch (e) {
    return {
      error: 'cannot delete record',
    }
  }
}

async function prepareFormData(
  formData: FormData,
  Options: Parameters<typeof writeFile>['3'] = {}
) {
  try {
    const formDataEntries = Array.from(formData.entries())
    const mappedEntries = {} as Record<string, string | number | boolean>

    for (const [key, val] of formDataEntries) {
      if (val instanceof Blob) {
        const buffer = Buffer.from(await val.arrayBuffer())
        const { path } = await writeFile([val], buffer, sharp(buffer), Options)
        mappedEntries[key] = path

        continue
      }

      mappedEntries[key] = val
    }
    return mappedEntries
  } catch (e) {
    return {
      error: 'error preparing form data',
    }
  }
}

async function saveProductToSubcategory(
  productId: number,
  subCategoryId: number
) {
  await db.insert(productsToSubcategories).values({ productId, subCategoryId })
}
