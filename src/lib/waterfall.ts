import { z } from 'zod';
export const WaterfallInput = z.object({
  tickets:z.number().finite().min(0), sponsors:z.number().finite().min(0), merch:z.number().finite().min(0), food:z.number().finite().min(0), costs:z.number().finite().min(0),
  principal:z.number().finite().min(0), preferredPct:z.number().finite().min(0).max(100), feePct:z.number().finite().min(0).max(100), promoterPct:z.number().finite().min(0).max(100)
});
export type WaterfallInputType=z.infer<typeof WaterfallInput>;
const cents=(n:number)=>Math.round((n+Number.EPSILON)*100)/100;
export function calculateWaterfall(raw: WaterfallInputType) {
  const x=WaterfallInput.parse(raw);
  const net=cents(x.tickets+x.sponsors+x.merch+x.food-x.costs);
  const available=Math.max(0,net);
  const seniorDue=cents(x.principal*(1+x.preferredPct/100));
  const senior=Math.min(available,seniorDue);
  const unpaid=cents(seniorDue-senior);
  const afterSenior=cents(available-senior);
  const feeDue=cents(available*x.feePct/100);
  const platform=Math.min(afterSenior,feeDue);
  const residual=cents(afterSenior-platform);
  const promoter=cents(residual*x.promoterPct/100);
  const artist=cents(residual-promoter);
  return {net,seniorDue,senior,unpaid,platform,unpaidFee:cents(feeDue-platform),residual,promoter,artist,deficit:Math.max(0,-net)};
}
