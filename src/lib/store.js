import { writable } from 'svelte/store';

export const invoiceData = writable({
  version: 1,
  title: "Invoice", 
  billTo: "bill to this guy",
  billToPhone: "+1 999-999-9999",
  billToAddress: "Unit #9999 - 123 long address rd, Long name City, Long name Country, 8A8 8A8",
  payTo: "Lingling Jing",
  payToCompany: "Company Name Inc.",
  payToAddress: "Unit #6666 - 123 long address rd, Long name City, Long name Country, 8A8 8A8",
  footer: "Footer text",
  items: [],
});