/* MisterTred — service worker: ilova qobig'i oflayn ochiladi, narxlar esa doim internetdan olinadi. */
var CACHE = "mt-shell-v2";
var SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return; // birja API va shriftlar — to'g'ridan-to'g'ri tarmoq
  // Avval tarmoq (yangi versiya darhol ko'rinsin), tarmoq bo'lmasa — keshdagi nusxa.
  e.respondWith(fetch(req).then(function (res) {
    if (res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); }
    return res;
  }).catch(function () {
    return caches.match(req).then(function (hit) { return hit || (req.mode === "navigate" ? caches.match("./index.html") : Response.error()); });
  }));
});

// Bildirishnoma bosilsa — ilovani ochish va kerakli juft tahliliga o'tish.
self.addEventListener("notificationclick", function (e) {
  e.notification.close();
  var target = "./" + (e.notification.data && e.notification.data.sym ? "#" + e.notification.data.sym : "");
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (list) {
    for (var i = 0; i < list.length; i++) if ("focus" in list[i]) { list[i].navigate(target).catch(function () {}); return list[i].focus(); }
    return self.clients.openWindow(target);
  }));
});
