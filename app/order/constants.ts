/** Replace with your real inbox before going live. */
export const ORDER_INQUIRY_EMAIL = "orders@thesweetsbyayesha.com";

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
    minQty: 12,
    maxQty: 360,
    qtyStep: 12,
    unit: "pops",
    minLeadDays: 7,
    largeLeadDays: 14,
    largeBatchAt: 144,
  },
  {
    label: "Rice Krispie Treats",
    minQty: 6,
    maxQty: 240,
    qtyStep: 6,
    unit: "treats",
    minLeadDays: 7,
    largeLeadDays: 14,
    largeBatchAt: 96,
  },
  {
    label: "Mango Dessert Cups",
    minQty: 6,
    maxQty: 180,
    qtyStep: 6,
    unit: "cups",
    minLeadDays: 7,
    largeLeadDays: 14,
    largeBatchAt: 72,
  },
  {
    label: "Chocolate Strawberries",
    minQty: 6,
    maxQty: 180,
    qtyStep: 6,
    unit: "strawberries",
    minLeadDays: 7,
    largeLeadDays: 14,
    largeBatchAt: 72,
  },
  {
    label: "Custom Order",
    minQty: 1,
    maxQty: 1000,
    qtyStep: 1,
    unit: "items",
    minLeadDays: 10,
    largeLeadDays: 21,
    largeBatchAt: 150,
  },
];

export function getActiveItem(label: string): MenuItem | undefined {
  return MENU_ITEMS.find((item) => item.label === label);
}
