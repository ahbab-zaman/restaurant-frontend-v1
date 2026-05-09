import { API_V1_PREFIX, apiFetch, apiFetchMultipart } from "@/lib/auth/api-client";
import { Hotel, HotelsListResponse, HotelMutationPayload } from "@/types/hotel";

const HOTELS_BASE_PATH = `${API_V1_PREFIX}/hotels`;

function toHotelFormData(payload: HotelMutationPayload) {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("address", payload.address);
  if (payload.description) {
    formData.append("description", payload.description);
  }
  if (payload.image) {
    formData.append("image", payload.image);
  }
  return formData;
}

export const getHotelsApi = (page = 1, limit = 10, myHotels = false) => {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  if (myHotels) params.set("myHotels", "true");
  return apiFetch<HotelsListResponse>(`${HOTELS_BASE_PATH}?${params.toString()}`);
};

export const getHotelByIdApi = (id: string) =>
  apiFetch<Hotel>(`${HOTELS_BASE_PATH}/${id}`);

export const createHotelApi = (payload: HotelMutationPayload) =>
  apiFetchMultipart<Hotel>(HOTELS_BASE_PATH, {
    method: "POST",
    body: toHotelFormData(payload),
  });

export const updateHotelApi = (id: string, payload: HotelMutationPayload) =>
  apiFetchMultipart<Hotel>(`${HOTELS_BASE_PATH}/${id}`, {
    method: "PATCH",
    body: toHotelFormData(payload),
  });

export const deleteHotelApi = (id: string) =>
  apiFetch<null>(`${HOTELS_BASE_PATH}/${id}`, {
    method: "DELETE",
  });
