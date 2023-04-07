import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const apachePulsarPlugin = createPlugin({
  id: 'apache-pulsar',
  routes: {
    root: rootRouteRef,
  },
});

export const ApachePulsarPage = apachePulsarPlugin.provide(
  createRoutableExtension({
    name: 'ApachePulsarPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
