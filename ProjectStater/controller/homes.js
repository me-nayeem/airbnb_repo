const houseData = require("../model/houses");
const UserLogin = require("../model/loginInfo");
const crypto = require("crypto");
const bookings = [];

const houses = houseData.fetchAllData(() => {});

// controller/homes.js
const Homes = require("../model/houses");
const { arch } = require("os");

exports.getHome = (req, res, next) => {
  houseData.fetchAllData((houses) => {
    res.render("store/airbnbHome", {
      houses,
      title: "home page",
      fileName: "airbnbHome.css",
    });
  });
};



exports.setHome = (req, res, next) => {
  res.render("host/addHome", {
    title: "add Home from here",
    fileName: "addHome.css",
  });
};




exports.postHome = (req, res, next) => {
  res.render("host/addedHome", {
    title: "addedHome successFully",
    fileName: "addedHome.css",
  });

  const body = req.body || {};

  const houseName = body.houseName || "Untitled";
  const pricePerNight = body.pricePerNight || "NaN";
  const location = body.location || "Unknown";
  const rating = parseFloat(body.rating || "0") || 0;
  const description =
    body.description || "Description is not added by the host!!!";
  const nearby = !!body.nearby;
  const photo = body.photo;

  const house = new houseData(
    houseName,
    pricePerNight,
    location,
    rating,
    description,
    nearby,
    photo
  );
  house.save();
};




exports.getHouseDetails = (req, res, next) => {
  const encoded = req.params.name;
  const name = decodeURIComponent(encoded); 
  console.log(name);
  houseData.findByHouseName(name, (house) => {
    console.log(house);
    if (!house) {
      return next();
    }
    res.render("store/houseDetail", {
      house,
      title: house.houseName,
      fileName: "houseDetail.css",
    });
  });
};




exports.postBookingHomes = (req, res, next) => {
  houseData.fetchAllData((houses) => {
    try {
      const houseNameParam = decodeURIComponent(req.params.name || "");
      const body = req.body || {};

      const house = houses.find((h) => h.houseName === houseNameParam) || {};

      const guestName = (body.guestName || "").trim() || "Guest";
      const email = (body.email || "").trim() || "";
      const phone = (body.phone || "").trim() || "";
      const checkIn = body.checkIn || "";
      const checkOut = body.checkOut || "";
      const guests = parseInt(body.guests || "1", 10) || 1;
      const paymentMethod = body.paymentMethod || "";
      const notes = (body.notes || "").trim();

      // compute nights
      const parseDate = (d) => (d ? new Date(d + "T00:00:00") : null);
      const d1 = parseDate(checkIn);
      const d2 = parseDate(checkOut);
      let nights = 0;
      if (d1 && d2) {
        nights = Math.max(0, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)));
      }

      // price
      const pricePerNight =
        Number(house.pricePerNight || body.pricePerNight || 0) || 0;
      const total = nights * pricePerNight;

      // booking id
      const id = `BK-${Date.now().toString(36)}-${Math.round(
        Math.random() * 9999
      )}`;

      const booking = {
        id,
        houseName: house.houseName || houseNameParam || "Unknown",
        guestName,
        email,
        phone,
        checkIn,
        checkOut,
        nights,
        guests,
        pricePerNight,
        total,
        paymentMethod,
        notes,
        createdAt: new Date(),
      };

      bookings.push(booking);

      res.render("store/bookingSuccess", { booking });
    } catch (err) {
      console.error("Error handling booking:", err);
      res
        .status(500)
        .send("Sorry — an error occurred while processing your booking.");
    }
  });
};




exports.getSuggestPage = (req, res, next) => {
  const raw = req.params.name || "";
  const houseName = decodeURIComponent(raw);

  houseData.fetchAllData((houses) => {
    const house = houses.find((h) => h.houseName === houseName) || {};
    res.render("store/suggestEdit", { houseName, house });
  });
};




exports.postSuggestPage = (req, res, next) => {
  try {
    const houseName = decodeURIComponent(req.params.name || "");
    const body = req.body || {};

    const submitterName = (body.submitterName || "").trim() || "Anonymous";
    const submitterEmail = (body.submitterEmail || "").trim() || "";
    const submitterPhone = (body.submitterPhone || "").trim() || "";
    const suggestedName = (body.suggestedName || "").trim() || "";
    const suggestedPrice = body.suggestedPrice || "";
    const suggestedLocation = (body.suggestedLocation || "").trim() || "";
    const suggestedDescription = (body.suggestedDescription || "").trim() || "";
    const notes = (body.notes || "").trim();

    console.log("Suggestion received (not saved):", {
      houseName,
      submitterName,
      submitterEmail,
      submitterPhone,
      suggestedName,
      suggestedPrice,
      suggestedLocation,
      suggestedDescription,
      notes,
    });

    res.render("store/suggestSuccess", { submitterName, houseName });
  } catch (err) {
    console.error("Error processing suggestion:", err);
    res
      .status(500)
      .send("Sorry — could not process your suggestion right now.");
  }
};



exports.showLoginPage = (req, res, next) => {
  res.render("host/login", {
    title: "Login Page",
    fileName: "/login.css",
  });
};



exports.showLoginStatus = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  UserLogin.fatchLoginInfo((data) => {
    const user = data.find((d) => d.email === email && d.password === password);
    if (user) {
      return res.redirect("/");
    }
    return res
      .status(401)
      .render("host/login", { error: "Invalid email or password" });
  });
};




exports.showCreateAccountPage = (req, res, next) => {
  res.render("host/create-account", {
    title: "Create account page",
    fileName: "/create-account.css",
  });
};




exports.showCreateAccountStatus = (req, res, next) => {
  console.log(req.body);

  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const password = req.body.password;
  const location = req.body.location;
  const agree = req.body.agree;

  const userInfo = new UserLogin(name, phone, email, password, location, agree);
  userInfo.save();
  res.render("host/login", {
    title: "Create account page",
    fileName: "/create-account.css",
  });
};


