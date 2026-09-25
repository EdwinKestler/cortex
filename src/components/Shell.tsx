import {useEffect,useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ArrowUpRight,Menu,Sun,Moon,X} from 'lucide-react';
export const routeSlugs={home:'',problem:'problem',solution:'solution',ctgot:'ct-got',investors:'investors',promoters:'promoters',technology:'technology',market:'market',pilot:'pilot',team:'team',contact:'contact',legal:'legal',design:'design'} as const;
export type RouteKey=keyof typeof routeSlugs;
export function href(lang:string,key:RouteKey){return `/${lang}${routeSlugs[key]?'/'+routeSlugs[key]:''}/`;}
export function currentRoute():RouteKey{const path=location.pathname.split('/').filter(Boolean).slice(1).join('/');return (Object.entries(routeSlugs).find(([,slug])=>slug===path)?.[0]||'home') as RouteKey;}
const mainNav:RouteKey[]=['solution','ctgot','investors','promoters','technology','contact'];
const allNav:RouteKey[]=['home','problem','solution','ctgot','investors','promoters','technology','market','pilot','team','contact','legal','design'];
export function Shell({children}:{children:React.ReactNode}){
 const {t,i18n}=useTranslation(),lang=i18n.language,route=currentRoute();
 const [menu,setMenu]=useState(false);
 const [theme,setTheme]=useState(()=>localStorage.getItem('cortex-theme')==='light'?'light':'dark');
 useEffect(()=>{document.documentElement.dataset.theme=theme;localStorage.setItem('cortex-theme',theme)},[theme]);
 useEffect(()=>{if(!menu)return;const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')setMenu(false)};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[menu]);
 const switchHref=href(lang==='es'?'en':'es',route);
 return <><a className="skip" href="#main">{t('common.skip')}</a><div className="site-shell">
 <header className="site-header"><div className="header-inner">
 <a className="brand" href={href(lang,'home')} aria-label="CORTEX"><span className="brand-mark" aria-hidden="true">C<span className="brand-dot"/></span><span className="brand-text">CORTEX<span className="brand-slash"> /</span></span></a>
 <nav className="nav-desktop" aria-label={t('common.menu')}>{mainNav.map(k=><a className={route===k?'active':''} aria-current={route===k?'page':undefined} key={k} href={href(lang,k)}>{t(`nav.${k}`)}</a>)}</nav>
 <div className="header-actions"><a className="language" href={switchHref} lang={lang==='es'?'en':'es'} aria-label={t('common.language')}>{lang==='es'?'EN':'ES'}</a><button className="icon-button" onClick={()=>setTheme(theme==='dark'?'light':'dark')} aria-label={t('common.theme')}>{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</button><button className="icon-button menu-button" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-label={menu?t('common.close'):t('common.menu')}>{menu?<X size={22}/>:<Menu size={22}/>}</button></div>
 </div></header>
 {menu&&<nav className="mobile-nav" aria-label={t('common.menu')}>{allNav.map(k=><a key={k} href={href(lang,k)} aria-current={route===k?'page':undefined} onClick={()=>setMenu(false)}>{t(`nav.${k}`)}</a>)}</nav>}
 <main id="main" tabIndex={-1}>{children}</main>
 <footer className="footer"><div className="wrap footer-grid"><div><a className="brand footer-brand" href={href(lang,'home')}>CORTEX</a><p className="footer-tagline">{t('common.tagline')}</p></div><nav className="footer-nav" aria-label={t('common.footerNav')}>{allNav.filter(k=>!['home','contact'].includes(k)).map(k=><a key={k} href={href(lang,k)}>{t(`nav.${k}`)}</a>)}</nav><div className="footer-legal"><p>{t('common.footer')}</p><p>{t('common.notOffer')}</p><a href={href(lang,'contact')}>{t('common.contact')} <ArrowUpRight size={14}/></a></div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} CORTEX</span><span>{t('common.source')}</span></div></footer>
 </div></>;
}
export function PageHero({eyebrow,title,lead,children}:{eyebrow:string,title:string,lead?:string,children?:React.ReactNode}){return <section className="page-hero scanline"><div className="wrap"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{lead&&<p className="hero-lead">{lead}</p>}{children}</div></section>}
export function SectionHeader({index,heading,description}:{index?:string,heading:string,description?:string}){return <div className="section-head">{index&&<span className="section-index">{index}</span>}<div><h2>{heading}</h2>{description&&<p>{description}</p>}</div></div>}
export function TopCard({color,title,body,index}:{color:string,title:string,body:string,index?:string}){return <article className="top-card" style={{'--card-accent':color} as React.CSSProperties}><span className="card-rule"/>{index&&<span className="mono card-index">{index}</span>}<h3>{title}</h3><p>{body}</p></article>}
export function CallToAction({route='contact',query='',children}:{route?:RouteKey,query?:string,children:React.ReactNode}){const {i18n}=useTranslation();return <a href={href(i18n.language,route)+query} className="button primary">{children}<ArrowUpRight size={18}/></a>}
