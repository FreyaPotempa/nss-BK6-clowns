import { sendRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")


mainContainer.addEventListener(
    "click",
    clickEvent => {
        if (clickEvent.target.id === "submitRequest") {
            const parent = document.querySelector("input[name='parentName']").value
            const child = document.querySelector("input[name='childName']").value
            const numAttendees = document.querySelector("input[name='numAttendees']").value
            const userAdress = document.querySelector("input[name='address']").value
            const lengthParty = document.querySelector("input[name='partyLength']").value
            const userDate = document.querySelector("input[name='partyDate']").value
        
            const requestToSendToAPI = {
                parentName: parent,
                childName: child,
                attendees: numAttendees,
                address: userAdress,
                partyLength: lengthParty,
                partyDate: userDate
            }

            sendRequest(requestToSendToAPI)
        }
    }
)



export const partyForm = () => {
    let html = `
    <div class="field">
        <label class="label" for="parentName">Parent Name</label>
        <input type="text" name="parentName" class="input" />
        </div>
        <div class="field>
        <label class="label" for="childName">Child Name</label>
        <input type="text" name="childName" class="input" />
        </div>
        <div class="field">
        <label class="label" for="numAttendees">Number of Attendees</label>
        <input type="text" name="numAttendees" class="input" />
        </div>
        <div class="field">
        <label class="label" for="address">Address</label>
        <input type="text" name="address" class="input" />
        </div>
        <div class="field">
        <label class="label" for="partyLength">Length of Party</label>
        <input type="text" name="partyLength" class="input">
        </div>
        <div class="field">
        <label class="label" for="partyDate">Date Desired</label>
        <input type="date" name="partyDate" class="input" />
        </div>
        <button class="button" id="submitRequest">Submit Request</button>
        `

        return html
}


/* eg code of input field with label
        <div class="field">
        <label class="label" for="serviceDescription">Description</label>
        <input type="text" name="serviceDescription" class="input" />
        </div>

        STRETCH GOAL: 
        make some inputs into selects or radio inputs
*/