<script>
  import { invoiceData } from './store';

  let total = 0;
  invoiceData.subscribe(({ items }) => {
    items.forEach(item => {
      total += item.price;
    })
  })
</script>

<style>
  .root {
    height: calc(95vh + 18px);
    min-height: 600px;
    min-width: 520px;
  }
  .output {
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    background-color: #f6f6f6;
    color: black;
    border: 1px solid black;
    aspect-ratio: 1/1.41;
    height: 100%;
    margin: auto;
    text-align: left;
  }
  /* -- OUTPUT STYLING -- */
  .header-block {
    display: flex;
    margin-top: 0%;
    margin-bottom: 2%;
    margin-left: 5%;
    margin-right: 30%;
  }
  .output h1 {
    text-align: right;
    margin-top: 5%;
    margin-bottom: 3%;
    margin-right: 5%;
    font-size: 4vh;
    min-width: max-content;
  }
  .output h2 {
    min-width: max-content;
    margin-right: 2%;
    font-size: 2.5vh;
  }
  .output p {
    margin: 0 2%;
    line-height: 12pt;
    font-size: 1.4vh
  }
  .output .item-container {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr;
    margin: 4%;
    text-align: right;
    padding-bottom: 10px;
    border-bottom: 1px solid black;
    font-size: 1.4vh;
  }
  .item-container .heading {
    margin: 0;
    border-bottom: 2px solid black;
    font-size: 1.6vh;
  }
  .item-container .first {
    text-align: left;
  }
  .output .item-container-footer {
    display: grid;
    grid-template-columns: 3fr 1fr;
    margin: 2% 4%;
    font-size: 1.6vh;
  }
  .alt {
    background-color: #ddd;
  }
</style>

<div class="root">
  <div class="output">
    <h1>{$invoiceData.title}</h1>
    {#if $invoiceData.payTo}
      <div class="header-block">
        <h2>Pay To</h2>
        <div style="margin:auto 0;flex-grow:1">
          <p>{$invoiceData.payTo}</p>
          <p>{$invoiceData.payToCompany}</p>
          <p>{$invoiceData.payToAddress}</p>
        </div>
      </div>
    {/if}
    {#if $invoiceData.billTo}
      <div class="header-block">
        <h2>Bill To</h2>
        <div style="margin:auto 0;flex-grow:1">
          <p>{$invoiceData.billTo}</p>
          <p>{$invoiceData.billToPhone}</p>
          <p>{$invoiceData.billToAddress}</p>
        </div>
      </div>
    {/if}
    <div class="item-container">
      <!-- headers -->
      <span class="heading first">Item</span>
      <span class="heading">
        {#if $invoiceData.showRate}Rate{/if}
      </span>
      <span class="heading">
        {#if $invoiceData.showQty}Quantity{/if}
      </span>
      <span class="heading">Price</span>
      <!-- items -->
      {#each $invoiceData.items as item, i}
        <span class={i%2 ? "first alt" : "first"}>{item.description || "(no description)"}</span>
        <span class={i%2 ? "alt" : ""}>{item.rate ? `$ ${item.rate}` : ''}</span>
        <span class={i%2 ? "alt" : ""}>{item.qty || ''}</span>
        <span class={i%2 ? "alt" : ""}>{item.price ? `$ ${item.price}` : '$0'}</span>
      {/each}
    </div>
    <div class="item-container-footer">
      <span>Total</span>
      <span style="text-align:right">$ {total}</span>
    </div>
  </div>
</div>