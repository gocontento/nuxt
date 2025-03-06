import { useCookie, usePreviewMode } from "#imports";

export const useContentoPreviewMode = () => {
  const previewCookie = useCookie("contento_preview");
  return usePreviewMode({
    shouldEnable: () => {
      return !!previewCookie.value;
    },
  });
};
