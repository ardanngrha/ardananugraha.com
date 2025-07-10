"use client";

import { useEffect, useRef } from 'react';

export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const giscusContainer = ref.current;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';

    script.setAttribute('data-repo', 'ardanngrha/ardananugraha.com');
    script.setAttribute('data-repo-id', 'R_kgDOO_0Wmg');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOO_0Wms4CswvE');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '1');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'dark');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');

    giscusContainer.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      if (giscusContainer) {
        giscusContainer.innerHTML = '';
      }
    };
  }, []);

  return <div ref={ref} />;
}