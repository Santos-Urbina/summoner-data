const form = document.querySelector('form');
const search = document.querySelector('input');
const name = document.querySelector('#name');
const level = document.querySelector('#level');
const icon = document.querySelector('#icon');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const summonerName = search.value;
    console.log(`Searching for ${summonerName}`);

    fetch(`/summoner?name=${summonerName}`).then( (response) => {
        response.json().then( (data) => {
            if(data.error) {
                console.log('Failed to fetch API data');
                console.log(data);
            } else {
                console.log(data);
                name.textContent = data.name;
                level.textContent = data.level;
                //This works, just need correct headers for this endpoint
                icon.src = `http://raw.communitydragon.org/10.1/game/assets/ux/summonericons/profileicon${data.iconID}.png`;
            }
        } );
    } );
});