var conn=require('./connection');
var express=require('express');
var app=express();
var path=require('path');
var bodyParser = require("body-parser");
var os=require('os');
var multer =require('multer');
const fileUpload = require('express-fileupload');
var session = require('express-session');
const nodemailer = require('nodemailer');
const { log } = require('console');
var port =process.env.PORT || 3000;
const sendMail =require('./controllers/sendMail');



			//middleware

app.set("view engine", "ejs");

const halfDay = 1000 * 60 * 60 * 12;
app.use(session({
	secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
	saveUninitialized: true,
	cookie: { maxAge: halfDay },
	resave: false
}));

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());




console.warn(path.join(__dirname, 'public'));

var mypath = path.join(__dirname, '..');

console.warn(mypath);
console.warn(path.join(__dirname, 'views'));


			// Routes









			            //get
// app.get("/",(req,res)=>{
// 	res.sendFile(__dirname+'/registration.html');

// });
app.get("/prepare123.html",(req,res)=>{
	
	// res.sendFile(__dirname + "/index.html");
	if (req.session.jobloggedin){

		// const newpath = path.join(mypath, "Quants");
		// console.log(path.join(mypath, "quants", "jobseeker.prepare.html"));
		res.sendFile(path.join(mypath, '/jobseeker.prepare.html'));

		console.log(path.join(mypath, '/jobseeker.prepare.html'));
	}
	else{
		res.render(path.join(__dirname, 'views', 'registration.ejs'));
	}

});
// C: \Users\niran\Downloads\Jobs_Daily_06_04_23\Jobs_Daily_06_04_23\allcompanydata



app.get("/ctsdata",(req,res)=>{
	res.sendFile(path.join(mypath, '/allcompanydata', '/cognizant.html'));
})

app.get("/companywise",(req,res)=>{
	res.sendFile(path.join(mypath, '/Quants', '/companywise.html'));
});


			// company wise Prepare
app.get("/cognizant.prepare",(req,res)=>{
	res.sendFile(path.join(mypath, '/allcompanydata', '/cognizant.html'));
});

app.get("/accenture.prepare",(req,res)=>{
	res.sendFile(path.join(mypath, '/allcompanydata', '/accenture.html'));
});
app.get("/amazon.prepare", (req, res) => {
	res.sendFile(path.join(mypath, '/allcompanydata', '/Amazon.html'));
})
app.get("/deloitte.prepare", (req, res) => {
	res.sendFile(path.join(mypath, '/allcompanydata', '/deloitte.html'));
})
app.get("/hcl.prepare", (req, res) => {
	res.sendFile(path.join(mypath, '/allcompanydata', '/hcl.html'));
})
app.get("/infosys.prepare", (req, res) => {
	res.sendFile(path.join(mypath, '/allcompanydata', '/infosys.html'));
})
app.get("/microsoft.prepare", (req, res) => {
	res.sendFile(path.join(mypath, '/allcompanydata', '/microsoft.html'));
});

app.get("/tcs.prepare", (req, res) => {
	res.sendFile(path.join(mypath, '/allcompanydata', '/tcs.html'));
});


app.get("/wipro.prepare", (req, res) => {
	res.sendFile(path.join(mypath, '/allcompanydata', '/wipro.html'));
});


app.get("/redington.prepare", (req, res) => {
	res.sendFile(path.join(mypath, '/allcompanydata', '/Redington.html'));
});

app.get("/Reasoning",(req,res)=>{
	res.sendFile(path.join(mypath, '/Quants', '/Reasoning.html'));

})
app.get("/Quants", (req, res) => {
	res.sendFile(path.join(mypath, '/Quants', '/Quants.html'));
})
app.get("/programming", (req, res) => {
	res.sendFile(path.join(mypath, '/Quants', '/programming.html'));
	
})
app.get("/verbal", (req, res) => {
	res.sendFile(path.join(mypath, '/Quants', '/verbal.html'));
})




