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