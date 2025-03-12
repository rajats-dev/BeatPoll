import Select_Env from "./env";

export const BASE_URL = Select_Env.BACKEND_URL;
export const API_URL = BASE_URL + "/api";
export const AUTH_USER = API_URL + "/auth";
export const STREAM_URL = API_URL + "/stream";
// export const CHAT_URL = API_URL + "/messages";
// export const GROUP_URL = API_URL + "/group";
