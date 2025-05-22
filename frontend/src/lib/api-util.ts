import {isAxiosError} from "axios";

export function getErrorMsg(e: unknown) {
  let msg = "Something went wrong. Try again later.";
  if (isAxiosError(e)) {
    msg = e.response?.data?.message || "Something went wrong. Try again later.";
  }
  return msg;
}