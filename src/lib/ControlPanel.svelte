<script>
  // @ts-ignore
  import html2canvas from 'html2canvas';
  import { invoiceData } from './store';
  import Collapsible from './Collapsible.svelte';
  import Field from './Field.svelte';
  import ItemConfig from './ItemConfig.svelte';
  import { autoPDF } from './createPDF';

  let data = {};
  
  invoiceData.subscribe(x => data = x);

  // field handler function
  function changeMetaData(e) {
    const { name, value } = e.target;
    if (name in data) {
      data[name] = value;
      invoiceData.update(oldData => {
        oldData[name] = value;
        return oldData;
      })
    }
  }

  function changeMetaDataRadio(e) {
    const { name, checked, value } = e.target;
    console.log("??", name, value, checked);
    if (name in data) {
      data[name] = checked;
      invoiceData.update(oldData => {
        oldData[name] = checked;
        return oldData;
      })
    }
  }

  function addItem() {
    invoiceData.update((data) => {
      data.items.push({ description: 'new item', price: 0 });
      return data;
    })
  }

  function printAsImage() {
    let date = new Date().toLocaleString('en-US', { 
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
    // @ts-ignore
    html2canvas(document.querySelector(".output")).then(canvas => {
      const img = canvas.toDataURL("image/png");
      const a = document.createElement('a');
      a.href = img;
      a.download = 'Invoice-' + date;
      a.click();
      a.remove();
    });
  }

  function printPDF() {
    autoPDF("output");
  }

</script>

<style>
  .root {
    border: 1px solid white;
    padding: 8px;
    height: 95vh;
    min-height: 600px;
    min-width: 400px;
    text-align: left;
    overflow: auto;
  }
  .header-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media (max-width:1120px) {
      grid-template-columns: 1fr;
    }
  }
  .header-grid > div {
    padding-right: 12px;
  }
  .btn-container {
    margin-top: 4px;
    padding-top: 16px;
    border-top: 1px solid white;
  }
  .check-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .check-container > * {
    margin-right: auto;
  }
</style>

<div class="root">
  <h3>Control Panel</h3>
  <Collapsible title='Headers'>
    <Field name='title' label='Title' value={data.title} handler={changeMetaData} />
    <Field name='invoiceNum' label='Invoice #' value={data.invoiceNum} handler={changeMetaData} />
    <Field name='invoiceDate' label='Date' value={data.invoiceDate} handler={changeMetaData} />
    <div class='header-grid'>
      <div>
        <h3>Pay To</h3>
        <Field name='payTo' label='name' value={data.payTo} handler={changeMetaData} />
        <Field name='payToHST' label='HST #' value={data.payToHST} handler={changeMetaData} />
        <Field name='payToAddress' label='Address' value={data.payToAddress} handler={changeMetaData} />
        <Field name='payToPhone' label='Phone #' value={data.payToPhone} handler={changeMetaData} />
        <Field name='payToEmail' label='Email address' value={data.payToEmail} handler={changeMetaData} />
      </div>
      <div>
        <h3>Bill To</h3>
        <Field name='billTo' label='name' value={data.billTo} handler={changeMetaData} />
        <Field name='billToHST' label='HST #' value={data.billToHST} handler={changeMetaData} />
        <Field name='billToAddress' label='Address' value={data.billToAddress} handler={changeMetaData} />
        <Field name='billToPhone' label='Phone #' value={data.billToPhone} handler={changeMetaData} />
        <Field name='billToEmail' label='Email address' value={data.billToEmail} handler={changeMetaData} />
      </div>
    </div>
    <br />
    <div class='check-container'>
      <div>
        <Field type='checkbox' name='showRate' label="Include Rate" value={data.showRate} handler={changeMetaDataRadio} />
      </div>
      <div>
        <Field type='checkbox' name='showQty' label="Include Quantity" value={data.showQty} handler={changeMetaDataRadio} />
      </div>
    </div>
  </Collapsible>
  <Collapsible title='Items'>
    {#each $invoiceData.items as item, i}
      <ItemConfig itemIndex={i} />
    {/each}
    {#if $invoiceData.items.length < 20}
    <button on:click={addItem}>Add Item</button>
    {/if}
  </Collapsible>
  <div class="btn-container">
    <!-- <button on:click={() => console.log("todo")}>Save Draft</button> -->
    <button on:click={printAsImage}>Save Invoice as image</button>
    <button on:click={printPDF}>Save Invoice as PDF</button>
  </div>
</div>