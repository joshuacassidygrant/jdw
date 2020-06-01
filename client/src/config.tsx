let host =  window.location.hostname; 
let protocol = window.location.protocol;

if (host === "localhost") {
    host = "localhost:4000";
}

export const API_URL = protocol + "//" + host + "/api/" 