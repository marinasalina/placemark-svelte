<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="layout">
  {@render children()}
</div>

<style>
  :global(html, body) {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  :global(body > #sveltekit-body) {
    height: 100%;
  }

  :global(#svelte) {
    height: 100%;
  }

  .layout {
    height: 100%;
  }
</style>
