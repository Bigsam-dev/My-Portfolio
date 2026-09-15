import {createClient,type SanityClient} from '@sanity/client';
export const sanityConfig={projectId:import.meta.env.PUBLIC_SANITY_PROJECT_ID?.trim(),dataset:import.meta.env.PUBLIC_SANITY_DATASET?.trim()||'production',apiVersion:import.meta.env.PUBLIC_SANITY_API_VERSION?.trim()||'2026-08-31'};
export const isSanityConfigured=Boolean(sanityConfig.projectId&&sanityConfig.dataset);
let client:SanityClient|undefined;
export const getSanityClient=()=>{if(!isSanityConfigured)throw new Error('Sanity is not configured. Add PUBLIC_SANITY_PROJECT_ID and PUBLIC_SANITY_DATASET to .env.');return client??=createClient({...sanityConfig,projectId:sanityConfig.projectId!,useCdn:true,perspective:'published'})};
