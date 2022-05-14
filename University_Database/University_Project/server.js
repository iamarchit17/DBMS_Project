var http = require('http')
var url = require('url')
var db = require('./mysql')

const port = 3000;

var server=http.createServer(function(request, response) {

    response.writeHead(200, { 'Content-Type': 'text/html' }); 

    const q = url.parse(request.url, true); 
  
    const path = q.pathname;

    if (path === '/') {
    	
    	response.write("<style> h1{text-align: center;}</style>");
        response.write("<h1>University Database</h1>");
        response.write('<a href=\"/branch-details\" target="_blank"> Branches Offered in our University </a><br>');
        response.write('<a href=\"/search-student\" target="_blank"> Students </a><br>');
        response.write('<a href=\"/faculty\" target="_blank"> Faculty </a><br>');
        response.write('<a href=\"/hostel-details\" target="_blank"> Hostel Facilities </a><br>');
        response.write('<a href=\"/mess-details\" target="_blank"> Mess Facilities </a><br>');
        response.write('<a href=\"/clubs\" target="_blank"> Clubs </a><br>');
        response.write('<a href=\"/library\" target="_blank"> Library </a><br>');
        response.write('<a href=\"/student-hostel-details\" target="_blank"> Student-Hostel Details </a><br>');
        response.write('<a href=\"/student-mess-details\" target="_blank"> Student-Mess Details </a><br>');  
        response.end();
    } else if(path === '/branch-details') {
    	
    	db.query("select * from `Branch`", [], function(err, results){
    		if(!err){
    			response.write("<style> table, th, td{border: 1px solid black; border-collapse: collapse;} </style>");
    			response.write("<style> h1,h3, th, td{text-align: center;}</style>");
    			response.write('<style> table.center{margin-left: auto; margin-right: auto;}</style>');
    			response.write("<h1> Branches Offered </h1>");
    			response.write('<p>' + results.length + ' Records</p>');
    			response.write('<table class="center"><tr><th>Branch Name</th><th>Duration (in Years)</th><th>Number of Courses</th></tr>');
    			for(var i = 0; i < results.length; i++){
					response.write("<tr><td>"+results[i].Branch_Name+"</td><td>"+results[i].Duration_in_Years+"</td><td>"+results[i].Number_Of_Courses+"</td></tr>");    			
    			}
    			response.write("</table>");
    			response.end('<br><br> <h3> See Branch and Course Details <a href="/branch-course-details"> here </a></h3>');
    		} else {
    			response.end('<img src ="https://img.freepik.com/free-vector/error-page-page-found-something-went-wrong-template-design-error-message_219593-25.jpg?w=2000" style="width:2000px;height:900px;">');
    		}
    	})
    } else if(path === '/branch-course-details'){
    	response.write("<style> table, th, td{border: 1px solid black; border-collapse: collapse;} </style>");
	response.write("<style> h1, h2,h3,  th, td{text-align: center;}</style>");
	response.write('<style> table.center{margin-left: auto; margin-right: auto;}</style>');
    	response.write('<h1> Branch and Course Details </h1>');
    	
    	const branch = q.query['branch'];
    	
    	if(!branch){
			response.write('<form action="/branch-course-details"><label for="branch"> Branch:</label> <select name="branch" multiple><option selected disabled hidden> Choose here</option>');
								
			db.query("select `Branch_Name` from `Branch` order by `Branch_Name`", [], function(err, results){			
				if(!err){
					for(var i = 0; i < results.length; i++){
						response.write('<option value="'+results[i].Branch_Name+'">'+results[i].Branch_Name+'</option>');
					}
					
					response.write('</select><br><br>');
					
					response.end('<input type="submit" value="Submit"></form>');
					
				} else {
					console.log(err);
					response.end();
				}
			})
		} else {
			
			db.query("select Branch_Name, Course_Name from `Branch` natural join `Branch_Has_Course` natural join `Course` where `Branch_Name` in (?) order by `Branch_Name`, `Course_Name`", [branch], function(err, results){
				if(!err){
					if(results.length === 0){
					 	response.end('<h2> No Records Found </h2>');
					} else {
						response.write('<p>' + results.length + ' Records</p>');
						response.write('<table class="center"><tr><th>Branch Name</th><th>Course Name</th></tr>');
						for(var i = 0; i < results.length; i++){
							
							response.write("<tr><td>"+results[i].Branch_Name+"</td><td>"+results[i].Course_Name+"</td></tr>");    			
						}
						response.end("</table>");
					}
				} else {
					console.log(err);
					response.end('<img src ="https://img.freepik.com/free-vector/error-page-page-found-something-went-wrong-template-design-error-message_219593-25.jpg?w=2000" style="width:2000px;height:900px;">');
					
				}
			})		
		}
    } else if(path === '/search-student'){
    	response.write("<style> table, th, td{border: 1px solid black; border-collapse: collapse;} </style>");
		response.write("<style> h1, h2,h3,  th, td{text-align: center;}</style>");
		response.write('<style> table.center{margin-left: auto; margin-right: auto;}</style>');
    	response.write('<h1> Student Details </h1>');
    		
    		const attr1 = q.query['attr1'];
    	
			if(!attr1){
				response.write('<form action="/search-student"> <label for="Property"> Search Student by: </label> <select name="attr1" ><option selected disabled hidden> Choose here</option> <option value="sid"> Student ID </option><option value="bb"> Branch and Batch </option><option value="gender"> Gender </option><option value="city"> City </option><option value="state"> State </option></select><br><br><input type="submit" value="Submit"></select><br><br></form>');
				response.write('<h3> Add Student Details <a href=\"/add-student\" target="_blank"> here </a> </h3>');
				response.end('<h3> Delete Student Details <a href=\"/delete-student-data\" target="_blank"> here </a> </h3>');
			} else if(attr1 === 'sid') {
				const idStr = q.query['id'];
				const id = parseInt(idStr);
				
				if(!id){
					response.end('<form action="/search-student"> <label for="Property"> Search Student by: </label> <select name="attr1" ><option selected disabled hidden> Choose here</option> <option value="sid" selected> Student ID </option><option value="bb"> Branch and Batch </option><option value="gender"> Gender </option><option value="city"> City </option><option value="state"> State </option></select><br><br><label for="id"> Enter Student ID:</label><input type="text" name="id"><br><br><input type="submit" value="Submit"></select><br><br></form>');
				} else {
				
					db.query("select * from `Student_Name` natural join `Student` natural join `Student_Branch` natural join `Student_Address` natural join `Student_Parents` where `StudentID` = ?", [id], function(err, results){
						if(!err){
							if(results.length === 0){
							 	response.end('<h2> No Records Found </h2>');
							}
							else {
								response.write('<p>' + results.length + ' Records</p>');
								response.write('<table class="center"><tr><th>Student ID</th><th>Student Name</th><th>Date of Birth</th><th>Gender</th><th>Batch</th><th>Branch</th><th>Father</th><th>Mother</th><th>Address</th></tr>');
								for(var i = 0; i < results.length; i++){
									const date = results[i].Date_Of_Birth.toJSON().slice(0,10);
									response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+date+"</td><td>"+results[i].Gender+"</td><td>"+results[i].Batch+"</td><td>"+results[i].Branch_Name+"</td><td>"+results[i].Father+"</td><td>"+results[i].Mother+"</td><td>"+results[i].Street+", "+results[i].City+", "+results[i].State+", Pincode: "+results[i].Postal_Code+"</td></tr>");    			
								}
								response.end("</table>");
								
							}
						} else {
							response.end();
						}
					})
				}
			} else if(attr1 === 'city'){
				
				const value = q.query['cit'];
				
				if(!value){
					response.end('<form action="/search-student"> <label for="Property"> Search Student by: </label> <select name="attr1" ><option selected disabled hidden> Choose here</option> <option value="sid"> Student ID </option><option value="bb"> Branch and Batch </option><option value="gender"> Gender </option><option value="city" selected> City </option><option value="state"> State </option></select><br><br><label for="cit"> Enter City:</label><input tpye="text" name="cit"><br><br><input type="submit" value="Submit"></form>');
				} else {
					db.query("select * from `Student_Name` natural join `Student` natural join `Student_Branch` natural join `Student_Address` natural join `Student_Parents` where `City` = ?", [value], function(err, results){
						if(!err){
							if(results.length === 0){
							 	response.end('<h2> No Records Found </h2>');
							} else {
								response.write('<p>' + results.length + ' Records</p>');
								response.write('<table class="center"><tr><th>Student ID</th><th>Student Name</th><th>Date of Birth</th><th>Gender</th><th>Batch</th><th>Branch</th><th>Father</th><th>Mother</th><th>Address</th></tr>');
								for(var i = 0; i < results.length; i++){
									const date = results[i].Date_Of_Birth.toJSON().slice(0,10);
									response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+date+"</td><td>"+results[i].Gender+"</td><td>"+results[i].Batch+"</td><td>"+results[i].Branch_Name+"</td><td>"+results[i].Father+"</td><td>"+results[i].Mother+"</td><td>"+results[i].Street+", "+results[i].City+", "+results[i].State+", Pincode: "+results[i].Postal_Code+"</td></tr>");    			
								}
								response.end("</table>");
							}
						} else {
							response.end('<img src ="https://img.freepik.com/free-vector/error-page-page-found-something-went-wrong-template-design-error-message_219593-25.jpg?w=2000" style="width:2000px;height:900px;">');
							
						}
					})
				}
			} else if(attr1 === 'bb'){
				
				const branch = q.query['branch'];
				const batch = q.query['batch'];
				const gen = q.query['gen'];
				
				if(!branch || !batch || !gen){
					response.write('<form action="/search-student"> <label for="Property"> Search Student by: </label> <select name="attr1" ><option selected disabled hidden> Choose here</option> <option value="sid"> Student ID </option><option value="bb" selected> Branch and Batch </option><option value="gender"> Gender </option><option value="city"> City </option><option value="state"> State </option></select><br><br>');
					response.write('<label for="batch"> Batch:</label> <select name="batch" multiple><option selected disabled hidden> Choose here</option><option value="all"> All </option>');
					db.query("select `Year` from `Batch` order by `Year`", [], function(err, results){	
				
						if(!err){
							for(var i = 0; i < results.length; i++){
								response.write('<option value="'+results[i].Year+'">'+results[i].Year+'</option>');
							}
							response.write('</select><br><br><label for="branch"> Branch:</label> <select name="branch" multiple><option selected disabled hidden> Choose here</option><option value="all"> All </option>');
							
							db.query("select `Branch_Name` from `Branch` order by `Branch_Name`", [], function(err, results){			
								if(!err){
									for(var i = 0; i < results.length; i++){
										response.write('<option value="'+results[i].Branch_Name+'">'+results[i].Branch_Name+'</option>');
									}
									
									response.write('</select><br><br><label for="gen"> Gender:</label> <select name="gen" multiple><option selected disabled hidden> Choose here</option><option value="all"> All </option><option value="male"> Male </option><option value="female"> Female </option><option value="others"> Others</option></select><br><br>');
									
									response.end('<input type="submit" value="Submit"></form>');
									
								} else {
									console.log(err);
									response.end();
								}
							})	
							
						} else {
							console.log(err);
							response.end();
						}
					})
					
				} else {
					if(batch.includes("all")){
						if(branch.includes("all")){
							if(gen.includes("all")){
								db.query("select * from `Student_Name` natural join `Student` natural join `Student_Branch` natural join `Student_Address` natural join `Student_Parents` ", [gen], function(err, results){
									if(!err){
										if(results.length === 0){
										 	response.end('<h2> No Records Found </h2>');
										} else {
											response.write('<p>' + results.length + ' Records</p>');
											response.write('<table class="center"><tr><th>Student ID</th><th>Student Name</th><th>Date of Birth</th><th>Gender</th><th>Batch</th><th>Branch</th><th>Father</th><th>Mother</th><th>Address</th></tr>');
											for(var i = 0; i < results.length; i++){
												const date = results[i].Date_Of_Birth.toJSON().slice(0,10);
												response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+date+"</td><td>"+results[i].Gender+"</td><td>"+results[i].Batch+"</td><td>"+results[i].Branch_Name+"</td><td>"+results[i].Father+"</td><td>"+results[i].Mother+"</td><td>"+results[i].Street+", "+results[i].City+", "+results[i].State+", Pincode: "+results[i].Postal_Code+"</td></tr>");    			
											}
											response.end("</table>");
										}
									} else {
										response.end('<img src ="https://img.freepik.com/free-vector/error-page-page-found-something-went-wrong-template-design-error-message_219593-25.jpg?w=2000" style="width:2000px;height:900px;">');
										
									}
								})
							} else {
								db.query("select * from `Student_Name` natural join `Student` natural join `Student_Branch` natural join `Student_Address` natural join `Student_Parents` where `Gender` in (?)", [gen], function(err, results){
									if(!err){
										if(results.length === 0){
										 	response.end('<h2> No Records Found </h2>');
										} else {
											response.write('<p>' + results.length + ' Records</p>');
											response.write('<table class="center"><tr><th>Student ID</th><th>Student Name</th><th>Date of Birth</th><th>Gender</th><th>Batch</th><th>Branch</th><th>Father</th><th>Mother</th><th>Address</th></tr>');
											for(var i = 0; i < results.length; i++){
												const date = results[i].Date_Of_Birth.toJSON().slice(0,10);
												response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+date+"</td><td>"+results[i].Gender+"</td><td>"+results[i].Batch+"</td><td>"+results[i].Branch_Name+"</td><td>"+results[i].Father+"</td><td>"+results[i].Mother+"</td><td>"+results[i].Street+", "+results[i].City+", "+results[i].State+", Pincode: "+results[i].Postal_Code+"</td></tr>");    			
											}
											response.end("</table>");
										}
									} else {
										response.end('<img src ="https://img.freepik.com/free-vector/error-page-page-found-something-went-wrong-template-design-error-message_219593-25.jpg?w=2000" style="width:2000px;height:900px;">');
										
									}
								})
							}
						} else {
							if(gen.includes("all")){
								db.query("select * from `Student_Name` natural join `Student` natural join `Student_Branch` natural join `Student_Address` natural join `Student_Parents` where `Branch_Name` in (?) order by `Branch_Name`", [branch], function(err, results){
									if(!err){
										if(results.length === 0){
										 	response.end('<h2> No Records Found </h2>');
										} else {
											response.write('<p>' + results.length + ' Records</p>');
											response.write('<table class="center"><tr><th>Student ID</th><th>Student Name</th><th>Date of Birth</th><th>Gender</th><th>Batch</th><th>Branch</th><th>Father</th><th>Mother</th><th>Address</th></tr>');
											for(var i = 0; i < results.length; i++){
												const date = results[i].Date_Of_Birth.toJSON().slice(0,10);
												response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+date+"</td><td>"+results[i].Gender+"</td><td>"+results[i].Batch+"</td><td>"+results[i].Branch_Name+"</td><td>"+results[i].Father+"</td><td>"+results[i].Mother+"</td><td>"+results[i].Street+", "+results[i].City+", "+results[i].State+", Pincode: "+results[i].Postal_Code+"</td></tr>");    			
											}
											response.end("</table>");
										}
									} else {
										console.log(err);
										response.end('<img src ="https://img.freepik.com/free-vector/error-page-page-found-something-went-wrong-template-design-error-message_219593-25.jpg?w=2000" style="width:2000px;height:900px;">');
										
									}
								})
							} else {
								db.query("select * from `Student_Name` natural join `Student` natural join `Student_Branch` natural join `Student_Address` natural join `Student_Parents` where (`Gender` in (?) and `Branch_Name` in (?)) order by `Branch_Name`, `Gender`", [gen, branch], function(err, results){
									if(!err){
										if(results.length === 0){
										 	response.end('<h2> No Records Found </h2>');
										} else {
											response.write('<p>' + results.length + ' Records</p>');
											response.write('<table class="center"><tr><th>Student ID</th><th>Student Name</th><th>Date of Birth</th><th>Gender</th><th>Batch</th><th>Branch</th><th>Father</th><th>Mother</th><th>Address</th></tr>');
											for(var i = 0; i < results.length; i++){
												const date = results[i].Date_Of_Birth.toJSON().slice(0,10);
												response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+date+"</td><td>"+results[i].Gender+"</td><td>"+results[i].Batch+"</td><td>"+results[i].Branch_Name+"</td><td>"+results[i].Father+"</td><td>"+results[i].Mother+"</td><td>"+results[i].Street+", "+results[i].City+", "+results[i].State+", Pincode: "+results[i].Postal_Code+"</td></tr>");    			
											}
											response.end("</table>");
										}
									} else {
										response.end('<img src ="https://img.freepik.com/free-vector/error-page-page-found-something-went-wrong-template-design-error-message_219593-25.jpg?w=2000" style="width:2000px;height:900px;">');
										
									}
								})
							}
						}
						
					} else {
						if(branch.includes("all")){
							if(gen.includes("all")){
								db.query("select * from `Student_Name` natural join `Student` natural join `Student_Branch` natural join `Student_Address` natural join `Student_Parents` where `Batch` in (?) order by `Batch`", [batch], function(err, results){
									if(!err){
										if(results.length === 0){
										 	response.end('<h2> No Records Found </h2>');
										} else {
											response.write('<p>' + results.length + ' Records</p>');
											response.write('<table class="center"><tr><th>Student ID</th><th>Student Name</th><th>Date of Birth</th><th>Gender</th><th>Batch</th><th>Branch</th><th>Father</th><th>Mother</th><th>Address</th></tr>');
											for(var i = 0; i < results.length; i++){
												const date = results[i].Date_Of_Birth.toJSON().slice(0,10);
												response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+date+"</td><td>"+results[i].Gender+"</td><td>"+results[i].Batch+"</td><td>"+results[i].Branch_Name+"</td><td>"+results[i].Father+"</td><td>"+results[i].Mother+"</td><td>"+results[i].Street+", "+results[i].City+", "+results[i].State+", Pincode: "+results[i].Postal_Code+"</td></tr>");    			
											}
											response.end("</table>");
										}
									} else {
										response.end('<img src ="https://img.freepik.com/free-vector/error-page-page-found-something-went-wrong-template-design-error-message_219593-25.jpg?w=2000" style="width:2000px;height:900px;">');
										
									}
								})
							} else {
								db.query("select * from `Student_Name` natural join `Student` natural join `Student_Branch` natural join `Student_Address` natural join `Student_Parents` where `Gender` in (?) and `Batch` in (?) order by `Batch`, `Gender`", [gen, batch], function(err, results){
									if(!err){
										if(results.length === 0){
										 	response.end('<h2> No Records Found </h2>');
										} else {
											response.write('<p>' + results.length + ' Records</p>');
											response.write('<table class="center"><tr><th>Student ID</th><th>Student Name</th><th>Date of Birth</th><th>Gender</th><th>Batch</th><th>Branch</th><th>Father</th><th>Mother</th><th>Address</th></tr>');
											for(var i = 0; i < results.length; i++){
												const date = results[i].Date_Of_Birth.toJSON().slice(0,10);
												response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+date+"</td><td>"+results[i].Gender+"</td><td>"+results[i].Batch+"</td><td>"+results[i].Branch_Name+"</td><td>"+results[i].Father+"</td><td>"+results[i].Mother+"</td><td>"+results[i].Street+", "+results[i].City+", "+results[i].State+", Pincode: "+results[i].Postal_Code+"</td></tr>");    			
											}
											response.end("</table>");
										}
									} else {
										response.end('<img src ="https://img.freepik.com/free-vector/error-page-page-found-something-went-wrong-template-design-error-message_219593-25.jpg?w=2000" style="width:2000px;height:900px;">');
										
									}
								})
							}
						} else {
							if(gen.includes("all")){
								db.query("select * from `Student_Name` natural join `Student` natural join `Student_Branch` natural join `Student_Address` natural join `Student_Parents` where `Branch_Name` in (?) and `Batch` in (?) order by `Branch_Name`, `Batch`", [branch, batch], function(err, results){
									if(!err){
										if(results.length === 0){
										 	response.end('<h2> No Records Found </h2>');
										} else {
											response.write('<p>' + results.length + ' Records</p>');
											response.write('<table class="center"><tr><th>Student ID</th><th>Student Name</th><th>Date of Birth</th><th>Gender</th><th>Batch</th><th>Branch</th><th>Father</th><th>Mother</th><th>Address</th></tr>');
											for(var i = 0; i < results.length; i++){
												const date = results[i].Date_Of_Birth.toJSON().slice(0,10);
												response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+date+"</td><td>"+results[i].Gender+"</td><td>"+results[i].Batch+"</td><td>"+results[i].Branch_Name+"</td><td>"+results[i].Father+"</td><td>"+results[i].Mother+"</td><td>"+results[i].Street+", "+results[i].City+", "+results[i].State+", Pincode: "+results[i].Postal_Code+"</td></tr>");    			
											}
											response.end("</table>");
										}
									} else {
										console.log(err);
										response.end('<img src ="https://img.freepik.com/free-vector/error-page-page-found-something-went-wrong-template-design-error-message_219593-25.jpg?w=2000" style="width:2000px;height:900px;">');
										
									}
								})
							} else {
								db.query("select * from `Student_Name` natural join `Student` natural join `Student_Branch` natural join `Student_Address` natural join `Student_Parents` where (`Gender` in (?) and `Branch_Name` in (?) and `Batch` in (?)) order by `Branch_Name`, `Batch`, `Gender`", [gen, branch, batch], function(err, results){
									if(!err){
										if(results.length === 0){
										 	response.end('<h2> No Records Found </h2>');
										} else {
											response.write('<p>' + results.length + ' Records</p>');
											response.write('<table class="center"><tr><th>Student ID</th><th>Student Name</th><th>Date of Birth</th><th>Gender</th><th>Batch</th><th>Branch</th><th>Father</th><th>Mother</th><th>Address</th></tr>');
											for(var i = 0; i < results.length; i++){
												const date = results[i].Date_Of_Birth.toJSON().slice(0,10);
												response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+date+"</td><td>"+results[i].Gender+"</td><td>"+results[i].Batch+"</td><td>"+results[i].Branch_Name+"</td><td>"+results[i].Father+"</td><td>"+results[i].Mother+"</td><td>"+results[i].Street+", "+results[i].City+", "+results[i].State+", Pincode: "+results[i].Postal_Code+"</td></tr>");    			
											}
											response.end("</table>");
										}
									} else {
										response.end('<img src ="https://img.freepik.com/free-vector/error-page-page-found-something-went-wrong-template-design-error-message_219593-25.jpg?w=2000" style="width:2000px;height:900px;">');
										
									}
								})
							}
						}
					}
				}
				
	
			} else if(attr1 === 'gender'){
			
				const gen = q.query['gen'];
				
				if(!gen){
					response.end('<form action="/search-student"> <label for="Property"> Search Student by: </label> <select name="attr1" ><option selected disabled hidden> Choose here</option> <option value="sid"> Student ID </option><option value="bb"> Branch and Batch </option><option value="gender" selected> Gender </option><option value="city"> City </option><option value="state"> State </option></select><br><br><label for="gen"> Gender:</label> <select name="gen" multiple><option selected disabled hidden> Choose here</option> <option value="male"> Male </option><option value="female"> Female </option><option value="others"> Others</option></select><br><br><input type="submit" value="Submit"></select><br><br></form>');
				} else {
				
					db.query("select * from `Student_Name` natural join `Student` natural join `Student_Branch` natural join `Student_Address` natural join `Student_Parents` where `Gender` in (?) order by Gender", [gen], function(err, results){
						if(!err){
							if(results.length === 0){
							 	response.end('<h2> No Records Found </h2>');
							} else {
								response.write('<p>' + results.length + ' Records</p>');
								response.write('<table class="center"><tr><th>Student ID</th><th>Student Name</th><th>Date of Birth</th><th>Gender</th><th>Batch</th><th>Branch</th><th>Father</th><th>Mother</th><th>Address</th></tr>');
								for(var i = 0; i < results.length; i++){
									const date = results[i].Date_Of_Birth.toJSON().slice(0,10);
									response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+date+"</td><td>"+results[i].Gender+"</td><td>"+results[i].Batch+"</td><td>"+results[i].Branch_Name+"</td><td>"+results[i].Father+"</td><td>"+results[i].Mother+"</td><td>"+results[i].Street+", "+results[i].City+", "+results[i].State+", Pincode: "+results[i].Postal_Code+"</td></tr>");    			
								}
								response.end("</table>");
							}
						} else {
							response.end('<img src ="https://img.freepik.com/free-vector/error-page-page-found-something-went-wrong-template-design-error-message_219593-25.jpg?w=2000" style="width:2000px;height:900px;">');
							
						}
					})
				}
				
			} else if(attr1 === 'state'){
				
				const stateSet = q.query['stat'];
				//console.log(stateSet);
				if(!stateSet){
					response.write('<form action="/search-student"> <label for="Property"> Search Student by: </label> <select name="attr1" ><option selected disabled hidden> Choose here</option> <option value="sid"> Student ID </option><<option value="bb"> Branch and Batch </option><option value="gender"> Gender </option><option value="city"> City </option><option value="state" selected> State </option></select><br><br><label for="stat"> Select State: </label><select name="stat" multiple><option selected disabled hidden>Choose here</option><option value="all" selected>All</option>');
				
					db.query("select distinct `State` from `Student_Address` order by `State`", [], function(err, results){
						
						if(!err){
							for(var i = 0; i < results.length; i++){
								response.write('<option value="'+results[i].State+'">'+results[i].State+'</option>');
							}
							response.end('/select><br><br><input type="submit" value="Submit"></form>');
						}
					})
				} else {
					if(stateSet.includes("all")){
						db.query("select * from `Student_Name` natural join `Student` natural join `Student_Branch` natural join `Student_Address` natural join `Student_Parents` order by `State`", [], function(err, results){
							if(!err){
								if(results.length === 0){
								 	response.end('<h2> No Records Found </h2>');
								} else {
									response.write('<p>' + results.length + ' Records</p>');
									response.write('<table class="center"><tr><th>Student ID</th><th>Student Name</th><th>Date of Birth</th><th>Gender</th><th>Batch</th><th>Branch</th><th>Father</th><th>Mother</th><th>Address</th><th>State</th></tr>');
									for(var i = 0; i < results.length; i++){
										const date = results[i].Date_Of_Birth.toJSON().slice(0,10);
										response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+date+"</td><td>"+results[i].Gender+"</td><td>"+results[i].Batch+"</td><td>"+results[i].Branch_Name+"</td><td>"+results[i].Father+"</td><td>"+results[i].Mother+"</td><td>"+results[i].Street+", "+results[i].City+", Pincode: "+results[i].Postal_Code+"</td><td>"+results[i].State+"</td></tr>");   			
									}
									response.end("</table>");
								}
							} else {
								response.end('<img src ="https://img.freepik.com/free-vector/error-page-page-found-something-went-wrong-template-design-error-message_219593-25.jpg?w=2000" style="width:2000px;height:900px;">');
								
							}
						})
					} else {
						db.query("select * from `Student_Name` natural join `Student` natural join `Student_Branch` natural join `Student_Address` natural join `Student_Parents` where `State` in (?) order by `State`", [stateSet], function(err, results){
							if(!err){
								if(results.length === 0){
								 	response.end('<h2> No Records Found </h2>');
								} else {
									response.write('<p>' + results.length + ' Records</p>');
									response.write('<table class="center"><tr><th>Student ID</th><th>Student Name</th><th>Date of Birth</th><th>Gender</th><th>Batch</th><th>Branch</th><th>Father</th><th>Mother</th><th>Address</th><th>State</th></tr>');
									for(var i = 0; i < results.length; i++){
										const date = results[i].Date_Of_Birth.toJSON().slice(0,10);
										response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+date+"</td><td>"+results[i].Gender+"</td><td>"+results[i].Batch+"</td><td>"+results[i].Branch_Name+"</td><td>"+results[i].Father+"</td><td>"+results[i].Mother+"</td><td>"+results[i].Street+", "+results[i].City+", Pincode: "+results[i].Postal_Code+"</td><td>"+results[i].State+"</td></tr>");    			
									}
									response.end("</table>");
								}
							} else {
								response.end('<img src ="https://img.freepik.com/free-vector/error-page-page-found-something-went-wrong-template-design-error-message_219593-25.jpg?w=2000" style="width:2000px;height:900px;">');
								
							}
						})
					}
				}
				
			}
    
    } else if(path === '/hostel-details'){
    	db.query("select * from `Hostel`", [], function(err, results){
    		if(!err){
    			
    			response.write("<style> table, th, td{border: 1px solid black; border-collapse: collapse;} </style>");
    			response.write("<style> h1, th, td{text-align: center;}</style>");
    			response.write('<style> table.center{margin-left: auto; margin-right: auto;}</style>');
    			response.write("<h1> Hostel Facilities </h1>");
    			response.write('<table class="center"><tr><th> Room Type</th><th>Fees(per semester)</th><th>Capacity</th></tr>');
    			for(var i = 0; i < results.length; i++){
					response.write("<tr><td>"+results[i].Type+"</td><td> Rs. "+results[i].Fees_Per_Semester_in_INR+"</td><td>"+results[i].Capacity+"</td></tr>");    			
    			}
    			response.write("</table>");
    			response.end();
    		} else {
    			response.end('<img src ="https://img.freepik.com/free-vector/error-page-page-found-something-went-wrong-template-design-error-message_219593-25.jpg?w=2000" style="width:2000px;height:900px;">');
    		}
    	})
    } else if(path === '/mess-details'){
    	db.query("select * from `Mess`", [], function(err, results){
    		if(!err){
    			response.write("<style> table, th, td{border: 1px solid black; border-collapse: collapse;} </style>");
    			response.write("<style> h1, th, td{text-align: center;}</style>");
    			response.write('<style> table.center{margin-left: auto; margin-right: auto;}</style>');
    			response.write("<h1> Mess Facilities </h1>");
    			response.write('<table class="center"><tr><th> Mess Type</th><th>Fees(per semester)</th></tr>');
    			for(var i = 0; i < results.length; i++){
					response.write("<tr><td>"+results[i].Type+"</td><td> Rs. "+results[i].Fees_Per_Semester_in_INR+"</td></tr>");    			
    			}
    			response.write("</table>");
    			response.end();
    		} else {
    			response.end('<img src ="https://img.freepik.com/free-vector/error-page-page-found-something-went-wrong-template-design-error-message_219593-25.jpg?w=2000" style="width:2000px;height:900px;">');
    		}
    	})
    } else if(path === '/clubs'){
    	db.query("select * from `Club`", [], function(err, results){
    		if(!err){
    			response.write("<style> table, th, td{border: 1px solid black; border-collapse: collapse;} </style>");
    			response.write("<style> h1, h3, th, td{text-align: center;}</style>");
    			response.write('<style> table.center{margin-left: auto; margin-right: auto;}</style>');
    			response.write("<h1> Clubs </h1>");
    			response.write('<p>' + results.length + ' Records</p>');
    			response.write('<table class="center"><tr><th> Club Name</th><th>Budget(per semester)</th></tr>');
    			for(var i = 0; i < results.length; i++){
					response.write("<tr><td>"+results[i].Club_Name+"</td><td> Rs. "+results[i].Budget_in_INR+"</td></tr>");    			
    			}
    			response.write("</table><br><br><br><br>");
    			response.end('<h3> Add a new club <a href=\"/add-club\" target="_blank"> here </a></h3>');
    		} else {
    			response.end('<img src ="https://img.freepik.com/free-vector/error-page-page-found-something-went-wrong-template-design-error-message_219593-25.jpg?w=2000" style="width:2000px;height:900px;">');
    		}
    	})
    } else if(path === '/faculty'){
    	db.query("select * from `Faculty`", [], function(err, results){
    		if(!err){
    			response.write("<style> table, th, td{border: 1px solid black; border-collapse: collapse;} </style>");
    			response.write("<style> h1, th, td{text-align: center;}</style>");
    			response.write('<style> table.center{margin-left: auto; margin-right: auto;}</style>');
    			response.write("<h1> Faculty Details </h1>");
    			response.write('<p>' + results.length + ' Records</p>');
    			response.write('<table class="center"><tr><th>Faculty ID</th><th>Name</th><th>Date of Birth</th><th>Gender</th><th>Designation</th><th>Salary</th></tr>');
    			for(var i = 0; i < results.length; i++){
    				const date = results[i].Date_Of_Birth.toJSON().slice(0,10);
					response.write("<tr><td>"+results[i].FacultyID+"</td><td>"+results[i].Faculty_Name+"</td><td>"+date+"</td><td>"+results[i].Gender+"</td><td>"+results[i].Designation+"</td><td> Rs."+results[i].Salary_in_INR+"</td></tr>");    			
    			}
    			response.write("</table>");
    			response.end();
    		} else {
    			response.end('<img src ="https://img.freepik.com/free-vector/error-page-page-found-something-went-wrong-template-design-error-message_219593-25.jpg?w=2000" style="width:2000px;height:900px;">');
    		}
    	})
	} else if(path === '/add-branch'){ 
		response.write("<style> h1{text-align: center;}</style>");
		response.write('<h1> Add Branch </h1> <br><br>');
		response.write('<h2>Enter Branch Details</h2>');
		
		const bName = q.query['bName'];
		const duration = parseInt(q.query['dur']);
		const courses = parseInt(q.query['nCourses']);
		
		
		if(!bName || !duration || !courses){
			response.write('<form action="/add-branch"> <label for="bName"> Branch Name:</label><input type="text" name="bName"><br><br><label for="dur"> Duration(in Years):</label><input type="text" name="dur"><br><br><label for="nCourses"> Number of Courses:</label><input type="text" name="nCourses"><br><br>');
			response.end('<input type="submit" value="Submit"></form>');
		} else {
			db.query("insert into `Branch` values (?, ?, ?) ", [bName, duration, courses], function(err, results){				
				if(err){
					response.end('<h2> Some Error Occured</h2>');
				} else {
					response.end('<h2> Branch Details Added Successfully </h2><br><br><a href=\"/branch-details\"> Go Back To Branch Details Page </a>');		
				}
			})
		}
	
	} else if(path === '/library'){
		response.write("<style> h1, h2,h3, th, td{text-align: center;}</style>");
		response.write("<h1> Library </h1>");
		response.write("<p> The primary aim of the Library is to support research, teaching and learning of the university community. The Library is one of the central support services of our University. The mission of the Library is to provide information services and access to full text digital and printed resources to support the scholarly and informational needs of faculty, students and staff.</p><br><br>");
		
		db.query("select * from `Books` natural join `Books_Author`", [], function(err, results){
    		if(!err){
    			response.write("<style> table, th, td{border: 1px solid black; border-collapse: collapse;} </style>");
    			response.write('<style> table.center{margin-left: auto; margin-right: auto;}</style>');
    			response.write("<h2> Books in our Library </h2>");
    			response.write('<p>' + results.length + ' Records</p>');
    			response.write('<table class="center"><tr><th>Book ID</th><th>Book Name</th><th> Author(s)</th><th>Copies</th></tr>');
    			for(var i = 0; i < results.length; i++){
					response.write("<tr><td>"+results[i].BookID+"</td><td>"+results[i].Book_Name+"</td><td>"+results[i].Author+"</td><td>"+results[i].Copies+"</td></tr>");    			
    			}
    			response.write("</table>");
    			response.write('<br><br><br><br><h3> Add a new book <a href=\"/add-book\" target="_blank"> here </a></h3>');
    			response.end('<h3> See Issued Books Details <a href=\"/issued-books\" target="_blank"> here </a></h3>');
    		} else {
    			response.end('<img src ="https://img.freepik.com/free-vector/error-page-page-found-something-went-wrong-template-design-error-message_219593-25.jpg?w=2000" style="width:2000px;height:900px;">');
    		}
    	})
	
	} else if(path === '/issued-books'){
		response.write("<style> h1, h2,h3, th, td{text-align: center;}</style>");
		response.write("<h1> Library </h1>");
		
		db.query("select Student.StudentID, First_Name, Middle_Name, Last_Name, Books.BookID, Book_Name, Librarian from `Student` natural join `Student_Name` natural join `Book_Issued_To` natural join `Books`", [], function(err, results){
    		if(!err){
    			
    			response.write("<style> table, th, td{border: 1px solid black; border-collapse: collapse;} </style>");
    			response.write('<style> table.center{margin-left: auto; margin-right: auto;}</style>');
    			response.write('<p>' + results.length + ' Records</p>');
    			//response.write("<h2> Books in our Library </h2>");
    			response.write('<table class="center"><tr><th>Student ID</th><th>Student Name</th><th>Book ID</th><th>Book Name</th><th> Librarian</th></tr>');
    			for(var i = 0; i < results.length; i++){
					response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+results[i].BookID+"</td><td>"+results[i].Book_Name+"</td><td>"+results[i].Librarian+"</td></tr>");    			
    			}
    			response.write("</table>");
    			//response.end('<br><br><br><br><h3> Add a new book <a href=\"/add-book\" target="_blank"> here </a>');
    			response.end();
    		} else {
    			response.end('<img src ="https://img.freepik.com/free-vector/error-page-page-found-something-went-wrong-template-design-error-message_219593-25.jpg?w=2000" style="width:2000px;height:900px;">');
    		}
    	})
		
		//response.end('<h3> Books Issued to </h3>');
		 
		
	} else if(path === '/student-hostel-details'){
	
		const enrStat = q.query['enrStatus'];
		const ht = q.query['ht'];
		const occ = q.query['occ'];
		const fs = q.query['fs'];
		
		response.write("<style> h1, h2, th, td{text-align: center;}</style>");
		response.write('<h1> Student Hostel Details </h1>');
		
		if(!enrStat){
			response.write('<form action="/student-hostel-details" <label for="enrStatus"> Students in University Hostel: </label> <select name="enrStatus"><option selected disabled hidden> Choose here</option> <option value="enr"> Enrolled </option><option value="nenr"> Not Enrolled </option></select><br><br><label for="ht">  Hostel Type: </label> <select name="ht"> <option selected disabled hidden> Choose here</option> <option value="ac"> AC </option><option value="nac"> Non AC </option><option value="both"> Both </option></select><br><br><label for="occ">  Occupancy: </label> <select name="occ"> <option selected disabled hidden> Choose here</option><option value="2"> 2 </option><option value="3"> 3 </option><option value="both"> Both </option></select><br><br><label for="fs">  Fee Status: </label> <select name="fs"> <option selected disabled hidden> Choose here</option><option value="Paid"> Paid </option><option value="Due"> Due </option><option value="Both"> Both </option></select><br><br><input type="submit" value="Submit"></select><br><br></form>');
		
			response.end();
		}
		
		if(enrStat === 'nenr'){
			db.query("select Student_Name.StudentID, First_Name, Middle_Name, Last_Name from (`Student_Name` left join `Student_Hostel` on Student_Name.StudentID = Student_Hostel.StudentID) where Student_Hostel.Type is null", [], function(err, results){
				if(!err){
					if(results.length == 0){
						response.end('<h2> <br><br>Empty Set </h2>');
					} else {
						response.write("<style> table, th, td{border: 1px solid black; border-collapse: collapse;} </style>");
						response.write('<style> table.center{margin-left: auto; margin-right: auto;}</style>');
						response.write('<p>' + results.length + ' Records</p>');
						response.write('<table class="center"><tr><th>Student ID</th><th>Name</th></tr>');
						for(var i = 0; i < results.length; i++){
							response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td></tr>");    			
						}
						response.write("</table>");
						response.end();
					}
				}
			})
		} else if(enrStat === 'enr'){
		
			var a = "2 Person AC";
			var b = "3 Person AC";
			var c = "2 Person Non AC";
			var d = "3 Person Non AC";
			
			if((ht === 'ac' || ht === 'nac') && (occ === '2' || occ == '3')){
				
				var s = "";
				if(ht === 'ac' && occ === '2'){ s = a;}
				if(ht === 'ac' && occ === '3'){ s = b;}
				if(ht === 'nac' && occ === '2'){ s = c;}
				if(ht === 'nac' && occ === '3'){ s = d;}
				
				response.write('<h2> Enrollment Status : Enrolled <br> Hostel Type : '+s+' <br> Fee Status : '+fs+'</h2>');
				response.write("<style> table, th, td{border: 1px solid black; border-collapse: collapse;} </style>");
				response.write('<style> table.center{margin-left: auto; margin-right: auto;}</style>');
				
				if(fs === 'Due' || fs === 'Paid'){
					
					db.query('select Student_Name.StudentID, First_Name, Middle_Name, Last_Name, Room from (`Student_Name` natural join `Student_Hostel`) where (Type = ? and Fee_Status = ?)', [s, fs], function(err, results){
						if(!err){
							if(results.length == 0){
								response.end('<h2> <br><br>Empty Set </h2>');
							} else{
								response.write('<p>' + results.length + ' Records</p>');
								response.write('<table class="center"><tr><th>Student ID</th><th>Name</th></th><th>Room</th></tr>');
								for(var i = 0; i < results.length; i++){
									response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+results[i].Room+"</td></tr>");    			
								} 
						
								response.write("</table>");
								response.end();
							}
						} 
					})
					
				} else if(fs === 'Both'){
					db.query('select Student_Name.StudentID, First_Name, Middle_Name, Last_Name, Fee_Status, Room from (`Student_Name` natural join `Student_Hostel`) where Type = ?', [s], function(err, results){
						if(!err){
							if(results.length == 0){
								response.end('<h2> <br><br>Empty Set </h2>');
							} else {
								response.write('<p>' + results.length + ' Records</p>');
								response.write('<table class="center"><tr><th>Student ID</th><th>Name</th></th><th>Fee Status</th><th>Room</th></tr>');
								for(var i = 0; i < results.length; i++){
									response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+results[i].Fee_Status+"</td><td>"+results[i].Room+"</td></tr>");    			
								}
								response.write("</table>");
								response.end();
							}
						} 
					})
				}
			} else if(ht === 'both'){
				var s = "";
				var t = "";
				
				if(occ === '2'){
					s = a;
					t = c;
				} else if(occ === '3'){
					s = b;
					t = d;
				}
				
				response.write('<h2> Enrollment Status : Enrolled <br> Hostel Type : Both <br> Fee Status : '+fs+'</h2>');
				response.write("<style> table, th, td{border: 1px solid black; border-collapse: collapse;} </style>");
				response.write('<style> table.center{margin-left: auto; margin-right: auto;}</style>');
				
				if(fs === 'Due' || fs === 'Paid'){
					
					if(occ === 'both'){
						db.query('select Student_Name.StudentID, First_Name, Middle_Name, Last_Name, Type, Room from (`Student_Name` natural join `Student_Hostel`) where Fee_Status = ?', [fs], function(err, results){
							if(!err){
								if(results.length == 0){
									response.end('<h2> <br><br>Empty Set </h2>');
								} else{
									response.write('<p>' + results.length + ' Records</p>');
									response.write('<table class="center"><tr><th>Student ID</th><th>Name</th><th>Hostel Type</th></th><th>Room</th></tr>');
									for(var i = 0; i < results.length; i++){
										response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+results[i].Type +"</td><td>"+results[i].Room+"</td></tr>");    			
									} 
									
									response.write("</table>");
									response.end();
								}
							} 
						})
					} else{
						db.query('select Student_Name.StudentID, First_Name, Middle_Name, Last_Name, Type, Room from (`Student_Name` natural join `Student_Hostel`) where (Type in (?, ?) and Fee_Status = ?)', [s, t, fs], function(err, results){
							if(!err){
								if(results.length == 0){
									response.end('<h2> <br><br>Empty Set </h2>');
								} else{
									response.write('<p>' + results.length + ' Records</p>');
									response.write('<table class="center"><tr><th>Student ID</th><th>Name</th><th>Hostel Type</th></th><th>Room</th></tr>');
									for(var i = 0; i < results.length; i++){
										response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+results[i].Type +"</td><td>"+results[i].Room+"</td></tr>");    			
									} 
									
									response.write("</table>");
									response.end();
								}
							} 
						})
					}
				} else if(fs === 'Both'){
				
					if(occ === 'both'){
						db.query('select Student_Name.StudentID, First_Name, Middle_Name, Last_Name, Type, Fee_Status, Room from (`Student_Name` natural join `Student_Hostel`)', [], function(err, results){
							if(!err){
								response.write('<p>' + results.length + ' Records</p>');
								response.write('<table class="center"><tr><th>Student ID</th><th>Name</th><th>Hostel Type</th><th>Fee Status</th><th>Room</th></tr>');
								for(var i = 0; i < results.length; i++){
									response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+results[i].Type+"</td><td>"+results[i].Fee_Status+"</td><td>"+results[i].Room+"</td></tr>");    			
								}
								response.write("</table>");
								response.end();
							} 
						})
					} else {
						db.query('select Student_Name.StudentID, First_Name, Middle_Name, Last_Name, Type, Fee_Status, Room from (`Student_Name` natural join `Student_Hostel`) where Type in (?, ?)', [s, t], function(err, results){
							if(!err){
								response.write('<p>' + results.length + ' Records</p>');
								response.write('<table class="center"><tr><th>Student ID</th><th>Name</th><th>Hostel Type</th><th>Fee Status</th><th>Room</th></tr>');
								for(var i = 0; i < results.length; i++){
									response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+results[i].Type+"</td><td>"+results[i].Fee_Status+"</td><td>"+results[i].Room+"</td></tr>");    			
								}
								response.write("</table>");
								response.end();
							} 
						})
					}
				}
			} else if(occ === 'both'){
				var s = "";
				var t = "";
				
				if(ht === 'ac'){
					s = a;
					t = b;
				} else if(ht === 'nac'){
					s = c;
					t = d;
				}
				
				response.write('<h2> Enrollment Status : Enrolled <br> Occupancy : Both <br> Fee Status : '+fs+'</h2>');
				response.write("<style> table, th, td{border: 1px solid black; border-collapse: collapse;} </style>");
				response.write('<style> table.center{margin-left: auto; margin-right: auto;}</style>');
				
				if(fs === 'Due' || fs === 'Paid'){
					
					if(ht === 'both'){
					} else{
						db.query('select Student_Name.StudentID, First_Name, Middle_Name, Last_Name, Type, Room from (`Student_Name` natural join `Student_Hostel`) where (Type in (?, ?) and Fee_Status = ?)', [s, t, fs], function(err, results){
							if(!err){
								if(results.length == 0){
									response.end('<h2> <br><br>Empty Set </h2>');
								} else{
									response.write('<p>' + results.length + ' Records</p>');
									response.write('<table class="center"><tr><th>Student ID</th><th>Name</th><th>Hostel Type</th></th><th>Room</th></tr>');
									for(var i = 0; i < results.length; i++){
										response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+results[i].Type +"</td><td>"+results[i].Room+"</td></tr>");    			
									} 
									
									response.write("</table>");
									response.end();
								}
							} 
						})
					}
				} else if(fs === 'Both'){
				
					if(ht === 'both'){
					} else {
						db.query('select Student_Name.StudentID, First_Name, Middle_Name, Last_Name, Type, Fee_Status, Room from (`Student_Name` natural join `Student_Hostel`) where Type in (?, ?)', [s, t], function(err, results){
							if(!err){
								response.write('<p>' + results.length + ' Records</p>');
								response.write('<table class="center"><tr><th>Student ID</th><th>Name</th><th>Hostel Type</th><th>Fee Status</th><th>Room</th></tr>');
								for(var i = 0; i < results.length; i++){
									response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+results[i].Type+"</td><td>"+results[i].Fee_Status+"</td><td>"+results[i].Room+"</td></tr>");    			
								}
								response.write("</table>");
								response.end();
							} 
						})
					}
				}
			} 
		}
	} else if(path === '/student-mess-details'){
		const enrStat = q.query['enrStatus'];
		const mq = q.query['mq'];
		const ft = q.query['ft'];
		const fs = q.query['fs'];
		
		response.write("<style> h1, h2, th, td{text-align: center;}</style>");
		response.write('<h1> Student Mess Details </h1>');
		
		if(!enrStat){
			response.write('<form action="/student-mess-details" <label for="enrStatus"> Students in University Mess: </label> <select name="enrStatus"><option selected disabled hidden> Choose here</option> <option value="enr"> Enrolled </option><option value="nenr"> Not Enrolled </option></select><br><br><label for="mq">  Mess Quality: </label> <select name="mq"> <option selected disabled hidden> Choose here</option> <option value="Regular"> Regular </option><option value="Premium"> Premium </option><option value="both"> Both </option></select><br><br><label for="ft">  Food Type: </label> <select name="ft"> <option selected disabled hidden> Choose here</option><option value="Veg"> Veg </option><option value="Non-Veg"> Non-Veg </option><option value="both"> Both </option></select><br><br><label for="fs">  Fee Status: </label> <select name="fs"> <option selected disabled hidden> Choose here</option><option value="Paid"> Paid </option><option value="Due"> Due </option><option value="Both"> Both </option></select><br><br><input type="submit" value="Submit"></select><br><br></form>');
		
			response.end();
		}
		
		if(enrStat === 'nenr'){
			db.query("select Student_Name.StudentID, First_Name, Middle_Name, Last_Name from (`Student_Name` left join `Student_Mess` on Student_Name.StudentID = Student_Mess.StudentID) where Student_Mess.Type is null", [], function(err, results){
				if(!err){
					if(results.length == 0){
						response.end('<h2> <br><br>Empty Set </h2>');
					} else{
						response.write("<style> table, th, td{border: 1px solid black; border-collapse: collapse;} </style>");
						response.write('<style> table.center{margin-left: auto; margin-right: auto;}</style>');
						response.write('<p>' + results.length + ' Records</p>');
						response.write('<table class="center"><tr><th>Student ID</th><th>Name</th></tr>');
						for(var i = 0; i < results.length; i++){
							response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td></tr>");    			
						}
						response.write("</table>");
						response.end();
					}
				} else {
					response.end('<img src ="https://img.freepik.com/free-vector/error-page-page-found-something-went-wrong-template-design-error-message_219593-25.jpg?w=2000" style="width:2000px;height:900px;">');
				} 
			})
		} else if(enrStat === 'enr'){
		
			var a = "Veg Premium";
			var b = "Veg Regular";
			var c = "Non-Veg Regular";
			var d = "Non-Veg Premium";
			
			if((mq === 'Regular' || mq === 'Premium') && (ft === 'Veg' || ft == 'Non-Veg')){
				
				var s = "";
				if(mq === 'Regular' && ft === 'Veg'){ s = b;}
				if(mq === 'Regular' && ft === 'Non-Veg'){ s = c;}
				if(mq === 'Premium' && ft === 'Veg'){ s = a;}
				if(mq === 'Premium' && ft === 'Non-Veg'){ s = d;}
				
				response.write('<h2> Enrollment Status : Enrolled <br> Mess Type : '+s+' <br> Fee Status : '+fs+'</h2>');
				response.write("<style> table, th, td{border: 1px solid black; border-collapse: collapse;} </style>");
				response.write('<style> table.center{margin-left: auto; margin-right: auto;}</style>');
				
				if(fs === 'Due' || fs === 'Paid'){
					
					db.query('select Student_Name.StudentID, First_Name, Middle_Name, Last_Name from (`Student_Name` natural join `Student_Mess`) where (Type = ? and Fee_Status = ?)', [s, fs], function(err, results){
						if(!err){
							if(results.length == 0){
								response.end('<h2> <br><br>Empty Set </h2>');
							} else{
								response.write('<p>' + results.length + ' Records</p>');
								response.write('<table class="center"><tr><th>Student ID</th><th>Name</th></th></tr>');
								for(var i = 0; i < results.length; i++){
									response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td></tr>");    			
								} 
								response.write("</table>");
								response.end();
							}
						} 
					})
					
				} else if(fs === 'Both'){
					db.query('select Student_Name.StudentID, First_Name, Middle_Name, Last_Name, Fee_Status from (`Student_Name` natural join `Student_Mess`) where Type = ?', [s], function(err, results){
						if(!err){
							if(results.length == 0){
								response.end('<h2> <br><br>Empty Set </h2>');
							} else {
								response.write('<p>' + results.length + ' Records</p>');
								response.write('<table class="center"><tr><th>Student ID</th><th>Name</th></th><th>Fee Status</th></tr>');
								for(var i = 0; i < results.length; i++){
									response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+results[i].Fee_Status+"</td></tr>");    			
								}
								response.write("</table>");
								response.end();
							}
						} 
					})
				}
			} else if(mq === 'both'){
				var s = "";
				var t = "";
				
				if(ft === 'Veg'){
					s = a;
					t = b;
				} else if(ft === 'Non-Veg'){
					s = c;
					t = d;
				}
				
				response.write('<h2> Enrollment Status : Enrolled <br> Mess Quality : Both <br> Fee Status : '+fs+'</h2>');
				response.write("<style> table, th, td{border: 1px solid black; border-collapse: collapse;} </style>");
				response.write('<style> table.center{margin-left: auto; margin-right: auto;}</style>');
				
				if(fs === 'Due' || fs === 'Paid'){
					
					if(ft === 'both'){
						db.query('select Student_Name.StudentID, First_Name, Middle_Name, Last_Name, Type from (`Student_Name` natural join `Student_Mess`) where Fee_Status = ?', [fs], function(err, results){
							if(!err){
								if(results.length == 0){
									response.end('<h2> <br><br>Empty Set </h2>');
								} else{
									response.write('<p>' + results.length + ' Records</p>');
									response.write('<table class="center"><tr><th>Student ID</th><th>Name</th><th>Mess Type</th></th></tr>');
									for(var i = 0; i < results.length; i++){
										response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+results[i].Type +"</td></tr>");    			
									} 
									
									response.write("</table>");
									response.end();
								}
							} 
						})
					} else{
						db.query('select Student_Name.StudentID, First_Name, Middle_Name, Last_Name, Type from (`Student_Name` natural join `Student_Mess`) where (Type in (?, ?) and Fee_Status = ?)', [s, t, fs], function(err, results){
							if(!err){
								if(results.length == 0){
									response.end('<h2> <br><br>Empty Set </h2>');
								} else{
									response.write('<p>' + results.length + ' Records</p>');
									response.write('<table class="center"><tr><th>Student ID</th><th>Name</th><th>Mess Type</th></th></tr>');
									for(var i = 0; i < results.length; i++){
										response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+results[i].Type +"</td></tr>");    			
									} 
									
									response.write("</table>");
									response.end();
								}
							} 
						})
					}
				} else if(fs === 'Both'){
				
					if(ft === 'both'){
						db.query('select Student_Name.StudentID, First_Name, Middle_Name, Last_Name, Type, Fee_Status from (`Student_Name` natural join `Student_Mess`)', [], function(err, results){
							if(!err){
								response.write('<p>' + results.length + ' Records</p>');
								response.write('<table class="center"><tr><th>Student ID</th><th>Name</th><th>Mess Type</th><th>Fee Status</th></tr>');
								for(var i = 0; i < results.length; i++){
									response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+results[i].Type+"</td><td>"+results[i].Fee_Status+"</td></tr>");    			
								}
								response.write("</table>");
								response.end();
							} 
						})
					} else {
						db.query('select Student_Name.StudentID, First_Name, Middle_Name, Last_Name, Type, Fee_Status from (`Student_Name` natural join `Student_Mess`) where Type in (?, ?)', [s, t], function(err, results){
							if(!err){
								response.write('<p>' + results.length + ' Records</p>');
								response.write('<table class="center"><tr><th>Student ID</th><th>Name</th><th>Mess Type</th><th>Fee Status</th></tr>');
								for(var i = 0; i < results.length; i++){
									response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+results[i].Type+"</td><td>"+results[i].Fee_Status+"</td></tr>");    			
								}
								response.write("</table>");
								response.end();
							} 
						})
					}
				}
			} else if(ft === 'both'){
				var s = "";
				var t = "";
				
				if(mq === 'Regular'){
					s = c;
					t = b;
				} else if(mq === 'Premium'){
					s = a;
					t = d;
				}
				
				response.write('<h2> Enrollment Status : Enrolled <br> Mess Quality : '+mq + '<br> Fee Status : '+fs+'</h2>');
				response.write("<style> table, th, td{border: 1px solid black; border-collapse: collapse;} </style>");
				response.write('<style> table.center{margin-left: auto; margin-right: auto;}</style>');
				
				if(fs === 'Due' || fs === 'Paid'){
					
					if(mq === 'both'){
					} else{
						db.query('select Student_Name.StudentID, First_Name, Middle_Name, Last_Name, Type from (`Student_Name` natural join `Student_Mess`) where (Type in (?, ?) and Fee_Status = ?)', [s, t, fs], function(err, results){
							if(!err){
								if(results.length == 0){
									response.end('<h2> <br><br>Empty Set </h2>');
								} else{
									response.write('<p>' + results.length + ' Records</p>');
									response.write('<table class="center"><tr><th>Student ID</th><th>Name</th><th>Mess Type</th></th></tr>');
									for(var i = 0; i < results.length; i++){
										response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+results[i].Type +"</td></tr>");    			
									} 
									
									response.write("</table>");
									response.end();
								}
							} 
						})
					}
				} else if(fs === 'Both'){
				
					if(mq === 'both'){
					} else {
						db.query('select Student_Name.StudentID, First_Name, Middle_Name, Last_Name, Type, Fee_Status from (`Student_Name` natural join `Student_Mess`) where Type in (?, ?)', [s, t], function(err, results){
							if(!err){
								response.write('<p>' + results.length + ' Records</p>');
								response.write('<table class="center"><tr><th>Student ID</th><th>Name</th><th>Hostel Type</th><th>Fee Status</th></tr>');
								for(var i = 0; i < results.length; i++){
									response.write("<tr><td>"+results[i].StudentID+"</td><td>"+results[i].First_Name+" "+(results[i].Middle_Name == null ? "" : results[i].Middle_Name)+" "+results[i].Last_Name+"</td><td>"+results[i].Type+"</td><td>"+results[i].Fee_Status+"</td></tr>");    			
								}
								response.write("</table>");
								response.end();
							} 
						})
					}
				}
			} 
		}
	} else if(path === '/add-student'){
		response.write("<style> h1{text-align: center;}</style>");
		response.write('<h1> Add Student Details </h1> <br><br>');
		
		const id = parseInt(q.query['id']);
		const fName = q.query['fName'];
		const mName = q.query['mName'];
		const lName = q.query['lName'];
		const dob = q.query['dob'];
		const gen = q.query['gender'];
		const street = q.query['street'];
		const city = q.query['city'];
		const state = q.query['state'];
		const pincode = q.query['pincode'];
		const father = q.query['father'];
		const mother = q.query['mother'];
		const batch = q.query['batch'];
		const branch = q.query['branch'];	
		
		if(!id){
			response.write('<h2>Enter Student Details</h2>');
			response.write('<form action="/add-student"> <label for="id"> Student ID:</label><input type="text" name="id"><br><br>');
			response.write('<label for="fName"> First Name:</label><input type="text" name="fName"><br><br>');
			response.write('<label for="mName"> Middle Name:</label><input type="text" name="mName"><br><br>');
			response.write('<label for="lName"> Last Name:</label><input type="text" name="lName"><br><br>');
			response.write('<label for="dob" value="YYYY-MM-DD">  Date of Birth:</label><input type="text" name="dob"><br><br>');
			response.write('<label for="gender"> Gender:</label> <select name="gender"><option selected disabled hidden> Choose here</option> <option value="male"> Male </option><option value="female"> Female </option><option value="others"> Others</option></select><br><br>');
			response.write('<label for="batch"> Batch:</label> <select name="batch"><option selected disabled hidden> Choose here</option>');
			
			db.query("select `Year` from `Batch` order by `Year`", [], function(err, results){	
				
				if(!err){
					for(var i = 0; i < results.length; i++){
						response.write('<option value="'+results[i].Year+'">'+results[i].Year+'</option>');
					}
					response.write('</select><br><br><label for="branch"> Branch:</label> <select name="branch"><option selected disabled hidden> Choose here</option>');
					
					db.query("select `Branch_Name` from `Branch` order by `Branch_Name`", [], function(err, results){			
						if(!err){
							for(var i = 0; i < results.length; i++){
								response.write('<option value="'+results[i].Branch_Name+'">'+results[i].Branch_Name+'</option>');
							}
							response.write('</select><br><br>');
							response.write('<p> (If you want to add a Branch that is not in the dropdown, add the branch details first <a href="/add-branch"> here </a></p>');
							response.write('<label for="street" >  Street:</label><input type="text" name="street"><br><br>');
							response.write('<label for="city" >  City:</label><input type="text" name="city"><br><br>');
							response.write('<label for="state" >  State:</label><input type="text" name="state"><br><br>');
							response.write('<label for="pincode" >  Pincode:</label><input type="text" name="pincode"><br><br>');
							response.write("<label for='father'>  Father's Name:</label><input type='text' name='father'><br><br>");
							response.write("<label for='mother'>  Mother's Name:</label><input type='text' name='mother'><br><br>");
							response.end('<input type="submit" value="Submit"></form>');
							
						} else {
							console.log(err);
							response.end();
						}
					})	
					
				} else {
					console.log(err);
					response.end();
				}
			})
		} else {
			
			db.query('insert into `Student` values (?, ?, ?, ?)', [id, dob, gen, batch], function(err, results){
				if(!err){
					db.query('insert into `Student_Branch` values (?, ?)', [id, branch], function(err, results){
					
						if(!err){
							if(!mName){
								db.query('insert into `Student_Name`(StudentID, First_Name, Last_Name) values (?, ?, ?)', [id, fName, lName], function(err, results){
									if(!err){
										db.query('insert into `Student_Address` values (?, ?, ?, ?, ?)', [id, street, city, state, pincode], function(err, results){
											if(!err){
												db.query('insert into `Student_Parents` values (?, ?, ?)', [id, father, mother], function(err, results){
													if(!err) {
														response.end('<h1> Student Details Added Successfully</h1>');
													}
												})
												
											}
										})
											
									}
								})
							} else {
								db.query('insert into `Student_Name` values (?, ?, ?, ?)', [id, fName, mName, lName], function(err, results){
									if(!err){
										db.query('insert into `Student_Address` values (?, ?, ?, ?, ?)', [id, street, city, state, pincode], function(err, results){
											if(!err){
												db.query('insert into `Student_Parents` values (?, ?, ?)', [id, father, mother], function(err, results){
													if(!err){
														response.end('<h1> Student Details Added Successfully</h1>');
													}
												})
												
											}
										})
									}	
									
								})
							}
							
							
						}
					})
				}
			})				
		}
	
	} else if(path === '/delete-student-data'){
		
		response.write("<style> h1{text-align: center;}</style>");
		response.write('<h1>Delete Student Details</h1>');
	
		const del = q.query['deleteBy'];
		
		if(!del){
			response.end('<form action="/delete-student-data"> <label for="deleteBy"> Delete By:</label><select name="deleteBy"><option selected disabled hidden> Choose here</option><option value="sid"> Student ID</option><option value="batch"> Batch</option></select><input type="submit" value="Submit"></form>');
		} else if(del === 'sid'){
			
			const id = parseInt(q.query['id']);
			if(!id){
				response.end('<form action="/delete-student-data"> <label for="deleteBy"> Delete By:</label><select name="deleteBy"><option selected disabled hidden> Choose here</option><option value="sid" selected> Student ID</option><option value="batch"> Batch</option></select><br><br><label for="id"> Student ID:</label><input type="text" name="id"><input type="submit" value="Submit"></form>');
			} else {
				db.query("delete from `Student` where `StudentID` = ?", [id], function(err, results){			
					if(!err){
						response.end('<h2> Record Deleted Successfully</h2>');			
					} else {
						console.log(err);
						response.end();
					}
				})	
			}
		} else if(del === 'batch'){
			const batch = q.query['batch'];
			if(!batch){
				response.write('<form action="/delete-student-data"> <label for="deleteBy"> Delete By:</label><select name="deleteBy"><option selected disabled hidden> Choose here</option><option value="sid" selected> Student ID</option><option value="batch" selected> Batch</option></select><br><br>');
				
				response.write('<label for="batch"> Batch:</label> <select name="batch"><option selected disabled hidden> Choose here</option>');
			
				db.query("select `Year` from `Batch` order by `Year`", [], function(err, results){	
					
					if(!err){
						for(var i = 0; i < results.length; i++){
							response.write('<option value="'+results[i].Year+'">'+results[i].Year+'</option>');
						}
						response.end('</select><br><br><input type="submit" value="Submit"></form>');
						
					} else {
						console.log(err);
						response.end();
					}
				})
			} else {
				db.query("delete from `Student` where `Batch` = ?", [batch], function(err, results){	
					
					if(!err){
						response.end('<h2> Records Deleted Successfully </h2>');
					} else {
						console.log(err);
						response.end();
					}
				})
			}
		
		}	
	} else if(path === '/add-club'){
		
		response.write("<style> h1{text-align: center;}</style>");
		response.write('<h1> Add Club Details </h1> <br><br>');
		response.write('<h2>Enter Club Details</h2>');
		
		const cName = q.query['cName'];
		const budgetStr = q.query['budget'];
		const budget = parseInt(budgetStr);
		
		if(!cName || !budget){
			response.write('<form action="/add-club"> <label for="cName"> Club Name:</label><input type="text" name="cName"><br><br>');
			response.end('<label for="budget"> Budget (in Rs.):</label><input type="text" name="budget"><br><br><input type="submit" value="Submit"></form>');
		} else {
			db.query("insert into `Club` values (?, ?)", [cName, budget], function(err, results){				
				if(!err){
					response.end('<h2> Club Added Successfully </h2><br><br><a href=\"/clubs\"> Go Back </a>');
					//response.write('<a href=\"/branch-details\" target="_blank"> Branches Offered in our University </a><br>');
				} else {
					response.end('<h2> Some Error Occured </h2>');
				}
				
				
			})
			
		}
	} else if(path === '/add-book'){
		response.write("<style> h1{text-align: center;}</style>");
		response.write('<h1> Add Book Details </h1> <br><br>');
		response.write('<h2>Enter Book Details</h2>');
		
		const bName = q.query['bName'];
		const book_id = parseInt(q.query['bid']);
		const author = q.query['author'];
		const copy = parseInt(q.query['copy']);
		
		if(!book_id){
			response.write('<form action="/add-book"> <label for="bid"> Book ID:</label><input type="text" name="bid"><br><br><label for="bName"> Book Name:</label><input type="text" name="bName"><br><br><label for="author"> Author:</label><input type="text" name="author"><br><br><label for="copy"> Copies:</label><input type="text" name="copy"><br><br>');
			response.end('<input type="submit" value="Submit"></form>');
		} else {
			db.query("insert into `Books` values (?, ?, ?) ", [book_id, bName, copy], function(err, results){				
				if(err){
					response.end('<h2> Some Error Occured</h2>');
				} else {
					db.query("insert into `Books_Author` values (?, ?) ", [book_id, author], function(err, results){				
						if(!err){
							response.end('<h2> Book Details Added Successfully </h2><br><br><a href=\"/library\"> Go Back To Library </a>');
						} else {
							response.end('<h2> Some Error Occured</h2>');
						}
					})
				}
			})
		}
	} else {
		response.end('<h1> 404 Error, Page Not Found </h1>');
	}
});

server.listen(port);
console.log("Running server on port: " + port);
 