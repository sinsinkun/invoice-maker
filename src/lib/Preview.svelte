<script>
  import { invoiceData } from './store';

  let total = 0;
  invoiceData.subscribe(({ items }) => {
    total = 0;
    items.forEach(item => {
      total += item.price;
    })
  })

  function formatPhoneNum(str) {
    const num = Number(str);
    if (isNaN(num)) {
      console.log("Not a number", str);
      return str;
    }

    // format phone number to ###-###-####
    if (str.length < 11) {
      let part1 = str.slice(0,3);
      let part2 = str.slice(3,6);
      let part3 = str.slice(6);
      return "(" + part1 + ") " + part2 + "-" + part3;
    } else if (str.length === 11) {
      let part1 = str.slice(0,1);
      let part2 = str.slice(1,4);
      let part3 = str.slice(4,7);
      let part4 = str.slice(7);
      return "+" + part1 + " (" + part2 + ") " + part3 + "-" + part4;
    }
    
    // catch-call return
    return str;
  }
</script>

<style>
  .root {
    height: calc(95vh + 18px);
    min-height: 600px;
    min-width: 520px;
  }
  .output {
    position: relative;
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
    margin: 2% 4%;
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
    font-size: 1.4vh;
  }
  .alt {
    background-color: #ddd;
  }
  .header-sub-text {
    text-align: right;
    position: absolute;
    width: 100%;
    top: 8vh;
    right: 2.2vh;
  }
</style>

<div class="root">
  <div class="output" id="output">
    <h1>{$invoiceData.title}</h1>
    <div class='header-sub-text'>
      <p>{$invoiceData.invoiceNum ? "Invoice #: " + $invoiceData.invoiceNum : ""}</p>
      <p>{$invoiceData.invoiceDate}</p>
    </div>
    {#if $invoiceData.payTo}
      <div class="header-block">
        <h2>Pay To</h2>
        <div style="margin:auto 0;flex-grow:1">
          <p>{$invoiceData.payTo}</p>
          <p>{$invoiceData.payToHST ? "HST #: " + $invoiceData.payToHST : ""}</p>
          <p>{$invoiceData.payToAddress}</p>
          <p>{$invoiceData.payToPhone ? "Phone #: " + formatPhoneNum($invoiceData.payToPhone) : ""}</p>
          <p>{$invoiceData.payToEmail ? "Email: " + $invoiceData.payToEmail : ""}</p>
        </div>
      </div>
    {/if}
    {#if $invoiceData.billTo}
      <div class="header-block">
        <h2>Bill To</h2>
        <div style="margin:auto 0;flex-grow:1">
          <p>{$invoiceData.billTo}</p>
          <p>{$invoiceData.billToHST ? "HST #: " + $invoiceData.billToHST : ""}</p>
          <p>{$invoiceData.billToAddress}</p>
          <p>{$invoiceData.billToPhone ? "Phone #: " + formatPhoneNum($invoiceData.billToPhone) : ""}</p>
          <p>{$invoiceData.billToEmail ? "Email: " + $invoiceData.billToEmail : ""}</p>
        </div>
      </div>
    {/if}
    <div class="item-container">
      <!-- headers -->
      <span class="heading first 14-pt">Item</span>
      <span class="heading 14-pt">
        {#if $invoiceData.showRate}Rate{/if}
      </span>
      <span class="heading 14-pt">
        {#if $invoiceData.showQty}Quantity{/if}
      </span>
      <span class="heading 14-pt">Price</span>
      <!-- items -->
      {#each $invoiceData.items as item, i}
        <span class={i%2 ? "first alt" : "first"}>{item.description || "(no description)"}</span>
        <span class={i%2 ? "alt" : ""}>{item.rate ? `$ ${item.rate}` : ''}</span>
        <span class={i%2 ? "alt" : ""}>{item.qty || ''}</span>
        <span class={i%2 ? "alt" : ""}>{item.price ? `$ ${item.price.toFixed(2)}` : '$0.00'}</span>
      {/each}
    </div>
    <div class="item-container-footer">
      <span class="footer">Sub-total</span>
      <span style="text-align:right">$ {total.toFixed(2)}</span>
      <span>HST</span>
      <span style="text-align:right">$ {(total * 0.13).toFixed(2)}</span>
      <span class="14-pt" style="font-size:1.6vh">Total</span>
      <span class="14-pt" style="text-align:right;font-size:1.6vh">$ {(total * 1.13).toFixed(2)}</span>
    </div>
  </div>
</div>