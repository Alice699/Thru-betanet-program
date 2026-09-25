#pragma once

#include <stdint.h>
#include <stddef.h>

/*  ----- TYPE DEFINITION FOR Bytes32 ----- */

typedef uint8_t Bytes32_t[32];

/*  ----- TYPE DEFINITION FOR CambrianError ----- */

struct __attribute__((packed)) CambrianError {
    uint64_t code;
};
typedef struct CambrianError CambrianError_t;

/*  ----- TYPE DEFINITION FOR CambrianOrganism ----- */

struct __attribute__((packed)) CambrianOrganism {
    uint32_t magic;
    uint8_t version;
    uint8_t status;
    uint16_t generation;
    Bytes32_t controller;
    Bytes32_t parent_a;
    Bytes32_t parent_b;
    Bytes32_t genome;
    Bytes32_t lineage;
    Bytes32_t memory;
    uint64_t born_slot;
    uint64_t last_pulse_slot;
    uint64_t age;
    uint64_t energy;
    uint64_t vitality;
    uint64_t pulse_count;
    uint64_t encounter_count;
    uint64_t offspring_count;
};
typedef struct CambrianOrganism CambrianOrganism_t;

/*  ----- TYPE DEFINITION FOR EncounterArgs ----- */

struct __attribute__((packed)) EncounterArgs {
    uint16_t actor_account_idx;
    uint16_t donor_account_idx;
    uint64_t catalyst;
};
typedef struct EncounterArgs EncounterArgs_t;

/*  ----- TYPE DEFINITION FOR EncounterEvent ----- */

struct __attribute__((packed)) EncounterEvent {
    Bytes32_t actor;
    Bytes32_t donor;
    uint16_t compatibility;
    uint8_t outcome;
    uint8_t gene_transferred;
    uint64_t energy_before;
    uint64_t energy_after;
    uint64_t encounter_count;
    Bytes32_t genome;
    Bytes32_t memory;
};
typedef struct EncounterEvent EncounterEvent_t;

/*  ----- TYPE DEFINITION FOR PulseArgs ----- */

struct __attribute__((packed)) PulseArgs {
    uint16_t organism_account_idx;
    uint64_t catalyst;
};
typedef struct PulseArgs PulseArgs_t;

/*  ----- TYPE DEFINITION FOR PulseEvent ----- */

struct __attribute__((packed)) PulseEvent {
    Bytes32_t organism;
    uint64_t slot;
    uint64_t age;
    uint64_t energy_before;
    uint64_t energy_after;
    uint64_t vitality;
    uint8_t status;
    uint16_t mutation_bit;
    Bytes32_t genome;
    Bytes32_t lineage;
};
typedef struct PulseEvent PulseEvent_t;

/*  ----- TYPE DEFINITION FOR ReproduceArgs ----- */

struct __attribute__((packed)) ReproduceArgs {
    uint16_t parent_a_account_idx;
    uint16_t parent_b_account_idx;
    uint16_t child_account_idx;
    Bytes32_t seed;
    Bytes32_t entropy;
    uint32_t proof_size;
    uint8_t proof[] /* FAM size: proof_size */;
};
typedef struct ReproduceArgs ReproduceArgs_t;

/*  ----- TYPE DEFINITION FOR ReproduceEvent ----- */

struct __attribute__((packed)) ReproduceEvent {
    Bytes32_t child;
    Bytes32_t parent_a;
    Bytes32_t parent_b;
    uint16_t generation;
    uint16_t mutation_bit;
    uint64_t energy;
    Bytes32_t genome;
    Bytes32_t lineage;
};
typedef struct ReproduceEvent ReproduceEvent_t;

/*  ----- TYPE DEFINITION FOR TransferArgs ----- */

struct __attribute__((packed)) TransferArgs {
    uint16_t organism_account_idx;
    uint16_t new_controller_account_idx;
};
typedef struct TransferArgs TransferArgs_t;

/*  ----- TYPE DEFINITION FOR TransferEvent ----- */

