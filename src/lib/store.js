import { writable } from 'svelte/store';

export const invoiceData = writable({
  version: 1,
  title: "Invoice", 
  billTo: "John Doe",
  billToPhone: "",
  billToAddress: "",
  payTo: "Lingling Jing",
  payToCompany: "",
  payToAddress: "",
  footer: "Footer text",
  showRate: true,
  showQty: true,
  items: [
    { description: "new item", price:0 },
  ],
});