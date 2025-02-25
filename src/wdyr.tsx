/// <reference types="@welldone-software/why-did-you-render" />
import React from 'react';
// 测试环境才引入渲染得监控
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    onlyLogs: true,
    titleColor: 'green',
    diffNameColor: 'darkturquoise',
    trackHooks: true,
    trackAllPureComponents: true,
  });
}
