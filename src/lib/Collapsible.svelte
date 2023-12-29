<script>
  import { afterUpdate } from "svelte";
  import IconButton from "./IconButton.svelte";

  export let title = '';
  let collapsibleDiv, divh=0;

  // explicitly add height to collapsible component after update
  afterUpdate(() => {
    if (collapsibleDiv && !collapsed) {
      divh = collapsibleDiv.scrollHeight;
    }
  })

  let collapsed = false;
  function collapseContainer() {
    collapsed = !collapsed;
    divh = 0;
  }
</script>

<style>
  .root {
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    width: inherit;
    margin-bottom: 4px;
  }
  .control {
    display: flex;
    justify-content: space-between;
  }
  .title {
    padding: 0;
    margin: auto 0px;
  }
  .collapsible {
    transition: height ease-out 0.2s;
    overflow: hidden;
  }
</style>

<div class='root'>
  <div class='control'>
      <h3 class='title'>{title}</h3>
    <IconButton icon={collapsed ? 'downArrow' : 'upArrow'} onClick={collapseContainer} />
  </div>
  <div class={'collapsible'} style={'height:' + divh + 'px'} bind:this={collapsibleDiv}>
    <slot />
  </div>
</div>