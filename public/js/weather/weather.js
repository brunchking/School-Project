const city_form = document.querySelector('#city_form');
Info_County.forEach((value, index) => {
    const option = document.createElement('option');
    if (value['ID'] === '63') {
        option.setAttribute(`selected`, 'selected');
    }

    option.setAttribute(`value`, `${value['ID']}`);
    option.innerHTML = `${value['Name']['C']}`;
    city_form.appendChild(option);
    
});

city_form.addEventListener('change', (event) => {
    let County = city_form.value;
    // console.log(W50_County[County]['Content']);
})

