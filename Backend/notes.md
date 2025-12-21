# DB commands 
- open psql CLI tool : 
  - docker exec -it HuntBoard-DB psql -U postgres
- PSQL commands :
  - List databases : \l 
  - connect to db: \c <db name>
  - list tables, sequences, etc: \d
  - exit psql : \q
  - escape into linux container: \! <linux command>