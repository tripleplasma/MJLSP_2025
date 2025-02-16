## How to tunnel the MySql instance to your local machine
- ssh -L localhost:3306:localhost:3306 team4@10.141.193.55

## How to run mysql
- mysql -h localhost -P 3306 -u team4 -p --protocol=TCP