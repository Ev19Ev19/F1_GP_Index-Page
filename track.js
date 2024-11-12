document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const trackName = urlParams.get('track');
    
    const tracks = [
        { name: 'Australia GP', imgSrc: 'img/australia.png', track: 'australia' },
        { name: 'China GP', imgSrc: 'img/china.png', track: 'china' },
        { name: 'Japan GP', imgSrc: 'img/japan.png', track: 'japan' },
        { name: 'Bahrain GP', imgSrc: 'img/bahrain.png', track: 'bahrain' },
        { name: 'Saudi Arabia GP', imgSrc: 'img/saudi_arabia.png', track: 'saudi_arabia' },
        { name: 'Miami GP', imgSrc: 'img/miami.png', track: 'miami' },
        { name: 'Imola GP', imgSrc: 'img/imola.png', track: 'imola' },
        { name: 'Monaco GP', imgSrc: 'img/monaco.png', track: 'monaco' },
        { name: 'Spain GP', imgSrc: 'img/spain.png', track: 'spain' },
        { name: 'Canada GP', imgSrc: 'img/canada.png', track: 'canada' },
        { name: 'Austria GP', imgSrc: 'img/austria.png', track: 'austria' },
        { name: 'Britain GP', imgSrc: 'img/british.png', track: 'britain' },
        { name: 'Hungary GP', imgSrc: 'img/hungary.png', track: 'hungary' },
        { name: 'Belgium GP', imgSrc: 'img/belgium.png', track: 'belgium' },
        { name: 'Dutch GP', imgSrc: 'img/dutch.png', track: 'dutch' },
        { name: 'Monza GP', imgSrc: 'img/monza.png', track: 'monza' },
        { name: 'Azerbaijan GP', imgSrc: 'img/baku.png', track: 'azerbaijan' },
        { name: 'Singapore GP', imgSrc: 'img/singapore.png', track: 'singapore' },
        { name: 'Austin GP', imgSrc: 'img/austin.png', track: 'austin' },
        { name: 'Mexico GP', imgSrc: 'img/mexico.png', track: 'mexico' },
        { name: 'Brazil GP', imgSrc: 'img/brazil.png', track: 'brazil'},
        { name: 'Las Vegas GP', imgSrc: 'img/las_vegas.png', track: 'las_vegas'},
        { name: 'Qatar GP', imgSrc: 'img/qatar.png', track: 'qatar'},
        { name: 'Abu Dhabi GP', imgSrc: 'img/abu_dhabi.png', track: 'abu_dhabi'}
    ];

    const track = tracks.find(t => t.track === trackName);

    if (track) {
        const trackImageContainer = document.getElementById('track-image-container');
        const trackImg = document.createElement('img');
        trackImg.src = track.imgSrc;
        trackImg.alt = track.name;
        trackImg.classList.add("img-fluid");
        trackImageContainer.appendChild(trackImg);

        const trackNameElement = document.getElementById('track-name');
        trackNameElement.textContent = track.name;

        getRaceDetails(track.track);
    } else {
        console.error('Track not found');
    }
});

function getRaceDetails(trackName) {
    const xhr = new XMLHttpRequest();
    const url = `http://127.0.0.1:5000/get-race-details?race_name=${encodeURIComponent(trackName)}`;

    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            console.log('Race details:', data);

            const overlay = document.getElementById('track-details-overlay');
            overlay.innerHTML = `
                <h3>Race Details</h3>
                <p><strong>Date:</strong> ${data.details}</p>
                <p><strong>Race Name:</strong> ${data.race_name}</p>
            `;

        updateTrackDetails(data.race_name);
        

        } else {
            console.error('The request failed!');
        }
    };
    xhr.onerror = function () {
        console.error('The request encountered an error.');
    };
    xhr.send();
}



    function updateTrackDetails(trackName) {
    var data = getTrackData(trackName);
    console.log("data here");
    console.log(data);
    if (data) {
        document.getElementById('track-name').textContent = data.name;

        const grandstandsContainer = document.getElementById('grandstands-container');
        grandstandsContainer.innerHTML = '';
        

        data.grandstands.forEach(grandstand => {
            const grandstandElement = document.createElement('div');
            // const button = document.createElement('button');
            
            const button = document.createElement('a');
            button.href = grandstand.link;
            button.textContent = grandstand.id;

            
            if (grandstand.type === 'big-rect') {
                button.className = grandstand.link === 'no' ? 'gray-rectangle' : 'big-rect-blue';
            } 
            else if (grandstand.type === 'square') {
                button.className = grandstand.link === 'no' ? 'gray-square' : 'blue-square';
            }
            else if (grandstand.type === 'rectangle') {
                button.className = grandstand.link === 'no' ? 'gray-rectangle' : 'blue-rectangle';
            } 

            grandstandElement.style.position = 'absolute';
            grandstandElement.style.top = grandstand.down;
            grandstandElement.style.left = grandstand.right;

            grandstandElement.appendChild(button);
            grandstandsContainer.appendChild(grandstandElement);
        });
    } else {
        console.error('Track data not available');
    }
}



