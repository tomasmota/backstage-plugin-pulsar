import { Client, Producer, Consumer } from 'pulsar-client';

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runProducer(producer: Producer): Promise<void> {
  while(true) {
    await sleep(50);
    await producer.send({
      data: Buffer.from(`Hello Pulsar`),
    });
  }
  // await producer.flush();
  // await producer.close();
}

async function runConsumer1(consumer: Consumer): Promise<void> {
  while(true) {
    const msg = await consumer.receive();
    console.log(`Consumer 1 Received message: ${msg.getData().toString()}`);
    consumer.acknowledge(msg);
  }
  // await consumer.unsubscribe();
  // await consumer.close();
}

async function runConsumer2(consumer: Consumer): Promise<void> {
  while(true) {
    await sleep(300);
    const msg = await consumer.receive();
    console.log(`Consumer 2 Received message: ${msg.getData().toString()}`);
    consumer.acknowledge(msg);
  }
  // await consumer.unsubscribe();
  // await consumer.close();
}

const TOPIC_NAME = 'trash';

(async () => {
  const client = new Client({
    serviceUrl: 'pulsar://localhost:6650',
  });
  console.log('client created');

  // Producer
  const producer = await client.createProducer({
    topic: TOPIC_NAME,
  });
  console.log('producer created');

  // Subscriber
  const consumer1 = await client.subscribe({
    topic: TOPIC_NAME,
    subscription: 'my-subscription',
  });

  sleep(500)

  const consumer2 = await client.subscribe({
    topic: TOPIC_NAME,
    subscription: 'my-subscription',
  });
  console.log('subscriber created');

  await Promise.all([runProducer(producer), runConsumer1(consumer1), runConsumer2(consumer2)]);

  await client.close();
})();
