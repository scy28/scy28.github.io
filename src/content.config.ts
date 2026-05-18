import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const notes = defineCollection({
    loader: glob({
        base: "./src/content/notes",
        pattern: "**/*.{md,mdx}",
    }),

    schema: z.object({
        title: z.string(),
        date: z.string(),
        description: z.string(),
        tags: z.array(z.string()).optional(),
    }),
});

export const collections = { notes };