# Node v22 is the current LTS version.
FROM node:22-bullseye-slim AS base-node-image

###############################
FROM base-node-image AS dev-test

WORKDIR /jc2e-tea/astro

EXPOSE 1733
EXPOSE 1734
ENTRYPOINT ["tail", "-f", "/dev/null"]
