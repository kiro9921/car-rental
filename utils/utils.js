async function verifyLoggedUser(fallbackLocation, checkVerified){
    if (!checkVerified && (Cookies.get('user') == null || Cookies.get('user') === "")){
        window.location.href = fallbackLocation;
        return false;
    }
    if (checkVerified && (Cookies.get('user') == null || Cookies.get('user') === "")) {
        return true;
    }
    SlickLoader.enable();
    let data = await $.ajax({
        type: "POST",
        url: "../../utils/authentication.php",
        data: {"method": "verify", "input": Cookies.get('user')},
        cache: false,
    });
    SlickLoader.disable();
    if ((checkVerified && data["verified"]) || (!checkVerified && !data["verified"])){
        window.location.href = fallbackLocation;
        return false;
    }
    return true;
}

async function verifyLoggedAdmin(fallbackLocation){
    if (Cookies.get('user') == null || Cookies.get('user') === ""){
        window.location.href = fallbackLocation;
        return false;
    }
    SlickLoader.enable();
    let data = await $.ajax({
        type: "POST",
        url: "../../utils/authentication.php",
        data: {"method": "verifyAdmin", "input": Cookies.get('user')},
        cache: false,
    });
    SlickLoader.disable();
    if (!data["verified"]){
        window.location.href = fallbackLocation;
        return false;
    }
    return true;
}