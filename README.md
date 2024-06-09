# How to install

For now authentication is disabled. Vulnerabilities present:
* no ddos protection
* rate limiting
* no usage of Redis/in-memory cache (unlikely necessary but using Redis INSTEAD OF Posgtres might be a feature)
* no TTL for links

# To develop locally

* install Node version manager (nvm)
* `nvm use 21`
* make sure pnpm and npx are installed
* create .env file from .env.example
* `make local-up` to boot up posgresql locally
* `cd backend && npm i` to install dependencies for the backend
* from `backend` directory `npx nx serve api` to run `api` microservice

# Testing
* make a POST request `http://localhost:8000/api/link/generate` with the body with json `{"url": "https://google.com"}`
* write out the resulting "short" value
* make a GET request `http://localhost:8000/api/link/:id` where instead of `:id` you use that short value 

# ToDo:

* deploy via terraform to save time
* ci/cd
* AWS adaptation
* better readme
