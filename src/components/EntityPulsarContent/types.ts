// import * as z from "zod";

export type Publisher = {
  accessMode: string;
  msgRateIn: number;
  msgThroughputIn: number;
  averageMsgSize: number;
  address: string;
  producerName: string;
  connectedSince: string;
  clientVersion: string;
};

export type TopicStats = {
  msgRateIn: number;
  publishers: Publisher[];
};
