// import { Bindings, Variables } from "@/types/server";
// import { getQuoteSchema } from "@/validation/quote.validation";

// import { createFactory } from "hono/factory";
// import { HTTPException } from "hono/http-exception";
// import { validator } from "hono/validator";

// const factory = createFactory<{ Bindings: Bindings; Variables: Variables }>();

// export const validatePasskey = factory.createMiddleware(
//   validator("param", (value) => {
//     const parsed = getQuoteSchema.safeParse(value);
//     if (!parsed.success) throw new HTTPException(400, { message: "Invalid passkey" });

//     return { passkey: parsed.data.passKey };
//   }),
// );
