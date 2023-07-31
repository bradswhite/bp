# bp / Boilerplate App Code

### Setup Instructions

###### Install
```
gh repo clone bradscottwhite/bp
mv bp ***app-name***
cd ***app-name***
yarn install
```

###### API Configuration:
Login to Railway.app and start Postgres db and copy DB_URL. (Use CLI???)
```
yarn rw g secret

touch .env
nvim .env
```
~/.env:
```
DATABASE_URL=***your-db-url-from-railway***
SESSION_SECRET=***your-generated-session-secret***
```

```
yarn rw prisma migrate dev
```

###### Run Locally

(Optional/only for local testing)
Change ports in ~/redwood.toml

```
yarn rw dev
```

###### Deploy
Delete Git repo then create Git repo
``` rm -rf .git ```

Import app from GitHub to Netifly
Also add env vars from ~/.env file.
Finally change name and deploy.

