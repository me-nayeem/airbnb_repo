const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
const { loadEnvFile } = require("process");

module.exports = class UserLogin {
  constructor(name, phone, email, password, location, agree) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.location = location;
    this.agree = agree;
  }

  save() {
    UserLogin.fatchLoginInfo((logininfo) => {
      logininfo.push(this);
      fs.writeFile(
        path.join(rootDir, "data", "loginInfo.json"),
        JSON.stringify(logininfo),
        (err) => {
          console.log("error: ", err);
        }
      );
    });
  }

  static fatchLoginInfo(callback) {
    const filePath = path.join(rootDir, "data", "loginInfo.json");

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        // if file not found or error -> return empty array
        if (err.code === "ENOENT") return callback([]);
        return callback([]); // or handle other errors differently
      }

      // handle empty file
      if (!data || data.trim() === "") {
        return callback([]);
      }

      try {
        const parsed = JSON.parse(data);
        return callback(parsed);
      } catch (e) {
        console.error("Invalid JSON in loginInfo.json:", e.message);
        return callback([]); // fallback to empty array if corrupted
      }
    });
  }
};
