## vinted-backend

 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="40"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" height="40"/>
          
This is the backend of the vinted replica 👗
You can check the frontend here ➡ https://cutt.ly/32W5C9M

### Routes :

#### Offer Routes 👕

##### Publish an offer 
"/offer/publish"
POST request

##### Delete an offer 
"/offer/delete"
DELETE request

##### Modify an offer 
"/offer/update"
PUT request

##### Get all offers and filter them
"/offers"
GET request

Type of filters : 
* price min
* price max
* by type (dress, shirt etc)
* price asc
* price desc

##### Get offer details with ID
"/offer/:id"


#### Offer Routes 🙋‍♂️

##### Signup 
"/user/signup"
POST request
required : email, username, password, newsletter

##### Log in
"/user/login"
POST request 
required : email, password
