//global variable
var companies=new Array();//transform json source into an array

function validation()//to judge whether the search criteria is correct
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
	return err;//err = 0 represents valid
}

function titleInit()//set table title
{
	document.getElementById("result").innerHTML = "";
	var tr = document.createElement("tr");
	tr.innerHTML = "<th>Logo</th><th>Company Name</th><th>Officail Website</th><th>Founded Date</th><th>Founder(s)</th><th>Discription</th>";
	document.getElementById("result").appendChild(tr);  
}


function loadXMLDoc(url, company_name , founded_year, founder_name)
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			companies = JSON.parse(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function QuickSort(array_unordered, left, right)
{
	if(left>=right)
	{
		return;
	}
	var i = left;
	var j = right;
	var key_inf = array_unordered[i];
	var key = array_unordered[i].name;
	while(i<j)
	{
		while(i<j && key<=array_unordered[j].name)
			j=j-1;
		array_unordered[i]=array_unordered[j];
		while(i<j && key>=array_unordered[i].name)
			i=i+1;
		array_unordered[j]=array_unordered[i];
	}
	array_unordered[i]=key_inf;
	QuickSort(array_unordered, left, i-1);
	QuickSort(array_unordered, i+1, right);
}

function print_array(company)
{
	var right = company.length;
	QuickSort(company, 0, right-1);//sort by name

	for (var j=0; j<company.length; j++)//print the array by row
	{
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
		var td3 = document.createElement("td");
		var td4 = document.createElement("td");
		var td5 = document.createElement("td");
		var td6 = document.createElement("td");

		td1.innerHTML='<a target="_blank" href="'+company[j].website+'"> <img id=imgs src="images/'+company[j].logo+'">';
		td2.innerHTML=company[j].name;
		td3.innerHTML='<a target="_blank" href="'+company[j].website+'">'+company[j].website+"</a>";
		td4.innerHTML=company[j].founded_date.substring(0,4)+'.'+company[j].founded_date.substring(4,6)+'.'
		              +company[j].founded_date.substring(6,8);
		td5.innerHTML="";

		var length_founder=company[j].founders.length;
		var i;
		for(i=0;i<length_founder-1;i++)
		{
			td5.innerHTML += company[j].founders[i].first_name+ " " + company[j].founders[i].last_name + ",";
		}
		td5.innerHTML += company[j].founders[length_founder-1].first_name+ " " + company[j].founders[length_founder-1].last_name;

		td6.innerHTML = company[j].description;

		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tr.appendChild(td5);
		tr.appendChild(td6);
		document.getElementById("result").appendChild(tr);
	}
}

function searchResult(company_name, founded_year, founder_name)//serach the result by three conditions
{
	var resultArray = new Array();
	if(company_name=="" && founded_year=="" && founder_name=="")//print all when there is nothing input
	{
		resultArray=companies;
		titleInit();
		print_array(resultArray);
		return;
	}
	
	for(var i=0;i<companies.length;i++)
	{
		var a = companies[i].name.toLowerCase().match(company_name.toLowerCase());
		var b = companies[i].founded_date.match(founded_year);
		var fullName = "";
		for(j=0;j<companies[i].founders.length;j++)
		{
			fullName += companies[i].founders[j].first_name + " " + companies[i].founders[j].last_name + " ";
		}
		var c = fullName.toLowerCase().match(founder_name.toLowerCase());

		//if one of the variables equals to 'null',then this company is not what we need  
		if(a && b && c)
		{
			resultArray.push(companies[i]);
		}
	}
	titleInit();
	print_array(resultArray);
	return;
}

function search_handler()
{
	var Is_valid=validation();

	//clear
	document.getElementById("result").innerHTML = "";
	document.getElementById("result").style.visibility = "hidden";

	if(Is_valid == 0)//if valid
	{
		var company_name=document.getElementById("com_name").value;
		var founded_year=document.getElementById("fou_year").value;
		var founder_name=document.getElementById("fou_name").value;
	
		loadXMLDoc("data/companies.json", company_name , founded_year, founder_name);
		searchResult(company_name, founded_year, founder_name);
		document.getElementById("result").style.visibility="visible";
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

	//clear the table
	document.getElementById("result").innerHTML = "";
	document.getElementById("result").style.visibility = "hidden";
}