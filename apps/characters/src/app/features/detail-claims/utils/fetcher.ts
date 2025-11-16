import { BASE_URL_APP } from "../../../globals/constants";

export async function fetcher<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch: ${url}`);
    }
    return res.json();
}


export async function fetchPostSaveStage(claimId: string, stageId: string, data: Record<string, any>): Promise<void> {
    const res = await fetch(`${BASE_URL_APP}/claims/stage/save/${claimId}/${stageId}}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    console.log({res, data});
    
    if (!res.ok) {
        throw new Error(`Failed to post data to: ${BASE_URL_APP}/claims/stage/save/${claimId}/${stageId}}`);
    }
    return res.json()
}