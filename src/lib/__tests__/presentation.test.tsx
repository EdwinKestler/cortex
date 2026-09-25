import {describe, expect, it} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {createInstance} from 'i18next';
import {I18nextProvider, initReactI18next} from 'react-i18next';
import es from '../../i18n/es.json';
import en from '../../i18n/en.json';
import {Home} from '../../pages/Home';

function leafKeys(value:unknown,prefix=''):string[] {
  if(!value || typeof value!=='object')return [prefix];
  return Object.entries(value).flatMap(([key,entry])=>leafKeys(entry,`${prefix}.${key}`));
}

describe('bilingual presentation',()=>{
  it('maintains complete Spanish and English key parity',()=>{
    expect(leafKeys(es).sort()).toEqual(leafKeys(en).sort());
  });
  for(const [lang,copy] of Object.entries({es,en})) {
    it(`renders ${lang} with conceptual-image disclosure and all four ecosystem modules`,async()=>{
      const instance=createInstance();
      await instance.use(initReactI18next).init({lng:lang,resources:{[lang]:{translation:copy}},interpolation:{escapeValue:false}});
      const html=renderToStaticMarkup(<I18nextProvider i18n={instance}><Home/></I18nextProvider>);
      expect(html).toContain(copy.home.headlineA);
      expect(html).toContain(copy.home.imageCredit);
      expect(html).toContain(`href="/${lang}/contact/"`);
      expect(html).toContain(`href="/${lang}/promoters/"`);
      expect(html).toContain('id="panel-ctgot"');
      expect(html).toContain('id="module-capital"');
      expect(html).toContain('id="module-gatepass"');
      expect(html).toContain('id="module-splitnight"');
      expect(html.match(/role="tab"/g)).toHaveLength(4);
      expect(html.match(/class="stage /g)).toHaveLength(7);
      expect(html).not.toMatch(/home\.(ecosystem|headline|audience)/);
    });
  }
});
