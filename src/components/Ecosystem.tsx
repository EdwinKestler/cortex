import {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ArrowUpRight, AudioLines, ChartNoAxesCombined, Layers, Ticket, Workflow} from 'lucide-react';
import {href, type RouteKey} from './Shell';

const modules: {id:string; color:string; route:RouteKey; icon:typeof Layers}[] = [
  {id:'ctgot',color:'blue',route:'ctgot',icon:ChartNoAxesCombined},
  {id:'capital',color:'gold',route:'investors',icon:Layers},
  {id:'gatepass',color:'violet',route:'solution',icon:Ticket},
  {id:'splitnight',color:'green',route:'investors',icon:Workflow},
];

export function Ecosystem() {
  const {t,i18n}=useTranslation();
  const [active,setActive]=useState(0);
  const tabs=useRef<(HTMLButtonElement|null)[]>([]);
  const selected=modules[active];
  const Icon=selected.icon;
  const key=`home.ecosystem.items.${active}`;
  return <section className="section ecosystem" id="ecosystem">
    <div className="wrap">
      <div className="ecosystem-heading"><div><p className="eyebrow">{t('home.ecosystem.eyebrow')}</p><h2>{t('home.ecosystem.title')}</h2></div><p>{t('home.ecosystem.intro')}</p></div>
      <div className="ecosystem-console">
        <div className="console-header"><span className="console-brand"><AudioLines size={20}/>{t('home.ecosystem.platform')}</span><span className="mono">{t('home.ecosystem.label')}</span></div>
        <div className="ecosystem-grid">
          <div className="ecosystem-tabs" role="tablist" aria-label={t('home.ecosystem.title')} aria-orientation="vertical">
            {modules.map((module,i)=><button key={module.id} ref={el=>{tabs.current[i]=el}} role="tab" id={`module-${module.id}`} aria-controls={`panel-${module.id}`} aria-selected={i===active} tabIndex={i===active?0:-1} className={i===active?'selected':''} style={{'--module-color':`var(--${module.color})`} as React.CSSProperties} onClick={()=>setActive(i)} onKeyDown={event=>{let next=i;if(event.key==='ArrowDown')next=(i+1)%4;else if(event.key==='ArrowUp')next=(i+3)%4;else if(event.key==='Home')next=0;else if(event.key==='End')next=3;else return;event.preventDefault();setActive(next);tabs.current[next]?.focus();}}><span className="module-index mono">0{i+1}</span><span><strong>{t(`home.ecosystem.items.${i}.name`)}</strong><small>{t(`home.ecosystem.items.${i}.role`)}</small></span><ArrowUpRight size={19}/></button>)}
          </div>
          {modules.map((module,i)=><div key={module.id} role="tabpanel" id={`panel-${module.id}`} aria-labelledby={`module-${module.id}`} hidden={active!==i} tabIndex={0} className="ecosystem-panel" style={{'--module-color':`var(--${module.color})`} as React.CSSProperties}>
            {active===i&&<><div className="module-heading"><Icon size={42} strokeWidth={1.3}/><span className="mono">0{i+1} / 04</span></div><p className="eyebrow">{t(`${key}.role`)}</p><h3>{t(`${key}.headline`)}</h3><p className="module-body">{t(`${key}.body`)}</p><div className="module-handoff"><span className="mono">{t('home.ecosystem.handoff')}</span><p>{t(`${key}.handoff`)}</p></div><a href={href(i18n.language,selected.route)} className="text-link">{t(`${key}.cta`)}<ArrowUpRight size={18}/></a></>}
          </div>)}
        </div>
        <div className="console-footer"><span className="mono">{t('home.ecosystem.learning')}</span><span>{t('home.ecosystem.learningBody')}</span></div>
      </div>
    </div>
  </section>;
}
