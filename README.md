# backstage pulsar plugin

Welcome to the pulsar plugin!

## Development setup (WIP)
- Run pulsar in a container:
`podman run -it -p 6650:6650 -p 8080:8080 --mount type=volume,source=pulsardata,target=/pulsar/data --mount type=volume,source=pulsarconf,target=/pulsar/conf apachepulsar/pulsar:2.11.0 bin/pulsar standalone`
- Optionally fill up with some messages by running fill-topic.ts: `tsc fill-topic.ts && node fill-topic.js`
- Go into a Component that has the pulsar annotation ('''backstage.io/pulsar-topic: my-topic''') pointing to this topic and go into the Pulsar tab

## TODO
- Figure out authentication
- Decide what data to show
- Make it look nice
- Allow showing information for several topics (perhaps select from a dropdown?) not sure how to put them in annotations
- Consider getting the producer and/or subscriber name instead of the topic name(s)


## Questions
- Is information of both subscriptions and consumers? Or is it usually the case that 1 subscription = 1 consumer?
