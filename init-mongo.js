db.createUser({
    user: "john",
    pwd: "dianke001",
    roles:[
	{
	    role:"readWrite",
	    db:"db"
	}
   ]
});
