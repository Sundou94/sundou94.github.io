import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    category: z.enum(['urban-observation', 'photography', 'tools', 'data']),
    tags: z.array(z.string()).default([]),
    series: z.string().optional(),
    excerpt: z.string().max(200),
    coverImage: z.string().optional(),
    featured: z.boolean().default(false),
    readingMinutes: z.number().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