struct __attribute__((packed)) TransferEvent {
    Bytes32_t organism;
    Bytes32_t old_controller;
    Bytes32_t new_controller;
    uint64_t slot;
};
typedef struct TransferEvent TransferEvent_t;

/*  ----- TYPE DEFINITION FOR BirthArgs ----- */

struct __attribute__((packed)) BirthArgs {
    uint16_t organism_account_idx;
    Bytes32_t seed;
    Bytes32_t entropy;
    uint32_t proof_size;
    uint8_t proof[] /* FAM size: proof_size */;
};
typedef struct BirthArgs BirthArgs_t;

/*  ----- TYPE DEFINITION FOR BirthEvent ----- */

struct __attribute__((packed)) BirthEvent {
    Bytes32_t organism;
    Bytes32_t controller;
    uint64_t slot;
    uint16_t generation;
    uint64_t energy;
    uint64_t vitality;
    Bytes32_t genome;
    Bytes32_t lineage;
};
typedef struct BirthEvent BirthEvent_t;

/*  ----- TYPE DEFINITION FOR CambrianEvent ----- */

struct __attribute__((packed)) CambrianEvent_payload_inner {
    uint8_t tag;
    uint8_t body[]; /* enum body inline (access via getters) */
};
typedef struct CambrianEvent_payload_inner CambrianEvent_payload_inner_t;

struct __attribute__((packed)) CambrianEvent {
    uint8_t tag;
    /* payload - enum body inline (access via getters) */
};
typedef struct CambrianEvent CambrianEvent_t;

/*  ----- TYPE DEFINITION FOR CambrianInstruction ----- */

struct __attribute__((packed)) CambrianInstruction_payload_inner {
    uint8_t tag;
    uint8_t body[]; /* enum body inline (access via getters) */
};
typedef struct CambrianInstruction_payload_inner CambrianInstruction_payload_inner_t;

struct __attribute__((packed)) CambrianInstruction {
    uint8_t tag;
    /* payload - enum body inline (access via getters) */
};
typedef struct CambrianInstruction CambrianInstruction_t;


/*  ----- FORWARD DECLARATIONS FOR Bytes32 ----- */

uint64_t Bytes32_footprint_ir( void );
int Bytes32_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed );

/*  ----- FORWARD DECLARATIONS FOR CambrianError ----- */

CambrianError_t const * CambrianError_from_slice( uint8_t const * data, uint64_t data_len );
CambrianError_t * CambrianError_from_slice_mut( uint8_t * data, uint64_t data_len );
int CambrianError_new( uint8_t * buffer, uint64_t buffer_size, uint64_t * out_size );
uint64_t CambrianError_footprint( void );
uint64_t CambrianError_footprint_ir( void );
int CambrianError_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed );
int CambrianError_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size );
uint64_t CambrianError_get_code( CambrianError_t const * self );

void CambrianError_set_code( CambrianError_t * self, uint64_t value );




/*  ----- FORWARD DECLARATIONS FOR CambrianOrganism ----- */

CambrianOrganism_t const * CambrianOrganism_from_slice( uint8_t const * data, uint64_t data_len );
CambrianOrganism_t * CambrianOrganism_from_slice_mut( uint8_t * data, uint64_t data_len );
int CambrianOrganism_new( uint8_t * buffer, uint64_t buffer_size, uint64_t * out_size );
uint64_t CambrianOrganism_footprint( void );
uint64_t CambrianOrganism_footprint_ir( void );
int CambrianOrganism_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed );
int CambrianOrganism_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size );
uint32_t CambrianOrganism_get_magic( CambrianOrganism_t const * self );
uint8_t CambrianOrganism_get_version( CambrianOrganism_t const * self );
uint8_t CambrianOrganism_get_status( CambrianOrganism_t const * self );
uint16_t CambrianOrganism_get_generation( CambrianOrganism_t const * self );
uint64_t CambrianOrganism_get_born_slot( CambrianOrganism_t const * self );
uint64_t CambrianOrganism_get_last_pulse_slot( CambrianOrganism_t const * self );
uint64_t CambrianOrganism_get_age( CambrianOrganism_t const * self );
uint64_t CambrianOrganism_get_energy( CambrianOrganism_t const * self );
uint64_t CambrianOrganism_get_vitality( CambrianOrganism_t const * self );
uint64_t CambrianOrganism_get_pulse_count( CambrianOrganism_t const * self );
uint64_t CambrianOrganism_get_encounter_count( CambrianOrganism_t const * self );
uint64_t CambrianOrganism_get_offspring_count( CambrianOrganism_t const * self );

