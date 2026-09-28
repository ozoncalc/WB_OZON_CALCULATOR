const C='seller-calc-v1';
const A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET')return;
  e.respondWith(fetch(r).then(n=>{
    if(n.ok&&new URL(r.url).origin===location.origin){const cp=n.clone();caches.open(C).then(c=>c.put(r,cp))}
    return n;
  }).catch(()=>caches.match(r).then(x=>x||caches.match('./'))));
});
