import {useTranslation} from 'react-i18next';
import {ArrowDown, ArrowRight, ArrowUpRight, AudioLines, ChartNoAxesCombined, Layers, Ticket, Workflow} from 'lucide-react';
import {CallToAction, href, SectionHeader, TopCard} from '../components/Shell';
import {Lifecycle} from '../components/Lifecycle';
import {Ecosystem} from '../components/Ecosystem';

export function Home() {
  const {t, i18n} = useTranslation();
  const capabilities = [ChartNoAxesCombined, Layers, Workflow];
  return <>
    <section className="show-hero scanline">
      <img className="show-photo" src="/images/cortex-stage.webp" width="1672" height="941" alt="" fetchPriority="high" />
      <div className="show-shade" />
      <div className="wrap show-content">
        <div className="show-kicker"><span className="eyebrow"><AudioLines size={18} aria-hidden="true" />{t('home.eyebrow')}</span><span className="show-edition mono">{t('home.edition')}</span></div>
        <div className="show-copy">
          <h1><span>{t('home.headlineA')}</span><em>{t('home.headlineB')}</em></h1>
          <p className="show-positioning">{t('home.title')}</p>
          <p className="show-description">{t('home.heroDescription')}</p>
          <div className="hero-actions"><CallToAction>{t('common.request')}</CallToAction><a className="button ghost" href={href(i18n.language,'promoters')}>{t('home.promoterCta')}<ArrowUpRight size={18}/></a></div>
        </div>
        <div className="show-bottom"><a className="show-scroll mono" href="#ecosystem"><ArrowDown size={18}/>{t('home.explore')}</a><p>{t('common.tagline')}</p></div>
      </div>
    </section>
    <div className="photo-credit wrap">{t('home.imageCredit')}</div>
    <section className="capability-strip" aria-label={t('home.pillars')}><div className="wrap">{capabilities.map((Icon,i)=><a key={i} href={href(i18n.language,(['ctgot','investors','technology'] as const)[i])}><Icon size={22} aria-hidden="true"/><span>{t(`home.pillar${i+1}`)}</span><ArrowUpRight size={16}/></a>)}</div></section>
    <section className="section manifesto"><div className="wrap manifesto-grid"><div><p className="eyebrow">{t('home.problemEyebrow')}</p><h2>{t('home.problemTitle')}</h2></div><div className="manifesto-copy"><p>{t('home.problemBody')}</p><a className="text-link" href={href(i18n.language,'problem')}>{t('home.problemLink')}<ArrowRight size={18}/></a></div></div></section>
    <Ecosystem/>
    <Lifecycle/>
    <section className="section home-pillars"><div className="wrap"><SectionHeader index="04" heading={t('home.pillars')}/><div className="cards-grid">{(['blue','gold','teal'] as const).map((color,i)=><TopCard key={color} color={`var(--${color})`} index={`0${i+1}`} title={t(`home.pillar${i+1}`)} body={t(`home.pillar${i+1}Body`)}/>)}</div></div></section>
    <section className="section home-audiences"><div className="wrap"><SectionHeader index="05" heading={t('home.audienceTitle')}/><div className="audience-grid">{(['investors','promoters'] as const).map((route,i)=><a className={`audience-card audience-${route}`} href={href(i18n.language,route)} key={route}><div className="audience-top"><span className="mono">{t(`home.audiences.${i}.label`)}</span>{i===0?<Layers size={30}/>:<Ticket size={30}/>}</div><h3>{t(`home.audiences.${i}.title`)}</h3><p>{t(`home.audiences.${i}.body`)}</p><span className="audience-link">{t(`home.audiences.${i}.cta`)}<ArrowUpRight size={23}/></span></a>)}</div></div></section>
    <section className="encore"><div className="wrap"><p className="eyebrow">{t('home.encoreEyebrow')}</p><h2>{t('home.closing')}</h2><CallToAction>{t('common.request')}</CallToAction><span className="encore-wordmark" aria-hidden="true">CORTEX</span></div></section>
  </>;
}
