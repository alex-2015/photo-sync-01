###### SET UP DATABASE FOR POP-C

1. CREATE a database called popc_transformer
2. Select that database
3. Import tables and sample data using popc_transformer.sql
4. Run following to add a db user

```sql
CREATE USER 'user'@'localhost' IDENTIFIED BY  'password';
GRANT ALL PRIVILEGES ON popc_transformer . * TO 'user'@'localhost';
GRANT ALL PRIVILEGES ON chat . * TO 'user'@'localhost';
```