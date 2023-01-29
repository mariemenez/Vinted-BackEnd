## vinted-backend

 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="40"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" height="40"/>
          
This is the backend of the vinted replica 👗 <br/>
You can check the frontend here ➡ https://cutt.ly/32W5C9M

### Offer Routes 👕

#### Publish an offer 
"/offer/publish"<br/>
POST request

#### Delete an offer 
"/offer/delete"<br/>
DELETE request

#### Modify an offer 
"/offer/update"<br/>
PUT request

#### Get all offers and filter them
"/offers"<br/>
GET request

Type of filters : 
* price min
* price max
* by type (dress, shirt etc)
* price asc
* price desc

#### Get offer details with ID
"/offer/:id"


### Offer Routes 🙋‍♂️

#### Signup 
"/user/signup"<br/>
POST request<br/>
required : email, username, password, newsletter

#### Log in
"/user/login"<br/>
POST request <br/>
required : email, password
