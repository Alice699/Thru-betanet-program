import { BirthArgs, CambrianInstruction } from "../generated/typescript/cambrian/lifeform/types.ts";

const proofHex = process.argv[2] ?? "";
if (!/^(?:[0-9a-fA-F]{2})+$/.test(proofHex)) {
  throw new Error("expected the creation state proof as an even-length hex string");
}

const proof = Uint8Array.from(Buffer.from(proofHex, "hex"));
const seedText = process.argv[3] ?? "cambrian-organism-1";
const seedTextBytes = new TextEncoder().encode(seedText);
if (seedTextBytes.length === 0 || seedTextBytes.length > 32) {
  throw new Error("organism seed must contain between 1 and 32 UTF-8 bytes");
}
const seed = new Uint8Array(32);
seed.set(seedTextBytes);
const entropyBase = Number(process.argv[4] ?? 0xa0);
if (!Number.isInteger(entropyBase) || entropyBase < 0 || entropyBase > 0xff) {
  throw new Error("entropy base must be an integer between 0 and 255");
}
const entropy = Uint8Array.from({ length: 32 }, (_, index) => (entropyBase + index) & 0xff);

const args = BirthArgs.builder()
  .set_organism_account_idx(2)
  .set_seed(seed)
  .set_entropy(entropy);
args.proof().write(proof).finish();

const instruction = CambrianInstruction.builder();
instruction.payload().select("birth").writePayload(args).finish();
const bytes = instruction.build();
const validation = CambrianInstruction.validate(bytes);
if (!validation.ok) {
  throw new Error(`generated birth instruction failed ABI validation: ${validation.code}`);
}

console.log(JSON.stringify({
  instruction_hex: Buffer.from(bytes).toString("hex"),
  instruction_bytes: bytes.length,
  proof_bytes: proof.length,
  organism_seed: seedText,
  abi_consumed: validation.consumed,
}));
