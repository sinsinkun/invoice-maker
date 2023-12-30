<script>
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

  function addItem() {
    invoiceData.update((data) => {
      data.items.push({ description: 'new item', price: 0 });
      return data;
    })
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
    <button on:click={() => console.log("todo")}>Save Draft</button>
    <button on:click={() => console.log("todo", $invoiceData)}>Print Invoice</button>
  </div>
</div>