import { Client, Producer, Consumer } from 'pulsar-client';

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runProducer(producer: Producer): Promise<void> {
  for (let i = 0; i < 10000; i++) {
    await sleep(50);
    await producer.send({
      data: Buffer.from(`Hello, Pulsar, message ${i}`),
    });
  }
  await producer.flush();
  await producer.close();
}

async function runSubscriber(consumer: Consumer): Promise<void> {
  for (let i = 0; i < 10000; i++) {
    const msg = await consumer.receive();
    console.log(`Received message: ${msg.getData().toString()}`);
    consumer.acknowledge(msg);
  }
  await consumer.unsubscribe();
  await consumer.close();
}

(async () => {
  const client = new Client({
    serviceUrl: 'pulsar://localhost:6650',
  });
  console.log('client created');

  // Producer
  const producer = await client.createProducer({
    topic: 'my-topic',
  });
  console.log('producer created');
  runProducer(producer);

  // Subscriber
  const subscriber = await client.subscribe({
    topic: 'my-topic',
    subscription: 'my-subscription',
  });
  console.log('subscriber created');
  runSubscriber(subscriber);

  await Promise.all([runProducer(producer), runSubscriber(subscriber)]);

  await client.close();
})();
