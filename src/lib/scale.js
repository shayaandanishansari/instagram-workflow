// Fit each preview frame: scale the true 1080px slide down to the column width.
export function fitScalers() {
  document.querySelectorAll('.frame').forEach((frame) => {
    const scaler = frame.querySelector('.scaler');
    if (scaler) scaler.style.transform = 'scale(' + frame.clientWidth / 1080 + ')';
  });
}

// Keep previews correctly scaled as the window resizes.
export function watchResize() {
  window.addEventListener('resize', fitScalers);
  window.addEventListener('load', fitScalers);
}
