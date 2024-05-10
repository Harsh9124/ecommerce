export const round2 = (num: number) => Math.round(num * 100) / 100;

export function convertDoctoObj(doc: any) {
  doc._id = doc._id.toString();
  return doc;
}
