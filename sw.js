self.addEventListener("install", function (event) {
    //fires when the browser intalls the app
    //here we are just logging the event and the contents of the oject passed
    //the purpose of this event is to give the service worker a place to setup the local environment 
    //after the installation completes
    console.log('SW: Event fired: ${event.type}');

});

self.addEventListener("activate", function (event) {
    //fires after the browser completes activation
    //to activate user will need to reload the page or reopens page
    console.log('SW: Event fired: ${event.type}');

});

self.addEventListener("fetch", function (event) {
    //fires whenever the app requests a resource (file or data)
    console.log('SW: Fetching ${event.request.url}');
    //next, go get the requested resource from the network
    event.respondWith(fetch(event.request));
});