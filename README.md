# Hotels-Clone-App
## Description
Full Stack application allowing users to look up and reserve hotels from many different locations based on predefined options.

## Installation
### Backend
- Create a free tier cluster from MongoDB
- Create .env file containing these two variables

    ```MONGO = mongo+srv://<user>:<pass>@<host>:<port>/<database>?<connection options>```
    
    ```JWT = <your_secret_key>```
- Run `npm install`
- Run `npm start`
- (Optional) Import *Hotels-booking.postman_collection.json* to see available APIs

### Frontend
- Run `npm install`
- Run `npm start`

### Screenshots
<details>
  <summary>Open to View Images</summary>
  
  ### Default search with date and custom options
  <img alt="Default" src="https://i.imgur.com/zSArG1F.png" />
  
  ### Main page including features and property types
  <img alt="Main_Page" src="https://i.imgur.com/jhPufwV.jpg" />

  ### Search Result page with cutomizable fields
  <img alt="Search" src="https://i.imgur.com/W9n8Pxm.jpg" />
  
  ### Hotels details and image carousel
  <img alt="" src="https://i.imgur.com/deO2UFp.jpg" />
  <img alt="alt_text" src="https://i.imgur.com/ckVbH4T.png" />

  ### Login and register pages
  <img alt="alt_text" src="https://i.imgur.com/Z5gIvjc.jpg" />
</details>

### Known bug(s)
1. Reservation button for a hotel does not function
2. Create account not alowing input
3. Resevation button cause error when navigated from "Featured Properties" (date context error)
4. Browse by type not working