app.get("/Quants/jobseeker.index.html",(req,res)=>{
	res.sendFile(path.join(mypath, '/jobseeker.index.html'));
})

app.post("/upload",(req,res)=>{

})

app.get("/company.html",(req,res)=>{
	if (req.session.jobloggedin){
		res.sendFile(path.join(mypath, '/company.html'));
	}
	else {
		res.render(path.join(__dirname, 'views', 'registration.ejs'));
	}
	
})

app.get("/aboutus.html",(req,res)=>{

	if (req.session.jobloggedin){
		res.sendFile(path.join(mypath, '/jobseeker.about.html'));
	}
	else{
		res.render(path.join(__dirname, 'views', 'registration.ejs'));
	}
	
	
})


app.get("/jobseeker.contact", (req, res) => {


	if (req.session.jobloggedin) {
		res.sendFile(path.join(mypath, '/jobseeker.contact.html'));
	}
	else {
		res.render(path.join(__dirname, 'views', 'registration.ejs'));
	}

})
app.get("/jobseeker.index.html",(req,res)=>{
	res.sendFile(path.join(mypath, '/jobseeker.index.html'));
})

app.get("/notification.html",(req,res)=>{

	if (req.session.jobloggedin) {
		conn.changeUser({ database: "post_job" }, function (err) { });



		conn.query('SELECT * FROM jobs', (err, rows) => {
			console.log(rows);
			if (err) {
				res.render(path.join(mypath, '/notification.ejs'), { result: '' })
			} else {
				res.render(path.join(mypath, '/notification.ejs'), { result: rows })
			}
		})
	}
	else {
		res.render(path.join(__dirname, 'views', 'registration.ejs'));
	}

	

})

app.get("/jobseeker.logout",(req,res)=>{
	req.session.destroy();
	res.render(path.join(__dirname, 'views', 'registration.ejs'));
})

app.get("/recruiter.logout",(req,res)=>{

	req.session.destroy();
	res.render(path.join(__dirname, 'views', 'registration.ejs'));
})


app.post('/login_data', (req, res, next)=>{

	var db = req.body.yoption;

	var mailid = req.body.mailid;

	var password = req.body.pass;

	console.log(mailid,password);
	conn.changeUser({ database: db }, function (err) { }); 

	if(mailid && password){

		conn.connect((err)=>{
			var sql = `SELECT * FROM login WHERE email= "${mailid}" AND password= "${password}"`;
			conn.query(sql, (err, data) => {

				// const value = (JSON.parse(data));
				// console.log(value.length);
				const value =JSON.parse(JSON.stringify(data));
				if (Object.keys(value).length > 0) {
					
					
					if (db == 'recruiter') {
						req.session.recloggedin = true;
						req.session.recusername = mailid;

						res.sendFile(path.join(mypath, '/recruiter.index.html'));
					}
					else {

						req.session.jobloggedin = true;
						req.session.jobusername = mailid;
						
						res.sendFile(path.join(mypath, '/jobseeker.index.html'));
					}

				}
				else {
					var message = "Incorrect Details";
					// console.log(message, data.length,sql,db);
					console.log(message);
					res.render(path.join(__dirname, 'views', 'registration.ejs'), { message: message });

				}
			})
		});
		
		
	}
	else{
		var message ="Please Enter Email Address and Password ";
		console.log(message);
		res.render(path.join(__dirname, 'views', 'registration.ejs'), { message: message });
	}

})

























app.get("/hiringpartner", (req, res) => {
	if (req.session.recloggedin){
		res.sendFile(path.join(mypath,'hiringpartner.html'));
	}
	else{
		res.render(path.join(__dirname, 'views', 'registration.ejs'));
	}
})


