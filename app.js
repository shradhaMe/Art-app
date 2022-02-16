//What are we doing in our app
//create an app object
//create an initialization method which kick starts our app
//Make a call to the API and get data back
// once we get the data put it on the page
//Save information which will be reused in Api key


// step 1 make the object
const artApp = {};
artApp.apiKey = `f5Nju5D2`;

//step 4 make our base url
artApp.apiUrl = `https://www.rijksmuseum.nl/api/en/collection?key`;

//step 5 create a method and get api data init.
artApp.getAry = function (query) {

  //step 6 construct url and format the api and get a new one
  const url = new URL(artApp.apiUrl);
  console.log(url);

  // step 8 got this in our console.log in search parameter search: "?key=f5Nju5D2&q=monkey&imgonly=true"

  // step 14 update the query so we can select from the select dropdown
  url.search = new URLSearchParams({
    key: artApp.apiKey,
    q: query,
    imgonly: true,
    ps: 25
  });

  // step 9 fetch data from api and console.log it. now we can see the data which was selected
  fetch(url)
    .then(function (apiResponse) {
      return apiResponse.json()
    }).then(function (jsonResponse) {
      console.log(jsonResponse.artObjects)

      //step 11 call the function here as data is back from jsonresponse
      artApp.displayArt(jsonResponse.artObjects);
    })


};

// step 10 make a method to put data on the page.
artApp.displayArt = function (artArray) {
  // step 17 clear the gallery of the old art and put new art as selected
  const ulElement = document.querySelector('#artwork');
  ulElement.innerHTML = '';



  artArray.forEach(function (singleObject) {
    // console.log(singleObject);

    //step 11 make html extract the data from API and put it on ul in html
    const artworkTitle = singleObject.title;

    const artworkImage = singleObject.webImage.url;

    const artist = singleObject.principalOrFirstMaker;

    const altText = singleObject.longTitle;

    // console.log(artworkImage, artworkTitle, artist, altText);

    //steps 12 create li, h2 = title, p = artist name , img , alt 

    const listElement = document.createElement('li');

    listElement.classList.add('piece');

    const heading = document.createElement('h2');
    heading.textContent = artworkTitle;

    const image = document.createElement('img');
    image.src = artworkImage;
    image.alt = altText;

    const paragraphElement = document.createElement('p');
    paragraphElement.classList.add('artist');
    paragraphElement.textContent = artist;


    // step 13 append it on the page. attach it to the ul
    // listElement.append(heading);
    // listElement.append(image);
    // listElement.append(paragraphElement);


    // another way of doing the above
    listElement.append(heading, image, paragraphElement)

    const ulElement = document.querySelector('#artwork').appendChild(listElement);

  });
};

//step 18 update the title


//step 15a create a method set up all the event listener within the app. user choosen animal display all the information.
artApp.setUpEventListeners = function () {
  const selectElement = document.querySelector('#animal');
  selectElement.addEventListener('change', function () {
    console.log("new animal selected");

    // console.log(this);

    console.log(this.value);

    //pass the users selected animals with and give related information on the selected animal on the page
  })
}


//step 2 initialization init in our app
artApp.init = function () {
  console.log('my app is running');

  // step 15b set up event listener and this is a initialization step
  artApp.setUpEventListeners();
  //step 7 call the artApp method in init
  artApp.getAry('birds');
};

//step 3 call the init method so console.log will work
artApp.init();