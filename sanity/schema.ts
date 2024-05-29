import { type SchemaTypeDefinition } from 'sanity'
import skills from './schemaTypes/skills'
import experience from './schemaTypes/experience'
import projects from './schemaTypes/projects'
import cv from './schemaTypes/cv'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [skills, experience, projects, cv],
}

