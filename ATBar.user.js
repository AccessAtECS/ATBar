if(typeof AtKit == "undefined"){
	// Load AtKit
	d=document;jf=d.createElement('script');jf.src='http://c.atbar.org/atkit/AtKit.js';jf.type='text/javascript';jf.id='AtKitLib';d.getElementsByTagName('head')[0].appendChild(jf);

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

	window.AtKitLoaded = new AtKitLoaded();
	window.AtKitLoaded.subscribe(function(){ __start(); });
} else {
	__start();
}

function __start(){
		
	// Start toolbar code
	(function (window, AtKit) { 
		// Have we already been loaded?
		console.log("is rendered?" + AtKit.isRendered());
		//if(AtKit.isRendered()) return;

		$ = AtKit.lib();
		
		var settings = {
			'baseURL': 'http://c.atbar.org/ATBar/',
			'serverURL': 'http://a.atbar.org/',
			'version': '2.0.057d',
			'ttsChunkSize': 1500
		};
		
		var language = {
			buttons: {
				"resizeUp": "&#1586;&#1612;&#1575;&#1583;&#1577; &#1581;&#1580;&#1605; &#1575;&#1604;&#1582;&#1591;",
				"resizeDown": "&#1575;&#1606;&#1602;&#1575;&#1589; &#1581;&#1580;&#1605; &#1575;&#1604;&#1582;&#1591;",
				"fontSettings": "&#1578;&#1594;&#1612;&#1612;&#1585; &#1606;&#1608;&#1593; &#1608;&#1606;&#1605;&#1591; &#1575;&#1604;&#1582;&#1591;",
				"spell": "&#1575;&#1604;&#1578;&#1583;&#1602;&#1612;&#1602; &#1575;&#1575;&#1604;&#1605;&#1575;&#1604;&#1620;&#1610;&#1611;",
				"dictionary": "&#1575;&#1604;&#1602;&#1575;&#1605;&#1608;&#1587;",
				"TTS": "&#1578;&#1581;&#1608;&#1612;&#1604; &#1575;&#1604;&#1606;&#1589; &#1575;&#1604;&#1593;&#1585;&#1576;&#1611; &#1621;&#1575;&#1604;&#1609; &#1603;&#1575;&#1604;&#1605;",
				"CSS": "&#1578;&#1594;&#1612;&#1612;&#1585; &#1605;&#1592;&#1607;&#1585; &#1575;&#1604;&#1589;&#1601;&#1581;&#1577; &#1575;&#1604;&#1581;&#1575;&#1604;&#1612;&#1607;"
			}
		};
		
		
		// Set our logo
		AtKit.setLogo(settings.baseURL + "images/atbar.png");
		
		AtKit.setName("ATBar");
		
		AtKit.setAbout("ATBar Version " + settings.version);
		
		// Add the Fix The Web button.
		AtKit.addButton(
			'ftw',
			'Create a fix the web report about this page (opens in a popup window)',
			settings.baseURL + 'images/FTW.png',
			function(dialogs, functions){
				loc = window.location.toString();
				loc = loc.replace(window.location.hash.toString(), "");
				var url = "http://www.fixtheweb.net/frame/report?url=" + encodeURI(loc);
				
				var load = window.open(url,'','scrollbars=no,menubar=no,height=260,width=370,resizable=no,toolbar=no,location=no,status=no');
				if (window.focus) {load.focus()}
				
				var externalWindow = load.document;
				
				externalWindow.all['edit-field-report-url'].focus();
			}, 
			null, null
		);
		
		
		// Text resizing
		AtKit.addFn('resizeText', function(multiplier){
			var current = parseFloat($('body').css('font-size'));
		
			var mult = parseFloat(multiplier);
			var newVal = parseFloat(current + mult);
		
			$('body').css('font-size', newVal + "px" );
			AtKit.storage('pageFontSize', newVal);
		});
		
		// If we have a stored fontsize for this page, restore it now.
		var stored_fontSize = AtKit.storage('pageFontSize');
		if(stored_fontSize != false) $('body').css('font-size', stored_fontSize + "px" );
		
		AtKit.addButton(
			'resizeUp', 
			language.buttons.resizeUp,
			settings.baseURL + 'images/font_increase.png',
			function(dialogs, functions){
				AtKit.call('resizeText', '1');
			},
			null, null
		);
		
		AtKit.addButton(
			'resizeDown', 
			language.buttons.resizeDown,
			settings.baseURL + 'images/font_decrease.png',
			function(dialogs, functions){
				AtKit.call('resizeText', '-1');
			},
			null, null
		);
		// End text resizing
		
		
		// Font settings
		var fontDialogs = {
			"main": "<h1>Page font settings</h1><label for=\"sbfontface\">Font Face:</label> <select id=\"sbfontface\"><option value=\"sitespecific\">--Site Specific--</option><option value=\"arial\">Arial</option><option value=\"courier\">Courier</option><option value=\"cursive\">Cursive</option><option value=\"fantasy\">Fantasy</option><option value=\"georgia\">Georgia</option><option value=\"helvetica\">Helvetica</option><option value=\"impact\">Impact</option><option value=\"monaco\">Monaco</option><option value=\"monospace\">Monospace</option><option value=\"sans-serif\">Sans-Serif</option><option value=\"tahoma\">Tahoma</option><option value=\"times new roman\">Times New Roman</option><option value=\"trebuchet ms\">Trebuchet MS</option><option value=\"verdant\">Verdana</option></select><br /><br /> <label for=\"sblinespacing\">Line Spacing:</label> <input type=\"text\" name=\"sblinespacing\" id=\"sblinespacing\" maxlength=\"3\" size=\"3\" value=\"100\">%<br /><br /><button id='ATApplyFont'> Apply</a></div>"
		};
		
		AtKit.addFn('changeFont', function(args){
			if(args.fontFace != "--Site Specific--") $('body').css('font-family', args.fontFace);
			
			$('div').css('line-height', args.lineHeight + "%");
			$('#sbar').css('line-height', '0%');
			AtKit.storage('pageFont', args.fontFace);
			AtKit.storage('pageLineHeight', args.lineHeight);
		});
		
		AtKit.addButton(
			'fontSettings', 
			language.settings.fontSettings,
			settings.baseURL + 'images/font.png',
			function(dialogs, functions){
				AtKit.message(dialogs.main);
				
				var storedFont = AtKit.storage('pageFont');
				if(storedFont != false) $('#sbfontface').children('option[value="' + storedFont + '"]').attr('selected', 'selected');
				
				$('#ATApplyFont').click(function(){
					AtKit.call('changeFont', { 
						'fontFace': $('#sbfontface').val(),
						'lineHeight': $('#sblinespacing').val()
					});
				});
				
				$("#sbfontface").focus();
			},
			fontDialogs, null
		);
		
		
		// Spell checker
		settings.spellcheckerLoading = false;
		AtKit.addButton(
			'spell', 
			language.settings.spell,
			settings.baseURL + 'images/spell-off.png',
			function(dialogs, functions){
				if(settings.spellcheckerLoading) return;
				settings.spellcheckerLoading = true;
				
				AtKit.addScript(settings.baseURL + 'spell.js', function(){ 
					
					// Are there any TinyMCE fields on this page?
					if((typeof AtKit.__env.window.tinyMCE) != 'undefined'){
						tinyMCE = AtKit.__env.window.tinyMCE;
						
						tinyMCE.activeEditor.onKeyPress.add(function(ed, e) {
							var content = tinyMCE.activeEditor.getContent();
							if ( rteSpellTimer ) window.clearTimeout(rteSpellTimer);
							rteSpellTimer = window.setTimeout(function() { $("#" + tinyMCE.activeEditor.editorContainer).rteSpellCheck(content, tinyMCE.activeEditor, { useXHRMethod: AtKit.__env.transport, RTEType: 'tMCE' }); }, 750);
						});
					}
					
					if((typeof AtKit.__env.window.CKEDITOR) != 'undefined'){
						CKE = AtKit.__env.window.CKEDITOR;
						for(var o in CKE.instances){
						   	CKE.instances[o].document.on('keypress', function(){
					    		if ( rteSpellTimer ) window.clearTimeout(rteSpellTimer);
					    		var content = CKE.instances[o].getData();
					    		rteSpellTimer = window.setTimeout(function() { $("#" + CKE.instances[o].element.getId()).rteSpellCheck(content, CKE.instances[o], { useXHRMethod: AtKit.__env.transport, RTEType: 'CKE' }); }, 750);
					    	});
						}
					}
					
					
					$("textarea").spellcheck({ useXHRMethod: AtKit.__env.transport, baseURL: settings.baseURL });
					$('input[type=text]').spellcheck({ useXHRMethod: AtKit.__env.transport, baseURL: settings.baseURL });
					
					$('#at-lnk-spell').find('img').attr('src', settings.baseURL + "images/spell.png");
					
				
				});
				
			},
			null, null
		);
		
		// Dictionary
		
		AtKit.addFn('parseDictionaryResponse', function(input){
	
			// Remove translations blocks.
			output = input.replace(/^((?:={2,})+translations(?:={2,})+.*?)((?:={2,}).*?(?:={2,})|(?:-{4}))/ig, '$2');	
			
			// Replace headings.
			var output = output.replace(/(={2,})+(.*?)(?:={2,})+/ig, function(match, g1, g2, position, input) {
		    	return "<h" + g1.length + ">" + g2 + "</h" + g1.length + ">";
		    });
		    
		    // Remove comments
		    var output = output.replace(/(<!--.*?-->)/ig, '');
			
			// Replace bold / italics.
			output = output.replace(/(('+){1}(.*?)(?:'+){1})/ig, function(match, g1, g2, g3, position, input){
				switch(g2.length){
				
					case 2:
						return "<em>" + g3 + "</em>";
					break;
					
					case 3:
						return "<b>" + g3 + "</b>";
					break;
					
					case 5:
						return "<em><b>" + g3 + "</b></em>";
					break;
				}
			
			});
			
			// Replace text in curley brackets.
			output = output.replace(/(\{\{(?:(.*?)\|)+(.*?)\}\})/ig, function(match, g1, g2, g3, position, input){
				switch(g2.toLowerCase()){
					case 'also':
						return "See also: " + g3;
					break;
					
					case 'ipa':
						return g3;
					break;
					
					case 'audio':
						return "";
					break;
					
					default:
						return g3;	
					break;
				}
			});
			
			// Replace lists.
			output = output.replace(/([#|\*]+(.*?)\n)/ig, '<li>$2</li>');
			
			// Replace unmatched doublebraces.
			output = output.replace(/(\{\{(\w{1,})\}\})/ig, "<i>$2</i>");
			
			output = output.replace(/(\[\[(.*?)\]\])/ig, "$2");
			
			return output;
	
		});
		
		AtKit.addButton(
			'dictionary', 
			language.buttons.dictionary,
			settings.baseURL + 'images/book_open.png',
			function(dialogs, functions){
				var data = eval("\"" + AtKit.call('getSelectedText', true) + "\";");
				
				if(data != ""){
					$("#at-lnk-dictionary").children('img').attr('src', settings.baseURL + "images/loading.gif");
					
					$.getJSON( settings.serverURL + 'xmlhttp/remote.php?rt=dict&titles=' + encodeURI(data.toLowerCase()) + '&v=2&callback=?', function(data){
						ro = data;
						for(var result in ro.query.pages){
							if(result > -1){
								var definition = eval("ro.query.pages[\"" + result + "\"].revisions[0][\"*\"];");
								var title = eval("ro.query.pages[\"" + result + "\"].title;");
								// Format the wikicode into something we can read in HTML.
								//console.log(definition);
								
								definition = AtKit.call('parseDictionaryResponse', definition);
							} else {
								var definition = "Unknown word";
								var title = eval("ro.query.pages[\"-1\"].title;");
							}
						}
						
						AtKit.message("<h2>Dictionary Definition for \"" + title + "\"</h2><div class=\"constrainContent\">" + definition + "</div>");
						$("#at-lnk-dictionary").children('img').attr('src', settings.baseURL + "images/book_open.png");
					});
					
				} else {
					$.facebox("<h2>Dictionary</h2><p>To use the dictionary select a word on the page and click the dictionary button.</p>");
					$("#at-lnk-dictionary").children('img').attr('src', settings.baseURL + "images/book_open.png");
				}
			},
			null, null
		);

		
		// Text to speech
		var TTSDialogs = {
			"options": {
				"title":"Text to Speech options",
				"body": "What do you want to convert to speech? <br /><button id=\"sbStartTTS\"> Entire page</button> <button id=\"sbStartTTSSelection\"> Selected text</button>"
			},
			"starting": {
				"title": "Text To Speech",
				"body": "<center>Text to Speech conversion is taking place. <br /><img src='" + settings.baseURL + "images/loadingbig.gif' /><br />Time remaining: <div id='sbttstimeremaining'>calculating</div><br />Please wait... </center>"
			}
		};
		var TTSFunctions = {};
		var TTSExtendedObject = {
			clickEnabled: true, 
			positition: "", 
			playingItem: "",
			"TTSButtons": {
				'ttsPlay': { 
					'tooltip': "Play / Pause",
					'icon': settings.baseURL + "images/control-pause.png",
					'fn': function(){
						var targetObj = ($.browser == "msie") ? swfobject.getObjectById(AtKit.get('ATAudioPlayerID')) : window.document['audioe'];
						targetObj.sendEvent('play');
					}
				},
				'ttsRewind': {
					'tooltip': "Rewind",
					'icon': settings.baseURL + "images/control-stop-180.png",
					'fn': function(){
						var scrubAmount = 2;
						var currentPosition = AtKit.get("TTS_position");
						var newPosition = (currentPosition - scrubAmount);
						if(newPosition < 0) newPosition = 0;

						var targetObj = ($.browser == "msie") ? swfobject.getObjectById(AtKit.get('ATAudioPlayerID')) : window.document['audioe'];
						targetObj.sendEvent('seek', newPosition);
					}
				},
				'ttsStop': {
					'tooltip': "Stop & Close TTS",
					'icon': settings.baseURL + "images/control-stop-square.png",
					'fn': function(){
						var targetObj = ($.browser == "msie") ? swfobject.getObjectById(AtKit.get('ATAudioPlayerID')) : window.document['audioe'];
						targetObj.sendEvent('stop');

						AtKit.call('TTSRemoveControlBox');
					}
				}
			}
		};		
		
		
		AtKit.addFn('b64', function(input){
			// + == _
			// / == -
			var bkeys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-=";
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
		
			input = AtKit.call('utf8_encode', input);
		
			while (i < input.length) {
		
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
		
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
		
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
		
				output = output +
				bkeys.charAt(enc1) + bkeys.charAt(enc2) +
				bkeys.charAt(enc3) + bkeys.charAt(enc4);
		
			}
		
			return output;		
		});
		
		AtKit.addFn('utf8_encode', function(string){
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";
		
			for (var n = 0; n < string.length; n++) {
		
				var c = string.charCodeAt(n);
		
				if (c < 128) {
					utftext += String.fromCharCode(c);
				} else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				} else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
		
			}
		
			return utftext;	
		});
		
		AtKit.addFn('sendTTSChunk', function(args){
			if(args.block == 1){
				var start = 0;
			} else {
				var start = (settings.ttsChunkSize * args.block);
			}
			
			if( (start + settings.ttsChunkSize) > args.fullData.length ){
				var endPoint = args.fullData.length;
			} else {
				var endPoint = (start + settings.ttsChunkSize);
			}
			
			var payload = args.fullData.substring(start, endPoint);
		
			var urlString = settings.serverURL + 'xmlhttp/remote.php?rt=tts&v=2&id=' + args.reqID + '&data=' + payload + "&chunkData=" + args.totalBlocks + "-" + args.block;
			if( args.block == args.totalBlocks-1 ){
				urlString += "&page=" + encodeURIComponent(window.location);
			}
			
			urlString += "&callback=?";
			
			$.getJSON(urlString, function(RO){
				$("#compactStatus").html(args.block + " / " + args.totalBlocks);
				
				var errorTitle = "<h2>Oops!</h2>";
				if(args.block == args.totalBlocks){
					// Finished request..
					AtKit.show(TTSDialogs.starting);
					if(RO.status == "encoding"){
						AtKit.call('countdownTTS', { 'timeLeft':(RO.est_completion / RO.chunks), 'id': RO.ID });
					} else if(RO.status == "failure" && RO.reason == "overcapacity"){
						AtKit.message(errorTitle + "<p>The server is currently over capacity for text to speech conversions. Please try again later.</p>");
					} else if(RO.status == "failure" && RO.message == "") {
						AtKit.message(errorTitle + "<p>Something went wrong while we were converting this page to text. Please try again shortly.</p>");
					} else {
						AtKit.message(errorTitle + "<p>" + RO.reason + " " + RO.data.message + "</p>");
					}

				} else {
					// Send the next block.
					if(RO.data.message == "ChunkSaved"){
						AtKit.call('sendTTSChunk', { 'fullData':args.fullData, 'block':(args.block + 1), 'totalBlocks':args.totalBlocks, 'reqID':args.reqID });
					} else {
						AtKit.message("<h2>Error</h2><p>An error occurred on the server. Please try again later.</p>");
					}
				}				
				
			});
		
		});
		
		AtKit.addFn('countdownTTS', function(arg){
			if(isNaN(arg.timeLeft)){
				AtKit.message("<h2>Oops!</h2> <p>Something went wrong while we were converting this page to text (received a NaN for timeLeft).</p>");
			} else {
				if(arg.timeLeft == 0){

					// Play audio
					var audioContainer = "audioo";
					
					if($.browser != "msie"){
						$('#sbar').prepend( $("<div id=\"flashContent\"><OBJECT classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0\" width=\"1\" height=\"1\" id=\"audioe\"> <PARAM name=movie value=\"" + settings.serverURL + "TTS/player/player-licensed.swf\"></PARAM> <PARAM name=flashvars value=\"file=" + settings.serverURL + "TTS/cache/" + arg.id + ".xml&autostart=true&playlist=bottom&repeat=list&playerready=playerReady&id=" + audioContainer + "\"><PARAM name=allowscriptaccess value=\"always\" /><embed type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" src=\"" + settings.serverURL + "TTS/player/player-licensed.swf\" width=\"1\" height=\"1\" allowscriptaccess=\"always\" allowfullscreen=\"false\" flashvars=\"file=" + settings.serverURL + "TTS/cache/" + arg.id + ".xml&autostart=true&playlist=bottom&repeat=list&playerready=playerReady\" name=\"audioe\" /> </OBJECT></div>") );
					
						AtKit.call('setupTTSListeners');
					} else {
						
						$("<div />", {'id': 'flashContent' }).prependTo("#sbar");
						

						var params = {
						  flashvars: "file=" + settings.serverURL + "TTS/cache/" + arg.id + ".xml&autostart=true&playlist=bottom&repeat=list&playerready=playerReady&id=" + audioContainer,
						  allowscriptaccess: "always"
						};
						var attributes = {
						  id: audioContainer,
						  name: audioContainer
						};
						
						swfobject.embedSWF(settings.serverURL + "TTS/player/player-licensed.swf", "flashContent", "1", "1", "9.0.0","expressInstall.swf", false, params, attributes, function(){
							AtKit.call('setupTTSListeners');
						});
					
					}

					$(document).trigger('close.facebox');
					
				} else {
					$('#sbttstimeremaining').html( arg.timeLeft + " seconds" );
					window.setTimeout(function(){ AtKit.call('countdownTTS', { 'timeLeft':(arg.timeLeft - 1), 'id':arg.id }) }, 1000);
				}
			}
		});
		
		AtKit.addFn('setupTTSListeners', function(args){
			if(AtKit.get('TTS_Listeners_setup') == true) return;

			window.playerReady = function(obj) {
				
				AtKit.set('ATAudioPlayerID', obj.id);

				for(b in TTSExtendedObject.TTSButtons){
					var obj = TTSExtendedObject.TTSButtons[b];
					AtKit.addButton(b, obj.tooltip, obj.icon, obj.fn);
				}
				
				// Set values.
				AtKit.set("TTS_position", 0);
				AtKit.set("TTS_playingItem", 0);
				
				// Add page listeners
				var playerObj = swfobject.getObjectById(obj.id);
				
				if($.browser != "msie"){
					playerObj = window.document["audioe"];
				}

				playerObj.addModelListener("STATE", "ATBarAudioStateListener");
				playerObj.addModelListener("TIME", "ATBarAudioTimeMonitor");
				playerObj.addControllerListener("ITEM", "ATBarAudioItemMonitor");
				
			}

			window.ATBarAudioTimeMonitor = function(obj){
				AtKit.set('TTS_position', obj.position);
			}

			window.ATBarAudioItemMonitor = function(obj){
				AtKit.set('TTS_playingItem', obj.index);
			}

			window.ATBarAudioStateListener = function(obj) {
				var state = obj.newstate;

				var playerObj = swfobject.getObjectById(obj.id);
				
				if($.browser != "msie"){
					playerObj = window.document["audioe"];
				}
				
				if(state == "COMPLETED" && (AtKit.get('TTS_playingItem') + 1) == playerObj.getPlaylist().length){
					// Completed, remove controlbox and reset everything back to normal.
					AtKit.call('TTSRemoveControlBox');
				}

				if(state == "IDLE" || state == "PAUSED") {
					$('#at-lnk-ttsPlay').children('img').attr('src', settings.baseURL + "images/control.png");
					$('#at-btn-tts').children('img').attr('src', settings.baseURL + "images/sound.png").css('padding-top', '6px');
				} else {
					if(AtKit.get('TTS_clickEnabled') == false){
						$('#at-lnk-ttsPlay').children('img').attr('src', settings.baseURL + "images/control-pause.png");
						$('#at-btn-tts').children('img').attr('src', settings.baseURL + "images/loading.gif").css('padding-top', '8px');
					}
				}
			}
		
			AtKit.set('TTS_Listeners_setup', true);
		});
		
		AtKit.addFn('TTSRemoveControlBox', function(){
			AtKit.removeButton('ttsPlay');
			AtKit.removeButton('ttsRewind');
			AtKit.removeButton('ttsStop');

	      	$("#flashContent").remove();
	      	$('#at-lnk-tts').children('img').attr('src', settings.baseURL + "images/sound.png").css('padding-top', '6px');
	      	AtKit.set('TTS_clickEnabled', true);
		});

		AtKit.set('TTS_clickEnabled', true);

		AtKit.addButton(
			'tts', 
			language.buttons.TTS,
			settings.baseURL + 'images/sound.png',
			function(dialogs, functions){
				if(AtKit.set('TTS_clickEnabled') == false) return;

				AtKit.show(dialogs.options);
				AtKit.set('TTS_Listeners_setup', false);

				AtKit.addScript(settings.baseURL + '/swfobject.js', null);

				$('#sbStartTTS').click(function(e){ 
					// Get page contents.
					var pageData = $(document.body).clone();
					
					pageData.find('script, noscript, style, #facebox_overlay, #sbar, #sbarGhost, #facebox, br, img').remove();
					
					
					// Remove comments
					pageData = String(pageData.html()).replace(/<!---.*--->/g, '');
					pageData.replace(/[\n\r]+/g, '');
					
					console.log(pageData);
					
					pageData = AtKit.call('b64', pageData);
		
					var chunks = Math.ceil(pageData.length / settings.ttsChunkSize);
					
					if(chunks > 0){
						var reqID = Math.floor(Math.random() * 5001);
						
						AtKit.message( "<h2>Processing</h2><p>Compacting and transmitting data...<br /><div id='compactStatus'>0 / " + chunks + "</div></p>" );
						
						AtKit.call('sendTTSChunk', { 'fullData':pageData, 'block':1, 'totalBlocks':chunks, 'reqID':reqID });
					} else {
						AtKit.message( "<h2>Oops!</h2><p>There doesn't seem to be any content on this page, or we can't read it.</p>" );
					}
					
				});

				$('#sbStartTTSSelection').click(function(e){ 
				
					AtKit.set('TTS_clickEnabled', false);

					var selectedData = AtKit.call('getSelectedText');
				
					if(selectedData != ""){
				
						this.clickEnabled = false;
						
						// Send the data in chunks, as chances are we cant get it all into one request.
						var transmitData = AtKit.call('b64', selectedData );
						
						var chunks = Math.ceil(transmitData.length / settings.ttsChunkSize);
						
						if(chunks > 0){
							var reqID = Math.floor(Math.random() * 5001);
							
							AtKit.message( "<h2>Processing</h2><p>Compacting and transmitting data...<br /><div id='compactStatus'>0 / " + chunks + "</div></p>" );
							
							AtKit.call('sendTTSChunk', { 'fullData':transmitData, 'block':1, 'totalBlocks':chunks, 'reqID':reqID });
						} else {
							AtKit.message( "<h2>Oops!</h2><p>There doesn't seem to be any content on this page, or we can't read it.</p>" );
						}
						
					} else {
						AtKit.message("<h2>Text-to-Speech</h2><p>To use the text to speech feature with selected text, please first select the text on this page that you would like to convert. After you have done this, click the Text to Speech button, and select the 'selected text' option.</p>");
					}				
				
				});
				
			},
			TTSDialogs, TTSFunctions, TTSExtendedObject
		);
		
		
		// CSS button
		var CSSDialogs = {
			"main": {
				"title":"Change colour settings",
				"body":"<button id=\"sbColourChange\"> Change Toolbar colour</button> <br /><button id=\"sbChangeSiteColours\"> Change text and link colours</button><br /> <button id=\"sbAttachCSSStyle\">Change page style</button>"
			},
			"toolbar": {
				"title":"Change ATbar colour",
				"body":"<label for=\"sbbackgroundcolour\">Background Colour:</label><input type=\"text\" name=\"sbbackgroundcolour\" id=\"sbbackgroundcolour\"> <button id=\"sbSetColour\">Set</button> <br /> <p><button onclick=\"document.getElementById('sbbackgroundcolour').value = 'black';\">Black</button> <button onclick=\"document.getElementById('sbbackgroundcolour').value = 'white';\">White</button> <button onclick=\"document.getElementById('sbbackgroundcolour').value = 'grey';\">Grey</button></p> <br /> <button id=\"sbRandomColour\"> Random</button> <button id=\"sbColourReset\">Reset to Default</button>"
			},
			"siteColours": {
				"title": "Change text and link colours",
				"body": "<label for=\"sbtextcolour\" style=\"display:block\">Text Colour: </label><select id=\"sbtextcolour\" name=\"sbtextcolour\"><option value=\"original\">--Original--</option><option value=\"B80028\">Red</option><option value=\"194E84\">Blue</option><option value=\"60BB22\">Green</option><option value=\"FDB813\">Yellow</option><option value=\"F17022\">Orange</option><option value=\"000000\">Black</option><option value=\"A8B1B8\">Grey</option><option value=\"FFFFFF\">White</option></select><br /><label for=\"sblinkcolour\" style=\"display:block\">Link Colour: </label><select id =\"sblinkcolour\"><option value=\"original\">--Original--</option><option value=\"B80028\">Red</option><option value=\"194E84\">Blue</option><option value=\"60BB22\">Green</option><option value=\"FDB813\">Yellow</option><option value=\"F17022\">Orange</option><option value=\"000000\">Black</option><option value=\"A8B1B8\">Grey</option><option value=\"FFFFFF\">White</option></select> <br /><br /><button id=\"applyPageColours\">Apply</button>"
			},
			"CSSStyles":{
				"title": "Change page style",
				"body": "<button id=\"sbApplyCSS-wb\">Black on White</button><br /> <button id=\"sbApplyCSS-wbw\">White on Black</button><br /> <button id=\"sbApplyCSS-yb\">Yellow on Black</button><br /> <button id=\"sbApplyCSS-by\">Black on Yellow</button><br /> <button id=\"sbApplyCSS-gw\">White on Grey</button>"
			}
		};
		
		CSSFunctions = {
			"changeToolbar": function(){
				$("#sbbackgroundcolour").focus();
				
				$('#sbRandomColour').click(function(){ AtKit.call('setColour', "rand"); });
				$('#sbSetColour').click(function(){ AtKit.call('setColour', $("#sbbackgroundcolour").val() ); });
				$('#sbColourReset').click(function(){ AtKit.call('setColour', "#EBEAED"); });
			},
			"siteColours": function(){
				$('#applyPageColours').click(function(e){ 			
					if( $('#sbtextcolour').val() != "undefined" && $('#sbtextcolour').val() != "original" ){
						$('*').css('color', "#" + $('#sbtextcolour').val());
					}
					
					if( $('#sblinkcolour').val() != "undefined" && $('#sblinkcolour').val() != "original" ){
						$('a').css('color', "#" + $('#sblinkcolour').val());
					}
				});
				
				$('#sblinkcolour').keypress(function(e){ 
					if(e.keyCode == 13){  
						if( $('#sbpagebackgroundcolour').val() != "undefined"){
							$('body').css('backgroundColor', $('#sbpagebackgroundcolour').val());
						}
						
						if( $('#sbtextcolour').val() != "undefined" && $('#sbtextcolour').val() != "original" ){
							$('body').css('color', "#" + $('#sbtextcolour').val());
						}
						
						if( $('#sblinkcolour').val() != "undefined" && $('#sblinkcolour').val() != "original" ){
							$('a').css('color', "#" + $('#sblinkcolour').val());
						}	
						
						$(document).trigger('close.facebox');		
					} 
				
				});
				
				$("#sbtextcolour").focus();			
			},
			"CSSStyles": function(){
				$('#sbApplyCSS-yb').click(function(e){ 
					$(document).trigger('close.facebox');
					$('link[rel=stylesheet]').remove();
					AtKit.addStylesheet(settings.baseURL + "stylesheets/high-yo.css", "highvis-yo");
				});
				
				$('#sbApplyCSS-wb').click(function(e){ 
					$(document).trigger('close.facebox');
					$('link[rel=stylesheet]').remove();
					AtKit.addStylesheet(settings.baseURL + "stylesheets/high-wb.css", "highvis-wb");
				});
				
				$('#sbApplyCSS-wbw').click(function(e){
					$(document).trigger('close.facebox');
					$('link[rel=stylesheet]').remove();
					AtKit.addStylesheet(settings.baseURL + "stylesheets/high-bw.css", "highvis-wbw");
				});
				
				$('#sbApplyCSS-by').click(function(e){
					$(document).trigger('close.facebox');
					$('link[rel=stylesheet]').remove();
					AtKit.addStylesheet(settings.baseURL + "stylesheets/high-by.css", "highvis-by");
				});
				
				$('#sbApplyCSS-gw').click(function(e){
					$(document).trigger('close.facebox');
					$('link[rel=stylesheet]').remove();
					AtKit.addStylesheet(settings.baseURL + "stylesheets/high-gw.css", "highvis-by");
				});	
				
				
				$("#sbApplyCSS-wb").focus();
			}
		};
		
		AtKit.addFn('setColour', function(code){
			if(code == "rand"){
				colour = '#'+Math.floor(Math.random()*16777215).toString(16);
				$("#sbbackgroundcolour").val(colour);
			} else {
				colour = code;
			}
			$('#sbar').css('background-color', colour);
		});
		
		AtKit.addButton(
			'changecss',
			language.buttons.CSS,
			settings.baseURL + 'images/palette.png',
			function(dialogs, functions){
				AtKit.show(dialogs.main);
				
				$('#sbColourChange').click(function(){
					AtKit.show(dialogs.toolbar);
					functions.changeToolbar();
				});

				$('#sbChangeSiteColours').click(function(){
					AtKit.show(dialogs.siteColours);
					functions.siteColours();
				});

				$('#sbAttachCSSStyle').click(function(){
					AtKit.show(dialogs.CSSStyles);
					functions.CSSStyles();
				});
			}, 
			CSSDialogs, CSSFunctions
		);		
		
		AtKit.addResetFn('reset-saved', function(){
			AtKit.clearStorage();
		});
		
		
		// Add functions to AtKit.
		AtKit.addFn('getSelectedText', function(strip){ 
			var text = '';
		     if (window.getSelection){
		        text = window.getSelection();
		     } else if (document.getSelection){
		        text = document.getSelection();
		     } else if (document.selection){
		        text = document.selection.createRange().text;
		     }
		    if(strip == true){
				return String(text).replace(/([\s]+)/ig, '');
			} else {
				return String(text);
			}
		
		});
		

		// Run
		AtKit.render();
	}(window, AtKit));

}