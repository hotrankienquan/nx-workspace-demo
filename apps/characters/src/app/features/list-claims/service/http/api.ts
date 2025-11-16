import apiClient from "apps/characters/src/app/globals/service/http/apiClient";
import { IListClaims } from "../../types/interface/list-claims";
import { CategoryType } from "../../types/types";


export async function fetchClaims(category: Partial<CategoryType>) {
  const url = category ? `/claims?category=${category}` : '/claims';

  try {
    const response = await apiClient.get<IListClaims[]>(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch claims');
  }
}


