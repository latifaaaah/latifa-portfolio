import {useEffect,useRef,useState} from 'react';
import type {ProjectImage} from '../data/projects';
import {useLocale} from '../i18n/Locale';
export function ImageGallery({images,featured=false,label}:{images:ProjectImage[];featured?:boolean;label:string}) {
 const {localize,t}=useLocale();const [index,setIndex]=useState<number|null>(null);const [zoom,setZoom]=useState(false);const dialog=useRef<HTMLDialogElement>(null);
 const selected=index!==null?images[index]:undefined;
 useEffect(()=>{if(index===null)return;const el=dialog.current!;const prior=document.body.style.overflow;document.body.style.overflow='hidden';el.showModal();return()=>{el.close();document.body.style.overflow=prior;};},[index!==null]);
 const move=(delta:number)=>{setIndex(i=>i===null?null:(i+delta+images.length)%images.length);setZoom(false);};
 const close=()=>{setIndex(null);setZoom(false);};
 if(!images.length)return localize(<div className="asset-placeholder"><h3>Verified visuals to be added</h3></div>);
 return localize(<div className={featured?'screenshot-showcase':'image-gallery'} aria-label={label}>
 {(featured?images.slice(0,1):images).map((im,i)=><figure className={'screenshot-figure '+(im.kind==='document'?'document-figure':'')} key={im.src}><div className="screenshot-chrome"><span className="system-mark">⊕</span><span>{im.kind==='document'?'PROJECT / SUPPORTING DOCUMENT':featured?'SYSTEM / PROJECT INTERFACE':'PROJECT / VISUAL EVIDENCE'}</span><span>{String(i+1).padStart(2,'0')}</span></div><button className="screenshot-button" onClick={()=>{setIndex(i);setZoom(false);}} aria-label={t(im.kind==='document'?'Enlarge document':'Enlarge screenshot')+' — '+t(im.alt)}><img src={im.src} alt={t(im.alt)} loading="lazy" decoding="async"/><span className="enlarge-label">{im.kind==='document'?'View full poster ↗':'Enlarge screenshot ↗'}</span></button><figcaption>{im.caption||im.alt}{im.note&&<p className="document-note">{im.note}</p>}</figcaption></figure>)}
 <dialog ref={dialog} className="lightbox" aria-labelledby={label.replace(/\W/g,'')+'-lightbox-title'} onCancel={e=>{e.preventDefault();close();}} onClick={e=>{if(e.target===e.currentTarget)close();}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();move(1);}if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}}}>
 <div className="lightbox-top"><h2 id={label.replace(/\W/g,'')+'-lightbox-title'}>{selected?t(selected.alt):''}</h2><button onClick={()=>setZoom(!zoom)} aria-pressed={zoom}>{zoom?'Fit to screen':'Original size'}</button><button autoFocus onClick={close} aria-label="Close image viewer">Close ×</button></div>
 <div className={'lightbox-image '+(zoom?'zoomed':'')} dir="ltr">{selected&&<img src={selected.src} alt={t(selected.alt)}/>}</div>
 <div className="lightbox-bottom"><button onClick={()=>move(-1)} disabled={images.length<2} aria-label="Previous screenshot">← Previous</button><span>{index!==null?index+1:0} / {images.length}</span><button onClick={()=>move(1)} disabled={images.length<2} aria-label="Next screenshot">Next →</button></div><p className="lightbox-caption">{selected?.caption||selected?.alt}</p>{selected?.kind==='document'&&<a className="original-document-link" href={selected.src} target="_blank" rel="noreferrer">Open original document ↗</a>}
 </dialog></div>);
}
