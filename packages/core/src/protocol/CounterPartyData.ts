import { z } from "zod";

export const CounterPartyDataOptionSchema = z.object({
  mandatory: z.boolean(),
});

export type CounterPartyDataOption = z.infer<
  typeof CounterPartyDataOptionSchema
>;

/**
 * CounterPartyDataOptions describes which fields a vasp needs to know about the sender or receiver.
 * Used for payerData and payeeData.
 */
export const CounterPartyDataOptionsSchema = z.record(
  CounterPartyDataOptionSchema,
);

export type CounterPartyDataOptions = z.infer<
  typeof CounterPartyDataOptionsSchema
>;

export function counterPartyDataOptionsToBytes(options: CounterPartyDataOptions): Uint8Array {
  let formatArray = new Array<string>();
  for (const key in options) {
      let k = key as keyof CounterPartyDataOptions;
      formatArray.push(`${key}:${options[k].mandatory ? "1" : "0"}`);
  }
  let formatStr = formatArray.join(",");
  console.log(formatStr);
  return new TextEncoder().encode(formatStr);
}

export function counterPartyDataOptionsFromBytes(bytes: Uint8Array): CounterPartyDataOptions {
  let result: CounterPartyDataOptions = {};
        let options = new TextDecoder().decode(bytes);
        options.split(",").forEach((dataOption) => {
            let dataOptionsSplit = dataOption.split(":");
            if (dataOptionsSplit.length == 2) {
                result[dataOptionsSplit[0]] = {
                    mandatory: dataOptionsSplit[1] === "1"
                }
            }
        });
        return result;
}