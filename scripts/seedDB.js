const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the cxplace collection and inserts the cxplaces below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/cxdb",
  {
    useMongoClient: true
  }
);

const cxplaceSeed = [
  {
    name: "Dolarex, LLC",
    address: "707 Broadway Ste 1410 San Diego, CA 92101",
    lat: "32.7154029",
    lng: "-117.1580235",
    phone: "(619) 662-6049",
    commission: "No",
    buy: 18.40,
    sell: 18.20,
    hours: "Monday to Friday, 7:00AM to 4:00PM",
    image: "http://www.dolarex.com/voxfiles/skins/skn-dolarex/htmls/images/dolarex-logo.png",
    icon:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfej-9Cgx0-SG9EdJE6yKIBH94W9q-OyQPrzCymHxmebHUDQsW",
    comments: [],
    user: null,
    date: new Date(Date.now())
  },
  {
    name: "Golden Money Transfer Inc",
    address: "739 4th Ave #204 San Diego, CA 92101",
    lat: "32.713143",
    lng: "-117.160777",
    phone: "(888) 702-5656",
    commission: "No",
    buy: 18.36,
    sell: 18.18,
    hours: "Monday to Sunday, 8:00AM to 7:00PM",
    image: "http://www.coosanjer.com.gt/wp-content/uploads/2017/02/Golden-Money-green-logo-small.jpg",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXFHNzGJb0_Dh8VbkAha-ckiHV24LLXNBkd4iU0eQBDT34AsdQ",
    comments: [],
    user: null,
    date: new Date(Date.now())
  },
  {
    name: "Casa de Cambio",
    address: "117 W Ysdiro Blvd San Ysidro, CA 92173",
    lat: "32.5523759",
    lng: "-117.0437858",
    phone: "(619) 428-0410",
    commission: "No",
    buy: 18.35,
    sell: 18.20,
    hours: "Monday to Friday, 9:00AM to 5:00PM",
    image: "https://image.freepik.com/free-vector/modern-money-changer-logo-template-designs_7649-31.jpg",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV99yMLY5Gt5YaX5SZlLT9SdzoN0KDcnNocjVsfQ8V5OzIg2cd",
    comments: [],
    user: null,
    date: new Date(Date.now())
  },
  {
    name: "TJ Currency Exchange",
    address: "335 E San Ysidro Blvd, San Ysidro, CA 92173",
    lat: "32.5511457",
    lng: "-117.0383373",
    phone: "(619) 428-0066",
    commission: "Yes",
    buy: 17.59,
    sell: 17.29,
    hours: "Monday to Friday, 7:00AM to 4:00PM",
    image: "https://image.freepik.com/free-vector/modern-money-changer-logo-template-designs_7649-31.jpg",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTn1uQqeibeUKmXdAOqGWDkqeHWdjdvi8LeBEy10xAfTCBW236sA",
    comments: [],	
    user: null,	
    date: new Date(Date.now())
  },
  {
    name: "Intercam",
    address: "364 E.San Ysidro Blvd San Ysidro, CA 92173",
    lat: "32.5505103",
    lng: "-117.038746",
    phone: "(619) 690-0776",
    commission: "No",
    buy: 17.60,
    sell: 17.48,
    hours: "Monday to Friday, 7:00AM to 4:00PM",
    image: "http://mallsmexico.com/imagenes/2016/02/23203_Intercam.jpg",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2hmRwShEuR7u-0Z6X4NL9cel321ZZAbFfpGZfqzZnR012-vlo",
    comments: [],
    user: null,
    date: new Date(Date.now())
  },
  {
    name: "SD Money Exchange",
    address: "395 E San Ysidro Blvd #A San Ysidro, CA 92173",
    lat: "32.5511556",
    lng: "-117.037687",
    phone: "(619) 576-3503",
    commission: "Yes",
    buy: 17.60,
    sell: 17.50,
    hours: "Monday to Friday, 7:00AM to 4:00PM",
    image: "https://image.freepik.com/free-vector/modern-money-changer-logo-template-designs_7649-31.jpg",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiVO7me7QhRzYWod-Nc1F6RbRZWuB7P76-ckvB6HX_hf1cHk8OBg",
    comments: [],
    user: null,
    date: new Date(Date.now())
  },
  {
    name: "Agau Holdings LLC",
    address: "2745 Otay Pacific Dr San Diego, CA 92154",
    lat: "32.5481463",
    lng: "-116.9746643",
    phone: "(619) 955-7210",
    commission: "Yes",
    buy: 17.80,
    sell: 17.61,
    hours: "Open 24 Hours",
    image: "https://image.freepik.com/free-vector/modern-money-changer-logo-template-designs_7649-31.jpg",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF9vnASJF15JNI6KA06Nl0j_niwAjK-TB9fySpgGBDJ1yMUoCk",
    comments: [],
    user: null,
    date: new Date(Date.now())
  },
  {
    name: "Currency Exchange International",
    address: "1640 Camino Del Rio N San Diego, CA 92108",
    lat: "32.7685231",
    lng: "-117.1482518",
    phone: "(619) 574-0133",
    commission: "No",
    buy: 16.77,
    sell: 16.77,
    hours: "Monday to Friday, 10:00AM to 9:00PM",
    image: "https://media.glassdoor.com/sqll/751786/currency-exchange-international-squarelogo-1429768257677.png",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvbByrJHxOvPkxpzgnMVbj0c8gpyjqXxtKe1CjPUZBOiUMP2xa",
    comments: [],
    user: null,
    date: new Date(Date.now())
  },
  {
    name: "JSD",
    address: "654 E San Ysidro Blvd San Diego, CA 92173",
    lat: "32.546661",
    lng: "-117.033158",
    phone: "(619) 428-4685",
    commission: "No",
    buy: 17.40,
    sell: 17.30,
    hours: "Monday to Sunday, 7:30AM to 7:30PM",
    image: "https://image.freepik.com/free-vector/modern-money-changer-logo-template-designs_7649-31.jpg",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXMxwynSYC4thHsZt4vmHPMxZsOpccz1uWPZtro-Y5CURxSqQUoQ",
    comments: [],
    user: null,
    date: new Date(Date.now())
  },
  {
    name: "Express Pawn Shop",
    address: "390 E San Ysidro Blvd San Ysidro, CA 92173",
    lat: "32.550464",
    lng: "-117.037965",
    phone: "(619) 428-1800",
    commission: "No",
    buy: 17.50,
    sell: 17.45,
    hours: "Monday to Sunday, 9:00AM to 8:00PM",
    image: "https://www.expresspawn.com/images/logo.png",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThF5eLfdHPwR2ak6cb8uGATP82i04z2H0kislLqt3apb5H0Y9i",
    comments: [],
    user: null,
    date: new Date(Date.now())
  },
  {
    name: "ABC Money Exchange",
    address: "2510 Otay Center Dr San Diego, CA 92154",
    lat: "32.5530733",
    lng: "-116.9427064",
    phone: "(619) 934-1403",
    commission: "No",
    buy: 17.57,
    sell: 17.50,
    hours: "Monday to Sunday, 9:00AM to 8:00PM",
    image: "https://image.freepik.com/free-vector/modern-money-changer-logo-template-designs_7649-31.jpg",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6iCPUkbrfjamxITI7PFbvS4Cwh4WQGfad42cbBhUg9gF4KdxM",
    comments: [],
    user: null,
    date: new Date(Date.now())
  },
  {
    name: "Zulemy",
    address: "Blvd.Agua Caliente 11050 22014 Tijuana, Mexico",
    lat: "32.513079",
    lng: "-117.005957",
    phone: "+52 664 972 9158",
    commission: "No",
    buy: 18.31,
    sell: 18.25,
    hours: "Monday to Friday, 7:00AM to 4:00PM",
    image: "https://image.freepik.com/free-vector/modern-money-changer-logo-template-designs_7649-31.jpg",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZEi17i_axmt7BugdLzsSMG8i3wYEHsMMRt-i7sSFNveIPoZip",
    comments: [],
    user: null,
    date: new Date(Date.now())
  },
];


db.Cxplace
  .remove({})
  .then(() => db.Cxplace.collection.insertMany(cxplaceSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

