function updateMap() {
    fetch("./data.json")
        .then((response) => response.json())
        .then((rsp) => {
            // console.log(rsp.data);
            rsp.data.forEach(element => {
                let latitude = element.latitude;
                let longitude = element.longitude;
                let cases = element.infected;
                if (cases > 255) {
                    color = "rgb(255,0,0)"
                } else {
                    color = `rgb(${cases},0,0)`
                }
                //Mark on the map
                const marker = new mapboxgl.Marker({
                    color: color
                })
                    .setLngLat([longitude, latitude])
                    .addTo(map);
                // create the popup
                var popup = new mapboxgl.Popup(
                    { offset: [28, 0] }
                ).setText(
                    `Total Infected Cases: ${element.infected}` + '  |  ' + `Total Recovered Cases: ${element.recovered}` + '  |  ' + `Total Death Occured: ${element.dead}`
                );

                const markerDiv = marker.getElement();
                markerDiv.id = 'marker';

                markerDiv.addEventListener('mouseenter', () => popup.addTo(map));
                markerDiv.addEventListener('mouseleave', () => popup.remove());

                // add popup to marker
                marker.setPopup(popup);
                // add marker to map
                marker.addTo(map);

            });
        });
}

updateMap();

let interval = 300000; //on every 300 seconds
setInterval(updateMap, interval);
