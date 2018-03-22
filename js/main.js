function validation()
{
	//clear the red
	document.getElementById("error1").innerHTML="";
	document.getElementById("error2").innerHTML="";
	document.getElementById("error3").innerHTML="";

	//get input
	var a=document.getElementById("com_name").value;
	var b=document.getElementById("fou_year").value;
	var c=document.getElementById("fou_name").value;
	
	var err=0;

	var reg1 = /^[0-9a-zA-Z]+$/;//letters and digits
	var reg2 = /^[0-9]+$/;//years
	var reg3 = /^[a-zA-Z]+$/;//letters
	if(!reg1.test(a) && a!="")
	{
		document.getElementById("error1").innerHTML="Only letters and digits";//error
		err+=1;
	}
	if(b>2018 || b<1970 || !reg2.test(b))
	{
		if(b!="")
		{
			document.getElementById("error2").innerHTML="Only years between 1970 and 2018"//error
			err+=1
		}
	}
	if(!reg3.test(c) && c!="")
	{
		document.getElementById("error3").innerHTML="Only letters";//error
		err+=1
	}
	
	if(err>0)
		return False;
	else
		return True;
}

function search_handler()
{
	if(validation())//if valid then continue
	{

	}
}


function clear_handler()
{
	//clear the red
	document.getElementById("error1").innerHTML="";
	document.getElementById("error2").innerHTML="";
	document.getElementById("error3").innerHTML="";

	//clear searching test
	document.getElementById("com_name").value="";
	document.getElementById("fou_year").value="";
	document.getElementById("fou_name").value="";
}