function getTrackData(trackName) {
    const tracks = {
        australia: {name: "Australia GP",
            grandstands: [
                { id: "Brabham", link: "https://www.youtube.com/watch?v=-O_PaCZwGNk", type: "big-rect", down: "77%", right: "42%" },
                { id: "Button", link: "https://www.youtube.com/watch?v=gtcSPFqyCNk&t=376s ", type: "big-rect", down: "6%", right: "27%" },
                { id: "Clark", link: "https://www.youtube.com/watch?v=nVmAfLhpTwo", type: "big-rect", down: "20%", right: "39%" },
                { id: "Fangio", link: "https://www.youtube.com/watch?v=26mw9i2Fx_M", type: "big-rect", down: "85%", right: "56%" },
                { id: "Hill", link: "https://www.youtube.com/watch?v=gtcSPFqyCNk&t=290s", type: "big-rect", down: "62%", right: "15%" },
                { id: "Jones", link: "https://www.youtube.com/watch?v=GHVLPXYTvjE", type: "big-rect", down: "85%", right: "40%" },
                { id: "Lauda", link: "https://www.youtube.com/watch?v=gtcSPFqyCNk&t=584s", type: "big-rect", down: "76%", right: "78%" },
                { id: "Moss", link: "https://www.youtube.com/watch?v=ucfxqMS06rU", type: "big-rect", down: "85%", right: "48%" },
                { id: "Prost", link: "https://www.youtube.com/watch?v=XtQUjYG_eKk", type: "big-rect", down: "84%", right: "70%" },
                { id: "Ricciardo", link: "https://www.youtube.com/watch?v=gtcSPFqyCNk&t=313s ", type: "big-rect", down: "55%", right: "22%" },
                { id: "Schum", link: "https://www.youtube.com/watch?v=pWsaX7WBWQg", type: "big-rect", down: "76%", right: "70%" },
                { id: "Senna", link: "https://www.youtube.com/watch?v=eR7G_3FgGxY", type: "big-rect", down: "85%", right: "63%" },
                { id: "Stewart", link: "https://www.youtube.com/watch?v=VmlxBXqcFqI", type: "big-rect", down: "43%", right: "11%" },
                { id: "Vettel", link: "https://www.youtube.com/watch?v=TL6Ykv71z8M", type: "big-rect", down: "45%", right: "79%" },
                { id: "Waite", link: "https://www.youtube.com/watch?v=ORGcS14fjRQ", type: "big-rect", down: "41%", right: "54%" },
                { id: "Webber", link: "https://www.youtube.com/watch?v=LcCbbnwUR0Y", type: "big-rect", down: "54%", right: "75%" }]},
        china: {name: "China GP",
            grandstands: [
                { id: "A-Low", link: "https://www.youtube.com/watch?v=eorlltsLdSE", type: "big-rect", down: "37%", right: "39%" },
                { id: "A-Up1", link: "https://www.youtube.com/watch?v=-VvL7Z8_xog", type: "big-rect", down: "42%", right: "35%" },
                { id: "A-Up2", link: "https://www.youtube.com/watch?v=3Z1YQcSOj40", type: "big-rect", down: "32%", right: "37%" },
                { id: "A-Plat", link: "no", type: "big-rect", down: "37%", right: "34%" },
                { id: "H", link: "https://www.youtube.com/watch?v=q11KJdNossk", type: "rectangle", down: "85%", right: "27%" },
                { id: "K", link: "https://www.youtube.com/watch?v=qLvWo-W1x88", type: "rectangle", down: "72%", right: "26%" },]},
        japan: {name: "Japan GP",
            grandstands: [
                { id: "A1", link: "no", type: "rectangle", down: "69%", right: "78%" },
                { id: "A2", link: "https://www.youtube.com/watch?v=thLYUwHBhY0", type: "rectangle", down: "74%", right: "80%" },
                { id: "B1", link: "https://www.youtube.com/watch?v=m3FFQULiBW4", type: "rectangle", down: "90%", right: "76%" },
                { id: "B2", link: "https://www.youtube.com/watch?v=WZ0mgU73Hgw", type: "rectangle", down: "93%", right: "76%" },
                { id: "C", link: "https://www.youtube.com/watch?v=lF28XlAzeyk", type: "rectangle", down: "86%", right: "72%" },
                { id: "D", link: "https://www.youtube.com/watch?v=fgRlKNQuXb0", type: "rectangle", down: "62%", right: "58%" },
                { id: "E", link: "https://www.youtube.com/watch?v=Ds4QhJq7-r0", type: "square", down: "48%", right: "59%" },
                { id: "H", link: "no", type: "square", down: "32%", right: "44%" },
                { id: "I", link: "https://www.youtube.com/watch?v=rpu1f7ywbng", type: "square", down: "25%", right: "39%" },
                { id: "O", link: "no", type: "rectangle", down: "48%", right: "33%" },
                { id: "Q1", link: "no", type: "square", down: "30%", right: "58%" },
                { id: "Q2", link: "https://www.youtube.com/watch?v=MiNJSk_yYDQ", type: "square", down: "26%", right: "57%" },
                { id: "R", link: "no", type: "square", down: "29%", right: "60%" },
                { id: "S", link: "no", type: "square", down: "32%", right: "64%" },
                { id: "V1", link: "https://www.youtube.com/watch?v=kJlN5F_2zT0", type: "rectangle", down: "50%", right: "71%" },
                { id: "V2", link: "https://www.youtube.com/shorts/8msLljvJTtc", type: "rectangle", down: "46%", right: "73%" }]},
        bahrain: {name: "Bahrain GP",
            grandstands:[
                { id: "UG 1", link: "no", type: "big-rect", down: "48%", right: "22%" },
                { id: "UG 2", link: "https://www.youtube.com/watch?v=PgALvSCjNw0", type: "big-rect", down: "44%", right: "22.5%" },
                { id: "UG 3", link: "no", type: "big-rect", down: "40%", right: "23%" },
                { id: "VG 1", link: "https://www.youtube.com/watch?v=4_NdqEbsVI0", type: "big-rect", down: "53%", right: "70%" },
                { id: "VG 2", link: "https://www.youtube.com/watch?v=keq4apjAK2k", type: "big-rect", down: "63%", right: "74%" },
                { id: "1", link: "https://www.youtube.com/watch?v=hv_9IAuWMLY", type: "rectangle", down: "79%", right: "28%" },
                { id: "MG", link: "https://www.youtube.com/watch?v=HQWaZPiLIh8", type: "big-rect", down: "79%", right: "45%" },
                { id: "Beyon", link: "https://www.youtube.com/watch?v=tmWR0ToErCg", type: "big-rect", down: "62%", right: "45%" }]},
        saudi_arabia: {name: "Saudi Arabia GP",
            grandstands: [
                { id: "CG", link: "https://www.youtube.com/watch?v=D9FusFViBTE", type: "square", down: "72%", right: "36%" },
                { id: "MG A", link: "https://www.youtube.com/watch?v=YgJu2-QGynw", type: "rectangle", down: "33%", right: "61%" },
                { id: "MG B", link: "no", type: "rectangle", down: "38%", right: "57%" },
                { id: "PC", link: "https://www.youtube.com/watch?v=4nFuimC2s6g&t=47s", type: "rectangle", down: "33%", right: "66%" }]},
        miami: {name: "Miami GP",
            grandstands: [
                { id: "T1a", link: "https://www.youtube.com/watch?v=Cy7Ywx9FxD0", type: "rectangle", down: "44%", right: "59%" },
                { id: "T1b", link: "https://www.youtube.com/watch?v=pNZ3rMAk95A", type: "square", down: "55%", right: "59%" },
                { id: "T18", link: "https://www.youtube.com/watch?v=siYiV9uvJYM", type: "rectangle", down: "31%", right: "23%" },
                { id: "Boat", link: "https://www.youtube.com/watch?v=W7xVWXnRHLc", type: "rectangle", down: "59%", right: "20%" },
                { id: "North", link: "https://www.youtube.com/watch?v=0NDy0wbxh20", type: "rectangle", down: "44%", right: "73%" },
                { id: "South", link: "https://www.youtube.com/watch?v=86Hx1dovRMc", type: "rectangle", down: "61%", right: "79%" },
                { id: "Start", link: "https://www.youtube.com/watch?v=M-QmYj7uZNg", type: "rectangle", down: "30%", right: "48%" },
                { id: "marina", link: "https://www.youtube.com/watch?v=sSWXV651QDk", type: "rectangle", down: "63%", right: "12%" }]},
        imola: {name: "Imola GP",
            grandstands: [
                { id: "R 1", link: "https://www.youtube.com/watch?v=IyE71WSOS0w", type: "rectangle", down: "11%", right: "87%" },
                { id: "R 2", link: "https://www.youtube.com/watch?v=lT7u7u75tLo", type: "rectangle", down: "21%", right: "92%" },
                { id: "S/P 1", link: "https://www.youtube.com/watch?v=z9jSwv98MHw", type: "rectangle", down: "19%", right: "62%" },
                { id: "S/P 2", link: "https://www.youtube.com/watch?v=xAraMNYwlNI", type: "rectangle", down: "19%", right: "66%" },
                { id: "S/P 3", link: "https://www.youtube.com/watch?v=-GiGTXZc5U4", type: "rectangle", down: "19%", right: "70%" },
                { id: "S/P 4", link: "no", type: "rectangle", down: "19%", right: "74%" },
                { id: "G 1", link: "https://www.youtube.com/watch?v=jxXE26YGnEQ", type: "rectangle", down: "54%", right: "65%" },
                { id: "G 2", link: "no", type: "rectangle", down: "52%", right: "69%" },
                { id: "G 4", link: "no", type: "rectangle", down: "45%", right: "63%" },
                { id: "AM 1", link: "https://www.youtube.com/watch?v=8U38ssWSX1g", type: "rectangle", down: "45%", right: "41%" },
                { id: "AM 2", link: "https://www.youtube.com/watch?v=SxPfAJGIlcw", type: "rectangle", down: "45%", right: "45%" },
                { id: "AM 3", link: "no", type: "rectangle", down: "45%", right: "49%" },
                { id: "AM 4", link: "https://www.youtube.com/watch?v=STAsFhFrMNI", type: "rectangle", down: "47%", right: "33%" },
                { id: "AM 5", link: "no", type: "rectangle", down: "54%", right: "46%" },
                { id: "T 1", link: "https://www.youtube.com/watch?v=yKGSZ87Qd2s", type: "rectangle", down: "98%", right: "0%" },
                { id: "T 2", link: "https://www.youtube.com/watch?v=5Z3mNc-FH4k", type: "rectangle", down: "93%", right: "30%" },
                { id: "V 1", link: "no", type: "rectangle", down: "36%", right: "20%" },
                { id: "V 2", link: "https://www.youtube.com/watch?v=UNbkLTF2rCk", type: "rectangle", down: "44%", right: "18%" },
                { id: "V 3", link: "https://www.youtube.com/watch?v=eebg_-wMdMU", type: "rectangle", down: "74%", right: "15%" },]},
        monaco: {name: "Monaco GP",
            grandstands: [
                { id: "A1", link: "https://www.youtube.com/watch?v=4fhUWvtboIY", type: "square", down: "24%", right: "34%" },
                { id: "B", link: "https://www.youtube.com/watch?v=WejHrdZ_Veg", type: "square", down: "33%", right: "64%" },
                { id: "C", link: "https://www.youtube.com/watch?v=ueV-rGnvBx8", type: "square", down: "44%", right: "84%" },
                { id: "K", link: "https://www.youtube.com/watch?v=TxXz7s_DBRA", type: "square", down: "29%", right: "30%" },
                { id: "L", link: "https://www.youtube.com/watch?v=cAOhqrX9h5o", type: "square", down: "51%", right: "23%" },
                { id: "M", link: "https://www.youtube.com/watch?v=o4KAEfU1MpI", type: "square", down: "40%", right: "26%" },
                { id: "N", link: "https://www.youtube.com/watch?v=C9puYCQRxnM", type: "square", down: "45%", right: "29%" },
                { id: "O", link: "https://www.youtube.com/watch?v=uQmStENa8XU", type: "square", down: "50%", right: "27%" },
                { id: "P", link: "https://www.youtube.com/watch?v=PRU4k5Lq0bM", type: "square", down: "55%", right: "25%" },
                { id: "T", link: "https://www.youtube.com/watch?v=COD61MiQWMM", type: "square", down: "63%", right: "22%" },
                { id: "V", link: "https://www.youtube.com/watch?v=l3V4nTcVtcE", type: "square", down: "77%", right: "15%" },
                { id: "X1", link: "https://www.youtube.com/watch?v=9IlmajLI47I", type: "square", down: "65%", right: "15%" },
                { id: "X2", link: "https://www.youtube.com/watch?v=Q70BgSPKG-A", type: "square", down: "60%", right: "16%" },
                { id: "Z1", link: "https://www.youtube.com/watch?v=uqViJtF2qIg", type: "square", down: "27%", right: "38%" },]},
        spain: {name: "Spain GP",
            grandstands: [
                { id: "A", link: "https://www.youtube.com/watch?v=pfWrpK7DCg8", type: "rectangle", down: "58%", right: "18%" },
                { id: "B", link: "https://www.youtube.com/watch?v=nOeknBKwgOs", type: "square", down: "32%", right: "68%" },
                { id: "C", link: "https://www.youtube.com/watch?v=n1yfSYiIGos", type: "square", down: "30%", right: "82%" },
                { id: "E", link: "https://www.youtube.com/watch?v=FB7Q1zJUqh0", type: "square", down: "73%", right: "29%" },
                { id: "F", link: "https://www.youtube.com/watch?v=fs6NzFmSLj8", type: "square", down: "73%", right: "25%" },
                { id: "G", link: "https://www.youtube.com/watch?v=Ou-cX1wYOPs", type: "rectangle", down: "25%", right: "73%" },
                { id: "H", link: "https://www.youtube.com/watch?v=8RI7Gp-p7LQ", type: "square", down: "60%", right: "85%" },
                { id: "J", link: "https://www.youtube.com/watch?v=vCkpXpSZEUY", type: "rectangle", down: "73%", right: "40%" },
                { id: "K", link: "https://www.youtube.com/watch?v=8XbCH8wQKFk", type: "rectangle", down: "73%", right: "34%" },
                { id: "L", link: "https://www.youtube.com/watch?v=I8OI9irZa_0", type: "square", down: "47%", right: "20%" },
                { id: "M", link: "https://www.youtube.com/watch?v=NyQZQYBMFlQ", type: "square", down: "40%", right: "22%" },
                { id: "N", link: "https://www.youtube.com/watch?v=mwiFtDI5MKA", type: "square", down: "24%", right: "49%" },
                { id: "S", link: "no", type: "square", down: "27%", right: "46%" },
                { id: "T1", link: "https://www.youtube.com/shorts/fM7GxJ5Q-Ws", type: "square", down: "65%", right: "22%" },
                { id: "Main", link: "https://www.youtube.com/watch?v=BLfHdahORMA", type: "rectangle", down: "73%", right: "60%" },]},
        canada: {name: "Canada GP",
            grandstands: [
                { id: "1", link: "https://www.youtube.com/watch?v=46-Cvqd8yDk", type: "rectangle", down: "42%", right: "68%" },
                { id: "15", link: "https://www.youtube.com/watch?v=TU5CZjQuf5Y", type: "square", down: "14%", right: "13%" },
                { id: "16", link: "https://www.youtube.com/watch?v=5s37pP3PlQ8", type: "rectangle", down: "40%", right: "62%" },
                { id: "21", link: "https://www.youtube.com/watch?v=igIZYmCKQ7I", type: "rectangle", down: "23%", right: "16%" },
                { id: "31", link: "https://www.youtube.com/watch?v=jMbQipZNNRE", type: "square", down: "41%", right: "32%" },
                { id: "32", link: "https://www.youtube.com/watch?v=c4uXOmbNxR4", type: "square", down: "57%", right: "56%" },
                { id: "34", link: "https://www.youtube.com/watch?v=JhzB-NZaDZE", type: "square", down: "20%", right: "25%" },
                { id: "46", link: "https://www.youtube.com/watch?v=i-hYuLY3txA", type: "rectangle", down: "12%", right: "27%" },
                { id: "47", link: "https://www.youtube.com/shorts/P3SVbwht3Ys", type: "square", down: "21%", right: "30%" },
                { id: "LS", link: "https://www.youtube.com/watch?v=Ohee75Lunac", type: "rectangle", down: "11%", right: "18%" },
                { id: "FG", link: "https://www.youtube.com/watch?v=cdpRu4KFda4", type: "square", down: "62%", right: "54%" },
                { id: "(1-4)", link: "https://www.youtube.com/watch?v=tLHY7COsrgM", type: "rectangle", down: "41%", right: "82%" },
                { id: "(5-7)", link: "https://www.youtube.com/shorts/zBldvovOjoo", type: "rectangle", down: "43%", right: "85%" },
                { id: "(1-3)", link: "https://www.youtube.com/watch?v=CMLi_en9Qwc", type: "rectangle", down: "49%", right: "85%" },
                { id: "(4-8)", link: "https://www.youtube.com/shorts/D1iig-b35tc", type: "rectangle", down: "53%", right: "84%" },]},
        austria: {name: "Austria GP",
            grandstands: [
                { id: "RB:A-E", link: "hi", type: "big-rect", down: "70%", right: "41%" },
                { id: "RB:F-J", link: "hi", type: "big-rect", down: "62%", right: "36%" },
                { id: "RB:K-P", link: "hi", type: "big-rect", down: "54%", right: "32%" },
                { id: "S:A-E", link: "hi", type: "big-rect", down: "82%", right: "50%" },
                { id: "Z:A-E", link: "hi", type: "big-rect", down: "53%", right: "71%" },
                { id: "Z:F-K", link: "hi", type: "big-rect", down: "63%", right: "65%" },
                { id: "Z:L-Q", link: "hi", type: "big-rect", down: "73%", right: "59%" },
                { id: "T3", link: "hi", type: "rectangle", down: "28%", right: "22%" },
                { id: "T8", link: "hi", type: "rectangle", down: "34%", right: "51%" },
                { id: "T9", link: "hi", type: "rectangle", down: "21%", right: "73%" },
                { id: "T10", link: "hi", type: "rectangle", down: "29%", right: "76%" }
            ]},
        british: {name: "British GP",
            grandstands: [
                { id: "ABBEY B", link: "hi", type: "rectangle", down: "60%", right: "70%" },
                { id: "BECKETTS", link: "hi", type: "rectangle", down: "10%", right: "40%" },
                { id: "FARM CURVE", link: "hi", type: "rectangle", down: "45%", right: "50%" },
                { id: "FUSION LOUNGE", link: "hi", type: "rectangle", down: "75%", right: "80%" },
                { id: "HILTON", link: "hi", type: "rectangle", down: "85%", right: "70%" },
                { id: "IGNITION CLUB", link: "hi", type: "rectangle", down: "15%", right: "25%" },
                { id: "LUFFIELD", link: "hi", type: "rectangle", down: "50%", right: "15%" },
                { id: "NATIONAL PITS STRAIGHT", link: "hi", type: "rectangle", down: "20%", right: "10%" },
                { id: "OCTANE TERRACE", link: "hi", type: "rectangle", down: "65%", right: "85%" },
                { id: "SILVERSTONE SEVENTY", link: "hi", type: "rectangle", down: "30%", right: "60%" },
                { id: "STOWE C", link: "hi", type: "rectangle", down: "90%", right: "95%" },
                { id: "THE RACING GREEN", link: "hi", type: "rectangle", down: "25%", right: "30%" },
                { id: "TRACKSIDE", link: "hi", type: "rectangle", down: "35%", right: "20%" },
                { id: "VALE", link: "hi", type: "rectangle", down: "80%", right: "75%" },
                { id: "VILLAGE B", link: "hi", type: "rectangle", down: "40%", right: "45%" },
                { id: "WOODCOTE A", link: "hi", type: "rectangle", down: "55%", right: "20%" }

            ]},
        hungary: {name: "Hungary GP",
            grandstands: [
            ]},
        belgium: {name: "Belgium GP",
            grandstands: [
                { id: "GOLD 1 PIT", link: "hi", type: "rectangle", down: "60%", right: "20%" },
                { id: "GOLD 2 GP2", link: "hi", type: "rectangle", down: "40%", right: "15%" },
                { id: "GOLD 3 EAU-ROUGE", link: "hi", type: "rectangle", down: "30%", right: "10%" },
                { id: "GOLD 4 EAU-ROUGE", link: "hi", type: "rectangle", down: "25%", right: "12%" },
                { id: "GOLD 5", link: "hi", type: "rectangle", down: "55%", right: "25%" },
                { id: "GOLD 6 CHICANE", link: "hi", type: "rectangle", down: "65%", right: "30%" },
                { id: "GOLD 7 LA SOURCE", link: "hi", type: "rectangle", down: "70%", right: "35%" },
                { id: "GOLD 7 TER LA SOURCE", link: "hi", type: "rectangle", down: "75%", right: "40%" },
                { id: "GOLD 8 LA SOURCE", link: "hi", type: "rectangle", down: "80%", right: "45%" },
                { id: "GOLD 9 BIS", link: "hi", type: "rectangle", down: "85%", right: "50%" },
                { id: "GOLD 9", link: "hi", type: "rectangle", down: "90%", right: "55%" },
                { id: "GRANDSTAND FAN ZONE", link: "hi", type: "rectangle", down: "50%", right: "10%" },
                { id: "ORANGE ZONE", link: "hi", type: "rectangle", down: "40%", right: "60%" },
                { id: "SILVER 3", link: "hi", type: "rectangle", down: "30%", right: "65%" },
                { id: "SILVER 4", link: "hi", type: "rectangle", down: "35%", right: "70%" },
                { id: "SILVER 6", link: "hi", type: "rectangle", down: "45%", right: "75%" },
                { id: "SPEED CORNER", link: "hi", type: "rectangle", down: "50%", right: "80%" }
            ]},
        Dutch: {name: "Dutch GP",
            grandstands: [
                { id: "ACCESSIBILITY PLATFORM", link: "hi", type: "rectangle", down: "85%", right: "75%" },
                { id: "ARENA", link: "hi", type: "rectangle", down: "55%", right: "60%" },
                { id: "ARENA IN", link: "hi", type: "rectangle", down: "50%", right: "55%" },
                { id: "ARENA OUT", link: "hi", type: "rectangle", down: "60%", right: "65%" },
                { id: "BEN PON", link: "hi", type: "rectangle", down: "90%", right: "40%" },
                { id: "EASTSIDE", link: "hi", type: "rectangle", down: "45%", right: "50%" },
                { id: "HAIRPIN", link: "hi", type: "rectangle", down: "30%", right: "70%" },
                { id: "MAIN GRANDSTAND", link: "hi", type: "rectangle", down: "90%", right: "45%" },
                { id: "PIT", link: "hi", type: "rectangle", down: "90%", right: "50%" },
                { id: "TARZAN-IN", link: "hi", type: "rectangle", down: "90%", right: "55%" }
            ]},
        monza: {name: "Monza GP",
            grandstands: [
                { id: "1", link: "no", type: "rectangle", down: "78%", right: "62%" },
                { id: "2", link: "no", type: "rectangle", down: "78%", right: "59%" },
                { id: "3", link: "https://www.youtube.com/watch?v=UBIX9voJR6g", type: "rectangle", down: "78%", right: "55%" },
                { id: "4", link: "https://www.youtube.com/watch?v=0S-aQSEpg7c", type: "rectangle", down: "81.5%", right: "57%" },
                { id: "5", link: "https://www.youtube.com/watch?v=dbsHO62ssi0", type: "rectangle", down: "78%", right: "52%" },
                { id: "7", link: "https://www.youtube.com/watch?v=y5vZFRiQdrk", type: "rectangle", down: "78%", right: "47%" },
                { id: "6a", link: "https://www.youtube.com/watch?v=b7qkBe1Lnzk", type: "square", down: "70%", right: "46%" },
                { id: "6b", link: "https://www.youtube.com/watch?v=FtAVtWgvBOo", type: "square", down: "70%", right: "44%" },
                { id: "6c", link: "https://www.youtube.com/watch?v=Io4mZbJACj4", type: "square", down: "68%", right: "42%" },
                { id: "8a", link: "https://www.youtube.com/watch?v=_X1QLuj3NFA", type: "rectangle", down: "80.5%", right: "39%" },
                { id: "8b", link: "https://www.youtube.com/watch?v=XpK7ElHpZGw", type: "rectangle", down: "77%", right: "39%" },
                { id: "9", link: "https://www.youtube.com/watch?v=BpmmQG5MI_M", type: "square", down: "32%", right: "26%" },
                { id: "10", link: "https://www.youtube.com/watch?v=s-0ckWHV8Uc", type: "square", down: "29%", right: "25%" },
                { id: "11", link: "https://www.youtube.com/watch?v=TxUBcXjZKGo&t=3s", type: "square", down: "41%", right: "38%" },
                { id: "12", link: "https://www.youtube.com/watch?v=nBdR6u593DM", type: "square", down: "54%", right: "44%" },
                { id: "13", link: "https://www.youtube.com/watch?v=87n7cqUVZNk", type: "rectangle", down: "62%", right: "46%" },
                { id: "14", link: "https://www.youtube.com/watch?v=ZL-bfs28ZgM", type: "rectangle", down: "62.25%", right: "49%" },
                { id: "15", link: "https://www.youtube.com/watch?v=cOxsXOjdNss", type: "rectangle", down: "62.5%", right: "52%" },
                { id: "16", link: "https://www.youtube.com/watch?v=7nA2lU_q01A", type: "rectangle", down: "62.75%", right: "55%" },
                { id: "18", link: "https://www.youtube.com/watch?v=UGUNlMvgPXk", type: "rectangle", down: "63%", right: "58%" },
                { id: "19", link: "https://www.youtube.com/watch?v=UHjYPkHL5Jo", type: "rectangle", down: "63.25%", right: "61%" },
                { id: "20", link: "https://www.youtube.com/watch?v=jLMtflTPmIw", type: "rectangle", down: "63.5%", right: "62%" },
                { id: "21e", link: "https://www.youtube.com/watch?v=h9GLXg9pMHw", type: "square", down: "54%", right: "68%" },
                { id: "21d", link: "https://www.youtube.com/watch?v=o6aSLfrBdws", type: "square", down: "54%", right: "70%" },
                { id: "21c", link: "https://www.youtube.com/watch?v=-kwJMvJbKYo", type: "square", down: "54%", right: "72%" },
                { id: "21b", link: "https://www.youtube.com/watch?v=hZCL84FOwgg", type: "square", down: "54%", right: "74%" },
                { id: "21a", link: "https://www.youtube.com/watch?v=UrlFJOIpUJI", type: "square", down: "54%", right: "76%" },
                { id: "22", link: "https://www.youtube.com/watch?v=Y-DrzKD7LP4", type: "square", down: "54%", right: "78%" },
                { id: "23a", link: "https://www.youtube.com/watch?v=T5UvWnauBMU", type: "square", down: "70%", right: "71%" },
                { id: "23b", link: "https://www.youtube.com/watch?v=KehozHlSEAs", type: "square", down: "70%", right: "69%" },
                { id: "24", link: "https://www.youtube.com/watch?v=93cpZxGg4c4", type: "rectangle", down: "81%", right: "77%" },
                { id: "25", link: "no", type: "rectangle", down: "77.5%", right: "77%" },
                { id: "26a", link: "https://www.youtube.com/watch?v=iH90rxpExTo", type: "square", down: "81.5%", right: "67.5%" },
                { id: "26b", link: "https://www.youtube.com/watch?v=GtHFIHFTrck", type: "square", down: "81.5%", right: "70%" },
                { id: "26c", link: "https://www.youtube.com/watch?v=YFTL_dME1fE", type: "square", down: "81.5%", right: "72.5%" },
                { id: "27", link: "no", type: "square", down: "78%", right: "66.5%" },
                { id: "28c", link: "no", type: "square", down: "78%", right: "69%" },
                { id: "29b", link: "no", type: "square", down: "78%", right: "71.5%" },
                { id: "30a", link: "no", type: "square", down: "78%", right: "74%" },]},
        azerbaijan: {name: "Azerbaijan GP",
            grandstands: [
                { id: "Absheron Grandstand A", link: "hi", type: "rectangle", down: "80%", right: "80%" },
                { id: "Absheron Grandstand B", link: "hi", type: "rectangle", down: "80%", right: "75%" },
                { id: "Absheron Grandstand C", link: "hi", type: "rectangle", down: "80%", right: "70%" },
                { id: "Absheron Grandstand D", link: "hi", type: "rectangle", down: "80%", right: "65%" },
                { id: "Absheron Grandstand E", link: "hi", type: "rectangle", down: "80%", right: "60%" },
                { id: "AzNeft", link: "hi", type: "rectangle", down: "90%", right: "10%" },
                { id: "Bulvar", link: "hi", type: "rectangle", down: "75%", right: "50%" },
                { id: "Filarmoniya", link: "hi", type: "rectangle", down: "90%", right: "15%" },
                { id: "Giz Galasi", link: "hi", type: "rectangle", down: "80%", right: "25%" },
                { id: "Icheri Sheher", link: "hi", type: "rectangle", down: "70%", right: "20%" },
                { id: "Khazar", link: "hi", type: "rectangle", down: "70%", right: "60%" },
                { id: "Mugham", link: "hi", type: "rectangle", down: "80%", right: "30%" },
                { id: "Paddock Club", link: "hi", type: "rectangle", down: "80%", right: "85%" },
                { id: "Sahil", link: "hi", type: "rectangle", down: "75%", right: "40%" }]},
        singapore: {name: "Singapore GP",
            grandstands: [
                { id: "Bayfront", link: "hi", type: "rectangle", down: "70%", right: "60%" },
                { id: "Chicane @ Turn 1", link: "hi", type: "rectangle", down: "50%", right: "80%" },
                { id: "Connaught", link: "hi", type: "rectangle", down: "40%", right: "50%" },
                { id: "Padang A", link: "hi", type: "rectangle", down: "10%", right: "40%" },
                { id: "Padang B", link: "hi", type: "rectangle", down: "20%", right: "40%" },
                { id: "Paddock Club", link: "hi", type: "rectangle", down: "75%", right: "85%" },
                { id: "Pit", link: "hi", type: "rectangle", down: "85%", right: "85%" },
                { id: "Pit Entry", link: "hi", type: "rectangle", down: "80%", right: "90%" },
                { id: "Pit Exit", link: "hi", type: "rectangle", down: "45%", right: "80%" },
                { id: "Promenade", link: "hi", type: "rectangle", down: "70%", right: "50%" },
                { id: "Raffles", link: "hi", type: "rectangle", down: "65%", right: "75%" },
                { id: "Range of Empress", link: "hi", type: "rectangle", down: "15%", right: "30%" },
                { id: "Republic Grandstand", link: "hi", type: "rectangle", down: "50%", right: "75%" },
                { id: "Stamford", link: "hi", type: "rectangle", down: "25%", right: "50%" },
                { id: "Turn 1", link: "hi", type: "rectangle", down: "50%", right: "85%" },
                { id: "Turn 2", link: "hi", type: "rectangle", down: "55%", right: "90%" }]},
        austin: {name: "Austin GP",
            grandstands: [
                { id: "MG", link: "https://www.youtube.com/watch?v=Ru3nrj_pGdo", type: "rectangle", down: "72%", right: "14%" },
                { id: "1", link: "https://www.youtube.com/watch?v=Mjjbd5t6nXM", type: "rectangle", down: "96%", right: "31%" },
                { id: "2", link: "https://www.youtube.com/shorts/lt7N4Nq5ENw", type: "square", down: "72%", right: "34%" },
                { id: "4", link: "https://www.youtube.com/watch?v=welblGOG3kI", type: "square", down: "52%", right: "51%" },
                { id: "6", link: "https://www.youtube.com/watch?v=bn82jQxzgL8", type: "rectangle", down: "32%", right: "55%" },
                { id: "9", link: "https://www.youtube.com/watch?v=Qa4Z1mNlAUk", type: "rectangle", down: "44%", right: "75%" },
                { id: "12", link: "https://www.youtube.com/watch?v=-7vu8ao4rd4", type: "rectangle", down: "18%", right: "39%" },
                { id: "15", link: "https://www.youtube.com/watch?v=bUAQRGyHLM8", type: "square", down: "34%", right: "29%" },
                { id: "19", link: "https://www.youtube.com/watch?v=SvOcdKg4TAM", type: "rectangle", down: "34%", right: "20%" },]},
        mexico: {name: "Mexico GP",
            grandstands: [
                { id: "3", link: "hi", type: "rectangle", down: "20%", right: "80%" },
                { id: "3A", link: "hi", type: "rectangle", down: "15%", right: "80%" },
                { id: "4", link: "hi", type: "rectangle", down: "10%", right: "80%" },
                { id: "5", link: "hi", type: "rectangle", down: "10%", right: "70%" },
                { id: "5A", link: "hi", type: "rectangle", down: "15%", right: "70%" },
                { id: "6-A", link: "hi", type: "rectangle", down: "20%", right: "60%" },
                { id: "7", link: "hi", type: "rectangle", down: "25%", right: "60%" },
                { id: "8", link: "hi", type: "rectangle", down: "30%", right: "50%" },
                { id: "9", link: "hi", type: "rectangle", down: "35%", right: "50%" },
                { id: "10", link: "hi", type: "rectangle", down: "40%", right: "40%" },
                { id: "11", link: "hi", type: "rectangle", down: "45%", right: "40%" },
                { id: "14", link: "hi", type: "rectangle", down: "70%", right: "10%" },
                { id: "15", link: "hi", type: "rectangle", down: "65%", right: "10%" },
                { id: "Main Grandstand", link: "hi", type: "rectangle", down: "75%", right: "20%" },
                { id: "Main Grandstand Club", link: "hi", type: "rectangle", down: "80%", right: "20%" },
                { id: "Platinum Plus E", link: "hi", type: "rectangle", down: "75%", right: "30%" },
                { id: "Platinum Plus A", link: "hi", type: "rectangle", down: "80%", right: "30%" },
                { id: "Sky Box G1", link: "hi", type: "rectangle", down: "75%", right: "40%" },
                { id: "Sky Box G1+", link: "hi", type: "rectangle", down: "80%", right: "40%" },
                { id: "Sky Box G9", link: "hi", type: "rectangle", down: "85%", right: "40%" },
                { id: "Speed Lounge 1", link: "hi", type: "rectangle", down: "75%", right: "50%" },
                { id: "Speed Lounge 2", link: "hi", type: "rectangle", down: "80%", right: "50%" },
                { id: "Terrazza", link: "hi", type: "rectangle", down: "55%", right: "40%" },
                { id: "Trackside Box D", link: "hi", type: "rectangle", down: "60%", right: "40%" }]},

    };

    return tracks[trackName];
}
