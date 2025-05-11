let Patient = require("./patient");
let Employee = require("./employee")
let HospitalView = require("./view");

class HospitalController {
    static register(name, password, role) {
        Employee.register(name, password, role)
        .then(objArr => {
            HospitalView.registerView(objArr);          
        })
        .catch(err => {
            HospitalView.ErrorView(err);
        })      
    }

    // lanjutkan command yang lain

    static login(name, password) {
        Employee.getCurrentLogin()
            .then(()=> {
                Employee.login(name, password)
                    .then(data => {
                        HospitalView.loginView(data)
                    })
                    .catch(err => {
                        HospitalView.ErrorView(err)
                    })
            })
            .catch(()=> {
                HospitalView.ErrorView("Please log out first")
            })
    }

    static logout(){
        Employee.logout()
            .then(data => {
                HospitalView.LogoutView(data)
            })
            .catch(err => {
                HospitalView.ErrorView(err)
            })
    }

    static help() {
        HospitalView.CommandListView();
    }

}


module.exports = HospitalController;