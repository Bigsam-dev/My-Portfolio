import {createReadStream} from 'node:fs'
import {resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'

const client=getCliClient({apiVersion:'2026-08-31'})
const mediaRoot=resolve(process.cwd(),'..','media','phase7')

const sources={
  workspace:{path:resolve(mediaRoot,'profile','sam-workspace-portrait.png.png'),filename:'sam-workspace-portrait.png'},
  formal:{path:resolve(mediaRoot,'profile','sam-formal-standing.jpg.jpeg'),filename:'sam-formal-standing.jpg'},
  headshot:{path:resolve(mediaRoot,'profile','sam-headshot.jpg.jpeg'),filename:'sam-headshot.jpg'},
  customFunction:{path:resolve(mediaRoot,'proof','zoho-custom-function.png.png'),filename:'zoho-custom-function.png'},
}

async function uploadOrReuse(source:{path:string;filename:string}){
  const existing=await client.fetch<{_id:string}|null>('*[_type=="sanity.imageAsset"&&originalFilename==$filename][0]{_id}',{filename:source.filename})
  if(existing)return existing
  return client.assets.upload('image',createReadStream(source.path),{filename:source.filename})
}

const [workspace,formal,headshot,customFunction]=await Promise.all([
  uploadOrReuse(sources.workspace),uploadOrReuse(sources.formal),uploadOrReuse(sources.headshot),uploadOrReuse(sources.customFunction),
])

const image=(assetId:string,altText:string,hotspot={x:.5,y:.5,height:.8,width:.8})=>({
  _type:'image',asset:{_type:'reference',_ref:assetId},hotspot:{_type:'sanity.imageHotspot',...hotspot},altText,
})

await client.createOrReplace({
  _id:'site-media',
  _type:'siteMedia',
  portrait:image(workspace._id,'Professional portrait of the SAMDIGITALS founder working at a desk in an office setting.',{x:.54,y:.48,height:.76,width:.76}),
  workingPhoto:image(formal._id,'Formal portrait of the SAMDIGITALS founder standing outdoors in a navy suit.',{x:.5,y:.42,height:.78,width:.78}),
  secondaryPhoto:image(headshot._id,'Professional headshot of the SAMDIGITALS founder in a navy suit.',{x:.5,y:.42,height:.72,width:.72}),
  representativeProof:[{
    _type:'projectScreenshot',_key:'custom-crm-automation-function',order:1,displayStyle:'dashboard',
    image:image(customFunction._id,'Custom CRM function screen showing year-to-date revenue and account credit-limit calculation logic.'),
    altText:'Custom CRM function screen showing year-to-date revenue and account credit-limit calculation logic.',
    title:'Custom CRM automation function',
    caption:'Zoho CRM function that calculates year-to-date revenue and updates an account record. Shown as representative implementation proof.',
  }],
})

console.log(JSON.stringify({profileMedia:3,representativeProof:1,siteMediaId:'site-media'}))
