/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["assets/css/main.css","9950785fc6818d1da958a1f5fbaf5bc9"],["assets/fonts/CinzelDecorative-Black.ttf","8195c414496a828144b6deeb1ed68103"],["assets/fonts/CinzelDecorative-Bold.ttf","45d6d4cbd2feca951e8c91c2adb88dca"],["assets/fonts/CinzelDecorative-Regular.ttf","bf4dc48562bad1b356540b66a97e335a"],["assets/fonts/icomoon.eot","e9c6acf9f9917d4d02626ed798e9fb0f"],["assets/fonts/icomoon.svg","e1d0fa58bf42f960cc10d67d9fa2f945"],["assets/fonts/icomoon.ttf","42cc5cb38c277b70d9f74f68d4bc57eb"],["assets/fonts/icomoon.woff","490dc45981b6570de024f54b12062fe7"],["assets/icons/icon-128x128.png","6f56aff34db2702e00c8770c13f6f747"],["assets/icons/icon-144x144.png","6743aa65b4c71218fa392f97297c7774"],["assets/icons/icon-152x152.png","1679ebd2e5f65360c25864eaf00eb696"],["assets/icons/icon-192x192.png","6e081e687c86bfb03627ff138da7c6ee"],["assets/icons/icon-384x384.png","c2a77475fe5f618fc5610d093ed59bad"],["assets/icons/icon-512x512.png","a793e95b77c5c0e3d09bde2db9c1aef5"],["assets/icons/icon-72x72.png","95dcbc204a524218799dd5e2c18c8660"],["assets/icons/icon-96x96.png","b33b4d1a4c529772df884c875534c41c"],["assets/img/contact-bg.jpg","63fc37eac054791dec579e4f71f045bd"],["assets/img/contact-bg_2x.jpg","71df197d536273d56f5a5e6563d0fd19"],["assets/img/features-bg.jpg","8003e9893cdf2bb2307962f8a43a26a4"],["assets/img/features-bg_2x.jpg","e4920f2dd0ecd807a5e1769612a269e9"],["assets/img/header-bg-2.jpg","e1585b1a2a5279b9a15c5452f7d4d4eb"],["assets/img/header-bg-2_2x.jpg","408ac0dc9d3278b1cf17856e9829a198"],["assets/img/kerronb.svg","00d9aa623f93c2d1674a28d31d5d4d4b"],["assets/img/post/features-1.jpg","55532e7aece1d37de6a5d5fc919c6295"],["assets/img/post/features-2.jpg","cba52abfcbe004bfd3f139cfbe642c26"],["assets/img/post/features-3.jpg","1655dcbade386394d58aa01dc4d4212f"],["assets/img/post/large-thumbnail/probatus.png","b6ceca4720ec8f260d55842ba348e926"],["assets/img/post/small-thumbnail/probatus.jpg","8d2cd18a0b8601360e9269e3cf744e3b"],["assets/js/founction.js","d888385ad4542da1943f753dc39c7199"],["assets/js/lib/isInViewport.min.js","097c89ed415390a5b7e660dff8480501"],["assets/js/lib/jquery-3.1.1.min.js","e071abda8fe61194711cfc2ab99fe104"],["assets/loading.html","99f0cbd8840192b391f2ab7cff6ea3ce"],["favicon.ico","af12323803db5a8a9b0761753639f9d7"],["feed.xml","2dfc8a98716d746f1758922bed3046cf"],["index.html","dcfd0b449177f88a31831f496bc0fef5"],["manifest.json","b3211099e32794d3604e183768e5a21c"],["projects/probatus/index.html","636f061d3f88b9958e4c02bf627876ba"],["service-worker.js","a3bedc79e51e761ed4ed16bad876aa5b"],["sitemap.xml","584e611c4c7eaa8bce79d806088cda0f"],["thumbnail.png","b995a06b0aa9fda2b5bda21d85b5bfba"]];
var cacheName = 'sw-precache-v2-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {credentials: 'same-origin'}));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







