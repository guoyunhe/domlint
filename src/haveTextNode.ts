export function haveTextNode(elem: Element) {
  if (!elem.hasChildNodes()) return false;
  return Array.from(elem.childNodes).some(
    (node) =>
      node.nodeType === Node.TEXT_NODE && node.textContent && node.textContent.trim().length > 0,
  );
}
