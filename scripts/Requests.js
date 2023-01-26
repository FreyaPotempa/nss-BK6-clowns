import { deleteRequest, getClowns, getCompletions, getRequests, saveCompletion } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener(
    "click", click => {
        if (click.target.id.startsWith("request--")) {
            const [,requestId] = click.target.id.split("--")
            deleteRequest(parseInt(requestId))
        }
    }
)


export const Requests = () => {
    const pastRequests = getRequests()
    // fetch request must go inside this function in order to work bc timey-wimey
    const sortedPastRequests = pastRequests.sort((a, b) => {
        let da = new Date(a.partyDate);
        let db = new Date(b.partyDate);
        return da - db;
    })
    
    let html = `<section class="partyList"><h3 id="marginProbs">Party Schedule</h3>`
    const requestList = sortedPastRequests.map(request =>
        matchCompletedParty(request))
        
    html += requestList.join("")
    html += "</section>"

    return html
}
/*
FIRST VERSION OUTPUTING REQUESTS BUT DID NOT TAKE IN COMPLETIONS
const convertRequestToListElement = (request) => {
    const clowns = getClowns()
    let html = `<li>
    ${request.parentName}'s child, ${request.childName}, has a party on ${request.partyDate}
    <select class="clowns" id="clowns">
    <option value="">Choose</option>
    ${clowns.map(clown => { 
        return `<option value="${request.id}--${clown.id}">${clown.name}</option>`
    }).join("")}
    </select>
    <button class="request--delete" id="request--${request.id}">Delete</button></li>`

    return html
}
*/

const isEventFinished = (request) => {
    const partyOvers = getCompletions()
    const clowns = getClowns()
if (partyOvers.find(party => parseInt(party.requestId) === request.id)) {
    return `Completed!`
} else {
    return `<select class="clowns" id="clowns">
    <option value="">Choose</option>
    ${clowns.map(clown => { 
        return `<option value="${request.id}--${clown.id}">${clown.name}</option>`
    }).join("")}
    </select>`
}
}

const matchCompletedParty = (request) => {
   return `<p>${request.parentName}'s child, ${request.childName}, has a party on ${request.partyDate}.
            ${isEventFinished(request)}
            <button class="request--delete" id="request--${request.id}">Delete</button></p>`
        }

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "clowns") {
            const [requestId,clownId] = event.target.value.split("--")

            const partyOver = {
                requestId: requestId,
                clownId: clownId,
                date_created: Date.now()
            }

            saveCompletion(partyOver)
        }
    }

)

/*
Use Sort to make a new copy of the array of objects
commonly use "a,b" as parameters for this function
*/

/* Need to make a completed output. I am currently creating the object
but it is just fetching and showing the original object (which makes sense),
But in the example the completed ones are showing up without the dropdown
and in a different background color. Based on the way it's outputting

I believe I need to make an if statement matching my completed objects with
my requests so that if an object is complete. it outputs a differet line of code.
*/