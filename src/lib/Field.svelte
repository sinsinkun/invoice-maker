<script>
  export let type = "text"; // string
  export let name; // string
  export let label = ''; // string
  export let value; // any
  export let handler; // function
  export let error = false; // bool
  export let errorMessage = 'No error?'; // string
</script>

<style>
  .field-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .error-msg {
    margin: 0 16px;
    color: #f44;
    font-size: 0.9em;
  }
</style>

<div class='field-container'>
  <label for={name}>{label || name}</label>
  <input
    type={type}
    id={name}
    name={name}
    value={value}
    on:change={handler}
    style={error ? "border:1px solid #f44" : ""}
  />
</div>
{#if error}
  <p class='error-msg'>{errorMessage}</p>
{/if}
