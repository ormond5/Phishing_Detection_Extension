let Results = '';
// 1 == PHISHING, -1 ==LEGITIMATE
// alert(window.location.href);
chrome.runtime.onMessage.addListener(function (prediction) {
    
    if (prediction == 1) {
        // alert("Warning: Phishing detected!!");
        chrome.browserAction.setIcon({path: "PNG/red.png"})
        // alert(window.history.go(-2));
        window.open('../HTML/BlockedPage.html');
        // TTHIS IS A WORK AROUND. CURRENTLY UNBABLE TO FIGURE OUT HOW TO REMOVE LISTENER IF I DETECT A SITE
        // THAT IS NOT PHISHING ON ACCIDENT. SO I WILL JSUT NAVIGATE TO MY PAGE AND THEN LET THEM CLOSE OUT OF IT. 
        return score = 'PHISHING!!';


    }
    else if (prediction == -1) {

        chrome.browserAction.setIcon({ path: 'PNG/good.png' });
        return score = 'LEGITIMATE';     
    }
});


chrome.runtime.onMessage.addListener(function (testdata) {
    // if (typeof(testdata) == Object){
        return contentresults = testdata; 
        // myjson.stringify(testdata);
        // return myjson;
    // }

});




chrome.runtime.onInstalled.addListener(function () {
    console.log('Welcome');
    console.log('I am here to help educate you on what to look for in a url to determine if it is Phishing or a Legitimate site.');
    // 
    // Create dialog BhxBrowser, welcome to ___  My job is blah blah blah. present two buttons, tour and Im good
    // and __ click the button below to take a tour if not just click c
    
});





// chrome.runtime.onMessage.addListener(
//     function (request) { // sender, sendResponse Request get the message sent, The sender get the senders tab id, sendResponse send a message back
//         if (request = "LetMeIn") {
//             console(request);
//             chrome.webRequest.onBeforeRequest.removeListener(redirectfunc);
//             chrome.webRequest.onBeforeRequest.removeListener(filter);
//         }

//     });
// chrome.runtime.onMessage.addListener(
//     function(suspend){
//         if (suspend = 'Suspend'){
//         console.log('Hold on');
//         }
//     }
// )       