FROM node:18-alpine as factset-development
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn global add rimraf && yarn global add parcel-bundler
RUN yarn install --frozen-lockfile
COPY . .

FROM factset-development as factset-builder
WORKDIR /usr/src/app
# RUN chown -Rh node:node /usr/src/app
COPY package.json ./
COPY yarn.lock ./
COPY --from=factset-development /usr/src/app/node_modules ./node_modules
COPY . .
RUN npx nest build
ENV NODE_ENV production
# RUN npm ci --only=production && npm cache clean --force
RUN yarn install --production=true

FROM factset-development As factset-production
# Copy the bundled code from the build stage to the production image
COPY --from=factset-builder /usr/src/app/node_modules ./node_modules
COPY --from=factset-builder /usr/src/app/dist ./dist
CMD [ "node", "dist/main.js" ]