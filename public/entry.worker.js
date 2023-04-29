// node_modules/@remix-run/router/dist/router.js
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var Action;
(function(Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
var ResultType;
(function(ResultType2) {
  ResultType2["data"] = "data";
  ResultType2["deferred"] = "deferred";
  ResultType2["redirect"] = "redirect";
  ResultType2["error"] = "error";
})(ResultType || (ResultType = {}));
var json = function json2(data, init) {
  if (init === void 0) {
    init = {};
  }
  let responseInit = typeof init === "number" ? {
    status: init
  } : init;
  let headers = new Headers(responseInit.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  }
  return new Response(JSON.stringify(data), _extends({}, responseInit, {
    headers
  }));
};
var validMutationMethodsArr = ["post", "put", "patch", "delete"];
var validMutationMethods = new Set(validMutationMethodsArr);
var validRequestMethodsArr = ["get", ...validMutationMethodsArr];
var validRequestMethods = new Set(validRequestMethodsArr);
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
var UNSAFE_DEFERRED_SYMBOL = Symbol("deferred");

// node_modules/@remix-run/server-runtime/dist/esm/responses.js
var json3 = (data, init = {}) => {
  return json(data, init);
};

// app/entry.worker.ts
var STATIC_ASSETS = ["/build/", "/icons/"];
var ASSET_CACHE = "asset-cache";
var DATA_CACHE = "data-cache";
var DOCUMENT_CACHE = "document-cache";
function debug(...messages) {
  if (true) {
    console.debug(...messages);
  }
}
async function handleInstall(event) {
  debug("Service worker installed");
}
async function handleActivate(event) {
  debug("Service worker activated");
}
async function handleMessage(event) {
  const cachePromises = /* @__PURE__ */ new Map();
  if (event.data.type === "REMIX_NAVIGATION") {
    const { isMount, location, matches, manifest } = event.data;
    const documentUrl = location.pathname + location.search + location.hash;
    const [dataCache, documentCache, existingDocument] = await Promise.all([
      caches.open(DATA_CACHE),
      caches.open(DOCUMENT_CACHE),
      caches.match(documentUrl)
    ]);
    if (!existingDocument || !isMount) {
      debug("Caching document for", documentUrl);
      cachePromises.set(
        documentUrl,
        documentCache.add(documentUrl).catch((error) => {
          debug(`Failed to cache document for ${documentUrl}:`, error);
        })
      );
    }
    if (isMount) {
      for (const match of matches) {
        if (manifest.routes[match.id].hasLoader) {
          const params = new URLSearchParams(location.search);
          params.set("_data", match.id);
          let search = params.toString();
          search = search ? `?${search}` : "";
          const url = location.pathname + search + location.hash;
          if (!cachePromises.has(url)) {
            debug("Caching data for", url);
            cachePromises.set(
              url,
              dataCache.add(url).catch((error) => {
                debug(`Failed to cache data for ${url}:`, error);
              })
            );
          }
        }
      }
    }
  }
  await Promise.all(cachePromises.values());
}
async function handleFetch(event) {
  const url = new URL(event.request.url);
  if (isAssetRequest(event.request)) {
    const cached = await caches.match(event.request, {
      cacheName: ASSET_CACHE,
      ignoreVary: true,
      ignoreSearch: true
    });
    if (cached) {
      debug("Serving asset from cache", url.pathname);
      return cached;
    }
    debug("Serving asset from network", url.pathname);
    const response = await fetch(event.request);
    if (response.status === 200) {
      const cache = await caches.open(ASSET_CACHE);
      await cache.put(event.request, response.clone());
    }
    return response;
  }
  if (isLoaderRequest(event.request)) {
    try {
      debug("Serving data from network", url.pathname + url.search);
      const response = await fetch(event.request.clone());
      const cache = await caches.open(DATA_CACHE);
      await cache.put(event.request, response.clone());
      return response;
    } catch {
      debug(
        "Serving data from network failed, falling back to cache",
        url.pathname + url.search
      );
      const response = await caches.match(event.request);
      if (response) {
        response.headers.set("X-Remix-Worker", "yes");
        return response;
      }
      return json3(
        { message: "Network Error" },
        {
          status: 500,
          headers: { "X-Remix-Catch": "yes", "X-Remix-Worker": "yes" }
        }
      );
    }
  }
  if (isDocumentGetRequest(event.request)) {
    try {
      debug("Serving document from network", url.pathname);
      const response = await fetch(event.request);
      const cache = await caches.open(DOCUMENT_CACHE);
      await cache.put(event.request, response.clone());
      return response;
    } catch (error) {
      debug(
        "Serving document from network failed, falling back to cache",
        url.pathname
      );
      const response = await caches.match(event.request);
      if (response) {
        return response;
      }
      throw error;
    }
  }
  return fetch(event.request.clone());
}
var handlePush = async (event) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const data = JSON.parse(event == null ? void 0 : event.data.text());
  const title = (_a = data.title) != null ? _a : "Remix PWA";
  const options = {
    body: (_b = data.body) != null ? _b : "Notification Body Text",
    icon: (_c = data.icon) != null ? _c : "/icons/android-icon-192x192.png",
    badge: (_d = data.badge) != null ? _d : "/icons/android-icon-48x48.png",
    dir: (_e = data.dir) != null ? _e : "auto",
    image: (_f = data.image) != null ? _f : void 0,
    silent: (_g = data.silent) != null ? _g : false
  };
  self.registration.showNotification(title, {
    ...options
  });
};
function isMethod(request, methods) {
  return methods.includes(request.method.toLowerCase());
}
function isAssetRequest(request) {
  return isMethod(request, ["get"]) && STATIC_ASSETS.some((publicPath) => request.url.includes(publicPath));
}
function isLoaderRequest(request) {
  const url = new URL(request.url);
  return isMethod(request, ["get"]) && url.searchParams.get("_data");
}
function isDocumentGetRequest(request) {
  return isMethod(request, ["get"]) && request.mode === "navigate";
}
self.addEventListener("install", (event) => {
  event.waitUntil(handleInstall(event).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(handleActivate(event).then(() => self.clients.claim()));
});
self.addEventListener("message", (event) => {
  event.waitUntil(handleMessage(event));
});
self.addEventListener("push", (event) => {
  event.waitUntil(handlePush(event));
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const result = {};
      try {
        result.response = await handleFetch(event);
      } catch (error) {
        result.error = error;
      }
      return appHandleFetch(event, result);
    })()
  );
});
async function appHandleFetch(event, {
  error,
  response
}) {
  return response;
}
/*! Bundled license information:

@remix-run/router/dist/router.js:
  (**
   * @remix-run/router v1.5.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/responses.js:
  (**
   * @remix-run/server-runtime v1.15.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/index.js:
  (**
   * @remix-run/server-runtime v1.15.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
