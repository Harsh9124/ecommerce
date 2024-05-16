export const round2 = (num: number) => Math.round(num * 100) / 100;

export function convertDoctoObj(doc: any) {
  doc._id = doc._id.toString();
  return doc;
}

export const formatNumber = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatId = (x: string) => {
  return `..${x.substring(20, 24)}`;
};
