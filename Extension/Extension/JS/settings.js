var slideIndex = 1;
// showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

document.addEventListener('DOMContentLoaded', function () {
    $('.logo').html('URL Details')
// alert('Check terneray otpions for 0;s ')
    $('#back').click(function () { window.open('../HTML/popup.html', '_self'); });

    $('#explain').html('Click the button to see all 17 results.')

    $('#buttons').hide();
    $('.dot-container').hide()
    $('#slides1').hide();


    chrome.tabs.query({ active: true, currentWindow: true },
        function (tabs) {
            var taburl = tabs[0].url;
            $("#url").html("The current site is:" + taburl);
        });


    chrome.runtime.getBackgroundPage(function (backgroundPage) {
        // alert(backgroundPage.a);
        $('#score').html('This site is: ' + backgroundPage.score)
        var c_results = backgroundPage.contentresults;
        // 1 is phishing  > -1 is legit
        // alert(typeof(c_results))

    });


    	$('#show').click(function() {
            $('#show').hide();
            $('#explain').hide();
            $('#url').hide()
            $('#buttons').show();
            $('.dot-container').show()
            $('#slides1').show();
            ShowDetails();
	});

});
function ShowDetails(){
    showSlides(slideIndex);
    chrome.runtime.getBackgroundPage(function (backgroundPage) {
        var c_results = backgroundPage.contentresults;


//                                    if       else if   else         
        // else if statement  = X = (y=="")? 1: ___ ? 0 : 2; 



        // having_IP_Address
        c_results[0] >=0 ? $('#result1').html('No IP Address found! &#9989') : $('#result1').html('An IP Address has been found! &#10060');
        // URL_Length
        c_results[1] >= 0 ? $('#result2').html('This URL is less than 74 &#9989 ') : $('#result2').html('This URL is greater than 74 &#10060');
        //Shortning_Service
        c_results[2] >= 0 ? $('#result3').html('No shortening service detected &#9989 ') : $('#result3').html('This might be a phishing website &#10060');
        // having_At_Symbol
        c_results[3] >= 0 ? $('#result4').html('There is no @ symbol &#9989') : $('#result4').html('There is a @ symbol &#10060');
        //'double_slash_redirecting',
        c_results[4] >= 0 ? $('#result5').html('No redirecting present &#9989') : $('#result5').html('Redirecting found &#10060');
        // 'Prefix_Suffix', 
        c_results[5] >= 0 ? $('#result6').html('There is no - detected &#9989') : $('#result6').html('There is a - detected &#10060');
        //'having_Sub_Domain',
        c_results[6] >= 0 ? $('#result7').html('The domain has less than two dots &#9989 ') : $('#result7').html("I have detected more than two dots! &#10060");
        // 	'SSLfinal_State', ,
        c_results[7] >= 0 ? $('#result8').html('Everything checks out! &#9989 ') : $('#result8').html('This site either does not have HTTPS or a valid certificate &#10060 ');
        //'Favicon',
        c_results[8] >= 0 ? $('#result9').html('No issues to worry about &#9989') : $('#result9').html('I have found some issues with this page! &#10060');
        // 'port',
        c_results[9] >= 0 ? $('#resultA').html('This is the correct port number &#9989') : $('#resultA').html('Multiple open ports = Feeding ground for phishing! &#10060');
        //'HTTPS_token',
        c_results[10] >= 0 ? $('#resultB').html('You are safe! &#9989') : $('#resultB').html('STAY CALM AND EXIT THE PAGE &#10060');
        //'Request_URL',
        c_results[11] >= 0 ? $('#resultC').html('This site is Legit! &#9989') : $('#resultC').html('This site is NOT LEGIT!  &#10060');
        // 'URL_of_Anchor',
        c_results[12] >= 0 ? $('#resultD').html('This site has my approval &#9989') : $('#resultD').html('There is an awful lot of a tags... &#10060');
        // 'Links_in_tags',
        c_results[13] >= 0 ? $('#resultE').html('The appropriate amount of meta tags are being used.  &#9989') : $('#resultE').html('Way too much intel gathering going on. &#10060');
        // 'Submit To Email',
        c_results[14] >= 0 ? $('#resultF').html('No bad things found for this feature. &#9989') : $('#resultF').html('Please carefully EXIT THE PAGE!!! &#10060');
        // 'SFH'
        c_results[15] >= 0 ? $('#resultG').html('All good &#9989') : $('#resultG').html('Do not panick! &#10060');
        //'Iframe']
        c_results[16] >= 0 ? $('#resultH').html('All Good! &#9989') : $('#resultH').html('This webpage is doing some shady things.  &#10060');

    });
       
}
    
    //  <!-- Next/prev buttons
    $('.prev').click(function(){
        // alert('back')
        slideIndex-=1;
        currentSlide(slideIndex);
        // plusSlides(-1)
    });

    $('.next').click(function() {
        // alert('next')
        slideIndex+=1
        currentSlide(slideIndex);
        
        // plusSlides(1)


    });


    // < !-- < Dots / bullets / indicators-- > 
    $('#one').click(function(){
        currentSlide(1)
    });
    $('#two').click(function() {
        currentSlide(2)
    });
    $('#three').click(function(){
        currentSlide(3)
    });
    $('#four').click(function () {
        currentSlide(4)
    });
    $('#five').click(function () {
        currentSlide(5)
    });
    $('#six').click(function () {
        currentSlide(6)
    });
    $('#seven').click(function () {
        currentSlide(7)
    });
    $('#eight').click(function () {
        currentSlide(8)
    });
    $('#nine').click(function () {
        currentSlide(9)
    });
    $('#ten').click(function () {
        currentSlide(10)
    });
    $('#eleven').click(function () {
        currentSlide(11)
    });
    $('#twelve').click(function () {
        currentSlide(12)
    });
    $('#thirteen').click(function () {
        currentSlide(13)
    });
    $('#fourteen').click(function () {
        currentSlide(14)
    });
    $('#fifthteen').click(function () {
        currentSlide(15)
    });
    $('#sixteen').click(function () {
        currentSlide(16)
    });









