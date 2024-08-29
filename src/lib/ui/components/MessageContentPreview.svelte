<script lang="ts">
  type Props = {
    url: string;
  };

  let { url }: Props = $props();

  let isImage = $state(false);
  let isVideo = $state(false);
  let title = $state("");
  let description = $state("");
  let mediaUrl = $state("");

  $effect(() => {
    if (url.match(/\.(jpeg|jpg|gif|png)$/i) != null) {
      isImage = true;
      mediaUrl = url;
    } else if (url.match(/\.(mp4|webm|ogg)$/i) != null) {
      isVideo = true;
      mediaUrl = url;
    } else {
      // For non-media URLs, we'd typically fetch metadata here
      // For this example, we'll just use placeholder data
      title = "Article Title";
      description = "This is a preview of the linked article...";
      mediaUrl = "https://via.placeholder.com/150";
    }
  });
</script>

{#if isImage}
  <img
    src={mediaUrl}
    alt="Linked content"
    class="max-w-full max-h-96 object-contain rounded-lg"
  />
{:else if isVideo}
  <video
    src={mediaUrl}
    controls
    preload="metadata"
    class="max-w-full max-h-96 object-contain rounded-lg"
  >
    <track kind="captions" src="" label="English" srclang="en" />
    Your browser does not support the video tag.
  </video>
{:else}
  <div class="p-4 bg-base-200 rounded-lg">
    <h3 class="font-bold">{title}</h3>
    <p class="text-sm">{description}</p>
    <img
      src={mediaUrl}
      alt="Article thumbnail"
      class="mt-2 max-w-full h-auto rounded"
    />
  </div>
{/if}
