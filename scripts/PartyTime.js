import { partyForm } from "./PartyForm.js"
import { Requests } from "./Requests.js"


export const partyTime = () => {
    return `
    <h1>Buttons and Lollipop Party Time</h1>
    <section class="partyForm">
    ${partyForm()}
    </section>
    
    <section class="partyRequests">
    <h2>Party Requests</h2>
    ${Requests()}
    </section>
    `
}