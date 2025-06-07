export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'projectUrl',
      title: 'Project URL',
      type: 'url',
      validation: (Rule: any) => Rule.uri({
        scheme: ['http', 'https', 'mailto']
      }),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'video',
      title: 'Video/GIF',
      type: 'file',
      options: {
        accept: 'video/*,.gif'
      }
    },
    {
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          }
        }
      ],
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
    },
  },
}
