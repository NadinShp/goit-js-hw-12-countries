import url from "./api-service";

export default function fetchCountries(searchQuery) {
    return fetch(`${url}/${searchQuery}`)
        .then(response => {
            if (response.status === '404') throw new Error;
            return response.json();
        })
}
