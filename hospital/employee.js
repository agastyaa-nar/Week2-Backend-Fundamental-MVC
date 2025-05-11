const fs = require("fs");

class Employee {
  constructor(username, password, position) {
    this.username = username
    this.password = password
    this.position = position
    this.login = false;
  }

  static register(name, password, role, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        let obj = new Employee(name, password, role)
        let newData = data;
        newData.push(obj);
        let objArr = [];

        objArr.push(obj);
        objArr.push(newData.length);

        fs.writeFile("./employee.json", JSON.stringify(newData, null, 2), (err) => {
          if (err) {
            console.log(err);
          } else {
            cb(err, objArr);
          }
        })
      }
    });
  }

  // lanjutkan method lain

  static login(name, password, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err)
      } else {
        const dataFound = data.find(e => e.username === name && e.password === password) 
        if (!dataFound) {
          return cb("Login Failed : User not found or wrong password")
        }

        data.forEach(e => e.login = false)
        dataFound.login = true

        fs.writeFile("./employee.json", JSON.stringify(data, null, 2), (err) => {
          if (err) {
            console.log(err);
          } else {
            cb(err, dataFound);
          }
        })
      }
    })
  }

  static findAll(cb) {
    fs.readFile("./employee.json", "utf8", (err, data) => {
      if (err) {
        cb(err)
      } else {
        cb(err, JSON.parse(data));
      }
    })
  }
 
}

module.exports = Employee;