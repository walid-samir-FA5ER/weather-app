
let d = new Date();
// let newDate = d.todatastring();
// the url to retrieve weather information from his api
const baseurl =
  "https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}";

// my api keys
//to get the temperature
const apikey = ",&appid=073afd3d32c370b67781bead774c9922=metric";
const server = "http://125.0.0.2:4000";
const error = document.getElementById("error");
const genertadata = () => {
  //get value after click on the buttom
  const zip = document.getElementById("zip").value;
  const feeling = document.getElementById("feeling").value;

  //getweather return promise
  getweatherdata(zip).then((data) => {
    //making sure from the received data to execute rest of the steps
    if (data) {
      const {
        main: { temp },
        name: city,
        weather: [{ description }],
      } = data;
      const info = {
        newDate,
        city,
        temp: Math.round(temp), //to get integer number
        description,
        feeling,
      };
      postdata(server + "/add", info);

      updatingui();
      document.getElementById("entry").style.opacity = 1;
    }
  });
};
document.getElementById("generate").addEventListener("click", genertadata);
// function to get web api data
const getweatherdata = async (zip) => {
  try {
    const res = await fetch(baseurl + zip + apikey);
    const data = await res.json();

    if (data.cod != 200) {
      error.innerHTML = data.message;
      setTimeout((_) => (error.innerHTML = ""), 2000);
      throw `${data.message}`;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};
//function to post data
const postdata = async (url = "", info = {}) => {
  const res = await fetch(url, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(info),
  });
  try {
    const newData = await res.json();
    console.log(`you just saved `, newData);
    return newData;
  } catch (error) {
    console, log(error);
  }
};

//function to get project date
//and updating ui bt this data
const updatingui = async () => {
  const res = await fetch(server + "/all");
  try {
    const saveddata = await res.json();
    document, (getElementById("date").innerHTML = saveddata.newData);
    document, (getElementById("city").innerHTML = saveddata.city);
    document, (getElementById("temp").innerHTML = saveddata.temp);
    document, (getElementById("description").innerHTML = saveddata.description);
    document, (getElementById("content").innerHTML = saveddata.content);
  } catch (error) {
    console.log(error);
  }
};
