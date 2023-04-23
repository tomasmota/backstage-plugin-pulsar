import { DiscoveryApi, FetchApi } from '@backstage/core-plugin-api';
import { PulsarApi, TopicStats } from './types';

/**
 * Options for creating a PulsarClient.
 *
 * @public
 */
export interface PulsarClientOptions {
  discoveryApi: DiscoveryApi;
  fetchApi: FetchApi;
}

export class PulsarClient implements PulsarApi {
  private readonly discoveryApi: DiscoveryApi;
  private readonly fetchApi: FetchApi;

  constructor(options: PulsarClientOptions) {
    this.discoveryApi = options.discoveryApi;
    this.fetchApi = options.fetchApi;
  }

  async getTopicStats(
    tenant: string,
    namespace: string,
    topic: string,
  ): Promise<TopicStats> {
    const baseUrl = await this.discoveryApi.getBaseUrl('pulsar');
    // const targetUrl = `${baseUrl}/admin/v2/persistent/${tenant}/${namespace}/${topic}/stats`;
    const targetUrl = `${baseUrl}/topics`;
    console.log(tenant + namespace + topic);

    const result = await this.fetchApi.fetch(targetUrl);
    const data = await result.json();

    if (!result.ok) {
      throw new Error(`${data.message}`);
    }

    //remove
    console.log('printing result in client');
    console.log(result);

    return data;
  }
}
