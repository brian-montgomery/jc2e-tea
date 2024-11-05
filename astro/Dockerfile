FROM node:20-buster-slim AS base-node-image

###############################
FROM base-node-image AS dev-test

WORKDIR /jc2e-tea/astro

EXPOSE 4321
ENTRYPOINT ["tail", "-f", "/dev/null"]
