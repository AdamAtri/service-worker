/**
  Three things to code for when using a
  ServiceWorker:
    - Registration
    - Installation
    - Usage
*/

/* <!-- check if Service Workers are supported --> */
(function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker/worker.js', {scope: '../'})
      .then( r => console.log('service-worker registered.') || r)
      .catch(err => console.error('Major Fucking Problem: ', err));
  }
})();
