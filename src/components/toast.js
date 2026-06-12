let toasts = [];
const listeners = new Set();
let idSeq = 0;

function emit() {
  listeners.forEach((l) => l());
}

export function toast(message, duration = 2000) {
  const id = ++idSeq;
  toasts = [...toasts, { id, message }];
  emit();
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    emit();
  }, duration);
}

export function subscribeToasts(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function getToasts() {
  return toasts;
}
