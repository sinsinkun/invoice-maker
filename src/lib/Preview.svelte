<script>
  export let data;

  $: title = data[0].title

  // setInterval(() => console.log("data in preview", data), 2000);
</script>

<style>
  .root {
    height: calc(85vh + 18px);
    min-height: 600px;
    min-width: 520px;
  }
  .output {
    background-color: #f6f6f6;
    color: black;
    border: 1px solid black;
    aspect-ratio: 1/1.41;
    height: 100%;
    margin: auto;
  }
</style>

<div class="root">
  <div class="output">
    <h2>{title}</h2>
  </div>
</div>