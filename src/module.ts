import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addImportsDir,
  addImports,
  addServerHandler,
  addComponentsDir,
} from "@nuxt/kit";

// Module options TypeScript interface definition
export interface ModuleOptions {
  apiUrl: string;
  apiKey: string;
  siteId: string;
  previewSecret: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@gocontento/nuxt",
    configKey: "contento",
  },
  // Default configuration options of the Nuxt module
  defaults: {
    apiUrl: "",
    apiKey: "",
    siteId: "",
    previewSecret: "",
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    if (nuxt.options.vite.optimizeDeps) {
      nuxt.options.vite.optimizeDeps.include =
        nuxt.options.vite.optimizeDeps.include || [];
      nuxt.options.vite.optimizeDeps.include.push("@gocontento/client");
    }

    nuxt.options.typescript.hoist.push("@gocontento/client");

    // Add auto imports
    const names = ["createContentoClient", "ContentoClient", "ContentData"];
    for (const name of names) {
      addImports({ name, as: name, from: "@gocontento/client" });
    }

    // Set the options on the runtimeConfig
    nuxt.options.runtimeConfig.public.contento = {
      ...options,
    };

    // Composables
    addImportsDir(resolver.resolve("./runtime/composables"));

    // Routes
    addServerHandler({
      route: "/api/draft",
      handler: resolver.resolve("./runtime/server/api/draft.get"),
    });
    addServerHandler({
      route: "/api/disable-draft",
      handler: resolver.resolve("./runtime/server/api/disable-draft.get"),
    });

    // Components
    addComponentsDir({
      path: resolver.resolve("./runtime/components"),
    });
  },
});
