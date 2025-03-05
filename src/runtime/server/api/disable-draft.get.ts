import { defineEventHandler, sendRedirect, setCookie } from "h3";

export default defineEventHandler(async (event) => {
  // Remove the cookie by setting it to Max-Age=0
  setCookie(event, "contento_preview", "false", {
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 0,
  });

  // Get the origin route from the Referer header
  const originRoute = event.node.req.headers.referer;

  // If the Referer header is available, redirect to that
  if (originRoute) {
    return await sendRedirect(event, originRoute, 302);
  }

  // Otherwise redirect to the root
  return await sendRedirect(event, "/", 302);
});
