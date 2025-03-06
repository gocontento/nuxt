<script setup lang="ts">
const client = await useContentoClient();

const { data: homepage } = await useAsyncData("homepage", () =>
  client.getContentBySlug("home", "general_page"),
);

const { content } = useContentoLivePreview({ content: homepage });
</script>

<template>
  <div class="max-w-4xl mx-auto p-12">
    <PreviewBridge />
    <template v-if="content?.fields.content.blocks.length > 0">
      <h1 class="font-bold text-2xl">
        {{ content?.fields.content.blocks[0].fields.title.text }}
      </h1>

      <div
        class="mt-6"
        v-html="content?.fields.content.blocks[0].fields.text.text"
      />
    </template>
  </div>
</template>
