# Stage 0: compile angular frontend
FROM node:14.15.3-alpine3.10 as build
# Set api url
ENV SERVER_API_URL=https://healthconnect.jojoaddison.net

WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run webapp:prod

# Stage 1: serve app with nginx server
FROM nginx:latest
COPY --from=build /app/target/classes/static/  /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
