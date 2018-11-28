$(function(){
	function checkResource(url, interval){
		var etag = null;
		var fn = function(){
			$.ajax({
				type: 'HEAD'
				, async: true
				, url: url
				, cache: false
			}).done(function(msg, txt, xhr){
				if(etag === null){
					etag = xhr.getResponseHeader('ETag');
					setTimeout(fn, interval);
				}else if(etag != xhr.getResponseHeader('ETag')){
					console.log('reload ' + url);
					window.location.reload();
				}else{
					setTimeout(fn, interval);
				}
			});
		};
		return fn;
	}
	var interval = 1000;
	setTimeout(checkResource(window.location.pathname, interval));
	console.log("현재 문서 변경 추적 시작");

	$("head>link").each(function(i, el){
		setTimeout(checkResource($(el).attr('href'), interval));
	});
	console.log("현재 문서 스타일 변경 추적 시작");

	$("head>script").each(function(i, el){
		setTimeout(checkResource($(el).attr('src'), interval));
	});
	console.log("현재 문서 스크립트 변경 추적 시작");


});