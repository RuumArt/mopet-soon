export function isTouchEvent({ nativeEvent }) {
  return window.TouchEvent
    ? nativeEvent instanceof TouchEvent
    : 'touches' in nativeEvent;
}

export function isMouseEvent(event) {
  return event.nativeEvent instanceof MouseEvent;
}
