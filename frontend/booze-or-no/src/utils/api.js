// frontend/src/utils/api.js

export function getBackendUrl() {
  const current = window.location.hostname;
  return `http://${current.replace("-3000", "-8000")}`;
}
