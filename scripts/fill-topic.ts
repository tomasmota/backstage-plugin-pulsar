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
}

async function runConsumer(consumer: Consumer, sleepTimeMs: number = 0): Promise<void> {
  while(true) {
    const msg = await consumer.receive();
    console.log(`Consumer Received message: ${msg.getData().toString()}, sleeping for ${sleepTimeMs} miliseconds`);
    consumer.acknowledge(msg);
    await sleep(sleepTimeMs);
  }
}

const TOPIC_NAME = 'my-topic';

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

  // Consumer 1
  const consumer1 = await client.subscribe({
    topic: TOPIC_NAME,
    subscription: 'sub1',
  });

  // Consumer 2
  const consumer2 = await client.subscribe({
    topic: TOPIC_NAME,
    subscription: 'sub2',
  });

  await Promise.all([runProducer(producer), runConsumer(consumer1), runConsumer(consumer2, 500)]);

  await client.close();
})();
