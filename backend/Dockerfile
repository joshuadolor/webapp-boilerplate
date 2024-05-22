# no need to multistage
FROM node:slim
WORKDIR /app

#no need to copy files - handled by volumes:-on docker compose

EXPOSE ${BACKEND_PORT}

CMD [ "npm", "run", "dev" ]
