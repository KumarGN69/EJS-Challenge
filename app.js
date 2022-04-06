//jshint esversion:6

const port = process.env.PORT || 3000;
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const posts =[];
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



//GET route
app.get("/", function(req,res){
	// ejs function render with the name of the ejs file and options
	
	const pageToBeRendered = "home";
	const options = {
		homePageHeading:"Home",
		startPageContent:homeStartingContent,
		posts:posts
	}
	// res.render(pageToBeRendered,options);
	// console.log("Here");
	res.render(pageToBeRendered,options);
});

//GET about ROUTE
app.get("/about", function(req,res){
	// ejs function render with the name of the ejs file and options
	
	const pageToBeRendered = "about";
	const options = {
		aboutPageHeading:"About",
		aboutPageContent:aboutContent
	}
	res.render(pageToBeRendered,options);
});

//GET contact ROUTE
app.get("/contact", function(req,res){
	// ejs function render with the name of the ejs file and options
	
	// console.log(req.url);
	const pageToBeRendered = "contact";
	const options = {
		contactPageHeading:"Contact",
		contactPageContent:contactContent
	}
	res.render(pageToBeRendered,options);
});

app.get("/compose", function(req, res){
	
	const pageToBeRendered = "compose";
	const options = {
		composePageHeading:"Compose",
		topicTitle:"Title",
		bodyTitle:"Post"
	}	
	res.render(pageToBeRendered,options);
})

//POST Route for Compose
app.post("/compose", function(req,res){
	
	const post ={
		title: req.body.postTitle , 
		content: req.body.postBody
	};
	
	posts.push(post);
	// console.log(posts);
	// console.log(posts[0]);
	res.redirect("/");
});


app.get("/posts/:topic",function(req,res){
	// console.log(req.params.topic);
	for(let i=0;i<posts.length;i++){
		console.log(req.params.topic);
		if(posts[i].title.toLowerCase() === req.params.topic.toLowerCase()){
			console.log("Match found!");
		}else{
			console.log("No Match!");
		}
	}
});



app.listen(port, function() {
  console.log("Server started on port 3000");
});
