$(document).ready(function(){
	var page = getParameterByName('page');
	if(page === '' || !page) 
		showPage('start');
	else
		showPage(page);
		

	var socket = io.connect();
	  socket.on('connect', function () {
	    socket.on('switch', function (page) {
	      showPage(page);
	    });
	  });
	
	$('ul.nav > li').click(function(){
		var page = $(this).text();
		socket.emit('switch', page);
	});
});

function showPage(page) {
	var content = $('#content');
	
	content.fadeOut('slow', function() {
		$('#content').load(page + '.html', function(){
			content.fadeIn('slow');
		});
	});

}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}