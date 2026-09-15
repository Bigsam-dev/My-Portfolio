import {defineField,defineType} from 'sanity';
const mediaField=(name:string,title:string,required=false)=>defineField({name,title,type:'image',options:{hotspot:true},fields:[{name:'altText',title:'Alt text',type:'string',validation:(Rule)=>required?Rule.required():Rule}],validation:(Rule)=>required?Rule.required():Rule});
export default defineType({name:'siteMedia',title:'Profile media',type:'document',description:'Use only real, authorized photography. Do not upload generated people or unlicensed stock imagery.',fields:[
 mediaField('portrait','Primary / workspace portrait'),mediaField('workingPhoto','Working / supporting portrait'),mediaField('secondaryPhoto','Compact headshot'),
 defineField({name:'representativeProof',title:'Representative CRM / automation proof',type:'array',description:'General implementation samples only. Do not imply that these belong to a named project without verified attribution.',of:[{type:'projectScreenshot'}]}),
]});
