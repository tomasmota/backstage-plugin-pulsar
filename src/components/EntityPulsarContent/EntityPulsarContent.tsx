import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';

type PublisherStats = {
  msgRateIn: number;
};

type TopicStats = {
  publishers: PublisherStats[];
};

async function getPulsarTopicMessageCount(topic: string): Promise<number> {
  const pulsarAdminApiBaseUrl = 'http://localhost:8080/';
  const url = `${pulsarAdminApiBaseUrl}admin/v2/persistent/public/default/${topic}/stats`; // TODO: Parameterize tenant and namespace

  const response = await fetch(url);

  if (response.ok) {
    const data: TopicStats = await response.json();
    const messageCount = data.publishers.reduce(
      (count, publisher) => count + publisher.msgRateIn,
      0,
    );
    return messageCount;
  } else {
    throw new Error('Failed to fetch Pulsar topic stats');
  }
}

const fakeData = {
  topics: [
    {
      name: 'topic-1',
      producers: 5,
      subscribers: 3,
      messagesPerSecond: 100,
      bytesPerSecond: 2048,
    },
    {
      name: 'topic-2',
      producers: 2,
      subscribers: 1,
      messagesPerSecond: 50,
      bytesPerSecond: 1024,
    },
  ],
  throughput: {
    ingress: 150,
    egress: 120,
  },
  storage: {
    used: 50,
    available: 200,
  },
};

export const EntityPulsarContent = () => {
  const [messageCount, setMessageCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const count = await getPulsarTopicMessageCount('bla');
        setMessageCount(count);
      } catch (error) {
        console.error('Error fetching message count:', error);
        setMessageCount(null);
      }
    };

    fetchData();
  }, []);
  const pulsarData = fakeData;

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h5">Topics</Typography>
        <Paper>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Topic</TableCell>
                <TableCell>Producers</TableCell>
                <TableCell>Subscribers</TableCell>
                <TableCell>Messages/sec</TableCell>
                <TableCell>Bytes/sec</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pulsarData.topics.map((topic, index) => (
                <TableRow key={index}>
                  <TableCell>{topic.name}</TableCell>
                  <TableCell>{topic.producers}</TableCell>
                  <TableCell>{topic.subscribers}</TableCell>
                  <TableCell>{topic.messagesPerSecond}</TableCell>
                  <TableCell>{topic.bytesPerSecond}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>

      {/* Display other Pulsar information components here */}

      <Box mb={2}>
        <Typography variant="h5">Throughput</Typography>
        <Typography>Ingress: {pulsarData.throughput.ingress} msg/s</Typography>
        <Typography>Egress: {pulsarData.throughput.egress} msg/s</Typography>
      </Box>

      <Box mb={2}>
        <Typography variant="h5">Storage</Typography>
        <Typography>Used storage: {pulsarData.storage.used} GB</Typography>
        <Typography>
          Available storage: {pulsarData.storage.available} GB
        </Typography>
      </Box>

      <Box mb={2}>
        <Typography variant="h6">Number of Messages:</Typography>
        {messageCount !== null ? (
          <Typography variant="body1">{messageCount}</Typography>
        ) : (
          <Typography variant="body1">Error fetching message count</Typography>
        )}
      </Box>
    </Box>
  );
};
