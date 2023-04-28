import { useLocation, useMatches } from '@remix-run/react';
import { useEffect } from 'react';

let isMount = true;

function isPromise(p: any): boolean {
  if (typeof p === 'object' && typeof p.then === 'function') {
    return true;
  }

  return false;
}
export function useSWEffect() {
  let location = useLocation();
  let matches = useMatches();

  useEffect(() => {
    let mounted = isMount;
    isMount = false;

    if ('serviceWorker' in navigator) {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller?.postMessage({
          type: 'REMIX_NAVIGATION',
          isMount: mounted,
          location,
          matches: matches.filter(route => {
            if (route.data) {
              return (
                Object.values(route.data!).filter(element => {
                  return isPromise(element);
                }).length === 0
              );
            }
            return true;
          }),
          manifest: window.__remixManifest,
        });
      } else {
        let listener = async () => {
          await navigator.serviceWorker.ready;
          navigator.serviceWorker.controller?.postMessage({
            type: 'REMIX_NAVIGATION',
            isMount: mounted,
            location,
            matches: matches.filter(route => {
              if (route.data) {
                return (
                  Object.values(route.data!).filter(element => {
                    return isPromise(element);
                  }).length === 0
                );
              }
              return true;
            }),
            manifest: window.__remixManifest,
          });
        };
        navigator.serviceWorker.addEventListener('controllerchange', listener);
        return () => {
          navigator.serviceWorker.removeEventListener(
            'controllerchange',
            listener
          );
        };
      }
    }
  }, [location, matches]);
}
