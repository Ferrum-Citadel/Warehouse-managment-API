<!-- PROJECT LOGO -->

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![REACT](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MariaDB](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![GitHub top language](https://img.shields.io/github/languages/top/Ferrum-Citadel/SLM-assignment?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/Ferrum-Citadel/SLM-assignment?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/Ferrum-Citadel/SLM-assignment?style=for-the-badge)
<br />

<p align="center">
  <a href="https://github.com/Ferrum-Citadel/SLM-assignment">
  </a>

  <h1 align="center">Warehouse managment API</h1>
  <h3 align="center">SLM assignment</h3>

  <p align="center">
    A simple RESTful (Node.js,Express.js) API written in Typescript with React front-end.
    <br />
    <a href="https://github.com/ferrum-citadel/SLM-assignment"><strong>Explore the docs »</strong></a>
    <br />
    <!--<br />
    <a href="https://github.com/ferrum-citadel/SLM-assignment">View Demo</a>

  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#usage">Testing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    
  </ol>
</details>

---

<!-- ABOUT THE PROJECT -->

## About The Project

Simple REST api and webpage simulating warehouse management operations.

### Built With

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Create-react-app](https://create-react-app.dev/)
- [MariaDB](https://mariadb.org/)

### Database ER diagram:

![screenshot](https://github.com/Ferrum-Citadel/SLM-assignment/blob/master/images/er-diagram.png?raw=true)

---

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

- npm
- MariaDB or MySQL  
  -OR
- Docker-compose

## Installation

1. First of all clone the repo:

   ```sh
   git clone https://github.com/Ferrum-Citadel/SLM-assignment.git

   ```

### - Using Docker-compose

1. In the: `/client/package.json` file, locate the proxy line:

   ```json
   19  "proxy": "http://localhost:5000",
   ```

2. And change it to :

   ```json
   19  "proxy": "http://backend:5000",
   ```

3. From the root directory run:  
   <sup>(This takes some time, it says: `"You can now view client in the browser."` when finished)</sup>

   ```sh
   sudo docker-compose up
   ```

   or:

   ```sh
   sudo docker-compose up -d
   ```

   If you make any change to the code you have to run:

   ```sh
   sudo docker-compose up --build
   ```

### - Install in unix systems

#### - Set up the database

1. First, log in to MySQL as root or another user with sufficient privileges to create new databases:

   ```sh
   mysql -u root -p
   ```

2. This command will bring you into the MySQL shell prompt. Next, create a new database with the following command. In this example, the new database is called skroutzdb.

   ```mysql
   CREATE DATABASE skroutzdb;
   ```

3. You’ll see this output confirming the database creation.

   ```mysql
    Query OK, 1 row affected (0.00 sec)
   ```

4. Navigate to the repo's `"/mysql-dump"` directory and import the dump file with the following command:
   ```sh
   mysql -u username -p new_database < database-dump.sql
   ```
   `username` is the username you can log in to the database with.  
    `skroutzdb` is the name of the freshly created database  
    `database-dump.sql` is the data dump file to be imported, located in the `"/mysql-dump"` directory.

## - Run the project

1. (This is not needed if you run it with docker)  
   Fill in the newly created database name, mysql user and password information in the **`".env"`** and **`".docker.env"`** files located in **`"./api/.env"`** and **`"./api/.docker.env"`**. **DON'T** change **PORT**, **DB_HOST** and **HOST**:

   ```sh
    PORT=5000         /*DONT*/
    HOST=localhost    /*CHANGE*/
    DB_HOST=localhost /*THESE*/


    DB_USER= your_mysql/mariadb_USERNAME
    DB_PWD= your_mysql/mariadb_PASSWORD
    DB_NAME= the_created_database
   ```

2. Install NPM packages in the root directory
   ```sh
   npm install
   ```
3. Install NPM packages in nested directories or from the root run:
   ```sh
   npm run prepare
   ```
4. Run the client and the api at the same time from the root directory:
   ```sh
   npm start
   ```
5. Navigate to **http://localhost:3000** in your browser to use the website  
    or  
   Directly hit the api routes on **http://localhost:5000**.

---

## Testing

After running the project and navigating to the website hosted at `http://localhost:3000` you should see this:

![screenshot](https://github.com/Ferrum-Citadel/SLM-assignment/blob/master/images/screenshot.png?raw=true)

Here we can run different live usage scenarios and test the API behaviour.  
The "correct" usage would be to:

- 1. Scan package
- 2. If it's assigned driver is available SET ENROUTE.
- 3. If it's already en route then SET DELIVERED.
- 4. Repeat

These are some tested and correctly handled edge cases:

- Input voucher with wrong format e.g., B9BB (accepts only `^[A-Z][0-9][A-Z]$`).
- Input voucher with right format but not in the data table.
- Try to click SET ENROUTE or SET DELIVERED in unscanned packages
- Click SET ENROUTE 2 times for the same package (same with SET DELIVERED).
- Try to SET ENROUTE 2 or more packages assigned to the same driver
- Try to SET DELIVERED to a package that hasn't been en route first.

---

## All Implemented Routes:

Running on **http://localhost:5000/**

- **GET** - **`/all`**
- **GET** - **`/package/all`**
- **GET** - **`/package/scanned`**
- **GET** - **`/package/unscanned`**
- **GET** - **`/package/enroute`**
- **GET** - **`/package/delivered`**
- **GET** - **`/package/delivered`**
- **GET** - **`/driver/all`**
- **GET** - **`/assigned/:driverName`** (returns all scanned packages assigned to the given driver)
- **GET** - **`/assigned/all`** (returns all scanned packages and their assigned drivers)
- **GET** - **`/status/:voucher`**
- **GET** - **`/cluster/:voucher`**
- **PUT** - **`/scan/:voucher`**
- **PUT** - **`/enroute/:voucher`**
- **PUT** - **`/delivered/:voucher`**
- **DELETE** - **`/reset`** (resets the database state)

## License

Distributed under the MIT License. See [LICENSE](https://spdx.org/licenses/MIT.html) for more information.

<!-- CONTACT -->

## Contact

Petros Sidirokastritis - sidirope@gmail.com

Project Link: [https://github.com/ferrum-citadel/SLM-assignment](https://github.com/ferrum-citadel/SLM-assignment)
