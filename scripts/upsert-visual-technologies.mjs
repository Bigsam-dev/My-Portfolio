import {getCliClient} from 'sanity/cli';

const client=getCliClient({apiVersion:'2025-02-19'});
const records=[
  {_id:'technology-jobtread',_type:'technology',name:'JobTread',slug:{_type:'slug',current:'jobtread'},category:'CRM & construction operations',websiteUrl:'https://www.jobtread.com/'},
  {_id:'technology-brevo',_type:'technology',name:'Brevo',slug:{_type:'slug',current:'brevo'},category:'Marketing automation & CRM',websiteUrl:'https://www.brevo.com/'},
];

for(const record of records){
  await client.createIfNotExists(record);
  await client.patch(record._id).set(record).commit();
  console.log(`Upserted ${record.name}`);
}
