# DB commands 
- open psql CLI tool : 
  - docker exec -it HuntBoard-DB psql -U postgres
- PSQL commands :
  - List databases : \l 
  - connect to db: \c <db name>
  - list tables, sequences, etc: \d
  - exit psql : \q
  - escape into linux container: \! <linux command>
# Start application 
  - go build main.go && .\main.exe
    - This command allows you to start the backend, without needing to constantly appease windows defender.