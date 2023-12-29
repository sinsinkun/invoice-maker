<script>
  import { invoiceData } from './store';

  // setInterval(() => console.log("data in preview", data), 2000);
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
    font-size: 26pt;
    min-width: max-content;
  }
  .output h2 {
    min-width: max-content;
    margin-right: 2%;
    font-size: 14pt;
  }
  .output p {
    margin: 0 2%;
    line-height: 12pt;
    font-size: 10pt;
  }
  .output .item-container {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr;
    margin: 4%;
    text-align: right;
    padding-bottom: 10px;
    border-bottom: 1px solid black;
    font-size: 10pt;
  }
  .item-container .heading {
    margin: 0;
    border-bottom: 2px solid black;
    font-size: 11pt;
  }
  .item-container .first {
    text-align: left;
  }
  .output .item-container-footer {
    display: grid;
    grid-template-columns: 3fr 1fr;
    margin: 2% 4%;
    font-size: 11pt;
  }
</style>

<div class="root">
  <div class="output">
    <h1>{$invoiceData.title}</h1>
    {#if $invoiceData.payTo}
      <div class="header-block">
        <h2>Pay To</h2>
        <div style="margin:auto 0">
          <p>{$invoiceData.payTo}</p>
          <p>{$invoiceData.payToCompany}</p>
          <p>{$invoiceData.payToAddress}</p>
        </div>
      </div>
    {/if}
    {#if $invoiceData.billTo}
      <div class="header-block">
        <h2>Bill To</h2>
        <div style="margin:auto 0">
          <p>{$invoiceData.billTo}</p>
          <p>{$invoiceData.billToPhone}</p>
          <p>{$invoiceData.billToAddress}</p>
        </div>
      </div>
    {/if}
    <div class="item-container">
      <!-- headers -->
      <span class="heading first">Item</span>
      <span class="heading">Rate</span>
      <span class="heading">Amount</span>
      <span class="heading">Price</span>
      <!-- items -->
      <span class="first">item</span>
      <span>$10/hr</span>
      <span>100</span>
      <span>$1000</span>
    </div>
    <div class="item-container-footer">
      <span>Total</span>
      <span style="text-align:right">$1000.00</span>
    </div>
  </div>
</div>