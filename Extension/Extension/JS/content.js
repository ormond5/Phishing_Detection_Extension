// Global vairables. 
let prediciton, testdata; 
let url = window.location.href;
let urlDomain = window.location.hostname;
let onlyDomain = urlDomain.replace('www.', '');
// alert(url);


// -1 = LEGIT, 0 = SUS, 1 = PHISH
// ----------------------------------------------------------
function predict(data,weight){
    let f = 0;
    // It is indeed feature importance'
    //        1) IP   2) URL_L  3)Tiny   4)@symbol   5)//     6) Pre-Suf  7)Subdo 8)SSL      9)favicon  10)port  11)HTTPS  12)request 13)urlAnc 14) links 15)SFh 16)Sub2email, 17)Iframe
    weight = [0.013788, 0.012826, 0.007719, 0.007658, 0.005637, 0.054063, 0.067220, 0.398514, 0.007717, 0.003685, 0.006968, 0.025216, 0.302614, 0.051036, 0.024597, 0.006438, 0.004302];
    for (let i = 0; i< data.length; i++){
        console.log(data[i]);
        f += data[i] * weight[i];
        console.log('The added weights for \n',f);
        // alert(Math.max(...weight));
    }
    console.log(f);
   
    f > 0 ? console.log('Phishing'): console.log('Not Phishing');
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator


    return f > 0 ? 1: -1; // IF F IS GREATER THAN 0 THAN IT IS PHISH IF NOT THEN WE ARE GOOD TO GO
}
// ------------------------------------------------------------

// Only 17 features we removed the other oness

function having_IP_Address(){
    let patt = /(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]?[0-9])(\.|$){4}/;
    let patt2 = /(0x([0-9][0-9]|[A-F][A-F]|[A-F][0-9]|[0-9][A-F]))(\.|$){4}/;
    let ip = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;


    if (ip.test(urlDomain) || patt.test(urlDomain) || patt2.test(urlDomain)) {
        return 1;
        
    } else {
        return -1;
    }

}
//---------------------- 2.  URL Length  ----------------------
function URL_Length(){
    if (url.length < 54) {
        return -1;
    
    } else if (url.length >= 54 && url.length <= 75) {
      return 0;
    } else {
        return 1;
    }
}
//---------------------- 3.  Tiny URL  ----------------------
function TinyURL(){

    let onlyDomain = urlDomain.replace('www.', '');

    if (onlyDomain.length < 7) {
        return 1;
    } else {
        return -1;
    }
}
//---------------------- 4.  @ Symbol  ----------------------
function having_At_Symbol(){
    patt = /@/;
    if (patt.test(url)) { //The test() method tests for a match in a string
        return 1;
    } else {
        return -1;
    }
}
//---------------------- 5.  Redirecting using //  ----------------------
function double_slash_redirecting(){
    if (url.lastIndexOf("//") > 7) {
        return 1;
    } else {
        return -1;
    }

}
//---------------------- 6. (-) Prefix/Suffix in domain  ----------------------

function Prefix_Suffix(){
    
    if (patt.test(urlDomain)) {
        return 1;
    } else {
        return -1;
    }
}

//---------------------- 7.  No. of Sub Domains  ----------------------
function having_sub_domian(){
    if ((onlyDomain.match(RegExp('\\.', 'g')) || []).length == 1) {
        return -1;
    } else if ((onlyDomain.match(RegExp('\\.', 'g')) || []).length == 2) {
        return 0;
    } else {
        return 1;
    }
}

//---------------------- 8.  SSLFinalState  ----------------------

function SSL(){
    patt = /https:\/\//;
    if (patt.test(url)) {
        return -1;
    } else {
        return 1;
    }
}


//---------------------- 10. Favicon  ----------------------

function Favicon(){
    let favicon = undefined;
    let nodeList = document.getElementsByTagName("link");
    for (let i = 0; i < nodeList.length; i++) {
        if ((nodeList[i].getAttribute("rel") == "icon") || (nodeList[i].getAttribute("rel") == "shortcut icon")) {
            favicon = nodeList[i].getAttribute("href");
        }
    }
    if (!favicon) {
        return -1;
    } else if (favicon.length == 12) {
        return -1;
    } else {
        patt = RegExp(urlDomain, 'g');
        if (patt.test(favicon)) {
            return -1;
        } else {
            return 1;
        }
    }
}

    //---------------------- 11. Using Non-Standard Port  ----------------------
function NonPortStd(){
    return -1;
}
    //---------------------- 12.  HTTPS in URL's domain part  ----------------------

function https_in_domain(){
    patt = /https/;
    if (patt.test(onlyDomain)) {
        return 1;
    } else {
        return -1;
    }
}
    // alert(result);

    //---------------------- 13.  Request URL  ----------------------

