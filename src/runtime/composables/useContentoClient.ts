import { createContentoClient } from "@gocontento/client";
import type { ContentoClient } from "@gocontento/client";
import { useRuntimeConfig } from "#imports";

export interface ClientOptions {
  isPreview?: boolean;
  simplePagination?: boolean;
  language?: string | undefined;
  fetchOptions?: RequestInit | undefined;
}

export const useContentoClient = async (
  options?: ClientOptions,
): Promise<ContentoClient> => {
  // Get our runtimeConfig options
  const config = useRuntimeConfig().public.contento;

  // Create and return a client instance
  return createContentoClient({
    apiKey: config.apiKey,
    apiURL: config.apiUrl,
    siteId: config.siteId,
    ...options,
  });
};
