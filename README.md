# apache-pulsar

Welcome to the apache-pulsar plugin!

## Development setup (WIP)
- Run pulsar in a container:
`podman run -it -p 6650:6650 -p 8080:8080 --mount type=volume,source=pulsardata,target=/pulsar/data --mount type=volume,source=pulsarconf,target=/pulsar/conf apachepulsar/pulsar:2.11.0 bin/pulsar standalone`
- Optionally fill up with some messages by running fill-topic.ts
- Go into a Component that has the pulsar annotation pointing to this topic and go into the Pulsar tab

## TODO
- Figure out authentication
- Decide what data to show
    - Do devs care about 
- Make it look nice

