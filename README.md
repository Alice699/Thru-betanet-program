# Cambrian

> **Digital organisms that live entirely on Thru Betanet.**

Cambrian is an experimental on-chain ecosystem written in C. Each organism is a blockchain account with its own genome, energy, vitality, memory, ancestry, and controller. Transactions make organisms grow, mutate, meet, reproduce, become dormant, or die.

The important part is not a visual simulation: the life state and rules are enforced by the deployed Thru program. There is no dApp, game server, or off-chain database required.

[Explore the program](https://scan.thru.org/address/taqUdv93329-ZLvalbNYKhby6cDAa0v3dbT0IHbihXV3rw?rpc=https%3A%2F%2Frpc.betanet.thru.org) · [Inspect the published ABI](https://scan.thru.org/address/tafHBf1TH_KYXKy4AsKa-FJVob07FTyOigKH__mH_C8W47?rpc=https%3A%2F%2Frpc.betanet.thru.org) · [Read the launch notes](./LAUNCH.md)

> [!IMPORTANT]
> Cambrian is live on **Betanet** and remains upgradeable while testing continues. It is experimental software, not a financial product or a source of secure randomness.

## Cambrian in plain English

Think of an organism as a tiny save file stored on the blockchain.

That file records:

- a 256-bit genome;
- energy, vitality, age, and life status;
- an evolving memory;
- parents, generation, and lineage;
- activity counters; and
- the account allowed to control it.

When someone sends a valid instruction, Cambrian reads the organism, applies the same deterministic rules for everyone, saves the new state, and emits a typed event. Anyone can inspect the result through the ABI, CLI, or Explorer.

## What can an organism do?

| Action | Plain-language meaning | On-chain result |
| --- | --- | --- |
| `birth` | Create a new organism | Creates and initializes a new 264-byte organism account |
| `pulse` | Let time pass for one organism | Updates age, energy, vitality, memory, mutation, and life status |
| `encounter` | Meet another organism | Measures genome compatibility and changes only the active organism |
| `reproduce` | Combine two parents | Creates a child with crossover, mutation, and two-parent lineage |
| `transfer_control` | Give the organism to someone else | Replaces the controller authorized to change it |

```text
seed + creation proof
         |
         v
       birth
         |
         v
  organism account
  genome · energy · memory · lineage
         |
         +---- pulse ----------> age / metabolism / mutation
         |
         +---- encounter ------> compatibility / learning
         |
         +---- reproduce ------> child organism
         |
         +---- transfer -------> new controller
                                  |
                         alive / dormant / dead
```

## See it live on Betanet

| Item | Value |
| --- | --- |
| Network | Thru Betanet |
| RPC | `https://rpc.betanet.thru.org` |
| Program | [`taqUdv...ihXV3rw`](https://scan.thru.org/address/taqUdv93329-ZLvalbNYKhby6cDAa0v3dbT0IHbihXV3rw?rpc=https%3A%2F%2Frpc.betanet.thru.org) |
| ABI | [`tafHBf...mH_C8W47`](https://scan.thru.org/address/tafHBf1TH_KYXKy4AsKa-FJVob07FTyOigKH__mH_C8W47?rpc=https%3A%2F%2Frpc.betanet.thru.org) |
| Organism state | 264 bytes per account |
| Program binary | 9,624 bytes |
| Binary SHA-256 | `9B22018403F4CA745E22B5F13A71B63E7F01423FC75AF18423D3F89D5F3359AD` |
| Frontend | None by design |

### Run the read-only demo

This is the fastest way to verify the project yourself. It reads existing Betanet data and does **not** submit transactions, spend testnet THRU, or require a private key.

You need:

- Windows PowerShell;
- Thru CLI 0.3.18 or a compatible version; and
- internet access to the Betanet RPC.

Clone the repository:

```powershell
git clone https://github.com/Alice699/Thru-betanet-program.git
Set-Location .\Thru-betanet-program
```

Create the public Betanet network profile once:

```powershell
thru network add --url https://rpc.betanet.thru.org betanet
```

If a `betanet` profile already exists, keep it and skip that command. Then run:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tools\demo-live.ps1
```

The script verifies:

- the deployed program and ABI accounts;
- three real organism accounts;
- all five lifecycle event types;
- ABI decoding of account state and transaction events; and
- RPC-pinned Explorer links.

A successful run returns a larger JSON report whose first fields include:

```json
{
  "result": "Cambrian live demo verified",
  "network": "betanet"
}
```

## Why the architecture matters

### Independent state

Every organism has its own account. There is no global mutable registry that every transaction must lock, so unrelated organisms can evolve independently.

### Read-only encounters

During an encounter, the active organism is writable but the donor is read-only. The donor can be observed without allowing another controller to modify it.

### An ABI as the public contract

The ABI describes every instruction, account, event, and stable error code. Generated C and TypeScript bindings use the same layouts as the deployed program, making the binary interface inspectable instead of implicit.

### Reproducible evolution

Mutation, crossover, metabolism, and compatibility are deterministic. A developer can inspect the inputs and explain why a transition happened.

## Verified status

| Check | Result |
| --- | --- |
| ThruVM build | Passed without warnings |
| ABI analysis | Passed: 15 types, no layout or validation errors |
| ABI code generation | C and TypeScript bindings generated |
| Fixture validation | 16 valid fixtures accepted; 3 malformed fixtures rejected |
| Positive Betanet QA | All 5 lifecycle actions passed |
| Negative Betanet QA | 8/8 expected reverts passed without state mutation |
| Event readback | All 5 event variants reconstructed and ABI-decoded |
| Parallel test | 2 independent pulses completed; both states persisted |

<details>
<summary><strong>Live transaction evidence</strong></summary>

- [Birth](https://scan.thru.org/tx/tsWpbm4YEt4MUZeOV8kPqX5OWwS7cn_gqkZF8fLKf4797mOaCMaU-IHzevEpUgnQ4EJDToc0tcdqausm50l3bRByCI?rpc=https%3A%2F%2Frpc.betanet.thru.org) created the genesis organism.
- [Pulse](https://scan.thru.org/tx/ts-ow3K02YNBs9gvJL8uMUzSnfQ0rcnva8Xh-HQUjg5c6fPwT3d_8WxxqXp1-MTibE4A8AwkYnBBjJtpFr5ZsqBx68?rpc=https%3A%2F%2Frpc.betanet.thru.org) advanced its metabolism and moved it to `DORMANT`.
- [Encounter](https://scan.thru.org/tx/ts3DChUKvxWs67zaCWVT1S3EHN0YvOuk8FLUWx_j7fHL7dNnLNeKCwF3cIzJfTof9Bdl6Y8H6xu5fLAiVIg_OFBiJ8?rpc=https%3A%2F%2Frpc.betanet.thru.org) changed the actor while leaving the donor unchanged.
- [Reproduce](https://scan.thru.org/tx/tsaTX8lypB6MxkKS854UD1YFRC12v2ouKNzDxc3XO0_Xjw0peHsajB31C5a7GmjAo-UL5cgTQWGnN8HjILXB0wAh8z?rpc=https%3A%2F%2Frpc.betanet.thru.org) created a generation-one child with both parents recorded.
- [Transfer control](https://scan.thru.org/tx/tsY3ybuZjmGQMwq0YM3BzHyVK0SvOS9201-fSJStwtnyc9CBEMbwwvVSRWRNKT-FdAGrVFd30ihCQALMhGGJrIBRsd?rpc=https%3A%2F%2Frpc.betanet.thru.org) changed the child's controller; the former controller was then rejected with `UNAUTHORIZED`.

Live organisms:

- [Genesis organism](https://scan.thru.org/address/tagREJBIT3EjPhKEBTd2WUChA-Q_HaeVLRVX9Qs2o0yyvY?rpc=https%3A%2F%2Frpc.betanet.thru.org)
- [Encounter actor](https://scan.thru.org/address/tarP_lYAaD0KWNG3cMEyMjYjxZFYuEQc4ZNUMUxIkjdoKp?rpc=https%3A%2F%2Frpc.betanet.thru.org)
- [Generation-one child](https://scan.thru.org/address/ta6k1d-C7y2Vp9w1rp1E07EJ458wQI5QJRCap7vD3slja7?rpc=https%3A%2F%2Frpc.betanet.thru.org)

</details>

## Developer quickstart

Run commands from the repository root unless a section says otherwise.

### Requirements

| Tool | Used for |
| --- | --- |
| Thru CLI 0.3.18+ | ABI tooling, RPC queries, and transactions |
| Node.js 24+ | Fixture generation and model tests |
| Thru C SDK | Program compilation |
| Thru RISC-V toolchain | ThruVM target compilation |
| GNU Make in Linux or WSL | Reproducible program build |

The default SDK paths used by the makefile are:

```text
~/.thru/sdk/c/thru-sdk
~/.thru/sdk/toolchain
```

### Validate the ABI and state model

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tools\validate-local.ps1
```

This one command analyzes the ABI, regenerates both bindings, creates fixtures, runs model boundary tests, accepts the valid binary layouts, and confirms that malformed payloads are rejected.

### Build the program

From a Linux or WSL shell:

```bash
make
```

Build serially. Do not use `make -j` with this scaffold because the SDK archive and final link can race.

Outputs:

```text
build/thruvm/bin/cambrian_c.bin
build/thruvm/bin/cambrian_c.elf
```

### Work with the ABI directly

`cambrian.abi.yaml` is the binary-interface source of truth.

<details>
<summary><strong>Show individual ABI commands</strong></summary>

```powershell
thru abi analyze --files .\cambrian.abi.yaml --print-footprint CambrianOrganism --print-validate CambrianInstruction
thru abi codegen --files .\cambrian.abi.yaml --language c --output .\generated\c
thru abi codegen --files .\cambrian.abi.yaml --language typescript --output .\generated\typescript
thru abi reflect --abi-file .\cambrian.abi.yaml --type-name CambrianInstruction --data-file .\fixtures\instruction-birth.bin --validate-only
```

The generated bindings are committed under `generated/` so reviewers can inspect the exact wire layout.

</details>

## Contract and safety model

Every writable organism must:

- be owned by the Cambrian program;
- be exactly 264 bytes;
- contain the expected magic value and version;
- be explicitly marked writable by the transaction;
- use valid account indices and relationships; and
- be authorized by its stored controller.

New organism accounts must match the address derived from their seed and must provide a bounded, exact-size creation proof. Arithmetic floors at zero or saturates at documented limits. Malformed tags, lengths, statuses, account layouts, and permissions revert with stable ABI error codes.

<details>
<summary><strong>Deterministic life rules</strong></summary>

- **Pulse:** elapsed time is bounded to 1–4,096 slots. Energy cost is `elapsed * (3 + (digest[0] & 7))`. Low energy damages vitality; abundant energy permits bounded recovery.
- **Life status:** zero vitality means `DEAD`; low energy or vitality means `DORMANT`; otherwise the organism remains `ALIVE`.
- **Mutation:** a pulse may flip one bounded bit in the 256-bit genome when its deterministic digest crosses the mutation threshold.
- **Encounter:** compatibility is `256 - HammingDistance(genome_a, genome_b)`. High compatibility grants symbiosis energy, medium compatibility grants adaptation energy, and low compatibility causes stress.
- **Reproduction:** a digest-derived byte mask crosses two genomes, one bounded bit mutates, the controlled parent pays 512 energy, and the child records both parent addresses.
- **Hashing:** domain-separated hashes include relevant block and transaction context. They make transitions deterministic and inspectable, but they are not secure economic randomness.

</details>

## Advanced live tools

These tools are for developers who already understand the account ordering and signing model.

| Tool | Purpose | Writes to Betanet? |
| --- | --- | --- |
| `demo-live.ps1` | Verify deployed accounts, state, and events | No |
| `decode-live-event.ps1` | Decode one transaction event through the ABI | No |
| `test-live-negative.ps1` | Submit and assert expected failures | Yes, with `-Execute` |
| `stress-independent.ps1` | Plan or run parallel organism pulses | Only with `-Execute` |

Decode one live event:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tools\decode-live-event.ps1 -Signature <transaction-signature>
```

Run the negative suite only when the fee payer is funded:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tools\test-live-negative.ps1 -Execute
```

Preview a two-organism stress run:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tools\stress-independent.ps1 -Count 2 -RunId demo -FeePayers key_1,key_2
```

Add `-Execute` only after both keys have funded Betanet accounts. Concurrent submissions require a distinct controller and fee payer for each organism; reusing one fee payer introduces nonce contention even when the organism accounts are independent.

## Deploy your own experimental copy

Deployment writes to Betanet and consumes testnet THRU. Validate the binary and ABI first, confirm the active public identity, and never print or commit private keys.

```bash
thru --network betanet program create <seed> build/thruvm/bin/cambrian_c.bin
thru --network betanet abi account create <seed> cambrian.abi.yaml
```

Use the same managed-program seed for the program and its ABI. The seed used by the existing deployment is intentionally not stored in this repository. Keep experimental deployments upgradeable until testing is complete.

## Repository map

```text
.
|-- examples/
|   |-- cambrian.c              # Program dispatcher and state transitions
|   `-- cambrian.h              # Contract layouts, constants, and errors
|-- generated/
|   |-- c/                      # Generated C ABI bindings
|   `-- typescript/             # Generated TypeScript ABI bindings
|-- fixtures/                   # Valid and intentionally malformed binary cases
|-- tools/
|   |-- demo-live.ps1           # One-command, read-only Betanet proof
|   |-- validate-local.ps1      # Full local ABI validation gate
|   |-- decode-live-event.ps1   # Receipt reconstruction and ABI decoding
|   |-- test-live-negative.ps1  # Live revert assertions
|   `-- stress-independent.ps1  # Independent-account concurrency harness
|-- cambrian.abi.yaml           # ABI source of truth
|-- GNUmakefile                 # ThruVM build
`-- LAUNCH.md                  # Copy-ready launch summary and evidence
```

## Scope and limitations

- Cambrian targets **Betanet**, not Mainnet.
- The current program and ABI are intentionally upgradeable.
- Block-derived entropy is suitable for this digital-life experiment, not for financial randomness.
- A frontend is intentionally outside the project scope; the program, ABI, transactions, events, and Explorer are the interface.
- Treat the code as experimental infrastructure, not production financial software.

## Further reading

- [Thru documentation](https://thru.org/docs/)
- [Thru API reference](https://thru.org/docs/api-ref/overview/)
- [Thru Explorer MCP](https://thru.org/docs/api-ref/explorer-mcp/overview/)
- [Cambrian launch notes](./LAUNCH.md)
