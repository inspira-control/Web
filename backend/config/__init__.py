# PyMySQL funciona como conector de MySQL sin necesidad de compilar nada
# (más fácil de instalar en Windows/Mac que mysqlclient).
import pymysql

pymysql.install_as_MySQLdb()
