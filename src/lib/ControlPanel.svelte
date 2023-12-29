<script>
  import { invoiceData } from './store';
  import Collapsible from './Collapsible.svelte';
  import Field from './Field.svelte';

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
</style>

<div class="root">
  <h3>Control Panel</h3>
  <Collapsible title='Headers'>
    <Field name='title' label='Title' value={data.title} handler={changeMetaData} />
    <Field name='billTo' label='Bill to' value={data.billTo} handler={changeMetaData} />
    <Field type='tel' name='billToPhone' label='Bill to phone #' value={data.billToPhone} handler={changeMetaData} />
    <Field name='billToAddress' label='Bill to address' value={data.billToAddress} handler={changeMetaData} />
    <Field name='payTo' label='Pay to' value={data.payTo} handler={changeMetaData} />
    <Field name='payToCompany' label='Pay to company' value={data.payToCompany} handler={changeMetaData} />
    <Field name='payToAddress' label='Pay to address' value={data.payToAddress} handler={changeMetaData} />
  </Collapsible>
  <Collapsible title='Items'>
  </Collapsible>
  <br />
  <button on:click={() => console.log("todo")}>Save Draft</button>
  <button on:click={() => console.log("todo", $invoiceData)}>Print Invoice</button>
</div>