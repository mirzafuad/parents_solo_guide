// Offline cache for Parents' NYC Guide. Change V when the app files change.
const V='psg-v1';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable.png'];
const FONT_CSS="https://fonts.googleapis.com/css2?family=Archivo:wght@600;800&family=Atkinson+Hyperlegible:wght@400;700&display=swap";
self.addEventListener('install',e=>{e.waitUntil((async()=>{
  const c=await caches.open(V);
  await c.addAll(SHELL);
  try{ // fonts are optional: the app still works with the phone's own fonts
    const r=await fetch(FONT_CSS);
    if(r.ok){await c.put(FONT_CSS,r.clone());const css=await r.text();
      const urls=[...css.matchAll(/url\((https:[^)]+)\)/g)].map(m=>m[1]);
      await Promise.all(urls.map(u=>c.add(u).catch(()=>{})));}
  }catch(_){}
  await self.skipWaiting();
})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{
  for(const k of await caches.keys())if(k!==V)await caches.delete(k);
  await self.clients.claim();
})())});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url),own=u.origin===location.origin,font=u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com';
  if(!own&&!font)return;
  if(own&&r.mode==='navigate'){ // try the network briefly so updates arrive, then use the saved copy
    e.respondWith((async()=>{
      const c=await caches.open(V);
      try{const ctl=new AbortController(),t=setTimeout(()=>ctl.abort(),2500);const n=await fetch(r,{signal:ctl.signal});clearTimeout(t);
        if(n.ok)c.put('./index.html',n.clone());return n}
      catch(_){return (await c.match('./index.html'))||(await c.match('./'))||Response.error()}
    })());return}
  e.respondWith((async()=>{
    const m=await caches.match(r,{ignoreVary:true,ignoreSearch:own});if(m)return m;
    const n=await fetch(r);if(n.ok){const c=await caches.open(V);c.put(r,n.clone())}return n;
  })());
});
