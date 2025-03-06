import type { ContentData } from "@gocontento/client";
import { useContentoPreviewMode } from "./useContentoPreviewMode";
import { ref, onMounted, onUnmounted } from "vue";

export const useContentoLivePreview = ({
  content: initialContent,
}: {
  content: ContentData;
}) => {
  const content = ref(initialContent);

  if (typeof window === "undefined") {
    return { content };
  }

  // Check if preview mode is enabled or not - no need to add listeners below if not
  const previewMode = useContentoPreviewMode();
  if (!previewMode.enabled.value) {
    return { content };
  }

  function emitLoadedMessage() {
    if (window?.top) {
      window.top.postMessage("loaded", "*");
    }
  }

  function emitLivePreviewInitMessage() {
    if (window?.top) {
      window.top.postMessage("live-preview-enabled", "*");
    }
  }

  function updateContent(c: ContentData) {
    content.value = c;
    emitLoadedMessage();
  }

  function onMessage(event: MessageEvent) {
    switch (event.data.message) {
      case "contento-update-content":
        updateContent(JSON.parse(event.data.content));
    }
  }

  onMounted(() => {
    // send message from contento preview iframe indicating
    // that live preview is ready
    emitLivePreviewInitMessage();
    window.addEventListener("message", onMessage);
  });

  onUnmounted(() => {
    window.removeEventListener("message", onMessage);
  });

  return { content };
};