void CambrianOrganism_set_magic( CambrianOrganism_t * self, uint32_t value );
void CambrianOrganism_set_version( CambrianOrganism_t * self, uint8_t value );
void CambrianOrganism_set_status( CambrianOrganism_t * self, uint8_t value );
void CambrianOrganism_set_generation( CambrianOrganism_t * self, uint16_t value );
void CambrianOrganism_set_born_slot( CambrianOrganism_t * self, uint64_t value );
void CambrianOrganism_set_last_pulse_slot( CambrianOrganism_t * self, uint64_t value );
void CambrianOrganism_set_age( CambrianOrganism_t * self, uint64_t value );
void CambrianOrganism_set_energy( CambrianOrganism_t * self, uint64_t value );
void CambrianOrganism_set_vitality( CambrianOrganism_t * self, uint64_t value );
void CambrianOrganism_set_pulse_count( CambrianOrganism_t * self, uint64_t value );
void CambrianOrganism_set_encounter_count( CambrianOrganism_t * self, uint64_t value );
void CambrianOrganism_set_offspring_count( CambrianOrganism_t * self, uint64_t value );


Bytes32_t const * CambrianOrganism_get_controller_const( CambrianOrganism_t const * self );
Bytes32_t * CambrianOrganism_get_controller( uint8_t * data );
int CambrianOrganism_set_controller( CambrianOrganism_t * self, Bytes32_t const * nested );
Bytes32_t const * CambrianOrganism_get_parent_a_const( CambrianOrganism_t const * self );
Bytes32_t * CambrianOrganism_get_parent_a( uint8_t * data );
int CambrianOrganism_set_parent_a( CambrianOrganism_t * self, Bytes32_t const * nested );
Bytes32_t const * CambrianOrganism_get_parent_b_const( CambrianOrganism_t const * self );
Bytes32_t * CambrianOrganism_get_parent_b( uint8_t * data );
int CambrianOrganism_set_parent_b( CambrianOrganism_t * self, Bytes32_t const * nested );
Bytes32_t const * CambrianOrganism_get_genome_const( CambrianOrganism_t const * self );
Bytes32_t * CambrianOrganism_get_genome( uint8_t * data );
int CambrianOrganism_set_genome( CambrianOrganism_t * self, Bytes32_t const * nested );
Bytes32_t const * CambrianOrganism_get_lineage_const( CambrianOrganism_t const * self );
Bytes32_t * CambrianOrganism_get_lineage( uint8_t * data );
int CambrianOrganism_set_lineage( CambrianOrganism_t * self, Bytes32_t const * nested );
Bytes32_t const * CambrianOrganism_get_memory_const( CambrianOrganism_t const * self );
Bytes32_t * CambrianOrganism_get_memory( uint8_t * data );
int CambrianOrganism_set_memory( CambrianOrganism_t * self, Bytes32_t const * nested );


/*  ----- FORWARD DECLARATIONS FOR EncounterArgs ----- */

EncounterArgs_t const * EncounterArgs_from_slice( uint8_t const * data, uint64_t data_len );
EncounterArgs_t * EncounterArgs_from_slice_mut( uint8_t * data, uint64_t data_len );
int EncounterArgs_new( uint8_t * buffer, uint64_t buffer_size, uint64_t * out_size );
uint64_t EncounterArgs_footprint( void );
uint64_t EncounterArgs_footprint_ir( void );
int EncounterArgs_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed );
int EncounterArgs_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size );
uint16_t EncounterArgs_get_actor_account_idx( EncounterArgs_t const * self );
uint16_t EncounterArgs_get_donor_account_idx( EncounterArgs_t const * self );
uint64_t EncounterArgs_get_catalyst( EncounterArgs_t const * self );

