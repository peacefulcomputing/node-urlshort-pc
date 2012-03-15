/* Peaceful Computing, LLC.
 * Original Author: Zach Jones <zach@peacefulcomputing.com
 */

var fs = require('fs');

config = {
	
	siteName: "PeacefulComputing's URL Shortener",
	siteDomain: "localhost:9001",
	localPort: 9001,
	localIP: '127.0.0.1',
	file: "./urlshort-pc.json",
	chars: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
	bgSaveSiteDataRate: 1800000, //milliseconds to save this.sites data. 1800000 = 30 minutes.

	/* `sites` contains the data for shortened URLs. Provided are a couple example entries. */
	/* This `sites` variable will be overwritten/updated by data inside the file `config.file` */
	sites: [
		{"url":"http://google.com","views":0},
		{"url":"http://www.peacefulcomputing.com","views":1337}
	],
	
	fmod: function(a, b) {
		return a % b;
	},
	
	getURL: function(short) {
		var size = short.length - 1;
		var length = this.chars.length;
		var string = this.str_split(short,1);
		var retval = this.strpos(this.chars, string.pop(), 0);
		
		var i, chr;
		for (i in string) {
			chr = string[i];
			retval += (this.strpos(this.chars, chr, 0) * Math.pow(length, size - i));
		}
		return retval;
	},
	
	getSHORT: function(integer) {
		var length = this.chars.length;
		var url = [];

		while (integer > (length-1)) {
			var fmod = this.fmod(integer, length);
			url.push(this.chars[fmod]);
			integer = Math.floor(integer/length);
		}
		return this.chars[integer] + url.join('');			
	},
	
	bgSaveSiteData: function() {
		fs.writeFile(this.file, JSON.stringify(this.sites), 'utf8', function (err) {
			if (err) throw err;
		});
	},
	
	strpos: function (haystack, needle, offset) {
		// http://kevin.vanzonneveld.net
		// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +   improved by: Onno Marsman    
		// +   bugfixed by: Daniel Esteban
		// +   improved by: Brett Zamir (http://brett-zamir.me)
		// *     example 1: strpos('Kevin van Zonneveld', 'e', 5);
		// *     returns 1: 14
		var i = (haystack + '').indexOf(needle, (offset || 0));
		return i === -1 ? false : i;
	},

	str_split: function (string, split_length) {
		// http://kevin.vanzonneveld.net
		// +     original by: Martijn Wieringa
		// +     improved by: Brett Zamir (http://brett-zamir.me)
		// +     bugfixed by: Onno Marsman
		// +      revised by: Theriault
		// +        input by: Bjorn Roesbeke (http://www.bjornroesbeke.be/)
		// +      revised by: Rafał Kukawski (http://blog.kukawski.pl/)
		// *       example 1: str_split('Hello Friend', 3);
		// *       returns 1: ['Hel', 'lo ', 'Fri', 'end']
		if (split_length === null) {
			split_length = 1;
		}
		if (string === null || split_length < 1) {
			return false;
		}
		string += '';
		var chunks = [],
		pos = 0,
		len = string.length;
		while (pos < len) {
			chunks.push(string.slice(pos, pos += split_length));
		}

		return chunks;
	}
	
}

module.exports = config;