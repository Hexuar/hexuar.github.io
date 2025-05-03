// Adds script to HTML
function loadScript(path) {
    let script = document.createElement("script");
    script.src = path;
    script.type = "text/javascript";
    document.body.appendChild(script);

    console.log(path);
}

// Loads entire list of scripts
function loadScripts(dir, files, groupName) {
    if (groupName != undefined) console.groupCollapsed(groupName);
    for (let file of files) loadScript(dir + file);
    if (groupName != undefined) console.groupEnd();
}

// Loads packages, first engine then game.
fetch("../../engine/packages.json")
    .then((result) => (data = result.json()))
    .then((data) => {
        console.group("Loaded Packages");
        loadScripts(data.packageDirectory, data.packages, data.packageGroup);
    })
    .then(() => {
        fetch("packages.json")
            .then((result) => (data = result.json()))
            .then((data) => {
                loadScripts(
                    data.packageDirectory,
                    data.packages,
                    data.packageGroup,
                );
                console.groupEnd();
            });
    });