void EncounterArgs_set_actor_account_idx( EncounterArgs_t * self, uint16_t value );
void EncounterArgs_set_donor_account_idx( EncounterArgs_t * self, uint16_t value );
void EncounterArgs_set_catalyst( EncounterArgs_t * self, uint64_t value );




/*  ----- FORWARD DECLARATIONS FOR EncounterEvent ----- */

EncounterEvent_t const * EncounterEvent_from_slice( uint8_t const * data, uint64_t data_len );
EncounterEvent_t * EncounterEvent_from_slice_mut( uint8_t * data, uint64_t data_len );
int EncounterEvent_new( uint8_t * buffer, uint64_t buffer_size, uint64_t * out_size );
uint64_t EncounterEvent_footprint( void );
uint64_t EncounterEvent_footprint_ir( void );
int EncounterEvent_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed );
int EncounterEvent_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size );
uint16_t EncounterEvent_get_compatibility( EncounterEvent_t const * self );
uint8_t EncounterEvent_get_outcome( EncounterEvent_t const * self );
uint8_t EncounterEvent_get_gene_transferred( EncounterEvent_t const * self );
uint64_t EncounterEvent_get_energy_before( EncounterEvent_t const * self );
uint64_t EncounterEvent_get_energy_after( EncounterEvent_t const * self );
uint64_t EncounterEvent_get_encounter_count( EncounterEvent_t const * self );

void EncounterEvent_set_compatibility( EncounterEvent_t * self, uint16_t value );
void EncounterEvent_set_outcome( EncounterEvent_t * self, uint8_t value );
void EncounterEvent_set_gene_transferred( EncounterEvent_t * self, uint8_t value );
void EncounterEvent_set_energy_before( EncounterEvent_t * self, uint64_t value );
void EncounterEvent_set_energy_after( EncounterEvent_t * self, uint64_t value );
void EncounterEvent_set_encounter_count( EncounterEvent_t * self, uint64_t value );


Bytes32_t const * EncounterEvent_get_actor_const( EncounterEvent_t const * self );
Bytes32_t * EncounterEvent_get_actor( uint8_t * data );
int EncounterEvent_set_actor( EncounterEvent_t * self, Bytes32_t const * nested );
Bytes32_t const * EncounterEvent_get_donor_const( EncounterEvent_t const * self );
Bytes32_t * EncounterEvent_get_donor( uint8_t * data );
int EncounterEvent_set_donor( EncounterEvent_t * self, Bytes32_t const * nested );
Bytes32_t const * EncounterEvent_get_genome_const( EncounterEvent_t const * self );
Bytes32_t * EncounterEvent_get_genome( uint8_t * data );
int EncounterEvent_set_genome( EncounterEvent_t * self, Bytes32_t const * nested );
Bytes32_t const * EncounterEvent_get_memory_const( EncounterEvent_t const * self );
Bytes32_t * EncounterEvent_get_memory( uint8_t * data );
int EncounterEvent_set_memory( EncounterEvent_t * self, Bytes32_t const * nested );


/*  ----- FORWARD DECLARATIONS FOR PulseArgs ----- */

PulseArgs_t const * PulseArgs_from_slice( uint8_t const * data, uint64_t data_len );
PulseArgs_t * PulseArgs_from_slice_mut( uint8_t * data, uint64_t data_len );
int PulseArgs_new( uint8_t * buffer, uint64_t buffer_size, uint64_t * out_size );
uint64_t PulseArgs_footprint( void );
uint64_t PulseArgs_footprint_ir( void );
int PulseArgs_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed );
int PulseArgs_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size );
uint16_t PulseArgs_get_organism_account_idx( PulseArgs_t const * self );
uint64_t PulseArgs_get_catalyst( PulseArgs_t const * self );

