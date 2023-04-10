export type Publisher = {
  // accessMode: string;
  msgRateIn: number;
  // msgThroughputIn: number;
  // averageMsgSize: number;
  // address: string;
  producerName: string;
  // connectedSince: string;
  // clientVersion: string;
};

export type Subscription = {
  msgRateOut: number; // messages being delivered to this subscription per second
  // msgThroughputOut: number;
  // bytesOutCounter: number;
  // msgOutCounter: number;
  // msgRateRedeliver: number;
  messageAckRate: number; // messages acked per second
  // chunkedMessageRate: number;
  // msgBacklog: number;
  // backlogSize: number;
  // earliestMsgPublishTimeInBacklog: number;
  // msgBacklogNoDelayed: number;
  // blockedSubscriptionOnUnackedMsgs: boolean;
  // msgDelayed: number;
  // unackedMessages: number;
  // type: string;
  // activeConsumerName: string;
  // msgRateExpired: number;
  // totalMsgExpired: number;
  // lastExpireTimestamp: number;
  // lastConsumedFlowTimestamp: number;
  // lastConsumedTimestamp: number;
  // lastAckedTimestamp: number;
  // lastMarkDeleteAdvancedTimestamp: number;
  // consumers: Consumer[];
  // isDurable: boolean;
  // isReplicated: boolean;
  // allowOutOfOrderDelivery: boolean;
  // consumersAfterMarkDeletePosition: Record<string, unknown>;
  // nonContiguousDeletedMessagesRanges: number;
  // nonContiguousDeletedMessagesRangesSerializedSize: number;
  // delayedTrackerMemoryUsage: number;
  // subscriptionProperties: Record<string, unknown>;
  // filterProcessedMsgCount: number;
  // filterAcceptedMsgCount: number;
  // filterRejectedMsgCount: number;
  // filterRescheduledMsgCount: number;
  // durable: boolean;
  // replicated: boolean;
};

// type Compaction = {
//   lastCompactionRemovedEventCount: number;
//   lastCompactionSucceedTimestamp: number;
//   lastCompactionFailedTimestamp: number;
//   lastCompactionDurationTimeInMills: number;
// };

export type TopicStats = {
  msgRateIn: number;
  // msgThroughputIn: number;
  msgRateOut: number;
  // msgThroughputOut: number;
  // bytesInCounter: number;
  msgInCounter: number; 
  // bytesOutCounter: number;
  // msgOutCounter: number;
  averageMsgSize: number;
  // msgChunkPublished: boolean;
  // storageSize: number;
  // backlogSize: number;
  // publishRateLimitedTimes: number;
  // earliestMsgPublishTimeInBacklogs: number;
  // offloadedStorageSize: number;
  // lastOffloadLedgerId: number;
  // lastOffloadSuccessTimeStamp: number;
  // lastOffloadFailureTimeStamp: number;
  publishers: Publisher[];
  // waitingPublishers: number;
  subscriptions: Record<string, Subscription>;
  // replication: Record<string, unknown>;
  // deduplicationStatus: string;
  // nonContiguousDeletedMessagesRanges: number;
  // nonContiguousDeletedMessagesRangesSerializedSize: number;
  // delayedMessageIndexSizeInBytes: number;
  // compaction: Compaction;
};
