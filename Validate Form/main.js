var $ = function (id) { return document.getElementById(id); };
var accounts = [];

function validateName() {
    var name = $("registerForm-name").value;
    if (!(/^([A-Z])\w+$/.test(name))) {
        $("labelName").innerHTML = "Tên phải có chữ hoa";
    } else if (name === "") {
        $("labelName").innerHTML = "Tên không được để trống";
    }
    else {
        $("labelName").innerHTML = "Your name";
        return true;
    }

}

function validatePhone() {
    var phone = $("registerForm-phone").value;
    if (/^[0]\d{8,10}$/.test(phone)) {
        $("labelPhone").innerHTML = "Your phone";
        return true;
    } else if (phone === "") {
        $("labelPhone").innerHTML = "Số điện thoại không được để trống";
    } else {
        $("labelPhone").innerHTML = "Số điện thoại không hợp lệ";
    }
}

function validateEmail() {
    var email = $("registerForm-email").value;
 
    for (var i in accounts) {
        if (email == accounts[i].mail) {
            $("labelEmail").innerHTML = "Email đã tồn tại";
            return false;
        }else if (/^[a-z0-9A-Z]+@[a-z]+.+$/.test(email) && email != accounts[i].mail) {
            $("labelEmail").innerHTML = "Your email";
            return true;
        } else if (email === "") {
            $("labelEmail").innerHTML = "Email không được để trống";
            return false;
        } else {
            $("labelEmail").innerHTML = "Email không hợp lệ";
            return false;
        }
    }
    return true;

}

function validateAddress() {
    var address = $("registerForm-address").value;
    if (address === "") {
        $("labelAddress").innerHTML = "Địa chỉ không được để trống";
        return false;
    } else {
        $("labelAddress").innerHTML = "Your address";
        return true;
    }
}

function validateZip() {
    var zip = $("registerForm-zip").value;
    if (/^\d{3}-\d{3}-\d{3}$/.test(zip)) {
        $("labelZip").innerHTML = "Your zipcode";
        return true;
    } else if (zip === "") {
        $("labelZip").innerHTML = "Zipcode không được để trống";
    } else {
        $("labelZip").innerHTML = "Zipcode không hợp lệ";
    }

}

function validatePassword() {
    var pass = $("registerForm-pass").value;
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(pass)) {
        $("labelPass").innerHTML = "Your password";
        return true;
    } else if (pass === "") {
        $("labelPass").innerHTML = "Mật khẩu không được để trống";
    } else {
        $("labelPass").innerHTML = "Mật khẩu phải có chữ hoa, ký tự và số";
    }
}

function registerAccount() {
    var name = $("registerForm-name").value;
    var phone = $("registerForm-phone").value;
    var email = $("registerForm-email").value;
    var address = $("registerForm-address").value;
    var pass = $("registerForm-pass").value;
    var zip = $("registerForm-zip").value;


    if (validateName() && validateAddress() && validateEmail() && validatePassword() && validatePhone() && validateZip()) {
        var account = {
            name: name,
            phone: phone,
            mail: email,
            address: address,
            zipcode: zip,
            pass: pass
        };

        accounts.push(account);
        localStorage.setItem("accounts", JSON.stringify(accounts));
        alert("Đăng ký thành công");
    }
    console.log(accounts.length)

}

function checkEmail() {
    var email = $("loginForm-email").value;
    var pass = $("loginForm-pass").value;
    var accs = localStorage.getItem("accounts");
    var acc = JSON.parse(accs);
    for (var i in accs) {
        if (email == acc[i].mail && pass == acc[i].pass) {
            sessionStorage.setItem("name", acc[i].name);
            sessionStorage.setItem("email", acc[i].mail);
            sessionStorage.setItem("address", acc[i].address);
            sessionStorage.setItem("zip", acc[i].zipcode);
            sessionStorage.setItem("phone", acc[i].phone);
            sessionStorage.setItem("pass", acc[i].pass);

            $("loginEmail").innerHTML = "Your email";
            $("loginPass").innerHTML = "Your password";
            $("name").innerHTML = acc[i].name;
            $("email").innerHTML = acc[i].mail;
            $("address").innerHTML = acc[i].address;
            $("zip").innerHTML = acc[i].zipcode;
            $("phone").innerHTML = acc[i].phone;
            $("pass").innerHTML = acc[i].pass;
            alert("Đăng nhập thành công");
            break;
        }
        else {
            $("loginEmail").innerHTML = "Email hoặc pass không tồn tại";
            $("loginPass").innerHTML = "Email hoặc pass không tồn tại";
        }
    }
}

function displayAccount() {
    $("name").innerHTML = sessionStorage.getItem("name");
    $("email").innerHTML = sessionStorage.getItem("email");
    $("address").innerHTML = sessionStorage.getItem("address");
    $("zip").innerHTML = sessionStorage.getItem("zip");
    $("phone").innerHTML = sessionStorage.getItem("phone");
    $("pass").innerHTML = sessionStorage.getItem("pass");
}

function logout() {
    sessionStorage.clear();
    $("name").innerHTML = " ";
    $("email").innerHTML = " ";
    $("address").innerHTML = " ";
    $("zip").innerHTML = " ";
    $("phone").innerHTML = " ";
    $("pass").innerHTML = " ";
}


window.onload = function () {
    if (localStorage.getItem("accounts") == null) {
        accounts = [];
    } else {
        accounts = JSON.parse(localStorage.getItem("accounts"));
    }


    displayAccount();
    $("register").addEventListener("click", validateName);
    $("register").addEventListener("click", validatePhone);
    $("register").addEventListener("click", validateEmail);
    $("register").addEventListener("click", validateAddress);
    $("register").addEventListener("click", validateZip);
    $("register").addEventListener("click", validatePassword);
    $("register").addEventListener("click", registerAccount);

    $("login").addEventListener("click", checkEmail);
    $("logout").addEventListener("click", logout);

};