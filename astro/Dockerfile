FROM node:20-buster-slim AS base-node-image

###############################
FROM base-node-image AS dev-test

WORKDIR /jc2e-tea/astro

EXPOSE 1733
EXPOSE 1734
ENTRYPOINT ["tail", "-f", "/dev/null"]
