FROM node:14
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
ENV PORT=2020
EXPOSE 2020
CMD ["node", "app.js"]