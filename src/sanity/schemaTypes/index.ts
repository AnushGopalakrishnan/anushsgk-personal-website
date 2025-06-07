import  profile  from './profileSchema'
import  project  from './projectSchema'
import { type SchemaTypeDefinition } from 'sanity'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [profile, project],
}
