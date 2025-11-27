// Adds script to HTML
function loadScript(path) {
    return new Promise((resolve, reject) => {
        let script = document.createElement("script");

        script.addEventListener("load", () => {
            resolve();
        });

        script.addEventListener("error", () => {
            reject();
        });

        script.src = path;
        script.type = "text/javascript";
        document.head.appendChild(script);
    });
}

// Loads entire list of scripts sequentially
async function loadScripts(dir, files, groupName) {
    if (groupName != undefined) console.groupCollapsed(groupName);
    for(const file of files) {
        await loadScript(dir + "/" + file);
        console.log(file);
    }
    if (groupName != undefined) console.groupEnd();
}

// Loads packages, first engine then game.
fetch("../../engine/packages.json")
    .then((result) => (data = result.json()))
    .then((data) => {
        console.group("Loaded Packages");
        loadScripts(data.packageDirectory, data.packages, data.packageGroup)
        .then(() => {
            fetch("packages.json")
                .then((result) => (data = result.json()))
                .then((data) => {
                    loadScripts(data.packageDirectory, data.packages, data.packageGroup)
                        .then(() => console.groupEnd());
                });
        });
    });
