// -----------------------------------------------------------------------------ADD A QUIZ ME SECTION--------------------------------------------------------------------
// -------------------------------------------------------------------------------ADD ANOTHER ICON TO IT MAKE IT PERFECT YEA. =======================================

document.addEventListener('DOMContentLoaded',function(){



	document.getElementById('Report').addEventListener('click', Report);
	document.getElementById('Phish').addEventListener('click', Phish);

	document.getElementById('Fire').addEventListener('click',show);
	document.getElementById('apple').addEventListener('click',quiz);
	update();
});



function update(){
	var textArray = [
		'Welcome to the App!',
		'Phishing is a type of cybercrime where someone tries to trick you into giving them personal information online.',
		'If you choose to continue to a phishing site be cautious in the information you give out!',
		'If the site is safe, you will see this: <img src="../PNG/good.png" alt="Smiley face"> ',
		'If you think a site is phishing, click the button below and I will take note',
		'Write a review, if you have comments or suggestions',
		'Click the Learn More button to find out more about phishing!',
		'Click the apple to test your skill! ',
		'Fire is bad! So click on it to see what will pop up when you request to go to a bad site!',
		'If you wanna see the details of this url click the schedule icon',
		'If you see a padlock icon then that means you are communicating securely. &#128274;',
		'Look for mispelled words in a URL. Phishers thrive on mispelled words!<br>Real: google.com Phish: goggle.com',
		'A subdomain is an additional part to your main domain name<br>They are created to organize and navigate to different sections of the website.',
		'Take a look at the domain, if there are more than two dots then they are likely phishing websites',
		'All URLs have domain names, for example: google in www.google.com is a domain. ',
		'Phishers will add ' - ' symbol in the domain name to make the user think its legit',
		"The symbol '//' instructs the browser to redirect to whatever follows after it.<br>URL's should have only have one: 'https://example.com'",
		'More than one // in the URL is a symbol that the website is trying to redirect you to another page.', 
		'Phishing websites live for a short period of time becasue the have only one goal in mind.<br>Real companies pay for domain names for several years in advance.',
		'I check the expiration date for each domain and check to see if the domain is registered for more than 2 years',
		'>When you login to any of ur accounts, your mailbox sends that data to a server to process.<br>If that server is not found or refers to a different domain then I detect it as phishing.',
		"Phishing URL's will likely have a URL Longer than 74 Characters. Check out the .... for details on this URL.",
		'Click the button in the bottom right corner to report a Phishing page'
		];

	var num = Math.floor(Math.random()*textArray.length);
	
	// NEEED TO FIND OUT HOW TO NOT RANDOMIZE THINGS

	// FIND OUT hOw TO DO  NO REPEATING NUMBERS MY GUY
	$("#content").html(textArray[num]);
		
}

function quiz (){
	window.open('../HTML/quiz.html','_self');
	// Create a quiz when you get a chance. 
}

function show(){
	
	// Think about either directing them to a site or something else that will show them. Similar to windows defender
	// chrome.extension.getURL('../HTML/BlockedPage.html')
	window.open('../HTML/BlockedPage.html', '_blank');


}


function Report(){
	// $("#Wu").html("Noted! Way to stay sharp!").fadeToggle(3000);
	window.open('../HTML/settings.html', '_self');  
	//Need to figure out what happens after the submit button is clicked. 
}



function Phish(){
	let badsite =[];
	chrome.tabs.query({ active: true, currentWindow: true },
		function (tabs) {
			// let badsite = p[]
			var taburl = tabs[0].url;
			$("#content").html('I will make a note of this! Way to stay sharp<br>' + taburl + '<br>&#9762 &#9760 &#9763 &#9888;');
			badsite.push(taburl);
			return taburl;
		});
	// alert(badsite);

}