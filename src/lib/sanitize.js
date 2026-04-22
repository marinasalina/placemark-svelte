export function sanitize(str) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;"
  };

  return String(str).replace(/[&<>"'/]/g, (match) => map[match]);
}
