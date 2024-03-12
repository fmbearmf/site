async function printInfo(): Promise<void> {
    const con = console;

    con.debug(`%c\n
UA: ${navigator.userAgent} \n
TITLE: ${document.title} \n
EC: ${document.getElementsByTagName("*").length} \n`, "color: #fbf1c7; font-size: 20px; background-color: #1e1e2e;");
}

document.addEventListener("DOMContentLoaded", printInfo);