import { z } from 'zod';
import raw from './sample-events.json';
export const SampleEventSchema = z.object({
  func_id: z.string().regex(/^SYN-\d{3}$/), fecha: z.iso.date(),
  show_name: z.string().min(1), venue: z.string().min(1),
  capacidad: z.number().int().positive(),
  p50: z.array(z.number().int().nonnegative()).min(2),
  p90: z.array(z.number().int().nonnegative()).min(2),
  break_even: z.number().int().nonnegative(), p_break_even: z.number().min(0).max(1),
  generated_at: z.iso.datetime()
}).superRefine((item, ctx) => {
  if (item.p50.length !== item.p90.length) ctx.addIssue({code:'custom',message:'Curve lengths differ'});
  if (item.break_even > item.capacidad) ctx.addIssue({code:'custom',message:'Break-even exceeds capacity'});
  for (let n=0; n<item.p50.length; n++) {
    if (item.p50[n] > item.p90[n] || item.p90[n] > item.capacidad) ctx.addIssue({code:'custom',message:`Invalid percentile at ${n}`});
    if (n && (item.p50[n]<item.p50[n-1] || item.p90[n]<item.p90[n-1])) ctx.addIssue({code:'custom',message:`Nonmonotone curve at ${n}`});
  }
});
export type SampleEvent = z.infer<typeof SampleEventSchema>;
export const sampleEvents = z.array(SampleEventSchema).superRefine((events,ctx)=>{const ids=new Set<string>();for(const e of events){if(ids.has(e.func_id))ctx.addIssue({code:'custom',message:`Duplicate func_id: ${e.func_id}`});ids.add(e.func_id)}}).parse(raw);
export const sampleEventById = new Map(sampleEvents.map(e=>[e.func_id,e]));
export function illustrativeGate(e: SampleEvent) {return e.p_break_even >= .70 && e.p50.at(-1)! >= e.break_even;}
