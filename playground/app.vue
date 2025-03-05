<script setup lang="ts">
import { useContentoClient } from "#imports";

const client = await useContentoClient();
const { data: homepage } = await useAsyncData("homepage", () =>
  client.getContentBySlug("home", "general_page"),
);
</script>

<template>
  <div>
    <h1>
      {{ homepage?.fields.content.blocks[0].fields.title.text }}
    </h1>

    <div v-html="homepage?.fields.content.blocks[0].fields.text.text" />
  </div>
</template>