void PulseArgs_set_organism_account_idx( PulseArgs_t * self, uint16_t value );
void PulseArgs_set_catalyst( PulseArgs_t * self, uint64_t value );




/*  ----- FORWARD DECLARATIONS FOR PulseEvent ----- */

PulseEvent_t const * PulseEvent_from_slice( uint8_t const * data, uint64_t data_len );
PulseEvent_t * PulseEvent_from_slice_mut( uint8_t * data, uint64_t data_len );
int PulseEvent_new( uint8_t * buffer, uint64_t buffer_size, uint64_t * out_size );
uint64_t PulseEvent_footprint( void );
uint64_t PulseEvent_footprint_ir( void );
int PulseEvent_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed );
int PulseEvent_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size );
uint64_t PulseEvent_get_slot( PulseEvent_t const * self );
uint64_t PulseEvent_get_age( PulseEvent_t const * self );
uint64_t PulseEvent_get_energy_before( PulseEvent_t const * self );
uint64_t PulseEvent_get_energy_after( PulseEvent_t const * self );
uint64_t PulseEvent_get_vitality( PulseEvent_t const * self );
uint8_t PulseEvent_get_status( PulseEvent_t const * self );
uint16_t PulseEvent_get_mutation_bit( PulseEvent_t const * self );

void PulseEvent_set_slot( PulseEvent_t * self, uint64_t value );
void PulseEvent_set_age( PulseEvent_t * self, uint64_t value );
void PulseEvent_set_energy_before( PulseEvent_t * self, uint64_t value );
void PulseEvent_set_energy_after( PulseEvent_t * self, uint64_t value );
void PulseEvent_set_vitality( PulseEvent_t * self, uint64_t value );
void PulseEvent_set_status( PulseEvent_t * self, uint8_t value );
void PulseEvent_set_mutation_bit( PulseEvent_t * self, uint16_t value );


Bytes32_t const * PulseEvent_get_organism_const( PulseEvent_t const * self );
Bytes32_t * PulseEvent_get_organism( uint8_t * data );
int PulseEvent_set_organism( PulseEvent_t * self, Bytes32_t const * nested );
Bytes32_t const * PulseEvent_get_genome_const( PulseEvent_t const * self );
Bytes32_t * PulseEvent_get_genome( uint8_t * data );
int PulseEvent_set_genome( PulseEvent_t * self, Bytes32_t const * nested );
Bytes32_t const * PulseEvent_get_lineage_const( PulseEvent_t const * self );
Bytes32_t * PulseEvent_get_lineage( uint8_t * data );
int PulseEvent_set_lineage( PulseEvent_t * self, Bytes32_t const * nested );


/*  ----- FORWARD DECLARATIONS FOR ReproduceArgs ----- */

ReproduceArgs_t const * ReproduceArgs_from_slice( uint8_t const * data, uint64_t data_len );
ReproduceArgs_t * ReproduceArgs_from_slice_mut( uint8_t * data, uint64_t data_len );
int ReproduceArgs_new( uint8_t * buffer, uint64_t buffer_size, uint32_t proof_size, uint64_t * out_size );
uint64_t ReproduceArgs_footprint( int64_t proof_size );
uint64_t ReproduceArgs_footprint_ir( uint64_t proof_proof_size );
int ReproduceArgs_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed, uint64_t proof_proof_size );
int ReproduceArgs_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size );
uint16_t ReproduceArgs_get_parent_a_account_idx( ReproduceArgs_t const * self );
uint16_t ReproduceArgs_get_parent_b_account_idx( ReproduceArgs_t const * self );
uint16_t ReproduceArgs_get_child_account_idx( ReproduceArgs_t const * self );
uint32_t ReproduceArgs_get_proof_size( ReproduceArgs_t const * self );

