import { createApiFactory, createPlugin, createRoutableExtension, discoveryApiRef, fetchApiRef } from '@backstage/core-plugin-api';
import { pulsarApiRef, PulsarClient } from './api';

import { rootRouteRef } from './routes';

export const pulsarPlugin = createPlugin({
  id: 'pulsar',
  apis: [
    createApiFactory({
      api: pulsarApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        fetchApi: fetchApiRef,
      },
      factory({ discoveryApi, fetchApi }) {
        return new PulsarClient({ discoveryApi, fetchApi });
      },
    }),
  ],
  routes: {
    root: rootRouteRef,
  },
});

export const EntityPulsarContent = pulsarPlugin.provide(
  createRoutableExtension({
    name: 'EntityPulsarContent',
    component: () =>
      import('./components/EntityPulsarContent').then(m => m.EntityPulsarContent),
    mountPoint: rootRouteRef,
  }),
);
