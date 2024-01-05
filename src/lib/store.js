import { writable } from 'svelte/store';

export const invoiceData = writable({
  version: 1,
  title: "Invoice",
  invoiceNum: "INV2024001",
  invoiceDate: (new Date()).toLocaleDateString(),
  billTo: "John Doe",
  billToHST: "",
  billToEmail: "",
  billToPhone: "",
  billToAddress: "",
  payTo: "Bob Smith",
  payToHST: "",
  payToEmail: "",
  payToPhone: "",
  payToAddress: "",
  footer: "Footer text", // TODO
  showRate: true,
  showQty: true,
  items: [
    { description: "new item", price:0 },
  ], // 20 items max, next page TODO
});