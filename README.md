# NC News Seeding

If you are using this NC News code base for the first time you will need to setup the .env files.
This information would not normally be included in the readme file, but as this is a public project
I will add these here so anyone can clone and test this repo.
you will need to create the below files in the main folder of the repo:
.env.test (This should contain 'PGDATABASE = nc_news_test' to enable developers to connect to DBs locally)
.env.development (This should contain 'PGDATABASE = nc_news' to enable developers to connect to DBs locally)

once dependencies have been installed, you can run 'npm run setup-dbs' from the terminal to create the database.
