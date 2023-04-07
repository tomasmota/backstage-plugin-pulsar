import { apachePulsarPlugin } from './plugin';

describe('apache-pulsar', () => {
  it('should export plugin', () => {
    expect(apachePulsarPlugin).toBeDefined();
  });
});
