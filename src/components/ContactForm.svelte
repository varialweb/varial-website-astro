

<script>
  import contactBlob from '../images/contact-blob.png'
  let loading = false

  function handleSubmit(event) {
    event.preventDefault()
    console.log('submitted')
    loading = true
  }
</script>
<div class="relative w-fit p-4 flex flex-col items-center">
  <form on:submit={handleSubmit} class="relative z-20 text-white p-4 flex flex-col gap-8">
    <h2 class="text-center">Build Your Website</h2>
    <label for="name">
      Name
      <input name="name" id="name" placeholder="John Smith" required />
    </label>
    <label for="business">
      Business Name
      <input name="business" id="business" placeholder="Your Business, Inc." />
    </label>
    <label for="website">
      Current Website
      <input name="website" id="website" placeholder="www.yourbusiness.com" />
    </label>
    <button type="submit" class="action-button z-20">
      {#if loading}
        <span>Sending...</span>
      {:else}
        <span>Submit</span>
      {/if}
    </button>
  </form>
  <img src={contactBlob.src} alt="" class="absolute top-0 -left-[25%] z-10 h-full w-auto max-w-[unset]" />
</div>