app.get("/recruiter.myprofile.ejs",(req,res)=>{

	if (req.session.recloggedin) {

		console.log(req.session.recusername);
		var value = req.session.recusername;
		conn.changeUser({ database: "recruiter" }, function (err) { });

		conn.connect((err) => {
			conn.query(`SELECT * FROM profile WHERE Office_mail= '${value}'`, (err, result) => {

				if (err) {
					res.render('recruiter.myprofile.ejs', { data: '' });
				}
				else {
					res.render('recruiter.myprofile.ejs', { data: result });
					console.warn(result);

				}
			})
		})
	}
	else {
		res.render(path.join(__dirname, 'views', 'registration.ejs'));
	}

	


	
})

app.get("/registration.html",(req,res)=>{
	
	res.render(path.join(__dirname, 'views','registration.ejs'));
	
})
 

// see
app.get("/BackEnd/registration.html",(req,res)=>{
	res.sendFile(path.join(__dirname + '/registration.html'));
})



app.get("/contactus.html",(req,res)=>{

	console.log(req.session.recloggedin);
	if (req.session.recloggedin) {
		res.sendFile(path.join(mypath, '/contactus.html'));
	}
	else {
		res.render(path.join(__dirname, 'views', 'registration.ejs'));
	}
	
})

app.get("/jobseeker.profile",(req,res)=>{
	
	if (req.session.jobloggedin) {
		res.render('jobseeker.profile.ejs');
	}
	else {
		res.render(path.join(__dirname, 'views', 'registration.ejs'));
	}

	

})
app.get("/jobpost.html",(req,res)=>{

	if (req.session.recloggedin) {
		res.sendFile(path.join(mypath, '/jobpost.html'));
	}
	else {
		res.render(path.join(__dirname, 'views', 'registration.ejs'));
	}
	

})

app.get("/recruiter.profile.ejs",(req,res)=>{
	if (req.session.recloggedin
) {
		res.render('recruiter.profile.ejs');
	}
	else {
		res.render(path.join(__dirname, 'views', 'registration.ejs'));
	}
	
	
})

app.get("/recruiter.index.html",(req,res)=>{
	res.sendFile(path.join(mypath, '/recruiter.index.html'));
})

app.get("/recruiter.about.html",(req,res)=>{
	if (req.session.recloggedin) {
		res.sendFile(path.join(mypath, '/recruiter.about.html'))
	}
	else {
		res.render(path.join(__dirname, 'views', 'registration.ejs'));
	}
	
})

app.get("/updatedetails",(req,res)=>{
	if (req.session.recloggedin) {
		res.render('recruiter.update.profile.ejs');
	}
	else {
		res.render(path.join(__dirname, 'views', 'registration.ejs'));
	}
	
})


app.get("/jobseeker.profile",(req,res)=>{

	if (req.session.username) {
		res.render('jobseeker.profile.ejs');
	}
	else {
		res.render(path.join(__dirname, 'views', 'registration.ejs'));
	}
	
})
// app.get("/test", (req, res) => {
// 	var name = "test";
// 	res.render("test.ejs", { name: name });
// })


app.get("/sendemail",(req,res)=>{

	if (req.session.username) {
		const mailid = req.body.mailid;
		const jobid = req.body.jobid;
		const jobname = req.body.jobname;
		const hrmail = req.body.hrmail;
		const myfile = req.body.myfile;



		// connect with the smtp
		let transporter = nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			auth: {
				user: 'roscoe.greenholt52@ethereal.email',
				pass: 'GdygrxgrYM148tGPkh'
			},
		});

		const mailBody = {
			from: mailid,
			to: hrmail,
			subject: "Job Application",
			html: "<h1>Hello World!</h1>",
			attachments: [
				{
					filename: myfile,
					// path: __dirname + '/sample_attachment.png',
				}
			]
		};



		transporter.sendMail(mailBody, function (error, info) {
			if (error) {
				console.log(error);
			}
			console.log(mailBody);
			console.log("Email with attachment delivered successfully");
			res.render(path.join(mypath, '/notification.ejs'));
		});

	}
	else {
		res.render(path.join(__dirname, 'views', 'registration.ejs'));
	}

	

});


