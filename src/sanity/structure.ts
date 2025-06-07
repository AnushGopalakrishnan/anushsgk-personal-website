import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Profile - Single document
      S.listItem()
        .title('Profile')
        .child(
          S.document()
            .schemaType('profile')
            .documentId('profile')
        ),
      // Projects
      S.documentTypeListItem('project')
        .title('Projects'),
    ])
