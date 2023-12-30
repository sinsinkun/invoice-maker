import { writable } from 'svelte/store';

export const invoiceData = writable({
  version: 1,
  title: "Invoice", 
  billTo: "John Doe",
  billToPhone: "",
  billToAddress: "",
  payTo: "Bob Smith",
  payToCompany: "",
  payToAddress: "",
  footer: "Footer text", // TODO
  showRate: true,
  showQty: true,
  items: [
    { description: "new item", price:0 },
  ], // 20 items max, next page TODO
});