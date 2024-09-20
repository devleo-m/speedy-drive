import { z } from "zod";

export const IdSchema = z.object({
    id: z.coerce.number({ message: "Id must be a number" }),
})