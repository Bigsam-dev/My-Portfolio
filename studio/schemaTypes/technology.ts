import {defineField,defineType} from 'sanity';
export default defineType({name:'technology',title:'Technology',type:'document',fields:[
 defineField({name:'name',title:'Name',type:'string',validation:(Rule)=>Rule.required()}),defineField({name:'slug',type:'slug',options:{source:'name'},validation:(Rule)=>Rule.required()}),
 defineField({name:'logo',type:'image',options:{hotspot:true}}),defineField({name:'category',type:'string'}),defineField({name:'description',title:'Short description',type:'text',rows:3}),defineField({name:'websiteUrl',title:'Website URL',type:'url'}),
],preview:{select:{title:'name',subtitle:'category',media:'logo'}}});
