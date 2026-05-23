/** Replace with your real inbox before going live. */
export const ORDER_INQUIRY_EMAIL = "raza.ahmad0131@gmail.com";
export const ORDER_INQUIRY_CC_EMAIL = "ayesha.m2019@gmail.com";

export type MenuItem = {
  label: string;
  minQty: number;
  maxQty: number;
  qtyStep: number;
  unit: string;
  minLeadDays: number;
  largeLeadDays: number;
  largeBatchAt: number;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    label: "Cake Pops",
    minQty: 1,
    maxQty: 360,
    qtyStep: 1,
    unit: "pops",
    minLeadDays: 1,
    largeLeadDays: 3,
    largeBatchAt: 144,
  },
  {
    label: "Rice Krispie Treats",
    minQty: 1,
    maxQty: 240,
    qtyStep: 1,
    unit: "treats",
    minLeadDays: 1,
    largeLeadDays: 3,
    largeBatchAt: 96,
  },
  {
    label: "Mango Dessert Cups",
    minQty: 1,
    maxQty: 180,
    qtyStep: 1,
    unit: "cups",
    minLeadDays: 1,
    largeLeadDays: 3,
    largeBatchAt: 72,
  },
  {
    label: "Chocolate Strawberries",
    minQty: 1,
    maxQty: 180,
    qtyStep: 1,
    unit: "strawberries",
    minLeadDays: 1,
    largeLeadDays: 3,
    largeBatchAt: 72,
  },
  {
    label: "Custom Order",
    minQty: 1,
    maxQty: 1000,
    qtyStep: 1,
    unit: "items",
    minLeadDays: 1,
    largeLeadDays: 5,
    largeBatchAt: 150,
  },
];

export function getActiveItem(label: string): MenuItem | undefined {
  return MENU_ITEMS.find((item) => item.label === label);
}
