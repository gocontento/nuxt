<script setup lang="ts">
const client = await useContentoClient();
const { data: homepage } = await useAsyncData("homepage", () =>
  client.getContentBySlug("home", "general_page"),
);
</script>

<template>
  <div>
    <PreviewBridge />
    <h1>
      {{ homepage?.fields.content.blocks[0].fields.title.text }}
    </h1>

    <div v-html="homepage?.fields.content.blocks[0].fields.text.text" />
  </div>
</template>
