<script lang="ts">

  let loading = false
  let sent = false
  let error = false

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    loading = true

    await fetch('/api/contact', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(result => {
      console.log('RESULT', result)
      if (result.success) {
        sent = true
        error = false
      } else {
        sent = false
        error = true
      }
      loading = false
    }).catch(error => {
      console.error('ERROR', error)
    })
  }
</script>

<div class="grid place-items-center w-full max-w-md">
  <form on:submit={handleSubmit} class="relative z-20 text-white flex flex-col items-center gap-8 w-full">
    <h2 class="text-center text-3xl mt-32 md:mt-32">Build Your Website</h2>
    <label for="name">
      Name
      <input name="name" id="name" placeholder="John Smith" required />
    </label>
    <label for="email">
      Email
      <input type="email" name="email" id="email" placeholder="you@yourcompany.com" />
    </label>
    <label for="phone">
      Phone
      <input name="phone" id="phone" placeholder="(555) 555-5555" />
    </label>
    <label for="business">
      Business Name
      <input name="business" id="business" placeholder="Your Business, Inc." />
    </label>
    <label for="website">
      Current Website
      <input name="website" id="website" placeholder="www.yourcompany.com" />
    </label>
    <label for="comments">
      How can we help?
      <textarea 
        id="comments"
        name="comments"
        placeholder="Increase my website performance, get a new logo, etc."
        rows="4"
      />
    </label>
    {#if sent}
      <p class="text-[#51AE0A] action-button from-white to-white z-20 mt-8 mb-16">Successfully sent!</p>
    {:else}
      <button type="submit" class="action-button z-20 mt-8 mb-16">
        {#if loading}
          <span>Sending...</span>
        {:else}
          <span>Submit</span>
        {/if}
      </button>
    {/if}
    
  </form>
  <slot>You forgot the background image</slot>
</div>

<style>
  form label { width: 100%; }
  form label input { width: 100%; }
</style>