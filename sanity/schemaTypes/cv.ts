import { defineField, defineType } from 'sanity'

const cv = defineType({
  name: 'cv',
  title: 'Cv',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'pdfFile',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    }),
  ],
})

export default cv
