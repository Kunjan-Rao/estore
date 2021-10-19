# Bella is React and Node.js based eCommerce platform. React Shopping Cart.

Bella - Ecommerce Progressive Web Apps. Complete Solution.

### Installation

Install Mongodb(version > 4.0) and Node on the server.
In the project diretory, open the shell.

```shell
npm install -g nodemon
npm install 
npm run setup
```

Go to monogodb application's bin directory. e.g:C:\Program Files\MongoDB\Server\4.2\bin

Copy three json files(categories.json, item_info.json, products.json) in the db diretory to the monogodb application's bin directory.

Open the shell.

```shell
mongoimport --uri mongodb://<server ip address>:27017/bella_db --collection productCategories --file categories.json
mongoimport --uri mongodb://<server ip address>:27017/bella_db --collection products --file products.json
mongoimport --uri mongodb://<server ip address>:27017/bella_db --collection productItems --file item_info.json
```


```shell
npm run build
```

Don't close the shell.
Open the new shell.
- **Start application**

```shell
npm run start
```

