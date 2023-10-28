import { z } from "zod";
import { insertCategorySchema } from "/schema";

export type Category = z.infer<typeof insertCategorySchema>