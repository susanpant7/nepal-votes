run mssql server image:

docker run --platform linux/amd64 -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Susan.Pant7" \
   -p 1433:1433 --name sql_server_dev \
   -d mcr.microsoft.com/mssql/server:2022-latest
