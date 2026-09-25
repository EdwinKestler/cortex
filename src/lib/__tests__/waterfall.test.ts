import {describe,it,expect} from 'vitest';
import {calculateWaterfall} from '../waterfall';
import {sampleEvents,illustrativeGate,SampleEventSchema} from '../../data/schema';
const x={tickets:180000,sponsors:20000,merch:12000,food:8000,costs:85000,principal:90000,preferredPct:5,feePct:3,promoterPct:60};
describe('priority waterfall',()=>{
 it('conserves revenue after event costs and pays senior before other parties',()=>{const r=calculateWaterfall(x);expect(r.net).toBe(135000);expect(r.seniorDue).toBe(94500);expect(r.senior).toBe(94500);expect(r.platform).toBe(4050);expect(r.residual).toBe(36450);expect(r.promoter).toBe(21870);expect(r.artist).toBe(14580);expect(r.senior+r.platform+r.promoter+r.artist).toBe(r.net)});
 it('reports an unpaid senior balance without creating negative distributions',()=>{const r=calculateWaterfall({...x,tickets:50000,sponsors:0,merch:0,food:0,costs:0});expect(r.senior).toBe(50000);expect(r.unpaid).toBe(44500);expect(r.platform).toBe(0);expect(r.promoter).toBe(0);expect(r.artist).toBe(0)});
 it('keeps operating loss separate from the senior obligation',()=>{const r=calculateWaterfall({...x,tickets:0,sponsors:0,merch:0,food:0});expect(r.net).toBe(-85000);expect(r.deficit).toBe(85000);expect(r.senior).toBe(0);expect(r.unpaid).toBe(94500)});
});
describe('synthetic forecast data',()=>{
 it('preserves unique function IDs and valid capacity-bounded ordered curves',()=>{expect(new Set(sampleEvents.map(e=>e.func_id)).size).toBe(4);expect(sampleEvents.every(e=>SampleEventSchema.safeParse(e).success)).toBe(true);expect(sampleEvents.map(illustrativeGate)).toEqual([true,false,true,false])});
 it('rejects a percentile reversal',()=>{expect(SampleEventSchema.safeParse({...sampleEvents[0],p90:[0,...sampleEvents[0].p90.slice(1,9),1,2]}).success).toBe(false)});
});
