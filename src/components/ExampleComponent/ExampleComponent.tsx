import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { EntityPulsarContent } from '../EntityPulsarContent';

export const ExampleComponent = () => (
  <Page themeId="tool">
    <Header title="ApachePulsar">
      <HeaderLabel label="Owner" value="Team X" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <ContentHeader title="Plugin title">
        <SupportButton>
          This page displays any information regarding your service's usage of
          Pulsar
        </SupportButton>
      </ContentHeader>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <EntityPulsarContent />
        </Grid>
      </Grid>
    </Content>
  </Page>
);
