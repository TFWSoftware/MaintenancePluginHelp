'use strict';

/**
 * Gets the browser name. 
 * This function also caches the result to provide for any 
 * future calls this function has.
 *
 * @returns {string}
 */
var browser = function()
{
// Return cached result if avalible, else get result then cache it.
	if (browser.prototype._cachedResult)
			return browser.prototype._cachedResult;

	var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
	var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
			// At least Safari 3+: "[object HTMLElementConstructor]"
	var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;
	return browser.prototype._cachedResult =
		isOpera ? 'Opera' :
		isFirefox ? 'Firefox' :
		isSafari ? 'Safari' :
		isChrome ? 'Chrome' :
		isIE ? 'IE' :
		isEdge ? 'Edge' :
		"Don't know";
};

// Disable the context menu if the browser is IE. Otherwise leave it enabled for Phil
if (browser() === 'IE')
	document.addEventListener("contextmenu", function(e) { e.preventDefault(); }, false);

//Create the chmfile object for this HTML page
var chmfile = new Object();
chmfile.fullname = "";
chmfile.name = "";
chmfile.path = "";
chmfile.page = "";
getchmfile();

//
// The HTMLHelp engine can access external files as well as files embedded in the CHM.
// However it needs a full absolute path. We don't want to fix an absolute path at design time (obviously, duh)
// so we always use a path relative to the chm file (typically, put the external file in the same folder as the chm
// so we only have to specify the filename).
// Functions here find the path of the chm file and convert a relative path to an absolute path.
//

// Get the path and name of the CHM file and assign object values
function getchmfile()
{
	var ra, sl, a, X, Y, Z, strip;
	ra = /:/;
	a = location.href.search(ra);
	sl = "::";
	Y = location.href.lastIndexOf(sl);
	if (a == 4)
	{ // file: or http:
		Y = location.href.lastIndexOf("/");
		chmfile.page = unescape(location.href.substring(Y + 1));
		if (location.href.substring(0, 7) == "file://")
		{
			strip = 5; // remove 'file:'
			if (location.href[7] == '/') // three slashes
				strip++;
			if (location.href[strip + 3] == ':') // drive letter, remove the two slashes
				strip += 2;
			chmfile.path = unescape(location.href.substring(strip, Y + 1));
		}
	}
	else
	{
		if (a == 2) X = 14; // mk:@MSITStore:
		if (a == 7) X = 7; // ms-its:
		chmfile.fullname = unescape(location.href.substring(X, Y));
		Z = chmfile.fullname.lastIndexOf("\\");
		chmfile.path = unescape(chmfile.fullname.substring(0, Z + 1));
		chmfile.name = unescape(chmfile.fullname.substring(Z + 1));
		chmfile.page = unescape(location.href.substring(Y + 3));
	}
	/*
	alert(location.href+"\n\n"+"fullname="+chmfile.fullname+"\n"+"path="+chmfile.path+"\n"+"name="+chmfile.name+"\n"+"page="+chmfile.page);
	*/
}

function getAbsPath(file)
{
	return chmfile.path + file;
}

/*
		function getEmbedPath(file)
		{
		    //mk:@MSITStore:D:\TFW_WORKSPACE\TFWAPPLICATIONS\_BUILDOUTPUT\RELEASE\PLUGINS\Maintenance.chm::/VID_20151120_120551.mp4
		    return 'mk:@MSITStore:' + chmfile.fullname + '::/' + file;
		}
*/
