import { render } from "./main.js"

const applicationState = {
    requests: [],
    clowns: [],
    completions: []
}

const mainContainer = document.querySelector("#container")
const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
    .then(response => response.json())
    .then(
        (partyRequests) => {
            applicationState.requests = partyRequests
        }
    )
}

export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
    .then(response => response.json())
    .then(
        (clownList) => {
            applicationState.clowns = clownList
        }
    )
}

export const getClowns = () => {
    return applicationState.clowns.map(clown => ({...clown}))
}

export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}

export const sendRequest = (userRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userRequest)
    }

    return fetch(`${API}/requests`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE"})
    .then(
        render()
//        () => { mainContainer.dispatchEvent(new CustomEvent("StateChanged"))}
    )
}

export const saveCompletion = (complete) => {

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(complete)
        }

        return fetch(`${API}/completions`, fetchOptions)
            .then(response => response.json())
            .then(() => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            })
}

export const fetchCompletion = () => {
    return fetch(`${API}/completions`)
    .then(response => response.json())
    .then(
        (completion) => {
            applicationState.completions = completion
        }
    )
}

export const getCompletions = () => {
    return applicationState.completions.map(complete => ({...complete}))
}