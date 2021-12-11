//Need to add the root folder '/' so it will go to home page
const staticCache = "Static-cache-v1";
const dynamicCache = "Dynamic-cache-v1";


const assets = [
    '/',
    "/index.html",
    "/img",
    "/js/app.js",
    "/js/ui.js",
    "/js/materialize.min.js",
    "/css/materialize.min.css",
    "/css/app.css",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css",
    "https://fonts.googleapis.com/icon?family=Material+Icons",

];

//fires when the browser intalls the app
    //here we are just logging the event and the contents of the oject passed
    //the purpose of this event is to give the service worker a place to setup the local environment 
    //after the installation completes
self.addEventListener("install", function (event) {
    console.log(`SW: Event fired: ${event.type}`);
        event.waitUntil(
          caches.open(staticCache).then(function (cache) {
            console.log("SW: Precaching App shell");
            cache.addAll(assets);
    })
    );
});

//fires after the browser completes activation
//to activate user will need to reload the page or reopens page
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then((keys) => {
        return Promise.all(
            keys
            .filter((key) => key !== staticCache)
            .map((key) => caches.delete(key))
            );
        })
    ); 
});


self.addEventListener("fetch", function (event){
    event.respondWith(
        caches.match(event.request).then((response)=>{
            return (
                response || 
                fetch(event.request).then((fetchRes) => {
                    return caches.open(dynamicCache).then((cache) => {
                        cache.put(event.request.url, fetchRes.clone());
                        return fetchRes;
                    });
                    
                })
            )
        
        })
    );
});

  