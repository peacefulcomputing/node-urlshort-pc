/* Peaceful Computing, LLC.
 * Author: Zach Jones <zach@peacefulcomputing.com
 */

module.exports = function() {
	
	"use strict";

	var fs = require('fs'),
		path = require('path');

	return {
		
		index: function(req, res) {
			res.render('index', { title: config.siteName });
			// var index = config.getURL('0');
			// console.log(config.sites[index]);
		},
		
		shorten: function(req, res) {
			
			// Try to set the URL from the GET parameter
			var url;
			try {
				url = req.query['url'];
			} catch(err) {
				throw "Could not set URL";
			}
			
			// Trim the URL to ensure it's not completely blank.
			url = url.trim();
			
			// Check the URL for being too long or empty.
			if (url.length > 2000) {
				res.writeHead(500, {'Content-Type': 'text/plain'});
				res.end('URL too long');
				throw "URL too long";
			} else if (url.length == 0) {
				res.writeHead(500, {'Content-Type': 'text/plain'});
				res.end('URL required');
				throw "URL required";
			}

			// If the URL does not being with https?:// or ftp:// then prepend http://
			if (!url.match(/^(https?|ftp):\/\/.+/)) {
				url = "http://" + url;
			}
			
			var integer = config.sites.length;
			config.sites.push({url:url,views:0});
			var short = config.getSHORT(integer);
			
			res.write('http://' + config.siteDomain + '/' + short);
			res.end();
			
			// Report the URL in console and save the database in the background.
			console.log('Your new short URL: http://' + config.siteDomain + '/' + short);
			config.bgSaveSiteData();
			
		},
		
		forward: function(req, res) {
			var short = req.url.replace('/', '');
			var index = config.getURL(short);
			
			if (typeof config.sites[index] === "undefined") {
				res.render('404', { title: config.siteName, shortURL: short, siteDomain: config.siteDomain});
				res.end();
				return;
			}
			
			res.writeHead(301, {'Location': config.sites[index].url});
			res.end();
			console.log(config.sites[index].url);
			config.sites[index].views ++;
		},
		
		initialize: function() {
			
			// Load the database [if it exists].
			this.hotLoad();

			// Create a reference to self.
			var that = this;
			// Start the background saving process. I'm sure there's a better way to do this.
			setInterval(function() { config.bgSaveSiteData(); }, config.bgSaveSiteDataRate);
			
		},
		
		
		
		hotLoad: function() {
			
			console.log('Hot-loading the database: ' + config.file);
			
			if (!path.existsSync(config.file)) {
				console.log('CREATING FILE');
				// File not yet created. Create/save it + return;
				fs.writeFileSync(config.file, JSON.stringify(config.sites), 'utf8', function (err) {
					if (err) throw err;
				});
				return;
			}; // end of if (!path.existsSync(config.file))
			
			// Load the sites from the `config.file` since the file is present.
			try {
				config.sites = JSON.parse(fs.readFileSync(config.file));
			} catch(err) {
				config.sites = [];
			}
			
		} // end of function hotLoad();
		
	};
}