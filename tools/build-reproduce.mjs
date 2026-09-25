import { CambrianInstruction, ReproduceArgs } from "../generated/typescript/cambrian/lifeform/types.ts";

const proofHex = process.argv[2] ?? "";
const childSeedText = process.argv[3] ?? "cambrian-child-1";
const entropyBase = Number(process.argv[4] ?? 0xc0);
if (!/^(?:[0-9a-fA-F]{2})+$/.test(proofHex)) {
  throw new Error("expected the creation state proof as an even-length hex string");
}
const childSeedBytes = new TextEncoder().encode(childSeedText);
if (childSeedBytes.length === 0 || childSeedBytes.length > 32) {
  throw new Error("child seed must contain between 1 and 32 UTF-8 bytes");
}
if (!Number.isInteger(entropyBase) || entropyBase < 0 || entropyBase > 0xff) {
  throw new Error("entropy base must be an integer between 0 and 255");
}

const proof = Uint8Array.from(Buffer.from(proofHex, "hex"));
const seed = new Uint8Array(32);
seed.set(childSeedBytes);
const entropy = Uint8Array.from({ length: 32 }, (_, index) => (entropyBase + index) & 0xff);

const args = ReproduceArgs.builder()
  .set_parent_a_account_idx(2)
  .set_parent_b_account_idx(4)
  .set_child_account_idx(3)
  .set_seed(seed)
  .set_entropy(entropy);
args.proof().write(proof).finish();

const instruction = CambrianInstruction.builder();
instruction.payload().select("reproduce").writePayload(args).finish();
const bytes = instruction.build();
const validation = CambrianInstruction.validate(bytes);
if (!validation.ok) {
  throw new Error(`generated reproduce instruction failed ABI validation: ${validation.code}`);
}

console.log(JSON.stringify({
  instruction_hex: Buffer.from(bytes).toString("hex"),
  instruction_bytes: bytes.length,
  proof_bytes: proof.length,
  child_seed: childSeedText,
  parent_a_index: 2,
  child_index: 3,
  parent_b_index: 4,
  abi_consumed: validation.consumed,
}));
