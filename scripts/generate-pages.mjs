import {writeFileSync,mkdirSync} from 'node:fs';
import es from '../src/i18n/es.json' with {type:'json'};
import en from '../src/i18n/en.json' with {type:'json'};
const paths={home:'',problem:'problem',solution:'solution',ctgot:'ct-got',investors:'investors',promoters:'promoters',technology:'technology',market:'market',pilot:'pilot',team:'team',contact:'contact',legal:'legal',design:'design'};
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const entry=(l,key)=>`/${l}${key?'/'+paths[key]:''}/`;
for (const [l,d] of Object.entries({es,en})) {
  for(const key of Object.keys(paths)) {
    const route=entry(l,key),dir='.'+route;
    mkdirSync(dir,{recursive:true});
    const page=d[key];
    const title=key==='home'?d.meta.title:`${page.title} | CORTEX`;
    const desc=key==='home'?d.meta.description:(page.lead||page.intro||page.title);
    const html=`<!doctype html><html lang="${l}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#0f2238"><meta name="description" content="${escape(desc)}"><meta property="og:type" content="website"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(desc)}"><meta property="og:locale" content="${l==='es'?'es_GT':'en_US'}"><meta property="og:url" content="https://cortex-live-events.edwinkestler.chatgpt.site${route}"><link rel="canonical" href="https://cortex-live-events.edwinkestler.chatgpt.site${route}"><meta name="twitter:card" content="summary"><link rel="icon" href="/favicon.svg"><link rel="alternate" hreflang="es" href="https://cortex-live-events.edwinkestler.chatgpt.site${entry('es',key)}"><link rel="alternate" hreflang="en" href="https://cortex-live-events.edwinkestler.chatgpt.site${entry('en',key)}"><title>${escape(title)}</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>`;
    writeFileSync(dir+'/index.html',html);
  }
}
writeFileSync('index.html',`<!doctype html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#0f2238"><meta name="description" content="${escape(es.meta.description)}"><meta property="og:type" content="website"><meta property="og:title" content="${escape(es.meta.title)}"><meta property="og:description" content="${escape(es.meta.description)}"><meta name="twitter:card" content="summary"><link rel="icon" href="/favicon.svg"><title>${escape(es.meta.title)}</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>`);
// Private Site: disallow crawler indexing.
writeFileSync('public/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+Object.keys(paths).flatMap(k=>['es','en'].map(l=>`<url><loc>https://cortex-live-events.edwinkestler.chatgpt.site${entry(l,k)}</loc></url>`)).join('')+'</urlset>');
