



$(document).ready(function() {
    // welcome();
    $('#Quiz').click(function (){
        // window.location.href = 'https://phishingquiz.withgoogle.com/';
        window.open('https://phishingquiz.withgoogle.com/', '_blank');
    });

    $('#Quiz1').click(function(){
        window.open('https://www.opendns.com/phishing-quiz/', '_blank');
    });

    $('#Quiz2').click(function () {
        window.open('https://www.phishing.org/how-phish-prone-are-you', '_blank');
    });

    $('#Quiz3').click(function () {
        window.open('https://quizizz.com/admin/quiz/581a144d2502e7a91111817','_blank');
    });
   $('#results').click(function() {
    //    alert('mom')
       $('#results').html('Phishing &#8593  legitimate! &#8595');
   });
});

// function welcome(){



//     // Instance the tour
//     var tour = new Tour({
//         steps: [
//             {
//                 element: ".display-4",
//                 title: "Welcome",
//                 content: "Andy Bernard"
//             },
//             {
//                 element: ".lead",
//                 title: "Education",
//                 content: "You are cheating on me"
//             }
//         ]
//     });

//     // Initialize the tour
//     tour.init();

//     // Start the tour
//     tour.start();











// }