import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

import {
  BirthArgs,
  BirthEvent,
  CambrianError,
  CambrianEvent,
  CambrianInstruction,
  CambrianOrganism,
  EncounterArgs,
  EncounterEvent,
  PulseArgs,
  PulseEvent,
  ReproduceArgs,
  ReproduceEvent,
  TransferArgs,
  TransferEvent,
} from "../generated/typescript/cambrian/lifeform/types.ts";

const projectDir = fileURLToPath(new URL("..", import.meta.url));
const fixtureDir = resolve(projectDir, "fixtures");
mkdirSync(fixtureDir, { recursive: true });

function bytes(base) {
  return Uint8Array.from({ length: 32 }, (_, index) => (base + index) & 0xff);
}

function write(name, payload) {
  writeFileSync(resolve(fixtureDir, name), Buffer.from(payload));
}

function instruction(payloadBuilder, variant) {
  const builder = CambrianInstruction.builder();
  builder.payload().select(variant).writePayload(payloadBuilder).finish();
  return builder.build();
}

function event(payloadBuilder, variant) {
  const builder = CambrianEvent.builder();
  builder.payload().select(variant).writePayload(payloadBuilder).finish();
  return builder.build();
}

const seed = bytes(1);
const entropy = bytes(0xa0);
const controller = bytes(0x40);
const organism = bytes(0x60);
const donor = bytes(0x80);
const child = bytes(0xc0);
const genome = bytes(0x10);
const lineage = bytes(0x30);
const memory = bytes(0x50);
const proof = Uint8Array.from([0xde, 0xad, 0xbe, 0xef]);

const birthArgs = BirthArgs.builder()
  .set_organism_account_idx(2)
  .set_seed(seed)
  .set_entropy(entropy);
birthArgs.proof().write(proof).finish();
write("instruction-birth.bin", instruction(birthArgs, "birth"));

const pulseArgs = PulseArgs.builder()
  .set_organism_account_idx(2)
  .set_catalyst(0x1122334455667788n);
write("instruction-pulse.bin", instruction(pulseArgs, "pulse"));

const encounterArgs = EncounterArgs.builder()
  .set_actor_account_idx(2)
  .set_donor_account_idx(3)
  .set_catalyst(0x2233445566778899n);
write("instruction-encounter.bin", instruction(encounterArgs, "encounter"));

const reproduceArgs = ReproduceArgs.builder()
  .set_parent_a_account_idx(2)
  .set_parent_b_account_idx(3)
  .set_child_account_idx(4)
  .set_seed(bytes(0x11))
  .set_entropy(bytes(0xb0));
reproduceArgs.proof().write(proof).finish();
write("instruction-reproduce.bin", instruction(reproduceArgs, "reproduce"));

const transferArgs = TransferArgs.builder()
  .set_organism_account_idx(2)
  .set_new_controller_account_idx(0);
write("instruction-transfer-control.bin", instruction(transferArgs, "transfer_control"));

// These instructions are ABI-valid but intentionally violate Cambrian runtime
// invariants. The live negative-QA script verifies their stable program errors.
const runtimePulseBadIndex = PulseArgs.builder()
  .set_organism_account_idx(9)
  .set_catalyst(0x1122334455667788n);
write("runtime-pulse-bad-index.bin", instruction(runtimePulseBadIndex, "pulse"));

const runtimeEncounterSameAccount = EncounterArgs.builder()
  .set_actor_account_idx(2)
  .set_donor_account_idx(2)
  .set_catalyst(0x2233445566778899n);
write(
  "runtime-encounter-same-account.bin",
  instruction(runtimeEncounterSameAccount, "encounter"),
);

const runtimeReproduceSameParent = ReproduceArgs.builder()
  .set_parent_a_account_idx(2)
  .set_parent_b_account_idx(2)
  .set_child_account_idx(3)
  .set_seed(bytes(0x12))
  .set_entropy(bytes(0xb1));
runtimeReproduceSameParent.proof().write(proof).finish();
write(
  "runtime-reproduce-same-parent.bin",
  instruction(runtimeReproduceSameParent, "reproduce"),
);

const runtimeTransferProgramController = TransferArgs.builder()
  .set_organism_account_idx(2)
  .set_new_controller_account_idx(1);
write(
  "runtime-transfer-program-controller.bin",
  instruction(runtimeTransferProgramController, "transfer_control"),
);

const organismBuilder = CambrianOrganism.builder()
  .set_magic(0x43414d42)
  .set_version(1)
  .set_status(1)
  .set_generation(2)
  .set_controller(controller)
  .set_parent_a(bytes(0x20))
  .set_parent_b(bytes(0x21))
  .set_genome(genome)
  .set_lineage(lineage)
  .set_memory(memory)
  .set_born_slot(1000n)
  .set_last_pulse_slot(1010n)
  .set_age(10n)
  .set_energy(1800n)
  .set_vitality(900n)
  .set_pulse_count(4n)
  .set_encounter_count(2n)
  .set_offspring_count(1n);
write("account-organism.bin", organismBuilder.build());

const birthEvent = BirthEvent.builder()
  .set_organism(organism)
  .set_controller(controller)
  .set_slot(1000n)
  .set_generation(0)
  .set_energy(2048n)
  .set_vitality(800n)
  .set_genome(genome)
  .set_lineage(lineage);
write("event-birth.bin", event(birthEvent, "birth"));

const pulseEvent = PulseEvent.builder()
  .set_organism(organism)
  .set_slot(1010n)
  .set_age(10n)
  .set_energy_before(2048n)
  .set_energy_after(2000n)
  .set_vitality(801n)
  .set_status(1)
  .set_mutation_bit(0xffff)
  .set_genome(genome)
  .set_lineage(lineage);
write("event-pulse.bin", event(pulseEvent, "pulse"));

const encounterEvent = EncounterEvent.builder()
  .set_actor(organism)
  .set_donor(donor)
  .set_compatibility(192)
  .set_outcome(1)
  .set_gene_transferred(1)
  .set_energy_before(2000n)
  .set_energy_after(2128n)
  .set_encounter_count(3n)
  .set_genome(genome)
  .set_memory(memory);
write("event-encounter.bin", event(encounterEvent, "encounter"));

const reproduceEvent = ReproduceEvent.builder()
  .set_child(child)
  .set_parent_a(organism)
  .set_parent_b(donor)
  .set_generation(3)
  .set_mutation_bit(37)
  .set_energy(1100n)
  .set_genome(genome)
  .set_lineage(lineage);
write("event-reproduce.bin", event(reproduceEvent, "reproduce"));

const transferEvent = TransferEvent.builder()
  .set_organism(organism)
  .set_old_controller(controller)
  .set_new_controller(bytes(0x70))
  .set_slot(1020n);
write("event-transfer-control.bin", event(transferEvent, "transfer_control"));

const error = CambrianError.builder().set_code(0xca01000cn).build();
write("error-unauthorized.bin", error);

const birthInstruction = instruction(birthArgs, "birth");
write("invalid-truncated-birth.bin", birthInstruction.subarray(0, birthInstruction.length - 1));
const invalidProofSize = Uint8Array.from(birthInstruction);
invalidProofSize[67] = 5;
invalidProofSize[68] = 0;
invalidProofSize[69] = 0;
invalidProofSize[70] = 0;
write("invalid-proof-size.bin", invalidProofSize);
write("invalid-instruction-tag.bin", Uint8Array.from([0xff]));

console.log(`wrote fixtures to ${fixtureDir}`);
