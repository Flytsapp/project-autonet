function creatediv(clas, text=""){
    if (clas=="img") {
        createimg(text);
        return
    }
    text = text.replaceAll("./.", "/")
                .replaceAll("&lt;&lt;&lt;", '<a class="link" href="')
                .replaceAll("&gt;&gt;&gt;&gt;", '">')
                .replaceAll("&gt;&gt;&gt;", '</a>')
                .replaceAll("****", '<span class="bold">')
                .replaceAll("***", '<span class="italic">')
                .replaceAll("**__", '<span class="underline">')
                .replaceAll("???", '</span>')

    if(checkcode(clas, text)) return;
    
    var nel = document.createElement("div");
    nel.classList.add(clas);
    nel.innerHTML = text;
    document.body.appendChild(nel);
}

function createimg(url){
    var nel = document.createElement("img");
    nel.classList.add('image');
    nel.setAttribute('src', url);
    document.body.appendChild(nel);
}

function checkcode(clas="", text){
    if (!clas.startsWith("code")) return false;
    clas = clas.slice(5);
    let pel = document.createElement("pre");
    let cel = document.createElement("code");
    pel.appendChild(cel);
    cel.innerHTML = text.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    document.body.appendChild(pel);
    if (clas=="js"){
        cel.classList.add("language-javascript");
    } else if (clas=="url"){
        cel.classList.add("language-apache");
    } else if (clas=="xml"){
        cel.classList.add("language-xml");
    } else if (clas=="php"){
        cel.classList.add("language-php");
    } else if (clas=="python"){
        cel.classList.add("language-python");
    } else if (clas=="css"){
        cel.classList.add("language-css");
    } else if (clas=="txt"){
        cel.classList.add("language-plaintext");
    } else {
        return true;
    }
    return false;
}

let page = document.getElementById("page");
let content = page.innerHTML;

contentsplit = content.split("\n.\n").slice(1);

for (var c of contentsplit){
    let csplit = c.split("\n");
    let clas = csplit[0];
    csplit = csplit.slice(1).join("\n");
    creatediv(clas, csplit);
}

document.body.removeChild(page);

let alogo = document.getElementsByClassName("welcome")[0];
alogo.onclick = () => location.href = "./";

document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightElement(block);
});