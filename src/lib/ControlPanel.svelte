<script>
  import html2canvas from 'html2canvas';
  import { invoiceData } from './store';
  import Collapsible from './Collapsible.svelte';
  import Field from './Field.svelte';
  import ItemConfig from './ItemConfig.svelte';

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

  function print() {
    let date = new Date().toLocaleString('en-US', { 
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
    console.log("time", date);
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
    <Field name='payTo' label='Pay to' value={data.payTo} handler={changeMetaData} />
    <Field name='payToCompany' label='Pay to company' value={data.payToCompany} handler={changeMetaData} />
    <Field name='payToAddress' label='Pay to address' value={data.payToAddress} handler={changeMetaData} />
    <Field name='billTo' label='Bill to' value={data.billTo} handler={changeMetaData} />
    <Field type='tel' name='billToPhone' label='Bill to phone #' value={data.billToPhone} handler={changeMetaData} />
    <Field name='billToAddress' label='Bill to address' value={data.billToAddress} handler={changeMetaData} />
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
    <button on:click={print}>Print Invoice</button>
  </div>
</div>