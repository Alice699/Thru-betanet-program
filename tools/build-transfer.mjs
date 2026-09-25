import { CambrianInstruction, TransferArgs } from "../generated/typescript/cambrian/lifeform/types.ts";

const organismIndex = Number(process.argv[2] ?? 2);
const controllerIndex = Number(process.argv[3] ?? 3);

if (!Number.isInteger(organismIndex) || organismIndex < 0 || organismIndex > 0xffff) {
  throw new Error("organism account index must be a uint16");
}
if (!Number.isInteger(controllerIndex) || controllerIndex < 0 || controllerIndex > 0xffff) {
  throw new Error("new controller account index must be a uint16");
}

const args = TransferArgs.builder()
  .set_organism_account_idx(organismIndex)
  .set_new_controller_account_idx(controllerIndex);

const instruction = CambrianInstruction.builder();
instruction.payload().select("transfer_control").writePayload(args).finish();
const bytes = instruction.build();
const validation = CambrianInstruction.validate(bytes);
if (!validation.ok) {
  throw new Error(`generated transfer instruction failed ABI validation: ${validation.code}`);
}

console.log(JSON.stringify({
  instruction_hex: Buffer.from(bytes).toString("hex"),
  instruction_bytes: bytes.length,
  organism_index: organismIndex,
  new_controller_index: controllerIndex,
  abi_consumed: validation.consumed,
}));
