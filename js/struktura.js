async function decision() {
    return new Promise(function (resolve, reject) {
        let decision = document.createElement("div");
        decision.classList.add("decision");
        decision.innerHTML = `<span>Na pewno?</span><br /><button id="button_tak">TAK</button><button id="button_nie">NIE</button>`;
        document.body.appendChild(decision);
        decision.style.animation = "slideInDown 0.5s ease";
        document.querySelector("#button_tak").addEventListener("click", function () {
            resolve();
        })
        document.querySelector("#button_nie").addEventListener("click", function () {
            reject();
        })
    })
}
document.querySelector("#plus").style.display = "none";
setTimeout(function () {
    var left = document.querySelector("table").offsetLeft - 50;
    document.querySelector("#plus").style.marginLeft = left + "px";
    document.querySelector("#plus").style.display = "block";
}, 100)
window.addEventListener("resize", function () {
    var left = document.querySelector("table").offsetLeft - 50;
    document.querySelector("#plus").style.marginLeft = left + "px";
    document.querySelector("#plus").style.display = "block";
})
document.querySelector("#plus").addEventListener("click", function () {
    if (document.querySelector(".insert_form").style.display == "none") {
        document.querySelector(".insert_form").style.animation = "slideInDown 0.4s ease";
        document.querySelector(".insert_form").style.display = "block";
    } else {
        document.querySelector(".insert_form").style.animation = "slideOutUp 0.4s ease";
        setTimeout(function () {
            document.querySelector(".insert_form").style.display = "none";
        }, 350)
    }
})
document.querySelector(".insert_form button").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".insert_form").style.animation = "slideOutUp 0.4s ease";
    setTimeout(function () {
        document.querySelector(".insert_form").style.display = "none";
    }, 350)
})
document.querySelector("#new_default").addEventListener("change", function (e) {
    if (e.target.value == "defined") {
        document.querySelector("#new_defined_default").removeAttribute("hidden");
    } else {
        document.querySelector("#new_defined_default").hidden = "true";
    }
})
if (document.querySelector(".insert_response")) {
    document.querySelector(".insert_response").addEventListener("click", function () {
        if (document.querySelector(".insert_response")) {
            document.querySelector(".insert_response").style.display = "none";
        }
    })
}
document.querySelectorAll("td").forEach(td => {
    td.addEventListener("click", function () {
        if (td.parentElement.className == "tr_focused") {
            td.parentElement.removeAttribute("class");
        } else {
            td.parentElement.classList.add("tr_focused");
        }
    })
})
document.querySelector(".update_form button").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".update_form").style.animation = "slideOutUp 0.4s ease";
    setTimeout(function () {
        document.querySelector(".update_form").style.display = "none";
    }, 350)
})
document.querySelector("#updated_default").addEventListener("change", function (e) {
    if (e.target.value == "defined") {
        document.querySelector("#updated_defined_default").removeAttribute("hidden");
    } else {
        document.querySelector("#updated_defined_default").hidden = "true";
    }
})
document.querySelector("#pencil").addEventListener("click", function () {
    if (document.querySelector(".update_form").style.display == "none") {
        let focused = document.querySelectorAll(".tr_focused").length;
        if (focused == 1) {
            let column = document.querySelector(".tr_focused");
            document.querySelector(".update_form").style.animation = "slideInDown 0.4s ease";
            document.querySelector(".update_form").style.display = "block";
            document.querySelector("h1 span").innerHTML = ``;
            document.querySelector("#updated_nazwa").value = column.querySelector("td").innerText.trim();
            document.querySelector("#old_name").value = column.querySelector("td").innerText.trim();
            document.querySelector("#updated_typ").value = column.querySelector("td:nth-child(2)").innerText.trim().split("(")[0];
            document.querySelector("#updated_dlugosc").value = column.querySelector("td:nth-child(2)").innerText.trim().split("(")[1].split(")")[0];
            if (column.querySelector("td:nth-child(3)").innerText == "YES") {
                document.querySelector("#updated_null").checked = true;
            } else {
                document.querySelector("#updated_null").checked = false;
            }
            if (column.querySelector("td:nth-child(4)").innerText == "null") {
                document.querySelector("#updated_default").value = "null";
            } else if (column.querySelector("td:nth-child(4)").innerText == "current_timestamp") {
                document.querySelector("#updated_default").value = "timestamp";
            } else {
                document.querySelector("#updated_defined_default").removeAttribute("hidden");
                document.querySelector("#updated_defined_default").value = column.querySelector("td:nth-child(4)").innerText;
            }
            if (column.querySelector("td:nth-child(5").innerText.includes("auto_increment")) {
                document.querySelector("#updated_ai").checked = true;
            } else {
                document.querySelector("#updated_ai").checked = false;
            }
            if (column.querySelector("td .primary_key")) {
                document.querySelector("#updated_index").value = "PRI";
            } else if (column.querySelector("td .foreign_key")) {
                document.querySelector("#updated_index").value = "UNI";
            } else {
                document.querySelector("#updated_index").value = "";
            }
        } else if (focused == 0) {
            document.querySelector("h1 span").innerHTML = `Zaznacz pole do edycji!`;
        } else {
            document.querySelector("h1 span").innerHTML = `Zaznacz tylko jedno pole!`;
        }
    } else {
        document.querySelector(".update_form").style.animation = "slideOutUp 0.4s ease";
        setTimeout(function () {
            document.querySelector(".update_form").style.display = "none";
        }, 350)
    }
})
document.querySelector(".update_form input[type=submit]").addEventListener("click", async function (e) {
    e.preventDefault();
    decision().then(function () {
        document.querySelector("#update_form").submit();
    }, function () {
        document.querySelector(".decision").style.animation = "slideOutUp 0.5s ease";
        setTimeout(function () {
            document.querySelector(".decision").remove();
        }, 500)
    });
})
document.querySelector(".insert_form input[type=submit]").addEventListener("click", async function (e) {
    e.preventDefault();
    decision().then(function () {
        document.querySelector("#insert_form").submit();
    }, function () {
        document.querySelector(".decision").style.animation = "slideOutUp 0.5s ease";
        setTimeout(function () {
            document.querySelector(".decision").remove();
        }, 500)
    });
})
document.querySelector("#block").addEventListener("click", function () {
    document.querySelector(".delete_input").value = "";
    document.querySelectorAll(".tr_focused").forEach(column => {
        if (document.querySelector(".delete_input").value == "") {
            document.querySelector(".delete_input").value = document.querySelector(".delete_input").value + "DROP COLUMN " + column.querySelector("td").innerText.trim();
        } else {
            document.querySelector(".delete_input").value = document.querySelector(".delete_input").value + ", DROP COLUMN " + column.querySelector("td").innerText.trim();
        }
    })
    if (document.querySelector(".delete_input").value) {
        decision().then(function () {
            document.querySelector("#delete_form").submit();
        }, function () {
            document.querySelector(".decision").style.animation = "slideOutUp 0.5s ease";
            setTimeout(function () {
                document.querySelector(".decision").remove();
            }, 500)
        });
    } else {
        document.querySelector("h1 span").innerHTML = `Zaznacz kolumny do usunięcia!`;
    }
})