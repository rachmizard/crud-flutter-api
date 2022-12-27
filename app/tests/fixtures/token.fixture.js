import { JsonWebToken } from "@/app/utils/json-web-token";
import { userRegistrationFaker } from "./auth.fixture";

const jwt = new JsonWebToken();

export const defaultAuthorizedToken = jwt.sign(userRegistrationFaker);