void ReproduceArgs_set_parent_a_account_idx( ReproduceArgs_t * self, uint16_t value );
void ReproduceArgs_set_parent_b_account_idx( ReproduceArgs_t * self, uint16_t value );
void ReproduceArgs_set_child_account_idx( ReproduceArgs_t * self, uint16_t value );


Bytes32_t const * ReproduceArgs_get_seed_const( ReproduceArgs_t const * self );
Bytes32_t * ReproduceArgs_get_seed( uint8_t * data );
int ReproduceArgs_set_seed( ReproduceArgs_t * self, Bytes32_t const * nested );
Bytes32_t const * ReproduceArgs_get_entropy_const( ReproduceArgs_t const * self );
Bytes32_t * ReproduceArgs_get_entropy( uint8_t * data );
int ReproduceArgs_set_entropy( ReproduceArgs_t * self, Bytes32_t const * nested );


/*  ----- FORWARD DECLARATIONS FOR ReproduceEvent ----- */

ReproduceEvent_t const * ReproduceEvent_from_slice( uint8_t const * data, uint64_t data_len );
ReproduceEvent_t * ReproduceEvent_from_slice_mut( uint8_t * data, uint64_t data_len );
int ReproduceEvent_new( uint8_t * buffer, uint64_t buffer_size, uint64_t * out_size );
uint64_t ReproduceEvent_footprint( void );
uint64_t ReproduceEvent_footprint_ir( void );
int ReproduceEvent_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed );
int ReproduceEvent_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size );
uint16_t ReproduceEvent_get_generation( ReproduceEvent_t const * self );
uint16_t ReproduceEvent_get_mutation_bit( ReproduceEvent_t const * self );
uint64_t ReproduceEvent_get_energy( ReproduceEvent_t const * self );

void ReproduceEvent_set_generation( ReproduceEvent_t * self, uint16_t value );
void ReproduceEvent_set_mutation_bit( ReproduceEvent_t * self, uint16_t value );
void ReproduceEvent_set_energy( ReproduceEvent_t * self, uint64_t value );


Bytes32_t const * ReproduceEvent_get_child_const( ReproduceEvent_t const * self );
Bytes32_t * ReproduceEvent_get_child( uint8_t * data );
int ReproduceEvent_set_child( ReproduceEvent_t * self, Bytes32_t const * nested );
Bytes32_t const * ReproduceEvent_get_parent_a_const( ReproduceEvent_t const * self );
Bytes32_t * ReproduceEvent_get_parent_a( uint8_t * data );
int ReproduceEvent_set_parent_a( ReproduceEvent_t * self, Bytes32_t const * nested );
Bytes32_t const * ReproduceEvent_get_parent_b_const( ReproduceEvent_t const * self );
Bytes32_t * ReproduceEvent_get_parent_b( uint8_t * data );
int ReproduceEvent_set_parent_b( ReproduceEvent_t * self, Bytes32_t const * nested );
Bytes32_t const * ReproduceEvent_get_genome_const( ReproduceEvent_t const * self );
Bytes32_t * ReproduceEvent_get_genome( uint8_t * data );
int ReproduceEvent_set_genome( ReproduceEvent_t * self, Bytes32_t const * nested );
Bytes32_t const * ReproduceEvent_get_lineage_const( ReproduceEvent_t const * self );
Bytes32_t * ReproduceEvent_get_lineage( uint8_t * data );
int ReproduceEvent_set_lineage( ReproduceEvent_t * self, Bytes32_t const * nested );


/*  ----- FORWARD DECLARATIONS FOR TransferArgs ----- */

TransferArgs_t const * TransferArgs_from_slice( uint8_t const * data, uint64_t data_len );
TransferArgs_t * TransferArgs_from_slice_mut( uint8_t * data, uint64_t data_len );
int TransferArgs_new( uint8_t * buffer, uint64_t buffer_size, uint64_t * out_size );
uint64_t TransferArgs_footprint( void );
uint64_t TransferArgs_footprint_ir( void );
int TransferArgs_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed );
int TransferArgs_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size );
uint16_t TransferArgs_get_organism_account_idx( TransferArgs_t const * self );
uint16_t TransferArgs_get_new_controller_account_idx( TransferArgs_t const * self );

