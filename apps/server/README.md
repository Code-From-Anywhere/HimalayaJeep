Welcome to the server of Himalaya Jeep.

## Setup in production

How to add server endpoint in production

- On the server, clone repo into /home/leckr/[reponame].
- Run server on a certain port on production server. Choose a port with the PORT .env variable that is not used yet (see below)
- If needed, create a new database (see instructions below)
- In /etc/nginx/sites-enabled, create new file for that port that points to certain domain.
- Test nginx: sudo nginx -t
- Restart nginx: sudo systemctl restart nginx
- Add subdomain to CloudFlare leckrapi.xyz DNS that points to the server (85.90.247.71)
- to put the api online, `git pull`, `yarn`, `yarn build`, `yarn serve` (or `yarn cluster`), or for simplicity, just run `yarn reloadAll` or `yarn reloadAllStaging`, depending on the environment.
