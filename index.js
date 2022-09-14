
const url = 'https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json';
const companySet = new Set(["Amazon.com", "Walmart", "American Express", "Apple"])


async function createShipmentList() {
  let obj;
  const res = await fetch(url);
  obj = await res.json();
  const ul = document.getElementById("nav-links");

  for (let i = 0; i < obj.length; i++) {
    let name = obj[i].name;
    if (companySet.has(name)) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(name));
        li.setAttribute("onClick",  `showCompanyData('${name}')`
        ); 
        ul.appendChild(li);
    }
 }
}

async function showCompanyData(value) {
    let obj;
    const res = await fetch(url);
    obj = await res.json();

    let name;
    let email;
    let boxes;

    for (let i = 0; i < obj.length; i++) {
      if (value === obj[i].name) {
        name = obj[i].name;
        email = obj[i].email;
        boxes = obj[i].boxes;
      } 
    }
    const bays = calculateBays(boxes);
    if (value === name) {
      document.getElementById("company-name").innerHTML = name;
      document.getElementById("company-email").innerHTML = email;
      document.getElementById("boxes").style.display = "flex";
      document.getElementById("boxes-input").value = boxes;
      document.getElementById("cargo-bays-section").style.display = "flex";
      document.getElementById("cargo-bays").innerHTML = bays;   
    } else if (value === "No matches") {

    } else {
      document.getElementById("company-name").innerHTML = "Error Not Found";
    }

    closeNav();
}


async function updateBoxes(){
    let boxes = document.getElementById("boxes-input").value;
    let bays = calculateBays(boxes);
    if (isNaN(bays)) {
        document.getElementById("cargo-bays").innerHTML = "Invalid Input";
    } else {
        document.getElementById("cargo-bays").innerHTML = bays;
    }
}


function calculateBays(boxes) {
    if (boxes != null) {
        const boxToArr = boxes.split(',');
        const boxToNumArr = boxToArr.map(num => {return Number(num)});
        const sum = boxToNumArr.reduce((a, b) => a + b, 0);  
        return Math.ceil(sum / 10);  
    } else {
        return 0;
    }
}

createShipmentList();


