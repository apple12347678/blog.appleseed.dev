import React, { useLayoutEffect, useRef } from 'react';

import _ from 'lodash';

export default function Utterances() {
  const containerRef = useRef<HTMLDivElement>(null);
  const utterancesScriptRef = useRef<HTMLScriptElement>();

  useLayoutEffect(() => {
    if (!utterancesScriptRef.current) {
      const utterances = document.createElement('script');
      utterancesScriptRef.current = utterances;
      const attributes = {
        src: 'https://utteranc.es/client.js',
        repo: 'apple12347678/blog.appleseed.dev',
        'issue-term': 'pathname',
        label: 'comment',
        theme: 'github-light',
        crossOrigin: 'anonymous',
        async: 'true',
      };
      _.forEach(attributes, (val, key) => utterances.setAttribute(key, val));
      containerRef.current?.appendChild(utterances);
    }
  }, []);

  return <div id="utterances" ref={containerRef} />;
}
