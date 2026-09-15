import {defineField,defineType} from 'sanity';
export default defineType({name:'testimonial',title:'Testimonial',type:'document',description:'Only publish client feedback you have permission to display.',fields:[
 defineField({name:'quote',type:'text',rows:5,validation:(Rule)=>Rule.required()}),defineField({name:'clientName',title:'Client name',type:'string',validation:(Rule)=>Rule.required()}),defineField({name:'role',type:'string'}),defineField({name:'company',type:'string'}),
 defineField({name:'portraitOrLogo',title:'Portrait or logo',type:'image',options:{hotspot:true}}),defineField({name:'relatedProject',title:'Related project',type:'reference',to:[{type:'project'}]}),
 defineField({name:'approvedForPublication',title:'Approved for publication',type:'boolean',initialValue:false,description:'Enable only when you have permission to publish this feedback.'}),
],preview:{select:{title:'clientName',subtitle:'company',media:'portraitOrLogo'}}});
