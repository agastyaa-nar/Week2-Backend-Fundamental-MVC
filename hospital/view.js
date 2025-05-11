class HospitalView {
    static registerView(objArr) {
        console.log(`save data success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}. Total employee : ${objArr[1]}`)
    }
    
    // lanjutkan method lain
    static loginView(data) {
        console.log(`login success ${data.username} as ${data.position}`)
    }

    static ErrorView(errMessage) {
        console.log(`Error occured ( ${errMessage} )`)
    }

    static LogoutView(data) {
        console.log(`${data.username} has been logged out`)
    }

    static CommandListView(){
        console.log(`
==========================
HOSPITAL INTERFACE COMMAND
==========================
node index.js register <username> <password> <jabatan>
node index.js login <username> <password>
node index.js addPatient <namaPasien> <penyakit1> <penyakit2> ....
node index.js updatePatient <namaPasien> <penyakit1> <penyakit2> ....
node index.js deletePatient <id>
node index.js logout
node index.js show <employee/patient>
node index.js findPatientBy: <name/id> <namePatient/idPatient>
            `)
    }
}


module.exports = HospitalView;