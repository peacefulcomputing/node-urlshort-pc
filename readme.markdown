# Peaceful Computing's URL Shortener

A simple URL shortening service which runs on NodeJS. node-shorturl-pc utilizes the [Express framework](http://expressjs.com/).

View working example at <http://ln-s.me/>

Benefits of using node-shorturl-pc
-
- No database required (works on flat file)
- Blazing performance
- Simple alpha-numeric URLs are easy to read (a-z, A-Z, 0-9)
- Massive amounts of URLs can be produced (over 14.7 million URLs using just _4_ characters such as http://ln-s.me/a8b0; 5 characters provides up to 916 million URLs)
- Self-maintained. Saves data when addresses are added & saves data periodically (configurable). Forwarding URL information is loaded when the application starts.

How to install
-

	# git clone git://github.com/peacefulcomputing/node-urlshort-pc.git
	# cd node-urlshort-pc
	# node app.js

How to configure
-
Inside _node-shorturl-pc/config.js_ you'll find some configuration options at the top. Edit these parameters and re-start the node application.

For questions or support, email <webdev@peacefulcomputing.com>