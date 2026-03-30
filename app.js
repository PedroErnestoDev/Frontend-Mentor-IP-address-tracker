const botaoBuscar = document.querySelector("#botao-buscar-ip")

botaoBuscar.addEventListener("click", buscarIp)

async function buscarIp() {
    try {
        const inputAdress = document.querySelector("#input-adress-ip").value
    
        let response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_1dviKQy2tvxdjC9kxLGbLmGNBt37A&ipAddress=${inputAdress}`)

        let data = await response.json()

        let lat = data.location.lat

        let lng = data.location.lng

        const paragrafoIp = document.querySelector("#p-ip-address").textContent = inputAdress

        const paragrafoLocation = document.querySelector("#p-location").textContent = `${data.location.city}, ${data.location.region}`

        const paragrafoTimezone = document.querySelector("#p-timezone").textContent = `UTC ${data.location.timezone}`

        const paragrafoIsp = document.querySelector("#p-isp").textContent = data.isp

        atualizarMapa(lat, lng)

    } catch (error){
        console.log(error)
    }
}

const map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const iconeFlecha = L.icon({
    iconUrl: "images/icon-location.svg",

    iconSize: [40, 50],     // tamanho do PNG
    iconAnchor: [20, 20],   // ponto exato que toca no mapa (centro da flecha)
    popupAnchor: [0, -20]   // posição do popup
});

let marker;

function atualizarMapa(lat, lng) {
  // move o mapa
    map.setView([lat, lng], 13);

    // atualiza ou cria marcador
    if (marker) {
        marker.setLatLng([lat, lng]);
        marker.setIcon(iconeFlecha);
    } else {
        marker = L.marker([lat, lng], { icon: iconeFlecha }).addTo(map);
    }
}


