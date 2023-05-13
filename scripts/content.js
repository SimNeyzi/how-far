const body = document.querySelector("body");

// `document.querySelector` may return null if the selector doesn't match anything.
if (body) {
  const pTags = document.querySelectorAll("p");
  pTags.forEach((el) => {
    if (el.textContent.includes("CA")) {
      console.log("address: ", el.textContent.toLowerCase());

      // const regex = /(\d+[\s\w]+),\s*([\w\s]+),\s*([A-Z]{2})\s*(\d{5})/;
      // const match = regex.split(el.textContent);
      // if (match) {
      //   console.log("match: ", match);
      // }
      const addressArr = el.textContent.toLowerCase().split(" ");
      const regex = /\d+/gm;
      console.log(addressArr);
      let fullAddress = "";
      let streetNumber = "";
      let streetName = "";
      let stOrAve = "";
      let potentialCity = "";
      const splitWords = (word, keywords) => {
        keywords.forEach((keyword) => {
          console.log("word: ", word);
          console.log("keyword: ", keyword);
          if (stOrAve === "") {
            if (word === keyword) {
              console.log("word equals to keyword");
              stOrAve = keyword;
            } else if (word.startsWith(keyword)) {
              console.log("word starts with keyword");
              console.log("word: ", word);
              console.log("keyword: ", keyword);
              let avenue = word.slice(0, keyword.length);
              stOrAve = avenue;

              let remaining = word.slice(keyword.length);
              if (remaining.length > 2) {
                potentialCity = remaining;
              }

              // return false;
            } else if (word.endsWith(keyword)) {
              console.log("word ends with keyword");
              console.log("word: ", word);
              console.log("keyword: ", keyword);
              let avenue = word.slice(word.length - keyword.length);
              stOrAve = avenue;

              let remaining = word.slice(0, word.length - keyword.length);
              if (remaining.length > 2) {
                potentialCity = remaining;
              }
            }
          }
        });
      };

      for (let i = 0; i < addressArr.length; i++) {
        let word = addressArr[i];
        const keywords = ["street", "st.", "avenue", "ave.", "ave"];

        if (word.match(regex) && streetNumber === "") {
          streetNumber = word;
        } else if (streetNumber !== "" && stOrAve === "") {
          if (
            word.startsWith("street") ||
            word.startsWith("st.") ||
            word.startsWith("ave.") ||
            word.startsWith("ave") ||
            word.startsWith("avenu") ||
            word.endsWith("street") ||
            word.endsWith("ave.") ||
            word.endsWith("ave") ||
            word.endsWith("avenu")
          ) {
            splitWords(word, keywords);
          } else {
            streetName += word;
          }
        }
      }
      // if (word.includes("street")) {
      //   console.log("street: ", word);
      // }

      fullAddress =
        streetNumber + " " + streetName + " " + stOrAve + " " + potentialCity;

      console.log("full address: ", fullAddress);
    }
  });
}

// const re = /\bCA/;
// console.log("match: ", text.match(re));
const addressClass = body.querySelector("[class*='address']");
const addressId = body.querySelector("[id*='address']");
const mapClass = body.querySelector("[class*='map']");
const mapId = body.querySelector("[id*='map']");
const locationClass = body.querySelector("[class*='location']");
const locationId = body.querySelector("[id*='location']");

// if (addressClass) {
//   console.log("address: ", addressClass);
// } else if (mapClass) {
//   console.log("map: ", mapClass);
// } else if (addressId) {
//   console.log("addressId: ", addressId);
// } else if (mapId) {
//   console.log("mapId: ", mapId);
// } else if (locationClass) {
//   console.log("locationClass: ", locationClass);
// } else if (locationId) {
//   console.log("locationId: ", locationId);
// } else {
//   console.log("nothing found");
// }

// matchAll returns an iterator, convert to array to get word count

const badge = document.createElement("p");
// Use the same styling as the publish information in an article's header
badge.classList.add("color-secondary-text", "type--caption");
badge.textContent = `⏱️ ${"readingTime"} min read`;

// Support for API reference docs
const heading = body.querySelector("h1");
// Support for article docs with date
const date = body.querySelector("time")?.parentNode;

// (date ?? heading).insertAdjacentElement("afterend", badge);
