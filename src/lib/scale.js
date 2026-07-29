// Fit each preview frame: scale the true-size slide down to the column width.
// The scaler's own layout width is the canvas width (1080 for both formats we
// ship, but read rather than assumed) — offsetWidth ignores the transform we
// then apply to it, so this stays correct on every resize.
export function fitScalers() {
  document.querySelectorAll('.frame').forEach((frame) => {
    const scaler = frame.querySelector('.scaler');
    if (scaler && scaler.offsetWidth) {
      scaler.style.transform = 'scale(' + frame.clientWidth / scaler.offsetWidth + ')';
    }
  });
}

// Keep previews correctly scaled as the window resizes.
export function watchResize() {
  window.addEventListener('resize', fitScalers);
  window.addEventListener('load', fitScalers);
}
