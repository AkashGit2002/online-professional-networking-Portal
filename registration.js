



	function signupvalid() {
					var num = document.getElementById('signup').value;
	var user = document.mysignup.username.value;

	var email = document.mysignup.email.value;
	var pass = document.mysignup.pass.value;

	var con = document.mysignup.confirm.value;

	if (user == "") {
		alert(`Enter Your User name`);
					}
	else {
						if (email == "") {
		alert(`Enter Your email`);
						}
	else {
							if (pass.length != con.length || pass == "" || con == "") {
		alert(`Invalid password`);
							}
	else {
								if (pass.localeCompare(con) != 0) {
		alert("Password Doesn't Match");
								}
	else {
		location.assign('./BackEnd/index.js');
								}

							}
						}

					}

				}



	function signinvalid() {
					var num = document.getElementById('signin').value;
	var user = document.myform.username.value;

	var pass = document.myform.pass.value;

	var con = document.myform.con.value;

	if (user == "") {
		alert(`Enter Your User name`);
					}
	else {
						if (pass.length != con.length || pass == "" || con == "") {
		alert(`Invalid password`);
						}
	else {
							if (pass.localeCompare(con) != 0) {
		alert("Password Doesn't Match");
							}
	else {
		location.assign('./BackEnd/index.js');
							}

						}
					}

				}
