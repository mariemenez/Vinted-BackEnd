## vinted-frontend

[![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) 
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" />
          
This is the backend of the vinted replica 👗

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
