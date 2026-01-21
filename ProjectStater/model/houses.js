const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

module.exports = class Homes {
  constructor(
    houseName,
    pricePerNight,
    location,
    rating,
    description,
    nearby,
    photo
  ) {
    this.houseName = houseName;
    this.pricePerNight = pricePerNight;
    this.location = location;
    this.rating = rating;
    this.description = description;
    this.nearby = nearby;
    this.photo = photo || "/airbnbimg.jpeg";
  }

  save() {
    Homes.fetchAllData((addedHomes) => {
      addedHomes.push(this); 
        path.join(rootDir, "data", "houseData.json"),
        JSON.stringify(addedHomes),
        (err) => {
          console.log("An error occure: ", err);
        }
      );
    });
  }

  static fetchAllData(callback) {
    fs.readFile(path.join(rootDir, "data", "houseData.json"), (err, data) => {
      return callback(!err ? JSON.parse(data) : []);
    });
  }

  static findByHouseName(houseName, callback) {
    Homes.fetchAllData((homes) => {
      const house = homes.find((h) => h.houseName === houseName) || null;
      callback(house);
    });
  }
};
