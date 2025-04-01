export function needValidateStyle(elem: Element) {
  // hidden or transparent
  if (
    !elem.checkVisibility({
      contentVisibilityAuto: true,
      opacityProperty: true,
      visibilityProperty: true,
    })
  ) {
    return false;
  }

  // zero size
  const rect = elem.getBoundingClientRect();
  if (rect.width * rect.height === 0) return false;

  return true;
}
