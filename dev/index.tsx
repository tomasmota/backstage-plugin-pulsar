import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { apachePulsarPlugin, ApachePulsarPage } from '../src/plugin';

createDevApp()
  .registerPlugin(apachePulsarPlugin)
  .addPage({
    element: <ApachePulsarPage />,
    title: 'Root Page',
    path: '/apache-pulsar'
  })
  .render();
