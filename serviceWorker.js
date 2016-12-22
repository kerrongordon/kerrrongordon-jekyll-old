---
layout: null
---


var cacheName = 'kerron-gordon-v1';
var filesToCache = [
    {% for post in site.projects %}'{{ post.url }}index.html',{% endfor %}
    // {% for post in site.features %}'{{ post.url }}',{% endfor %}
    {% for file in site.static_files %}'{{ file.path }}',{% endfor %}
    '{{ "/assets/css/main.css" | prepend: site.baseurl }}',
    '{{ site.baseurl }}/{{ site.javascript_location }}/founction.js',
    '/index.html'
];


// serviceWorker.js
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    console.log('[*] Serving cached: ' + event.request.url);
                    return response;
                }

                console.log('[*] Fetching: ' + event.request.url);
                return fetch(event.request);
            }
        )
    );
});