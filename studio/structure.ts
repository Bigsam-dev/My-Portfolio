import type { StructureResolver } from 'sanity/structure';
export const structure: StructureResolver = (S) => S.list().title('SAMDIGITALS').items([
  S.listItem().title('Content').child(S.list().title('Content').items([
    S.documentTypeListItem('project').title('Projects'), S.documentTypeListItem('insight').title('Insights'),
    S.documentTypeListItem('testimonial').title('Testimonials'), S.documentTypeListItem('technology').title('Technologies'),
  ])),
  S.divider(), S.documentTypeListItem('siteMedia').title('Media / Profile'),
]);
