const URL = 'http://localhost:8080';


async function register(id) {
    const data = {
        name: id,
    }
    const response = await fetch(`${URL}/register`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON resp

}


async function getConstests() {

    const response = await fetch(`${URL}/contests`);
    const data = await response.json();

    for (var i = 0; i < data.length; i++) {
        $('#contests').append(`
     <tr>
     <td>${data[i].name}</td>
     <td>
         <button type="button" class="btn btn-primary" id="${data[i].name}" onclick="register(this.id)" >Register</button></td>
 </tr>
     `)
    }
}


getConstests();