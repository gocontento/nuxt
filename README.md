# Nuxt module for Contento

This module allows you to integrate with the Contento visual preview in your Nuxt project, and provides
a composable to let you fetch content.

In due course we will also be adding helpers for our first-party SEO tool and Assets.

## Installation

Install the `@gocontento/nuxt` package:

```bash
npm install @gocontento/nuxt
```

Add the following environment variables to your `.env`, make sure to fill them out with the details specific to your site:

```dotenv
CONTENTO_API_URL=https://app.contento.io/api/v1
CONTENTO_API_KEY=
CONTENTO_SITE_ID=
CONTENTO_PREVIEW_SECRET=
```

Finally, add the following code to your `nuxt.config.ts` file:

```ts
export default defineNuxtConfig({
    // ...
    modules: ["@gocontento/nuxt"],
    contento: {
        apiUrl: process.env.CONTENTO_API_URL,
        apiKey: process.env.CONTENTO_API_KEY,
        siteId: process.env.CONTENTO_SITE_ID,
        previewSecret: process.env.CONTENTO_PREVIEW_SECRET,
    }
});

```

## Usage

All composables and components exported by this module are auto imported, so you can just use them.

Here’s a basic example of how you might fetch a single page and hook it up to the Contento live preview:

```vue
<script setup lang="ts">
const client = await useContentoClient();

const { data: homepage } = await useAsyncData("homepage", () =>
  client.getContentBySlug("home", "general_page"),
);

const { content } = useContentoLivePreview({ content: homepage });
</script>

<template>
  <div>
    <PreviewBridge />

    <h1>
      {{ content?.fields.title.text }}
    </h1>
    
    <div
      v-html="content?.fields.body.text"
    />
  </div>
</template>
```