print('Start ##########################');

db.auth('john','dianke123');

db = db.getSiblingDB('db');


db.createUser({
    user: "user001",
    pwd: "dianke001",
    roles:[
	{
	    role:"readWrite",
	    db:"db"
	}
   ]
});

db.article.drop();

db.article.save( {
    title : "this is my title" , 
    author : "bob" , 
    posted : new Date(1079895594000) , 
    pageViews : 5 , 
    tags : [ "fun" , "good" , "fun" ] ,
    comments : [ 
        { author :"joe" , text : "this is cool" } , 
        { author :"sam" , text : "this is bad" } 
    ],
    other : { foo : 5 }
});

