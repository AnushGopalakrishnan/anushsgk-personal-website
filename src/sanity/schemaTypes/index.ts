import  profile  from './profileSchema'
import  project  from './projectSchema'
import { type SchemaTypeDefinition } from 'sanity'
import tagSchema from './tagSchema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [profile, project,tagSchema],
}
