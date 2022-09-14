
function autocompleteMatch(input, names) {
    if (input == '') {
      return [];
    }
    var reg = new RegExp(input.toLowerCase())
    return names.filter(function(term) {
        if (term.toLowerCase().match(reg)) {
          return term;
        } 
    });
  }
  
function showResults(value) {
    const names = []; 
    res = document.getElementById("result");
    res.innerHTML = '';
    if (value == '') {
      return;
    }
    let list = '';
    fetch(url).then(
     function (response) {
       return response.json();
     }).then(function (data) {
       for (i = 0; i < data.length; i++) {
        if(companySet.has(data[i].name)) {
            names[i] = data[i].name;
        }
       }
       let terms = autocompleteMatch(value, names);
       if (terms.length === 0) {
        list += '<li>' + "No matches" + '</li>';
       }
       for (i = 0; i < terms.length; i++) {
        list += '<li>' + terms[i] + '</li>';
       }
       res.innerHTML = '<ul>' + list + '</ul>';
       return true;
     }).catch(function (err) {
       console.warn('Something went wrong.', err);
       return false;
     });
  }   


function getEventTarget(event) {
    event = event || window.event;
    return event.target || event.srcElement; 
}

const ul = document.getElementById('result');
ul.onclick = function(event) {
    let target = getEventTarget(event);
    showCompanyData(target.innerHTML);
}

window.addEventListener('click', function(event) {
    if (!event.target.matches('#search-bar')) {
        ul.style.display = "none";
    } else if (event.target.matches('#search-bar')){
        ul.style.display = "block";
    }
});
  
  