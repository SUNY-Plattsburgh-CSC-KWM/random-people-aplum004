console.log("JS file loaded");
$(document).ready(function() {
async function getPeople() {
	try {
		const response = await fetch("https://randomuser.me/api/?results=25&nat=us");
		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status}`);
        }
		const data = await response.json();
		return data.results;
	} catch (error) {
		console.error(`Could not get names: ${error}`);
	}
}

async function buildTable() {
	try {
		const data = await getPeople();
		if (!people) return;
		people.sort((a,b) => a.name.last.localeCompare(b.name.last));

		const $table = $("people");
		people.forEach(person => {
			const name = '${person.name.title} ${person.name.first} ${person.name.last}';
			const address = '${person.location.street.number} ${person.location.street.name';
			const city = person.location.city;
			const state = person.location.state;
			const zip = person.location.postcode;
			const latitude = person.location.coordinates.latitude;
			const longitude = person.location.coordinates.longitude;
			const phone = person.phone;
			const row = `
			<tr title="Phone: ${phone}">
			<td>${name}</td>
			<td>${address}</td>
			<td>${city}</td>
			<td>${state}</td>
         	<td>${zip}</td>
          	<td>${latitude}</td>
          	<td>${longitude}</td>
			</tr>
			`;
			$table.append(row);
		});
	} catch (e) {
		console.log("Error " + e);
	}
}
buildTable();
});