import { API_BASE_URL } from "../../../__mocks__/libs/handlers";

export async function fetcher<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch: ${url}`);
    }
    return res.json();
}


export async function fetchPostSaveStage(claimId: string, stageId: string, data: Record<string, any>): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/claims/stage/save/${claimId}/${stageId}}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (!res.ok) {
        throw new Error(`Failed to post data to: ${API_BASE_URL}/claims/stage/save/${claimId}/${stageId}}`);
    }
    return res.json()
}