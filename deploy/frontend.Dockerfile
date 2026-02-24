# frontend.Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY ./frontend .
RUN npm install -g serve
EXPOSE 80
CMD ["serve", "-s", ".", "-l", "80"]
