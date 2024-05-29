import { defineField, defineType } from 'sanity'

const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'enterpriseName',
      title: 'Enterprise name',
      type: 'string',
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
    }),
    defineField({
      name: 'techs',
      title: 'Technologies used',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'skills' }],
        },
      ],
    }),
    defineField({
      name: 'startedAt',
      title: 'Started at',
      type: 'string',
    }),
    defineField({
      name: 'imagePath',
      title: 'Image path',
      type: 'string',
    }),
    defineField({
      name: 'endedAt',
      title: 'Ended at',
      type: 'string',
    }),
    defineField({
      name: 'tasks',
      title: 'Tasks',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'deployedSites',
      title: 'Deployed sites',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
            defineField({
              name: 'hint',
              title: 'Hint',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
})

export default experience
