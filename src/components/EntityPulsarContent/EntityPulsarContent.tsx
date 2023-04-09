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
import { TopicStats } from './types';

async function getTopicStats(tenant: string, namespace: string, topic: string) : Promise<TopicStats> {  
  const pulsarAdminApiBaseUrl = 'http://localhost:7007/api/proxy/pulsar/'; // Using proxy to localhost:8080 in this case
  const url = `${pulsarAdminApiBaseUrl}admin/v2/persistent/${tenant}/${namespace}/${topic}/stats`; 

  const response = await fetch(url);

  if (response.ok) {
    const stats: TopicStats = await response.json();
    return stats;
  } else {
    throw new Error('Failed to fetch Pulsar topic stats');
  }
}

/** @public */
export type EntityPulsarContentProps = {
  tenant?: string = 'public';
  namespace?: string;
  topic: string;
};

/** @public */
export const EntityPulsarContent = (props: EntityPulsarContentProps) => {
  const [stats, setStats] = useState<TopicStats|null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStats(await getTopicStats(props.tenant ?? 'public', props.namespace ?? 'default', props.topic));
      } catch (error) {
        console.error('Error fetching message count:', error);
        setStats(null);
      }
    };

    fetchData();
  }, []);
  const pulsarData = fakeData;

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h5">Information for topic</Typography>
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
        <Typography variant="h6">Messages per second</Typography>
        {stats !== null ? (
          <Typography variant="body1">{Math.round(stats.msgRateIn)}</Typography>
        ) : (
          <Typography variant="body1">Error fetching message rate</Typography>
        )}
      </Box>
    </Box>
  );
};

// TODO: Remove
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
