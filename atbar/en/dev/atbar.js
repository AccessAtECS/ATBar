if(typeof window['AtKit'] == "undefined"){
	// Load AtKit
	
	d=document;jf=d.createElement('script');jf.src='https://core.atbar.org/atkit/dev/atkit.js';jf.type='text/javascript';jf.id='AtKitLib';d.getElementsByTagName('head')[0].appendChild(jf); 

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
			'version': '2.2.0 Dev'
		};
		
		settings.resources = 'https://core.atbar.org/resources/';
		
		var plugins = ["ftw", "resize", "fonts", "spellng", "dictionary", "insipio-tts", "readability", "wordprediction", "css", "shortcutkeys", "tooltip", "overlay"];
		
		var onLoad = function(){
		
			// Set our logo
			AtKit.setLogo(settings.resources + "img/atbar-beta.png");
			AtKit.setName("ATBar");
			
			if(typeof window["AtKitLanguage"] == "undefined"){
				AtKit.setLanguage("en");
			} else {
				AtKit.setLanguage(window["AtKitLanguage"]);
			}

			var about = "Version " + settings.version;
						
			AtKit.setAbout(about);
			
			// Add all the plugins to the toolbar
			
			$lib.each(plugins, function(i, v){
				AtKit.addPlugin(v);
			});

			AtKit.addResetFn('reset-saved', function(){
				AtKit.clearStorage();
				
				if(typeof localStorage != null) localStorage.removeItem("ATBarAutoLoad");
			});	
			
			AtKit.addCloseFn('close-saved', function(){
				if(typeof localStorage != null) localStorage.removeItem("ATBarAutoLoad");
			});	
		
			// Run
			AtKit.render();
			
			// Select the first button.
			$lib('.at-btn:first a').focus();
			
			// Save state
			if(typeof localStorage != null) localStorage.setItem("ATBarAutoLoad", 1);
		};
		
		
		AtKit.importPlugins(plugins, onLoad);
		
		
	}(window, AtKit));

}