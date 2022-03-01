const searchBox = document.querySelector("#phoneInput");
const btnSubmit = document.querySelector("#submit");
const allPhone = document.querySelector(".all-phone");
let btnClose = document.querySelector("#close-btn");const phoneDetails = document.getElementById('details');
//Search Button Click Action
btnSubmit.addEventListener("click", (e) => {
  const searchText = searchBox.value.toLowerCase();
  if (searchBox != "") {
    fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    )
      .then((res) => res.json())
      .then((data) => showPhones(data.data));
  } else {
    showError("Input Feild Can't be empty");
  }
  searchBox.value='';
});
//Display Error
const showError = (errorText) => {};
//Display Phone
const showPhones = (phonesInfo) => {
  allPhone.innerHTML = "";
  const only20phonesInfo = phonesInfo.slice(0,20);
  for (singlePhoneInfo of only20phonesInfo) {
    // console.log(singlePhoneInfo);
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card-container">
          <div class="card front">
            <div class="row">
            <div class="col-md-5">
              <img class="img-fluid" src="${singlePhoneInfo.image}" alt="">
            </div>
            <div class="col-md-7">
              <h3><span class="dyanamic-text-color">${singlePhoneInfo.phone_name}</span></h3>
              <h5><b>Brand:</b> <span class="dyanamic-text-color">${singlePhoneInfo.brand}</span></h5>
              <p><i>See More <i class="bi bi-arrow-left-right"></i></i></p>
            </div>
            </div>
          </div>
          <div class="card back">
            <div class="row">
                <div class="col-md-5">
                    <img class="img-fluid" src="${singlePhoneInfo.image}" alt="">
                </div>
                <div class="col-md-7">
                    <button id="btn-details" onClick="showDetails('${singlePhoneInfo.slug}');">Show Details</button>
                </div>
            </div>
          </div>
        </div>
        `;
    div.classList.add('col-md-4','col-12','my-2');
    allPhone.appendChild(div);
  }
};
const showDetails = phoneID =>{
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneID}`)
    .then(res => res.json())
    .then(data =>{
        // console.log(data.data);
        //scrole to details id
        document.getElementById("details").scrollIntoView(); 
        //create element
        const div = document.createElement('div');
        div.classList.add('row','d-flex','align-items-center','justify-content-center','main-info');
        div.innerHTML=`
      <div class="col-md-3">
        <h2>${data.data.name}</h2>
        <hr />
        <h4>${data.data.brand}</h4>
        <hr />
        <ul>
          <li>
            <i class="bi bi-calendar3"></i>
            <span>Released</span>
            <strong>${data.data.releaseDate !=''? data.data.releaseDate.slice(9) : 'Not Found!'}</strong>
          </li>
          <li>
            <i class="bi bi-phone"></i>
            <span>Display Size</span>
            <strong>${data.data.mainFeatures?.displaySize ? data.data.mainFeatures.displaySize: 'Not Available'}</strong>
          </li>
        </ul>
      </div>
      <div class="col-md-3">
        <ul>
          <li>
            <i class="bi bi-cpu"></i>
            <span>Chip Set</span>
            <strong>${data.data.mainFeatures?.chipSet ? data.data.mainFeatures.chipSet: 'Not Available'}</strong>
          </li>
          <li>
            <i class="bi bi-sd-card"></i>
            <span>Memory</span>
            <strong>${data.data.mainFeatures?.memory ? data.data.mainFeatures.memory: 'Not Available'}</strong>
          </li>
          <li>
            <i class="bi bi-eye"></i>
            <span>Sensors</span>
            <strong>${data.data.mainFeatures?.sensors.join(', ')}</strong>
          </li>
          <li>
            <i class="bi bi-wifi"></i>
            <span>WiFi</span>
            <strong>${data.data.others?.WLAN ? data.data.others.WLAN: 'Not Available'}</strong>
          </li>
        </ul>
      </div>
      <div class="col-md-3">
        <img
          src="${data.data.image}"
          alt=""
        />
      </div>
      <div class="col-md-3">
        <ul>
          <li>
            <i class="bi bi-bluetooth"></i>
            <span>Bluetooth</span>
            <strong>${data.data.others?.Bluetooth ? data.data.others.Bluetooth: 'Not Available'}</strong>
          </li>
          <li>
            <i class="bi bi-geo-alt"></i>
            <span>GPS</span>
            <strong>${data.data.others?.GPS ? data.data.others.GPS: 'Not Available' }</strong>
          </li>
          <li>
            <i>N</i>
            <span>NFC</span>
            <strong>${data.data.others?.NFC ? data.data.others.NFC: 'Not Available' }</strong>
          </li>
          <li>
            <i class="bi bi-broadcast"></i>
            <span>Radio</span>
            <strong>${data.data.others?.Radio ? data.data.others.Radio: 'Not Available' }</strong>
          </li>
          <li>
            <i class="bi bi-usb-symbol"></i>
            <span>USB</span>
            <strong>${data.data.others?.USB ? data.data.others.USB: 'Not Available' }</strong>
          </li>
        </ul>
      </div>
      <i class="bi bi-x-square" id="close-btn"></i>
            `;
        phoneDetails.innerHTML='';
        phoneDetails.appendChild(div);
        btnClose=document.querySelector("#close-btn");
    });
}
// btnClose.addEventListener('click',e=>{
//     console.log(1);
//     document.getElementById('details').style.display='none';
// })
