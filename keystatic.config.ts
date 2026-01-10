import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },

  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishDate: fields.date({
          label: 'Publish Date',
          defaultValue: { kind: 'today' },
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: '도시 관찰', value: 'urban-observation' },
            { label: '사진', value: 'photography' },
            { label: '도구', value: 'tools' },
            { label: '데이터', value: 'data' },
          ],
          defaultValue: 'urban-observation',
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props) => props.value,
          }
        ),
        series: fields.text({
          label: 'Series (optional)',
        }),
        excerpt: fields.text({
          label: 'Excerpt',
          multiline: true,
          validation: { length: { max: 200 } },
        }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/covers',
          publicPath: '/images/covers/',
        }),
        featured: fields.checkbox({
          label: 'Featured Post',
          defaultValue: false,
        }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'public/images/posts',
              publicPath: '/images/posts/',
            },
          },
        }),
      },
    }),
  },
});
