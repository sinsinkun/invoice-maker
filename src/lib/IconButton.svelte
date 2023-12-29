<script>
  export let icon;
  export let onClick;

  const iconUrls = {
    downArrow: 'icons/reshot-icon-arrow-down-Y8N3B2ASPG.svg',
    upArrow: 'icons/reshot-icon-arrow-up-B7MCSXJ8GL.svg',
    leftArrow: 'icons/reshot-icon-arrow-left-5VMRGUJX4B.svg',
    rightArrow: 'icons/reshot-icon-arrow-right-JC8RAFL75Q.svg',
  }

</script>

<style>
  .icon-btn {
    border-radius: 100px;
    background-color: #fff9;
    color: white;
    aspect-ratio: 1;
    padding: 2px;
    height: 36px;
  }
  .icon {
    height: 100%;
    width: 100%;
  }
</style>

<button class='icon-btn' on:click={onClick}>
  <img src={iconUrls[icon]} alt='icon button' class='icon' />
</button>