# Learner

Requirements
------------
1. You have nodejs in your system
2. You also need mongodb in your system or you can use online mongodb database.

Installation
------------
first thing download the repo in your system, there is two way to do this
1. Download the zip file and extract it
2. you can clone this by given command (but make sure you have git installed)
```
git clone https://github.com/NorinMp143/Learner.git
```
after downloading the repo, now we need to download all packages. For that just open terminal or cmd and move to the project directory and then type below command
```
npm install
```
after this, you need to setup our database, follow these command given below
```
// to start mongo shell
$ mongo
// to create database for our project type
> use learner
// above command give output -> switched to db learner
```
now we need to add data to our database so you can use my dump data or you can your own, let check one by one
1. use my dump data
```
//to restore my dump data use this command in your project directory
mongorestore --db=learner database_files/learner/
```
2. use your own data
to use your own data, my project need three collections "classes", "instructors", "students", "users". To create these follow below commands
```
//inside the mongo shell
> db.createCollection( "users" )
> db.createCollection( "classes" )
> db.createCollection( "instructors" )
> db.createCollection( "students" )

In "classes" collection,we have below structure of model
{
  title:{
    type:String
  },
  description:{
    type:String
  },
  instructor:{
    type:String
  },
  lessons:[{
    lesson_number:{type:Number},
    lesson_title:{type:String},
    lesson_body:{type:String}
  }]
}

// insert your own data to classes
> db.classes.insertMany([
   { title : "Intro to HTML", description : "HTML was developed with the intent of defining the structure of documents like headings, paragraphs, lists, and so forth to facilitate the sharing of scientific information between researchers. Now, HTML is being widely used to format web pages with the help of different tags available in HTML language.", instructor : "Madan Lal" }
   { title : "Intro to JavaScript", description : "JavaScript is a lightweight, interpreted programming language. It is designed for creating network-centric applications. It is complimentary to and integrated with Java. JavaScript is very easy to implement because it is integrated with HTML. It is open and cross-platform.", instructor : "Madan Lal" }
   { title : "Intro to Node.js", description : "Node.js is a very powerful JavaScript-based platform built on Google Chrome's JavaScript V8 Engine. It is used to develop I/O intensive web applications like video streaming sites, single-page applications, and other web applications. Node.js is open source, completely free, and used by thousands of developers around the world.", instructor : "Twinkle Chawla" }
])
```
<strong>Now you successfully done the installation part.</strong>
Lets, start project by
```
npm start
```
