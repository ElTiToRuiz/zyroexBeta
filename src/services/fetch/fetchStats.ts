import { mainEndpoint } from "../../utils/endpoints"

export const fetchOrderTrends = async () => {
    try {
        const response = await fetch(`${mainEndpoint}/stats/getAll`, {
            credentials: 'include',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
        return []
    }
}