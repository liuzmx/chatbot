import request from "umi-request";

export function SendChat(text) {
  return request.post("/api/v1/chatbot", {
    data: { text: text },
  });
}
