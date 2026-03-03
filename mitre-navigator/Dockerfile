FROM node:18-alpine

WORKDIR /app

# Install git
RUN apk add --no-cache git

# Clone ATT&CK Navigator
RUN git clone https://github.com/mitre-attack/attack-navigator.git .

# Install dependencies and build
RUN npm install && npm run build

EXPOSE 4200

CMD ["npx", "http-server", "dist/attack-navigator", "-p", "4200", "--host", "0.0.0.0"]
