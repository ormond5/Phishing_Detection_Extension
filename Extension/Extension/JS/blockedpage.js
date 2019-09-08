
$(document).ready(function(){



let url = window.location.href;

  $("#url_site").html(url);
  
  $(".button").click(function(){
    window.history.go(-2); ///History back() Method
  })

  $(".learn").click(function () {
    window.location.href = '../HTML/phishinginfopage.html';
    //alert('Add bootstrap to manifest')
  })

  $(".Continue").click(function(){
    // chrome.tabs.update({ url: 'HTML/phishinginfopage.html' });
    window.close();
    // alert(b);
  });

$('#error').click(function(){
  // alert(typeof(url));
  Adding(url);
  // notPhish.psuh(url);
  // alert(a);
  window.close();

});


});

function Adding(url){
  let notPhishList = [];
  notPhishList.push(url);
  
  // console.log(notPhishList);
}