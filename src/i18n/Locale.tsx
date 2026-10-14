import React,{createContext,useContext,useEffect,useState} from 'react';
import {ar} from './ar';
type Lang='en'|'ar';
const Context=createContext<{lang:Lang;setLang:(v:Lang)=>void}>({lang:'en',setLang:()=>{}});
export function LocaleProvider({children}:{children:React.ReactNode}){const [lang,setLang]=useState<Lang>(()=>{try{return localStorage.getItem('portfolio-language')==='ar'?'ar':'en';}catch{return 'en';}});useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';try{localStorage.setItem('portfolio-language',lang);}catch{}},[lang]);return <Context.Provider value={{lang,setLang}}>{children}</Context.Provider>}
export function useLocale(){const context=useContext(Context);const t=(value:string)=>{if(context.lang==='en')return value;const trimmed=value.trim();return ar[trimmed]?value.replace(trimmed,ar[trimmed]):value;};
// Translate rendered text and accessible descriptions, preserving URLs, identifiers, code, and image bytes.
function localize(node:React.ReactNode):React.ReactNode{if(typeof node==='string')return t(node);if(Array.isArray(node))return React.Children.map(node,child=>localize(child));if(!React.isValidElement<Record<string,unknown>>(node))return node;const props:Record<string,unknown>={};for(const key of ['alt','title','aria-label'])if(typeof node.props[key]==='string')props[key]=t(node.props[key] as string);if(node.props.children!==undefined)props.children=localize(node.props.children as React.ReactNode);return React.cloneElement(node,props);}
return {...context,t,localize};}
