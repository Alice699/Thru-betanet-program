# Cambrian on Thru Betanet

## Copy-ready launch post

Cambrian is live on Thru Betanet: a pure on-chain digital-life program with no dApp and no off-chain simulation.

Every organism is its own 264-byte writable account. It can be born, metabolize, mutate, encounter a read-only donor, reproduce with two-parent lineage, become dormant or dead, and transfer control. Every transition is deterministic, ABI-described, and emitted as a typed Explorer-decodable event.

The interesting scaling property is what Cambrian does not have: there is no global mutable registry. Independent organisms do not contend on shared program state. A verified two-controller stress run submitted two pulses concurrently; both persisted `pulse_count=1`, both emitted valid 140-byte events, and together consumed 237,780 compute units.

Live Betanet QA now covers all five successful lifecycle paths plus eight intentional reverts for authorization, seed/address mismatch, account indices, writability, layout, and invalid organism relationships.

Program: `taqUdv93329-ZLvalbNYKhby6cDAa0v3dbT0IHbihXV3rw`

ABI: `tafHBf1TH_KYXKy4AsKa-FJVob07FTyOigKH__mH_C8W47`

Source: https://github.com/Alice699/Thru-betanet-program

## Why this fits Thru

- Each organism owns independent state, so unrelated lifeforms can execute without a global-account bottleneck.
- Encounters mutate only the actor; the donor remains read-only and can participate in unrelated transactions.
- The ABI describes instructions, the 264-byte account, events, and stable error codes as one auditable contract.
- Generated helpers build live instruction bytes; account state and receipt events round-trip through ABI reflection.
- Deterministic block-context entropy creates inspectable evolution without claiming secure economic randomness.

The stress harness also records an important boundary: independent program accounts do not remove fee-payer nonce contention. Valid concurrent writes require distinct signer/controller accounts, which the verified stress run uses explicitly.

## Verification snapshot

| Gate | Result |
| --- | --- |
| ThruVM build | Passed; 9,624 bytes; SHA-256 `9B22018403F4CA745E22B5F13A71B63E7F01423FC75AF18423D3F89D5F3359AD` |
| ABI | 15 types; analyze/codegen passed; 264-byte organism layout |
| Fixtures | 16 valid reflections; 3 malformed payloads rejected |
| Positive live QA | Birth, pulse, encounter, reproduce, and transfer passed |
| Negative live QA | 8/8 expected reverts passed |
| Event readback | All five receipt variants reconstructed and ABI-decoded |
| Parallel run | 2 independent pulses; 4,582 ms wall time; both states verified |

## Explorer evidence

- [Program account](https://scan.thru.org/address/taqUdv93329-ZLvalbNYKhby6cDAa0v3dbT0IHbihXV3rw?rpc=https%3A%2F%2Frpc.betanet.thru.org)
- [Published ABI](https://scan.thru.org/address/tafHBf1TH_KYXKy4AsKa-FJVob07FTyOigKH__mH_C8W47?rpc=https%3A%2F%2Frpc.betanet.thru.org)
- [Birth](https://scan.thru.org/tx/tsWpbm4YEt4MUZeOV8kPqX5OWwS7cn_gqkZF8fLKf4797mOaCMaU-IHzevEpUgnQ4EJDToc0tcdqausm50l3bRByCI?rpc=https%3A%2F%2Frpc.betanet.thru.org)
- [Pulse](https://scan.thru.org/tx/ts-ow3K02YNBs9gvJL8uMUzSnfQ0rcnva8Xh-HQUjg5c6fPwT3d_8WxxqXp1-MTibE4A8AwkYnBBjJtpFr5ZsqBx68?rpc=https%3A%2F%2Frpc.betanet.thru.org)
- [Encounter](https://scan.thru.org/tx/ts3DChUKvxWs67zaCWVT1S3EHN0YvOuk8FLUWx_j7fHL7dNnLNeKCwF3cIzJfTof9Bdl6Y8H6xu5fLAiVIg_OFBiJ8?rpc=https%3A%2F%2Frpc.betanet.thru.org)
- [Reproduce](https://scan.thru.org/tx/tsaTX8lypB6MxkKS854UD1YFRC12v2ouKNzDxc3XO0_Xjw0peHsajB31C5a7GmjAo-UL5cgTQWGnN8HjILXB0wAh8z?rpc=https%3A%2F%2Frpc.betanet.thru.org)
- [Transfer control](https://scan.thru.org/tx/tsY3ybuZjmGQMwq0YM3BzHyVK0SvOS9201-fSJStwtnyc9CBEMbwwvVSRWRNKT-FdAGrVFd30ihCQALMhGGJrIBRsd?rpc=https%3A%2F%2Frpc.betanet.thru.org)

The deployment remains intentionally upgradeable while Betanet testing continues.
