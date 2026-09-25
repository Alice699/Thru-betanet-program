# Cambrian Lifeform

Cambrian is a pure on-chain Thru Betanet program: deterministic digital organisms live in program-owned accounts, consume energy, mutate, encounter one another, reproduce, and can transfer control. It has no frontend or dApp dependency.

## Design

The program exposes five instruction variants:

| Instruction | Purpose |
| --- | --- |
| `birth` | Derive and initialize a new organism account from a seed and proof. |
| `pulse` | Advance one organism through deterministic metabolism, aging, and mutation. |
| `encounter` | Compare two genomes and transfer a deterministic gene/memory effect. |
| `reproduce` | Cross two parent genomes, optionally mutate, and create a child account. |
| `transfer_control` | Move organism control to another account. |

Each organism is a packed 264-byte account state. The program checks the account owner, magic/version, writable status, controller authorization, account indices, seed/address derivation, dynamic proof length, and arithmetic bounds before mutating state. Every successful transition emits a typed event whose first byte is the event tag and whose remaining bytes are the ABI payload.

### Deterministic life rules

- `pulse` advances by `elapsed = block.slot - last_pulse_slot`, bounded to 1–256 slots. Energy cost is `elapsed * (3 + (digest[0] & 7))`. Energy below 128 damages vitality by `elapsed + 3`; energy above 1024 recovers `floor(elapsed / 4) + 1`, capped at 1024 vitality.
- Status becomes `dead` at zero vitality, `dormant` below the energy/vitality thresholds, and otherwise `alive`. A pulse mutates one of 256 genome bits when its deterministic digest passes the mutation threshold.
- `encounter` computes compatibility as `256 - HammingDistance(genome_a, genome_b)`. Compatibility at least 192 is symbiosis (+128 energy), at least 96 is adaptation (+32 energy), and lower compatibility is stress (-96 energy). Only the actor is writable; the donor remains read-only.
- `reproduce` uses a digest-derived byte mask for deterministic crossover, flips one bounded genome bit, charges the controlled parent 512 energy, increments the child generation, and records both parent addresses in the child.
- All hashes use explicit domain labels and block/transaction context. This makes transitions reproducible and inspectable, but it is not a source of secure economic randomness.

### Security invariants

Every writable organism must be program-owned, exactly 264 bytes, version-compatible, explicitly writable, and authorized by its stored controller public key. New accounts must match the program-derived address for their seed and have an exact bounded proof length. Read-only donors are never stored back. Arithmetic floors at zero or saturates at a documented maximum, and malformed tags, lengths, statuses, and account relationships revert with stable ABI error codes.

### Lifecycle

```text
seed + proof
    │
    ▼
  birth ──► organism account (genome · lineage · memory · energy · vitality)
    │
    ├── pulse ─────► age / metabolism / mutation / dormancy / death
    ├── encounter ─► compatibility / learning / memory update
    ├── reproduce ─► child account + two-parent lineage
    └── transfer ─► new controller authorization
```

## Prerequisites

- Thru CLI 0.3.18 or compatible
- Thru C SDK at `~/.thru/sdk/c/thru-sdk`
- Thru RISC-V toolchain at `~/.thru/sdk/toolchain`
- Node.js 24+ for the fixture generator

The program targets Betanet (`https://rpc.betanet.thru.org`). A funded Betanet identity is still required before deployment.

## Build

Run the build serially. The SDK archive and program link can race under `make -j` on this scaffold.

```bash
make
```

Output:

```text
build/thruvm/bin/cambrian_c.bin
build/thruvm/bin/cambrian_c.elf
```

## ABI and generated bindings

The source of truth is `cambrian.abi.yaml`. Analyze it before code generation:

```powershell
thru abi analyze --files .\cambrian\cambrian.abi.yaml --print-footprint CambrianOrganism --print-validate CambrianInstruction
thru abi codegen --files .\cambrian\cambrian.abi.yaml --language c --output .\cambrian\generated\c
thru abi codegen --files .\cambrian\cambrian.abi.yaml --language typescript --output .\cambrian\generated\typescript
```

Generated TypeScript helpers are used to create deterministic binary fixtures:

```powershell
node.exe --experimental-transform-types .\cambrian\tools\make-fixtures.mjs
node.exe .\cambrian\tools\test-model.mjs
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\cambrian\tools\validate-local.ps1
```

The fixtures cover all five instructions, the 264-byte account, all five events, an error, and three malformed inputs. Their proof bytes are synthetic ABI-test data, not a live account-creation proof. Reflect/validate them with:

```powershell
thru abi reflect --abi-file .\cambrian\cambrian.abi.yaml --type-name CambrianInstruction --data-file .\cambrian\fixtures\instruction-birth.bin --validate-only
```

The generated TypeScript and C files are checked in under `generated/` so another developer can inspect the exact wire layout.

## Deployment (after Betanet funding)

Do not deploy until the program binary, ABI, and funded identity are confirmed. The usual flow is:

```bash
thru uploader upload <seed> build/thruvm/bin/cambrian_c.bin
thru program create <seed> build/thruvm/bin/cambrian_c.bin
```

Keep `<seed>` out of source control and terminal transcripts. After deployment, record the program address and transaction signature in the project notes, then exercise `birth` first before testing the remaining transitions.

## Project map

```text
cambrian/
├── GNUmakefile
├── cambrian.abi.yaml
├── examples/
│   ├── cambrian.c
│   └── cambrian.h
├── generated/
├── fixtures/
└── tools/
    └── make-fixtures.mjs
```
