export type ProjectStatus='delivered'|'in-progress'|'ongoing'|'architecture'|'concept';
export type ProjectVisibility='draft'|'card-only'|'case-study';
export type ScreenshotStyle='full-width'|'browser-frame'|'dashboard'|'mobile'|'split'|'detail-crop';
export interface SanityImageRef{asset?:{_ref?:string;url?:string};hotspot?:Record<string,number>;crop?:Record<string,number>;altText?:string}
export interface Technology{name:string;slug?:string;category?:string;description?:string;websiteUrl?:string;logo?:SanityImageRef}
export interface ProjectScreenshot{image:SanityImageRef;altText:string;caption?:string;title?:string;displayStyle:ScreenshotStyle;order?:number;url?:string;srcset?:string}
export interface ImplementationItem{order:number;title:string;description?:string;image?:SanityImageRef;technologies?:Technology[]}
export interface Metric{label:string;value:string;context?:string;verified:boolean}
export interface Testimonial{quote:string;clientName:string;role?:string;company?:string;approvedForPublication:boolean}
export interface CMSProject{_id:string;title:string;slug:string;client?:string;industry?:string;category:string;status?:ProjectStatus;year?:number;timeline?:string;summary:string;featured:boolean;featuredOrder?:number;order:number;visibility:ProjectVisibility;role?:string;services:string[];technologies:Technology[];tech:string[];problem?:string;businessContext?:string;solution?:string;workflow:string[];system:string[];implementation:ImplementationItem[];outcomes:string[];metrics:Metric[];testimonial?:Testimonial;coverImage?:SanityImageRef;coverUrl?:string;coverSrcset?:string;screenshots:ProjectScreenshot[];seoTitle:string;seoDescription:string;visualType:'telehealth'|'mortgage'|'attribution';source:'sanity'|'local'}
export interface PortableTextChild{_key?:string;_type:'span';text:string;marks?:string[]}
export interface PortableTextBlock{_key?:string;_type:string;style?:string;listItem?:string;level?:number;children?:PortableTextChild[];markDefs?:unknown[];[key:string]:unknown}
export interface CMSInsight{_id:string;title:string;slug:string;summary:string;category:string;publishedAt?:string;status:'draft'|'published';featured:boolean;seoTitle:string;seoDescription:string;coverImage?:SanityImageRef;body?:PortableTextBlock[];source:'sanity'|'local'}
export interface SiteMediaImage{image?:SanityImageRef;url?:string;srcset?:string;altText?:string}export interface SiteMedia{portrait?:SiteMediaImage;workingPhoto?:SiteMediaImage;secondaryPhoto?:SiteMediaImage;representativeProof?:ProjectScreenshot[]}
