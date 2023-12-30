<script>
  export let type = "text"; // string
  export let name; // string
  export let label = ''; // string
  export let value; // any
  export let handler; // function
  export let error = false; // bool
  export let errorMessage = 'No error?'; // string
  export let forceWrap = false; // bool
  export let pattern = null; // regex string
</script>

<style>
  .field-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .error-msg {
    margin: 0 16px;
    color: #f44;
    font-size: 0.9em;
  }
</style>

<div class='field-container' style={forceWrap && "flex-direction:column;align-items:start"}>
  <label for={name}>{label || name}</label>
  <input
    type={type}
    id={name}
    name={name}
    value={value}
    pattern={pattern}
    on:change={handler}
    style={error ? "border:1px solid #f44" : ""}
  />
</div>
{#if error}
  <p class='error-msg'>{errorMessage}</p>
{/if}
