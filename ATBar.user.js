if(typeof window['AtKit'] == "undefined"){
	// Load AtKit
	
	d=document;jf=d.createElement('script');jf.src=('https:' == document.location.protocol ? 'https://ssl.atbar.org/c' : 'http://c.atbar.org') + '/atkit/AtKit.min.js';jf.type='text/javascript';jf.id='AtKitLib';d.getElementsByTagName('head')[0].appendChild(jf);

	window.AtKitLoaded = function(){
		var eventAction = null;
		
		this.subscribe = function(fn) {
			eventAction = fn;
		};
		
		this.fire = function(sender, eventArgs) {
			if (eventAction != null) {
				eventAction(sender, eventArgs);
			}
		};
	}

	window['AtKitLoaded'] = new AtKitLoaded();
	window['AtKitLoaded'].subscribe(function(){ __start(); });
} else {
	__start();
}

function __start(){
		
	// Start toolbar code
	(function (window, AtKit) { 

		$lib = AtKit.lib();
		
		var settings = {
			'version': '2.0.093-beta5'
		};
		
		settings.baseURL = ('https:' == document.location.protocol ? 'https://ssl.atbar.org/c/ATBar/' : 'http://c.atbar.org/ATBar/');
		
		var plugins = ["ftw", "resize", "fonts", "spell", "dictionary", "vaas-tts", "readability", "css"];
		
		var onLoad = function(){
		
			// Set our logo
			AtKit.setLogo(settings.baseURL + "images/atbar.png");
			AtKit.setName("ATBar");

			AtKit.setLanguage("GB");

			var about = "Version " + settings.version;
			about += "<p style=\"line-height:120%\">Created by <a href=\"http://seb.skus.es/\">Sebastian Skuse</a> and the <a href=\"http://access.ecs.soton.ac.uk/\">Accessibility Team</a>.<br>Web and Internet Science, ECS<br> &copy; University of Southampton 2011.<br><br>Fugue Icons &copy; <a href=\"http://www.pinvoke.com/\">pinvoke</a> under Creative Commons licence, Dictionary &copy; <a href=\"http://en.wiktionary.org/\">Wiktionary</a> under Creative Commons licence.<br><a href=\"http://famspam.com/facebox/\">Facebox</a> jQuery plugin &copy; Chris Wanstrath under MIT licence, Portions of the spelling engine &copy; <a href=\"http://brandonaaron.net\">Brandon Aaron</a> under MIT licence.</p>";
			
			AtKit.setAbout(about);
			
			// Add all the plugins to the toolbar
			
			$lib.each(plugins, function(i, v){
				AtKit.addPlugin(v);
			});

			AtKit.addResetFn('reset-saved', function(){
				AtKit.clearStorage();
			});

			// Select button based on keypress		
			ctrlModifier = false;
			TModifier = false;
			$lib(document).keyup(function (e) {
				if(e.which == 17) ctrlModifier = false;
				if(e.which == 84) TModifier = false;
			}).keydown(function (e) {
				if(e.which == 17) ctrlModifier = true;
				if(e.which == 84) TModifier = true;
				
				// If we don't have the T modifier just get the first button.
				if(e.which == 49 && ctrlModifier && !TModifier) {
					$lib('.at-btn:first a').focus();
					return false;
				} else if( e.which >= 49 && e.which <= 57 && ctrlModifier && TModifier){
					// Select the button at offset
					$lib('.at-btn:eq(' + ( String.fromCharCode(e.which) - 1 ) + ') a').focus();
					return false;
				}
			});		
		
			// Run
			AtKit.render();
			
			// Select the first button.
			$lib('.at-btn:first a').focus();
		};
		
		
		AtKit.importPlugins(plugins, onLoad);
		
		
	}(window, AtKit));

}