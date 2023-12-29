<script>
  import Greet from './lib/Greet.svelte'
  import ControlPanel from './lib/ControlPanel.svelte'
  import Preview from './lib/Preview.svelte'

  const invoiceData = [
    { 
      page: 0, // page 0 is metadata
      version: 1,
      title: "Invoice", 
      billTo: "bill to this guy",
      billToPhone: "+1 999-999-9999",
      billToAddress: "Unit #9999 - 123 long address rd, Long name City, Long name Country, 8A8 8A8",
      payTo: "Lingling Jing",
      payToCompany: "Company Name Inc.",
      payToAddress: "Unit #6666 - 123 long address rd, Long name City, Long name Country, 8A8 8A8",
    },
    { page: 1, }
  ];
</script>

<style>
  .title {
    grid-column: 1/3;
  }
</style>

<main class="container">
  <div class="title">
    <h1>Invoice Maker</h1>
  </div>
  <ControlPanel data={invoiceData} />
  <Preview data={invoiceData} />
</main>
