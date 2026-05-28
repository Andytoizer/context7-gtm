import { routeRequest } from "../http/server.js";

export default function handler(req, res) {
  return routeRequest(req, res);
}