function requesturl(){
    let imgTags = document.getElementsByTagName("img");

    let phishCount = 0;
    let legitCount = 0;

    patt = RegExp(onlyDomain, 'g');

    for (let i = 0; i < imgTags.length; i++) {
        let src = imgTags[i].getAttribute("src");
        if (!src) continue;
        if (patt.test(src)) {
            legitCount++;
        } else if (src.charAt(0) == '/' && src.charAt(1) != '/') {
            legitCount++;
        } else {
            phishCount++;
        }
    }
    let totalCount = phishCount + legitCount;
    let outRequest = (phishCount / totalCount) * 100;
    //alert(outRequest);

    if (outRequest < 22) {
        return -1;
    } else if (outRequest >= 22 && outRequest < 61) {
        return 0;
    } else {
        return 1;
    }
}
    //---------------------- 14.  URL of Anchor  ----------------------

function url_anchor(){
    let aTags = document.getElementsByTagName("a");

    phishCount = 0;
    legitCount = 0;
    let allhrefs = "";

    for (let i = 0; i < aTags.length; i++) {
        let hrefs = aTags[i].getAttribute("href");
        if (!hrefs) continue;
        allhrefs += hrefs + "       ";
        if (patt.test(hrefs)) {
            legitCount++;
        } else if (hrefs.charAt(0) == '#' || (hrefs.charAt(0) == '/' && hrefs.charAt(1) != '/')) {
            legitCount++;
        } else {
            phishCount++;
        }
    }
    totalCount = phishCount + legitCount;
    outRequest = (phishCount / totalCount) * 100;

    if (outRequest < 31) {
        return -1;
    } else if (outRequest >= 31 && outRequest <= 67) {
        return 0;
    } else {
        return 1;
    }

}
    //---------------------- 15. Links in script and link  ----------------------

function links_inlink(){
    let mTags = document.getElementsByTagName("meta");
    let sTags = document.getElementsByTagName("script");
    let lTags = document.getElementsByTagName("link");

    phishCount = 0;
    legitCount = 0;

    allhrefs = "sTags  ";

    for (let i = 0; i < sTags.length; i++) {
        let sTag = sTags[i].getAttribute("src");
        if (sTag != null) {
            allhrefs += sTag + "      ";
            if (patt.test(sTag)) {
                legitCount++;
            } else if (sTag.charAt(0) == '/' && sTag.charAt(1) != '/') {
                legitCount++;
            } else {
                phishCount++;
            }
        }
    }

    allhrefs += "      lTags   ";
    for (let i = 0; i < lTags.length; i++) {
        let lTag = lTags[i].getAttribute("href");
        if (!lTag) continue;
        allhrefs += lTag + "       ";
        if (patt.test(lTag)) {
            legitCount++;
        } else if (lTag.charAt(0) == '/' && lTag.charAt(1) != '/') {
            legitCount++;
        } else {
            phishCount++;
        }
    }

    totalCount = phishCount + legitCount;
    outRequest = (phishCount / totalCount) * 100;

    if (outRequest < 17) {
        return -1;
    } else if (outRequest >= 17 && outRequest <= 81) {
        return 0;
    } else {
        return 1;
    }
}
    //alert(allhrefs);

    //---------------------- 16.Server Form Handler ----------------------

function serverForm(){  
    let forms = document.getElementsByTagName("form");
    

    for (let i = 0; i < forms.length; i++) {
        let action = forms[i].getAttribute("action");
        if (!action || action == "") {
            
            return 1;
            break;
        } else if (!(action.charAt(0) == "/" || patt.test(action))) {
            return 0;
        }
    }
    return -1;
}
    //---------------------- 17.Submitting to mail ----------------------

function Submitting(){

    let forms = document.getElementsByTagName("form");
    let res = "-1";

    for (let i = 0; i < forms.length; i++) {
        let action = forms[i].getAttribute("action");
        if (!action) continue;
        if (action.startsWith("mailto")) {
            return 1;
            
        }
    }
    return -1;
}
    //---------------------- 23.Using iFrame ----------------------

function Iframe(){
    let iframes = document.getElementsByTagName("iframe");

    if (iframes.length == 0) {
        return -1;
    } else {
        return 1;
    }
}

//---------------------- Sending the result  ----------------------

testdata = [having_IP_Address(), URL_Length(),TinyURL(),having_At_Symbol(),double_slash_redirecting(),Prefix_Suffix(),
having_sub_domian(),SSL(),Favicon(),NonPortStd(),https_in_domain(),requesturl(),url_anchor(),links_inlink(),serverForm(),Submitting(),Iframe()]

testdatacol = ['having_IP_Address', 'URL_Length', 'Shortining_Service','having_At_Symbol', 'double_slash_redirecting', 'Prefix_Suffix','having_Sub_Domain',
 'SSLfinal_State', 'Favicon', 'port', 'HTTPS_token','Request_URL', 'URL_of_Anchor', 'Links_in_tags', 'SFH','Submitting_to_email', 'Iframe']

console.log(testdata);

console.log(typeof(testdata));
prediciton = predict(testdata);
// alert(prediciton)

 
// Send message to background
chrome.runtime.sendMessage(prediciton);
chrome.runtime.sendMessage(testdata);
// chrome.runtime.sendMessage(url);
 let badsites = []
chrome.runtime.onMessage.addListener(function(obtain){
    if (obtain = 'obtain'){
        badsites.push(url);
        console.log(badsites);    
    }
    

});