app.post("/post_data", (req, res) => {

	// console.log(req.body);

	const user = req.body.user;
	const email = req.body.email;
	const password = req.body.password;
	const confirm = req.body.confirm;
	const option = req.body.color;

	conn.changeUser({ database: option }, function (err) {
		
	});
	conn.connect((err) => {

		var sql = `INSERT INTO login (	user, email , password) VALUES ("${user}","${email}","${password}")`;

		conn.query(sql,(err, result) => {
			if (option ==='recruiter'){
				res.render(path.join(mypath,'BackEnd','views','recruiter.profile.ejs'));
				
			} 
			else{
				res.render(path.join(mypath,'BackEnd', 'views', 'jobseeker.profile.ejs'));
			}

		});
	});

});


app.post("/job_post",(req,res)=>{

	const jobtitle= req.body.jobtitle;

	const jobid = req.body.jobid;

	const joblocation= req.body.jobloc;

	const skills= req.body.skills;

	const jobtype= req.body.jobtype;

	const jobcata= req.body.jobcata;

	const basicquali=req.body.basicquali;

	const preferqua= req.body.preferqua;

	const company = req.body.company;

	const recruiter = req.body.recruiter;

	const close =req.body.close;

	const sal =req.body.sal;

	const exp = req.body.exp;

	const db = "post_job";

	console.warn(req.body);

	conn.changeUser({ database: db }, function (err) {

	});
	conn.connect((err)=>{
		
		var sql = `insert into jobs (title , JobId , loc , skills , type , category , req , role , com_name , recruiter_mail , close , salary , experience) values ("${jobtitle}" , "${jobid }" ,"${joblocation}","${skills}" , "${jobtype}" , "${jobcata}" , "${basicquali}" , "${preferqua}" , "${company}" , "${recruiter}" , "${close}" , "${sal}" , "${exp}")`;

		conn.query(sql,(err,result)=>{
			res.sendFile(path.join(mypath, '/jobpost.html'));
		});
	})

});


app.post("/post_recruiter_profile",(req,res)=>{

	const fullname = req.body.fullname;

	const company = req.body.company;

	const mobile = req.body.mobile;

	const designation = req.body.designation;

	const officemail = req.body.officemail;

	const companylocation = req.body.companylocation;

	const comsize = req.body.comsize;

	const alternatephone = req.body.alternatephone;

	const alternateemail = req.body.alternateemail;

	const gender = req.body.gender;

	const birth = (req.body.dob);

	const prev_pos = req.body.prev;

	const yoe = req.body.yoe;

	const currcom = req.body.currcom;

	const govtid = req.files.govtid;


	const officeid = req.files.officeid;

	const photo = req.files.photo;

	const newdb = "recruiter";


	var message = "ok";
	

	console.warn(birth);

	// date2 = birth.split("-").reverse().join("-");


	conn.changeUser({ database: newdb}, function (err) {

	});

	if(!req.files){
		return res.status(400).send("No files uploaded");
	}
	

	if (photo.mimetype === "image/jpeg" || photo.mimetype === "image/jpg"){
		if (officeid.mimetype === 'application/pdf') {
			if (govtid.mimetype === 'application/pdf'){

				officeid.mv('public/images/uploaded_images/' + officeid.name, function (err) {});
				photo.mv('public/images/uploaded_images/' + photo.name, function (err) { });
				
				govtid.mv('public/images/uploaded_images/' + govtid.name, function (err){
					if (err)
						return res.status(500).send(err);
					var sql = `INSERT INTO profile (Full_Name, Company_Name, Mobile, Designation, Office_mail, Company_Loc , Company_Size ,Phone , Alternative_mail , Gender, DOB , previous_pos ,Experience ,  Previous_Company , GovtId , Office_Id , photo ) values("${fullname}" , "${company}" , "${mobile}" , "${designation}" ,"${officemail}" , "${companylocation}" , "${comsize}" ,"${alternatephone}" , "${alternateemail}" , "${gender}" , "${birth}" , "${prev_pos}" , "${yoe}" , "${currcom}" , "${govtid.name}" , "${officeid.name}" , "${photo.name}")`;

					conn.query(sql, (err, result) => {
						console.log(req.files.govtid.name);
						res.sendFile(path.join(mypath, '/recruiter.index.html'));
					});


				});

				
				

				
			}
			else{
				message = "This format is not allowed , please upload file with '.pdf' ";
				console.warn(message);
				res.render('recruiter.profile.ejs', { message: message });
			}

		}
		else {
			message = "This format is not allowed , please upload file with '.pdf' ";
			res.render('recruiter.profile.ejs', { message: message });
		}

	}
	else{
		message = "This format is not allowed , please upload file with '.jpg' , '.jpeg' ";
		res.render('recruiter.profile.ejs', { message: message });
	}

});




