import { Client } from 'pulsar-client';

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  const client = new Client({
    serviceUrl: 'pulsar://localhost:6650',
  });

  console.log('client created');

  const producer = await client.createProducer({
    topic: 'my-topic',
  });

  console.log('producer created');

  for (let i = 0; i < 100; i++) {
    await sleep(500);
    await producer.send({
      data: Buffer.from('Hello, Pulsar'),
    });
  }

  await producer.close();
  await client.close();
})();
