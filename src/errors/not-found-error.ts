import { ApplicationError } from "@/protocols";

export function notFoundError(element: string): ApplicationError {
  return {
    name: "NotFoundError",
    message: `No ${element} result for this search!`,
  };
}
