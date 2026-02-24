# ai.Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY ./ai .
RUN npm install
EXPOSE 6000
CMD ["node", "meta-agent.js"]