app.post("/updaterecruiter",(req,res)=>{
	const fullname = req.body.fullname;

	const company = req.body.company;

	const mobile = req.body.mobile;

	const designation = req.body.designation;

	const officemail = req.body.officemail;

	const companylocation = req.body.companylocation;

	const comsize = req.body.comsize;

	const alternatephone = req.body.alternatephone;

	const alternateemail = req.body.alternateemail;

	const gender = req.body.gender;

	const birth = (req.body.dob);

	const prev_pos = req.body.prev;

	const yoe = req.body.yoe;

	const currcom = req.body.currcom;

	const govtid = req.files.govtid;


	const officeid = req.files.officeid;

	const photo = req.files.photo;

	const newdb = "recruiter";


	var message = "ok";


	console.warn(birth);

	// date2 = birth.split("-").reverse().join("-");


	conn.changeUser({ database: newdb }, function (err) {

	});

	if (!req.files) {
		return res.status(400).send("No files uploaded");
	}


	if (photo.mimetype === "image/jpeg" || photo.mimetype === "image/jpg") {
		if (officeid.mimetype === 'application/pdf') {
			if (govtid.mimetype === 'application/pdf') {

				officeid.mv('public/images/uploaded_images/' + officeid.name, function (err) { });
				photo.mv('public/images/uploaded_images/' + photo.name, function (err) { });

				govtid.mv('public/images/uploaded_images/' + govtid.name, function (err) {
					if (err)
						return res.status(500).send(err);
					var sql = `UPDATE profile SET Full_Name=, Company_Name, Mobile, Designation, Office_mail, Company_Loc , Company_Size ,Phone , Alternative_mail , Gender, DOB , previous_pos ,Experience ,  Previous_Company , GovtId , Office_Id , photo ) values("${fullname}" , "${company}" , "${mobile}" , "${designation}" ,"${officemail}" , "${companylocation}" , "${comsize}" ,"${alternatephone}" , "${alternateemail}" , "${gender}" , "${birth}" , "${prev_pos}" , "${yoe}" , "${currcom}" , "${govtid.name}" , "${officeid.name}" , "${photo.name}")`;

					conn.query(sql, (err, result) => {
						console.log(req.files.govtid.name);
						res.sendFile(path.join(mypath, '/recruiter.index.html'));
					});


				});





			}
			else {
				message = "This format is not allowed , please upload file with '.pdf' ";
				console.warn(message);
				res.render('recruiter.profile.ejs', { message: message });
			}

		}
		else {
			message = "This format is not allowed , please upload file with '.pdf' ";
			res.render('recruiter.profile.ejs', { message: message });
		}

	}
	else {
		message = "This format is not allowed , please upload file with '.jpg' , '.jpeg' ";
		res.render('recruiter.profile.ejs', { message: message });
	}

});

app.post("/updaterecruiter",(req,res)=>{

	const fullname = req.body.fullname;
	
})

// app.post("/jobseeker_data",(req,res)=>{

// })
// app.post("/",(req,res)=>{

// 	res.sendFile(path.join(mypath, '/recruiter.index.html'));
// })









// server

app.listen(port,(err)=>{
	if(err)
		console.log(`error is ${err}`);
	console.log(`Server running at port ${port}`);
});