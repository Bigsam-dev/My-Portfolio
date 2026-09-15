import {defineType,defineArrayMember} from 'sanity';
export default defineType({name:'portableText',title:'Rich text',type:'array',of:[
  defineArrayMember({type:'block',styles:[{title:'Normal',value:'normal'},{title:'Heading 2',value:'h2'},{title:'Heading 3',value:'h3'},{title:'Quote',value:'blockquote'}],lists:[{title:'Bulleted',value:'bullet'},{title:'Numbered',value:'number'}],marks:{annotations:[{name:'link',type:'object',title:'Link',fields:[{name:'href',type:'url',validation:(Rule)=>Rule.uri({scheme:['http','https','mailto']})}]}]}}),
  defineArrayMember({type:'image',options:{hotspot:true},fields:[{name:'altText',type:'string',title:'Alt text',validation:(Rule)=>Rule.required()},{name:'caption',type:'string'}]}),
  defineArrayMember({name:'codeBlock',title:'Code block',type:'object',fields:[{name:'language',type:'string'},{name:'code',type:'text',rows:12,validation:(Rule)=>Rule.required()}],preview:{select:{title:'language',subtitle:'code'},prepare:({title,subtitle})=>({title:title||'Code',subtitle})}}),
]});