void TransferArgs_set_organism_account_idx( TransferArgs_t * self, uint16_t value );
void TransferArgs_set_new_controller_account_idx( TransferArgs_t * self, uint16_t value );




/*  ----- FORWARD DECLARATIONS FOR TransferEvent ----- */

TransferEvent_t const * TransferEvent_from_slice( uint8_t const * data, uint64_t data_len );
TransferEvent_t * TransferEvent_from_slice_mut( uint8_t * data, uint64_t data_len );
int TransferEvent_new( uint8_t * buffer, uint64_t buffer_size, uint64_t * out_size );
uint64_t TransferEvent_footprint( void );
uint64_t TransferEvent_footprint_ir( void );
int TransferEvent_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed );
int TransferEvent_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size );
uint64_t TransferEvent_get_slot( TransferEvent_t const * self );

void TransferEvent_set_slot( TransferEvent_t * self, uint64_t value );


Bytes32_t const * TransferEvent_get_organism_const( TransferEvent_t const * self );
Bytes32_t * TransferEvent_get_organism( uint8_t * data );
int TransferEvent_set_organism( TransferEvent_t * self, Bytes32_t const * nested );
Bytes32_t const * TransferEvent_get_old_controller_const( TransferEvent_t const * self );
Bytes32_t * TransferEvent_get_old_controller( uint8_t * data );
int TransferEvent_set_old_controller( TransferEvent_t * self, Bytes32_t const * nested );
Bytes32_t const * TransferEvent_get_new_controller_const( TransferEvent_t const * self );
Bytes32_t * TransferEvent_get_new_controller( uint8_t * data );
int TransferEvent_set_new_controller( TransferEvent_t * self, Bytes32_t const * nested );


/*  ----- FORWARD DECLARATIONS FOR BirthArgs ----- */

BirthArgs_t const * BirthArgs_from_slice( uint8_t const * data, uint64_t data_len );
BirthArgs_t * BirthArgs_from_slice_mut( uint8_t * data, uint64_t data_len );
int BirthArgs_new( uint8_t * buffer, uint64_t buffer_size, uint32_t proof_size, uint64_t * out_size );
uint64_t BirthArgs_footprint( int64_t proof_size );
uint64_t BirthArgs_footprint_ir( uint64_t proof_proof_size );
int BirthArgs_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed, uint64_t proof_proof_size );
int BirthArgs_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size );
uint16_t BirthArgs_get_organism_account_idx( BirthArgs_t const * self );
uint32_t BirthArgs_get_proof_size( BirthArgs_t const * self );

void BirthArgs_set_organism_account_idx( BirthArgs_t * self, uint16_t value );


Bytes32_t const * BirthArgs_get_seed_const( BirthArgs_t const * self );
Bytes32_t * BirthArgs_get_seed( uint8_t * data );
int BirthArgs_set_seed( BirthArgs_t * self, Bytes32_t const * nested );
Bytes32_t const * BirthArgs_get_entropy_const( BirthArgs_t const * self );
Bytes32_t * BirthArgs_get_entropy( uint8_t * data );
int BirthArgs_set_entropy( BirthArgs_t * self, Bytes32_t const * nested );


/*  ----- FORWARD DECLARATIONS FOR BirthEvent ----- */

BirthEvent_t const * BirthEvent_from_slice( uint8_t const * data, uint64_t data_len );
BirthEvent_t * BirthEvent_from_slice_mut( uint8_t * data, uint64_t data_len );
int BirthEvent_new( uint8_t * buffer, uint64_t buffer_size, uint64_t * out_size );
uint64_t BirthEvent_footprint( void );
uint64_t BirthEvent_footprint_ir( void );
int BirthEvent_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed );
int BirthEvent_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size );
uint64_t BirthEvent_get_slot( BirthEvent_t const * self );
uint16_t BirthEvent_get_generation( BirthEvent_t const * self );
uint64_t BirthEvent_get_energy( BirthEvent_t const * self );
uint64_t BirthEvent_get_vitality( BirthEvent_t const * self );

