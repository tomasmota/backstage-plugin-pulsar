import React from 'react';
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

export const PulsarPage = () => {
  const pulsarData = fakeData;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Pulsar Information</Typography>
      
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
        <Typography>Available storage: {pulsarData.storage.available} GB</Typography>
      </Box>
    </Box>
  );
};
