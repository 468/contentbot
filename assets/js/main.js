$(document).ready(function(){

	$( "#ilink" ).click(function() {
		$('#i').fadeOut();
		$('#info').fadeIn();
		$('#camera-select').fadeOut();
	});

	$('#infoclose').click(function(){
		$('#info').fadeOut();
		$('#i').fadeIn();
		$('#camera-select').fadeIn();
	})

	$('#angle-one').click(function(){
		camera.position.set(500, 120, 0);
	})

	$('#angle-two').click(function(){
		camera.position.set(180, 80, -10);
	})

	$('#about').html( twemoji.parse("<img src='assets/img/contenbot-render-3-small.png' id='cb-render3' /><br>Contentbot relentlessly browses the web looking for 🔥 new content to engage with & share on a 24/7 basis - watch it work in real time. Tweet attitudes are constructed via rudimentary sentiment analysis of the link's body.", { size:16 }) );

});