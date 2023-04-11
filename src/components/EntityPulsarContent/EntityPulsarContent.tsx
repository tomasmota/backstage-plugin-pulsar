import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { TopicStats } from './types';

async function getTopicStats(
  tenant: string,
  namespace: string,
  topic: string,
): Promise<TopicStats> {
  // Docs on this endpoint: https://pulsar.apache.org/docs/2.11.x/administration-stats/#topic-stats
  const pulsarAdminApiBaseUrl = 'http://localhost:7007/api/proxy/pulsar/'; // Using proxy to localhost:8080 in this case
  const url = `${pulsarAdminApiBaseUrl}admin/v2/persistent/${tenant}/${namespace}/${topic}/stats`;

  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Failed to fetch Pulsar topic stats');
  }
}

/** @public */
export type EntityPulsarContentProps = {
  tenant?: string;
  namespace?: string;
  topic: string;
};

/** @public */
export const EntityPulsarContent = (props: EntityPulsarContentProps) => {
  const { tenant, namespace, topic } = props;
  const [stats, setStats] = useState<TopicStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStats(
          await getTopicStats(
            tenant ?? 'public',
            namespace ?? 'default',
            topic,
          ),
        );
      } catch (error) {
        console.error('Error fetching message count:', error);
        setStats(null);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h5">Topic: {topic}</Typography>
      </Box>

      {stats !== null ? (
        <Box>
          <Box mb={2}>
            <Typography variant="h5">Throughput</Typography>
            <Typography>
              Ingress: {Math.round(stats.msgRateIn)} msg/s
            </Typography>
            <Typography>
              Egress: {Math.round(stats.msgRateOut)} msg/s
            </Typography>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Producer</TableCell>
                        <TableCell>msg/s</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stats.publishers.map((p, index) => (
                        <TableRow key={index}>
                          <TableCell>{p.producerName}</TableCell>
                          <TableCell>{p.msgRateIn.toFixed(3)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Consumer</TableCell>
                        <TableCell>msg/s</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(stats.subscriptions).map(
                        ([subName, subContent]) => {
                          return <TableRow key={subName}>
                            <TableCell>{subName}</TableCell>
                            <TableCell>
                              {subContent.messageAckRate}
                            </TableCell>
                          </TableRow>;
                        },
                      )}
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        <Typography variant="body1">Error fetching topic stats</Typography>
      )}
    </Box>
  );
};
