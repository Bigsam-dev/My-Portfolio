import {defineField,defineType} from 'sanity';
export default defineType({name:'implementationItem',title:'Implementation item',type:'object',fields:[
 defineField({name:'order',type:'number',validation:(Rule)=>Rule.required().integer().min(1)}),defineField({name:'title',type:'string',validation:(Rule)=>Rule.required()}),defineField({name:'description',type:'text',rows:4}),defineField({name:'image',type:'image',options:{hotspot:true}}),defineField({name:'technologies',type:'array',of:[{type:'reference',to:[{type:'technology'}]}]}),
],preview:{select:{title:'title',order:'order'},prepare:({title,order})=>({title,subtitle:order?`Step ${order}`:undefined})}});
