//Need to add the root folder '/' so it will go to home page
const assets = [
    "/",
    "/index.html",
    "/js/app.js",
    "/js/ui.js",
    "/js/materialize.min.js",
    "/css/materialize.min.css",
    "/css/app.css",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous",
    "/img/"
    "https://fonts.googleapis.com/icon?family=Material+Icons",

];


self.addEventListener("install", function (event) {
    //fires when the browser intalls the app
    //here we are just logging the event and the contents of the oject passed
    //the purpose of this event is to give the service worker a place to setup the local environment 
    //after the installation completes
    console.log('SW: Event fired: ${event.type}');
    event.waitUntil(
        caches.open("static").then(function (cache) {
        console.log("SW: Precaching App shell");
        cache.addAll(assets)
    })
    );
});

self.addEventListener("activate", function (event) {
    //fires after the browser completes activation
    //to activate user will need to reload the page or reopens page
    console.log('SW: Event fired: ${event.type}');

});

self.addEventListener("fetch", function (event) {
    //fires whenever the app requests a resource (file or data)
    // console.log('SW: Fetching ${event.request.url}');
    
    //next, go get the requested resource from the network
    event.respondWith(fetch(event.request));
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    });
});
