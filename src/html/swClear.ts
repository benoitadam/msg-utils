export const swClear = () => navigator.serviceWorker.getRegistrations()
    .then(rs => rs.forEach(r => r.unregister()));