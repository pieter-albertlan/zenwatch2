var isIE=navigator.appName.indexOf("Internet Explorer")!=-1;var ie_version;var ie_renderVersion;var ie_compatibilityMode=false;if(isIE){var ua=navigator.userAgent;var ieRegex=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");if(ieRegex.exec(ua)==null)this.exception="The user agent detected does not contai Internet Explorer.";ie_renderVersion=parseFloat(RegExp.$1);ie_version=ie_renderVersion;if(ua.indexOf("Trident/7.0")>-1){if(ua.indexOf("MSIE 8.0")>-1){ie_compatibilityMode=true;ie_version=11}}else if(ua.indexOf("Trident/6.0")>-1){if(ua.indexOf("MSIE 7.0")>-1){ie_compatibilityMode=true;ie_version=10}}else if(ua.indexOf("Trident/5.0")>-1){if(ua.indexOf("MSIE 7.0")>-1){ie_compatibilityMode=true;ie_version=9}}else if(ua.indexOf("Trident/4.0")>-1){if(ua.indexOf("MSIE 7.0")>-1){ie_compatibilityMode=true;ie_version=8}}else if(ua.indexOf("MSIE 7.0")>-1)ie_version=7;else ie_version=6}
if (!window.console) console = {log: function() {}};
//////
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

//////
var product = document.getElementById("wrap").getAttribute('data-hash-id');
var content_target = '#special-sectionOverview';
//////
if(isIE && ie_version<9){
	var root = document.getElementsByTagName( 'html' )[0];
	root.setAttribute( "class", "ie lt-ie9" );
}
//////
document.write('<link rel="stylesheet" href="websites/global/products/'+product+'/css/style.css">');
// document.write('<script src="/js/cssrefresh.js"></script>');
document.write('<script src="websites/global/products/'+product+'/js/vendor/modernizr.js"></script>');
document.write('<script src="websites/global/products/'+product+'/js/vendor/gsap/plugins/ScrollToPlugin.min.js"></script>');
document.write('<script src="websites/global/products/'+product+'/js/vendor/gsap/TweenMax.min.js"></script>');
document.write('<script src="websites/global/products/'+product+'/js/vendor/gsap/TimelineMax.min.js"></script>');
document.write('<script src="websites/global/products/'+product+'/js/vendor/preloadjs-0.4.1.min.js"></script>');
document.write('<script src="websites/global/products/'+product+'/js/vendor/easeljs-0.7.1.min.js"></script>');
document.write('<script src="websites/global/products/'+product+'/js/vendor/hammer.min.js"></script>');
document.write('<script src="websites/global/products/'+product+'/js/jquery-ui.min.js"></script>');
document.write('<script src="websites/global/products/'+product+'/js/image-sequencer.js"></script>');

//document.write('<script src="websites/global/products/'+product+'/js/android-wear/zenwatch.js"></script>');
//document.write('<script src="websites/global/products/'+product+'/js/android-wear/zenwatch-demo.js"></script>');


if(isMobile.any()){
	document.write('<script src="websites/global/products/'+product+'/js/main.js"></script>');
}
else{
	document.write('<script src="websites/global/products/'+product+'/js/main.js"></script>');
}