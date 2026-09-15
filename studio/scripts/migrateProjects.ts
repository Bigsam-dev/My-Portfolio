import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-08-31'})

const technologyNames = [
  'API',
  'Automation',
  'BNtouch',
  'GoHighLevel',
  'Google Ads',
  'LendingPad',
  'Tebra',
  'Web',
  'Zoho',
  'Zoho Analytics',
]

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const technologyId = (name: string) => `technology-${slugify(name)}`
const references = (names: string[]) =>
  names.map((name) => ({_type: 'reference', _key: slugify(name), _ref: technologyId(name)}))
const implementation = (titles: string[]) =>
  titles.map((title, index) => ({_type: 'implementationItem', _key: `step-${index + 1}`, order: index + 1, title}))

const projects = [
  {
    _id: 'project-sleep-performance-company',
    title: 'Sleep Performance Company',
    slug: 'sleep-performance-company',
    client: 'Sleep Performance Company',
    industry: 'Telehealth / Healthcare Technology',
    category: 'Telehealth Operations System',
    summary: 'A connected patient and practice workflow designed across the website, intake experience, Tebra clinical operations, Zoho practice operations, and automation layers.',
    featuredOrder: 1,
    services: ['Patient Journey Architecture', 'Website Systems', 'CRM / Operations', 'Workflow Automation', 'Systems Integration'],
    technologies: ['Tebra', 'Zoho', 'Automation', 'Web'],
    problem: 'Patient and practice activity needed to move across the website, intake experience, clinical operations, practice operations, and automation layers as one connected workflow.',
    businessContext: 'The system spans both the patient-facing journey and the operational tools used behind it, including Tebra and Zoho.',
    solution: 'A connected patient and practice workflow designed around the handoffs between intake, clinical operations, practice operations, and automation.',
    workflow: ['Patient Experience', 'Intake', 'Clinical Operations', 'Practice Operations', 'Automation'],
    implementation: ['Patient Journey Architecture', 'Website Systems', 'CRM / Operations', 'Workflow Automation'],
    seoTitle: 'Sleep Performance Company — Telehealth Operations System | SAMDIGITALS',
    seoDescription: 'A connected patient and practice workflow across website intake, Tebra clinical operations, Zoho practice operations, and automation layers.',
  },
  {
    _id: 'project-citadel-home-loan',
    title: 'Citadel Home Loan',
    slug: 'citadel-home-loan',
    client: 'Citadel Home Loan',
    industry: 'Mortgage / Lending',
    category: 'Mortgage Application Infrastructure',
    summary: 'A lead and application workflow connecting the public website, BNtouch, LendingPad, document collection, and internal operations without forcing borrowers through unnecessary friction.',
    featuredOrder: 2,
    services: ['Website Infrastructure', 'Lead Capture', 'Mortgage Workflow Architecture', 'CRM Integration', 'Document Workflow'],
    technologies: ['BNtouch', 'LendingPad', 'Zoho', 'Web'],
    problem: 'Lead capture, the mortgage application, document collection, and internal operations needed a connected workflow without adding unnecessary friction for borrowers.',
    businessContext: 'The workflow crosses the public website, BNtouch, LendingPad, document collection, and internal operations.',
    solution: 'A lead and application architecture connecting the borrower-facing journey to the systems supporting mortgage operations.',
    workflow: ['Website', 'Borrower Intake', 'CRM', 'Loan Application', 'Internal Operations'],
    implementation: ['Website Infrastructure', 'Lead Capture', 'Mortgage Workflow Architecture', 'CRM Integration', 'Document Workflow'],
    seoTitle: 'Citadel Home Loan — Mortgage Application Infrastructure | SAMDIGITALS',
    seoDescription: 'A connected mortgage lead and application workflow across the website, BNtouch, LendingPad, document collection, and internal operations.',
  },
  {
    _id: 'project-gymfitout-dubai',
    title: 'GymFitOut Dubai',
    slug: 'gymfitout-dubai',
    client: 'GymFitOut Dubai',
    industry: 'Fitness / Commercial Equipment',
    category: 'Marketing Attribution System',
    status: 'architecture',
    summary: 'An attribution architecture connecting GoHighLevel, advertising data, custom API syncs, and Zoho Analytics to create a clearer view of lead source and campaign performance.',
    featuredOrder: 3,
    services: ['Marketing Attribution', 'CRM Data Architecture', 'Analytics', 'API Integration', 'Reporting Infrastructure'],
    technologies: ['GoHighLevel', 'Google Ads', 'Zoho Analytics', 'API'],
    problem: 'Lead sources, campaign data, CRM records, and reporting existed across separate tools, making marketing analysis dependent on fragmented data.',
    businessContext: 'Advertising data, GoHighLevel records, custom API synchronization, and Zoho Analytics all form part of the attribution architecture.',
    solution: 'A normalized data flow connecting advertising and GoHighLevel to a custom API synchronization layer and Zoho Analytics.',
    workflow: ['Advertising', 'Lead Capture', 'GoHighLevel', 'API Sync', 'Analytics'],
    implementation: ['Marketing Attribution', 'CRM Data Architecture', 'API Integration', 'Reporting Infrastructure'],
    seoTitle: 'GymFitOut Dubai — Marketing Attribution System | SAMDIGITALS',
    seoDescription: 'A marketing attribution architecture connecting GoHighLevel, advertising data, custom API synchronization, and Zoho Analytics.',
  },
]

let transaction = client.transaction()

for (const name of technologyNames) {
  transaction = transaction.createOrReplace({
    _id: technologyId(name),
    _type: 'technology',
    name,
    slug: {_type: 'slug', current: slugify(name)},
  })
}

for (const project of projects) {
  transaction = transaction.createOrReplace({
    _id: project._id,
    _type: 'project',
    title: project.title,
    slug: {_type: 'slug', current: project.slug},
    client: project.client,
    industry: project.industry,
    category: project.category,
    ...(project.status ? {status: project.status} : {}),
    summary: project.summary,
    featured: true,
    featuredOrder: project.featuredOrder,
    order: project.featuredOrder,
    visibility: 'case-study',
    services: project.services,
    technologies: references(project.technologies),
    problem: project.problem,
    businessContext: project.businessContext,
    solution: project.solution,
    workflow: project.workflow,
    implementation: implementation(project.implementation),
    seoTitle: project.seoTitle,
    seoDescription: project.seoDescription,
  })
}

const result = await transaction.commit({visibility: 'sync'})
console.log(`Migrated ${projects.length} projects and ${technologyNames.length} technologies in transaction ${result.transactionId}.`)