void BirthEvent_set_slot( BirthEvent_t * self, uint64_t value );
void BirthEvent_set_generation( BirthEvent_t * self, uint16_t value );
void BirthEvent_set_energy( BirthEvent_t * self, uint64_t value );
void BirthEvent_set_vitality( BirthEvent_t * self, uint64_t value );


Bytes32_t const * BirthEvent_get_organism_const( BirthEvent_t const * self );
Bytes32_t * BirthEvent_get_organism( uint8_t * data );
int BirthEvent_set_organism( BirthEvent_t * self, Bytes32_t const * nested );
Bytes32_t const * BirthEvent_get_controller_const( BirthEvent_t const * self );
Bytes32_t * BirthEvent_get_controller( uint8_t * data );
int BirthEvent_set_controller( BirthEvent_t * self, Bytes32_t const * nested );
Bytes32_t const * BirthEvent_get_genome_const( BirthEvent_t const * self );
Bytes32_t * BirthEvent_get_genome( uint8_t * data );
int BirthEvent_set_genome( BirthEvent_t * self, Bytes32_t const * nested );
Bytes32_t const * BirthEvent_get_lineage_const( BirthEvent_t const * self );
Bytes32_t * BirthEvent_get_lineage( uint8_t * data );
int BirthEvent_set_lineage( BirthEvent_t * self, Bytes32_t const * nested );


/*  ----- FORWARD DECLARATIONS FOR CambrianEvent ----- */

CambrianEvent_t const * CambrianEvent_from_slice( uint8_t const * data, uint64_t data_len );
CambrianEvent_t * CambrianEvent_from_slice_mut( uint8_t * data, uint64_t data_len );
int CambrianEvent_new( uint8_t * buffer, uint64_t buffer_size, uint8_t tag, uint64_t * out_size );
uint64_t CambrianEvent_footprint( int64_t tag );
uint64_t CambrianEvent_footprint_ir( uint64_t payload_tag, uint64_t CambrianEvent__payload_tag );
int CambrianEvent_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed, uint64_t payload_tag, uint64_t CambrianEvent__payload_tag );
int CambrianEvent_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size );
uint8_t CambrianEvent_get_tag( CambrianEvent_t const * self );

uint64_t CambrianEvent_get_payload_size( CambrianEvent_t const * self );

uint8_t const * CambrianEvent_get_payload_body( CambrianEvent_t const * self );
int CambrianEvent_set_payload_body( CambrianEvent_t * self, uint8_t const * body, uint64_t body_len );





/*  ----- FORWARD DECLARATIONS FOR CambrianInstruction ----- */

CambrianInstruction_t const * CambrianInstruction_from_slice( uint8_t const * data, uint64_t data_len );
CambrianInstruction_t * CambrianInstruction_from_slice_mut( uint8_t * data, uint64_t data_len );
int CambrianInstruction_new( uint8_t * buffer, uint64_t buffer_size, uint8_t tag, uint64_t * out_size );
uint64_t CambrianInstruction_footprint( int64_t payload_payload_size, int64_t tag );
uint64_t CambrianInstruction_footprint_ir( uint64_t payload_payload_size, uint64_t payload_tag );
int CambrianInstruction_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed, uint64_t payload_payload_size, uint64_t payload_tag );
int CambrianInstruction_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size );
uint8_t CambrianInstruction_get_tag( CambrianInstruction_t const * self );

uint64_t CambrianInstruction_get_payload_size( CambrianInstruction_t const * self );

uint8_t const * CambrianInstruction_get_payload_body( CambrianInstruction_t const * self );
int CambrianInstruction_set_payload_body( CambrianInstruction_t * self, uint8_t const * body, uint64_t body_len );




