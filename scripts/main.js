import { fetchClowns, fetchCompletion, fetchRequests } from "./dataAccess.js"
import { partyTime } from "./PartyTime.js"


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)

export const render = () => {
    fetchRequests()
    .then(() => fetchClowns())
    .then(() => fetchCompletion())
    .then(
        () => {
            mainContainer.innerHTML = partyTime()
        }
    )
}

render()