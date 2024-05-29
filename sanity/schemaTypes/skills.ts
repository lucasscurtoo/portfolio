import { defineField, defineType } from 'sanity'

export const skillLevel = [
  { title: 'Basic', value: 'basic' },
  { title: 'Intermediate', value: 'intermediate' },
  { title: 'Advanced', value: 'advanced' },
]

const skills = defineType({
  name: 'skills',
  title: 'Skills',
  type: 'document',
  fields: [
    defineField({
      name: 'skill',
      title: 'Skill',
      type: 'string',
    }),
    defineField({
      name: 'imagePath',
      title: 'Image path',
      type: 'string',
    }),
    defineField({
      name: 'level',
      title: 'Level of the skill',
      type: 'string',
      options: {
        list: skillLevel.map(({ title, value }) => ({ title, value })),
        layout: 'dropdown',
      },
    }),
  ],
})

export default skills

