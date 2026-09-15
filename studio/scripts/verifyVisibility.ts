import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-08-31'})
const testId = 'phase65-temporary-draft-visibility-test'

await client.createOrReplace({
  _id: testId,
  _type: 'project',
  title: 'Temporary visibility test',
  slug: {_type: 'slug', current: 'temporary-visibility-test'},
  category: 'Temporary test',
  summary: 'Temporary test record.',
  visibility: 'draft',
})

try {
  const result = await client.fetch<{
    publicCount: number
    testDocumentExists: boolean
    testDocumentIsPublic: boolean
  }>(`{
    "publicCount": count(*[_type == "project" && visibility in ["card-only", "case-study"]]),
    "testDocumentExists": defined(*[_id == $testId][0]._id),
    "testDocumentIsPublic": defined(*[_id == $testId && visibility in ["card-only", "case-study"]][0]._id)
  }`, {testId})

  if (!result.testDocumentExists || result.testDocumentIsPublic || result.publicCount !== 3) {
    throw new Error(`Visibility verification failed: ${JSON.stringify(result)}`)
  }

  console.log(`Visibility verification passed: ${JSON.stringify(result)}`)
} finally {
  await client.delete(testId)
  const remaining = await client.fetch<number>('count(*[_id == $testId])', {testId})
  if (remaining !== 0) throw new Error('Temporary visibility test document was not removed.')
  console.log('Temporary visibility test document removed.')
}
