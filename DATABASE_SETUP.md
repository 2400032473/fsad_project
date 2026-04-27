# Database Setup Guide (MySQL)

This guide will help you set up the SQL database for the Mutual Fund Platform.

## Prerequisites
- [MySQL Server](https://dev.mysql.com/downloads/installer/) (Version 8.0 or higher recommended)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) (Optional, for GUI management)

## Step 1: Install MySQL
If you haven't installed MySQL yet:
1. Download and run the MySQL Installer.
2. Choose "Server Only" or "Full" installation.
3. During configuration, set a password for the `root` user (Default used in this project is `root`).

## Step 2: Create the Database
Open MySQL Command Line Client or Workbench and run the following command to create the database:

```sql
CREATE DATABASE mutualfunddb;
```

## Step 3: Configure Backend
If your MySQL username or password is different from the default, update the settings in:
`backend/src/main/resources/application.properties`

```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## Step 4: Run the Application
When you start the backend for the first time:
1. **Hibernate** will automatically create all required tables because `spring.jpa.hibernate.ddl-auto` is set to `update`.
2. **DataInitializer** will automatically detect an empty database and seed it with sample users, mutual funds, and investments.

### Running with Maven:
Navigate to the `backend` directory and run:
```bash
mvn spring-boot:run
```

## Troubleshooting
- **Connection Refused**: Ensure the MySQL service is running.
- **Access Denied**: Double-check your username and password in `application.properties`.
- **Database Not Found**: Ensure you ran `CREATE DATABASE mutualfunddb;`.
