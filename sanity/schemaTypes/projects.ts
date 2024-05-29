import { defineField, defineType } from 'sanity'

const projects = defineType({
  name: 'projects',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'projectTitle',
      title: 'Project title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'hint',
      title: 'Hint',
      type: 'string',
    }),
    defineField({
      name: 'finishedAt',
      title: 'Finished at',
      type: 'date',
    }),
    defineField({
      name: 'source',
      title: 'Code source',
      type: 'string',
    }),
    defineField({
      name: 'imagePath',
      title: 'Image path',
      type: 'string',
    }),
    defineField({
      name: 'site',
      title: 'Deployed site',
      type: 'string',
    }),
  ],
})

export default projects
