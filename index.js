const tracks = [
    { name: 'Australia GP', imgSrc: 'img/australia.png', track: 'australia', flagSrc: 'Flags/Australia_flag.png'},
    { name: 'China GP', imgSrc: 'img/china.png', track: 'china', flagSrc: 'Flags/China_flag.png' },
    { name: 'Japan GP', imgSrc: 'img/japan.png', track: 'japan', flagSrc: 'Flags/Japan_flag.png' },
    { name: 'Bahrain GP', imgSrc: 'img/bahrain.png', track: 'bahrain', flagSrc: 'Flags/Bahrain_flag.png' },
    { name: 'Saudi Arabia GP', imgSrc: 'img/saudi_arabia.png', track: 'saudi_arabia', flagSrc: 'Flags/Saudi_Arabia_flag.png' },
    { name: 'Miami GP', imgSrc: 'img/miami.png', track: 'miami', flagSrc: 'Flags/USA_flag.png' },
    { name: 'Imola GP', imgSrc: 'img/imola.png', track: 'imola', flagSrc: 'Flags/Italy_flag.png' },
    { name: 'Monaco GP', imgSrc: 'img/monaco.png', track: 'monaco', flagSrc: 'Flags/Monaco_flag.png' },
    { name: 'Spain GP', imgSrc: 'img/spain.png', track: 'spain', flagSrc: 'Flags/Spain_flag.png' },
    { name: 'Canada GP', imgSrc: 'img/canada.png', track: 'canada', flagSrc: 'Flags/Canada_flag.png' },
    { name: 'Austria GP', imgSrc: 'img/austria.png', track: 'austria', flagSrc: 'Flags/Austria_flag.png' },
    { name: 'Britain GP', imgSrc: 'img/british.png', track: 'britain', flagSrc: 'Flags/Britain_flag.png' },
    { name: 'Hungary GP', imgSrc: 'img/hungary.png', track: 'hungary', flagSrc: 'Flags/Hungary_flag.png' },
    { name: 'Belgium GP', imgSrc: 'img/belgium.png', track: 'belgium', flagSrc: 'Flags/Belgium_flag.png' },
    { name: 'Dutch GP', imgSrc: 'img/dutch.png', track: 'dutch', flagSrc: 'Flags/Dutch_flag.png' },
    { name: 'Monza GP', imgSrc: 'img/monza.png', track: 'monza', flagSrc: 'Flags/Italy_flag.png' },
    { name: 'Azerbaijan GP', imgSrc: 'img/baku.png', track: 'azerbaijan', flagSrc: 'Flags/Baku_flag.png' },
    { name: 'Singapore GP', imgSrc: 'img/singapore.png', track: 'singapore', flagSrc: 'Flags/Singapore_flag.png' },
    { name: 'Austin GP', imgSrc: 'img/austin.png', track: 'austin', flagSrc: 'Flags/USA_flag.png' },
    { name: 'Mexico GP', imgSrc: 'img/mexico.png', track: 'mexico', flagSrc: 'Flags/Mexico_flag.png' },
    { name: 'Brazil GP', imgSrc: 'img/brazil.png', track: 'brazil', flagSrc: 'Flags/Brazil_flag.png' },
    { name: 'Las Vegas GP', imgSrc: 'img/las_vegas.png', track: 'las_vegas', flagSrc: 'Flags/USA_flag.png' },
    { name: 'Qatar GP', imgSrc: 'img/qatar.png', track: 'qatar', flagSrc: 'Flags/Qatar_flag.png' },
    { name: 'Abu Dhabi GP', imgSrc: 'img/abu_dhabi.png', track: 'abu_dhabi', flagSrc: 'Flags/UAE_flag.png' },
];

function displayAllTracks() {
    const trackContainer = document.getElementById('track-container');
    tracks.forEach(track => {
        const parentBox = document.createElement('div');
        const trackBox = document.createElement('div');
        parentBox.classList.add('parentBox');
        trackBox.classList.add('box');
        
        trackBox.style.backgroundImage = `url(${track.flagSrc})`;
        trackBox.classList.add('flag-img');

        parentBox.classList.add('white-top');
        
        const trackImg = document.createElement('img');
        trackImg.src = track.imgSrc;
        trackImg.alt = track.name;
        
        const titleAndButton = document.createElement('div');
        titleAndButton.classList.add('title-and-button');
        
        const trackTitle = document.createElement('h3');
        trackTitle.textContent = track.name;
        
        const trackButton = document.createElement('button');
        trackButton.type = 'button';
        trackButton.classList.add('button_1');
        trackButton.textContent = 'View';
        
        trackButton.addEventListener('click', () => {
            window.location.href = `track.html?track=${track.track}`;
        });
        
        titleAndButton.appendChild(trackTitle);
        titleAndButton.appendChild(trackButton);
        
        parentBox.appendChild(trackImg);
        parentBox.appendChild(titleAndButton);
        parentBox.appendChild(trackBox);
        
        trackContainer.appendChild(parentBox);
    });
}

document.addEventListener('DOMContentLoaded', displayAllTracks);
