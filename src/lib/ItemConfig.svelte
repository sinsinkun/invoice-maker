<script>
  import Field from "./Field.svelte";
  import { invoiceData } from "./store";

  export let itemIndex;

  let rootRef;
  let fieldData = {
    description: '',
    rate: '',
    qty: 0,
    price: 0,
  }

  invoiceData.subscribe(({ items }) => {
    // non-existent item
    if (!items[itemIndex]) {
      console.log("ERR: item not found in data", itemIndex, items);
      return;
    }

    // fill local data with store data
    // @ts-ignore
    if (items[itemIndex].description) fieldData.description = items[itemIndex].description;
    if (items[itemIndex].rate) fieldData.rate = items[itemIndex].rate;
    if (items[itemIndex].qty) fieldData.qty = items[itemIndex].qty;
    if (items[itemIndex].price) fieldData.price = items[itemIndex].price;
  })

  function updateFieldData(e) {
    const { name, value } = e.target;

    // update store data
    invoiceData.update((data) => {
      if (!data.items[itemIndex]) {
        console.log("Could not find item to update", itemIndex, data.items);
        return data;
      }
      switch (name) {
        case "description":
        case "rate":
          data.items[itemIndex][name] = value;
          break;
        case "qty":
        case "price":
          data.items[itemIndex][name] = Number(value);
          break;
        default:
          break;
      }
      
      return data;
    })
  }

  function removeItem() {
    invoiceData.update((data) => {
      data.items.splice(itemIndex, 1);
      return data;
    })
  }
</script>

<style>
  .item-root {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid #fffd;
    padding-bottom: 8px;
    margin-bottom: 8px;
  }
  .item-root > * {
    padding: 2px 8px;
  }
  @media screen and (max-width: 1200px) {
    .item-root {
      grid-template-columns: 1fr;
    }
  }
</style>

<div class="item-root" aria-rowindex={itemIndex} bind:this={rootRef}>
  <div>
    <Field name="description" label="Item Description" value={fieldData.description} handler={updateFieldData} />
  </div>
  {#if $invoiceData.showRate}
    <div>
      <Field name="rate" label="Charge Rate" value={fieldData.rate} handler={updateFieldData} />
    </div>
  {/if}
  {#if $invoiceData.showQty}
    <div>
      <Field name="qty" type="number" label="Quantity/Amount" value={fieldData.qty || ''} handler={updateFieldData} />
    </div>
  {/if}
  <div>
    <Field name="price" type="number" label="Sum Price" value={fieldData.price || ''} handler={updateFieldData} />
  </div>
  <div>
    <button on:click={removeItem}>Remove Item</button>
  </div>
</div>