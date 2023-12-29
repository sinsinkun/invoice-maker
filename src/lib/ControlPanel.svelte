<script>
  import Collapsible from './Collapsible.svelte';
  import Field from './Field.svelte';

  export let data;

  // field handler function
  function changeMetaData(e) {
    console.log(e.target);
    const { name, value } = e.target;
    if (data[0][name]) {
      data[0][name] = value;
    }
    console.log(data);
  }

</script>

<style>
  .root {
    border: 1px solid white;
    padding: 8px;
    height: 85vh;
    min-height: 600px;
    min-width: 400px;
    text-align: left;
    overflow: auto;
  }
</style>

<div class="root">
  <h3>Control Panel</h3>
  <Collapsible title='Header'>
    <Field name='title' label='Title' value={data[0].title} handler={changeMetaData} />
    <Field name='billTo' label='Bill to' value={data[0].billTo} handler={changeMetaData} />
    <Field type='tel' name='billToPhone' label='Bill to phone #' value={data[0].billToPhone} handler={changeMetaData} />
    <Field name='billToAddress' label='Bill to address' value={data[0].billToAddress} handler={changeMetaData} />
    <Field name='payTo' label='Pay to' value={data[0].payTo} handler={changeMetaData} />
    <Field name='payToCompany' label='Pay to company' value={data[0].payToCompany} handler={changeMetaData} />
    <Field name='payToAddress' label='Pay to address' value={data[0].payToAddress} handler={changeMetaData} />
  </Collapsible>
  <Collapsible title='Test'>
    <p>lorem ipsum</p><p>lorem ipsum</p>
    <p>lorem ipsum</p><p>lorem ipsum</p>
    <p>lorem ipsum</p><p>lorem ipsum</p>
    <p>lorem ipsum</p><p>lorem ipsum</p>
    <p>lorem ipsum</p><p>lorem ipsum</p>
    <p>lorem ipsum</p><p>lorem ipsum</p>
    <p>lorem ipsum</p><p>lorem ipsum</p>
  </Collapsible>
  <br />
  <button on:click={() => console.log("todo")}>Save Draft</button>
  <button on:click={() => console.log("todo")}>Print Invoice</button>
</div>