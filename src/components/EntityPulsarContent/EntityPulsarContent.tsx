import React from 'react';
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
import { useEntity } from '@backstage/plugin-catalog-react';
import { TopicStats } from './types';
import {
  Content,
  ContentHeader,
  InfoCard,
  MissingAnnotationEmptyState,
  Progress,
  SupportButton,
  WarningPanel,
} from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';
import { pulsarApiRef } from '../../api';
import { useApi } from '@backstage/core-plugin-api';

async function getStats(
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

function getTopicPath(path: string | undefined): TopicPath {
  const pathRegExp: RegExp = /^([^/]+)\/([^/]+)\/([^/]+)$/; // matches the form 'tenant/namespace/topic'
  if (path === undefined || !pathRegExp.test(path)) {
    throw Error(`Expected an annotation value in the form of <tenant>/<namespace>/<topic>, got: '${path}'`); // make a proper error here, not sure how to display this yet
  }
  const [tenant, namespace, topic] = path.split('/');
  return { tenant, namespace, topic };
}

type TopicPath = {
  tenant: string;
  namespace: string;
  topic: string;
};

//TODO: add possiblity to set more than one topic
// Or maybe what we what is to select producer or subscription name?
const ANNOTATION_PULSAR_TOPIC = 'backstage.io/pulsar-topic';

/** @public */
export const EntityPulsarContent = () => {
  const { entity } = useEntity();
  const pulsarAnnotation =
    entity.metadata.annotations?.[ANNOTATION_PULSAR_TOPIC]?.trim();
  const isPulsarConfigured = Boolean(pulsarAnnotation);
  const pulsarApi = useApi(pulsarApiRef);

  const { value, loading, error } = useAsync(async () => {
    if (!isPulsarConfigured) {
      return;
    }
    const tp = getTopicPath(pulsarAnnotation);
    const data = pulsarApi.getTopicStats(tp.tenant, tp.namespace, tp.topic);
    console.log(data);
    return getStats(
      tp.tenant ?? 'public',
      tp.namespace ?? 'default',
      tp.topic,
    );
  }, []);

  return (
    <Content>
      <ContentHeader title="Pulsar Topic Information">
        <SupportButton />
      </ContentHeader>

      {!isPulsarConfigured && (
        <MissingAnnotationEmptyState annotation={ANNOTATION_PULSAR_TOPIC} />
      )}

      {loading && <Progress />}

      {isPulsarConfigured && !loading && error && (
        <WarningPanel title="Failed to fetch Pulsar information" message={error?.message} />
      )}

      {isPulsarConfigured && !loading && !error && value !== undefined && (
        <>
          <InfoCard>
            <Typography variant="h5">Throughput</Typography>
            <Typography>
              Ingress: {Math.round(value.msgRateIn)} msg/s
            </Typography>
            <Typography>
              Egress: {Math.round(value.msgRateOut)} msg/s
            </Typography>
          </InfoCard>
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
                      {value.publishers.map((p, index) => (
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
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Consumer</TableCell>
                        <TableCell>msg/s</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(value.subscriptions).map(
                        ([subName, subContent]) => {
                          return (
                            <TableRow key={subName}>
                              <TableCell>{subName}</TableCell>
                              <TableCell>{subContent.messageAckRate}</TableCell>
                            </TableRow>
                          );
                        },
                      )}
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Content>
  );
};
