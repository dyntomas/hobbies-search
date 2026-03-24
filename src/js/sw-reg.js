(async () => {
    if ("serviceWorker" in navigator && !location.href.startsWith("file://")) {
        try {
            const registration = await navigator.serviceWorker.register("sw.js", {
                scope: "/",
            });
            if (registration.installing) {
                console.log("Service worker installing");
            } else if (registration.waiting) {
                console.log("Service worker installed");
            }
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
})()