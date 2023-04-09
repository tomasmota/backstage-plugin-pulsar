import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const apachePulsarPlugin = createPlugin({
  id: 'apache-pulsar',
  routes: {
    root: rootRouteRef,
  },
});

export const EntityPulsarContent = apachePulsarPlugin.provide(
  createRoutableExtension({
    name: 'EntityPulsarContent',
    component: () =>
      import('./components/EntityPulsarContent').then(m => m.EntityPulsarContent),
    mountPoint: rootRouteRef,
  }),
);
