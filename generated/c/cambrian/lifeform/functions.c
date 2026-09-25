#include <stdint.h> /* for uint8_t, int64_t, etc. */
#include <stddef.h> /* for offsetof */
#include <stdlib.h> /* for malloc */
#include <string.h> /* for memcpy */
#include <assert.h> /* for assert */
#include <stdio.h> /* for fprintf */
#include "types.h" /* for type definitions */

/* Checked arithmetic helpers */
static inline int tn_checked_add_u64( uint64_t a,
uint64_t b,
uint64_t * out ) {
if( !out ) return 1;
if( a > UINT64_MAX - b ) return 1;
*out = a + b;
return 0;
}

static inline int tn_checked_mul_u64( uint64_t a,
uint64_t b,
uint64_t * out ) {
if( !out ) return 1;
if( a && b > UINT64_MAX / a ) return 1;
*out = a * b;
return 0;
}

/*  ----- FUNCTIONS FOR Bytes32 ----- */

/* IR footprint generated for Bytes32 */
uint64_t Bytes32_footprint_ir( void ) {
    return 32ULL;
}
/* IR validator generated for Bytes32 */
int Bytes32_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed ) {
  uint64_t tn_val_0 = 32ULL;
  if( tn_val_0 > buf_sz ) return 1;
  if( out_bytes_consumed ) *out_bytes_consumed = tn_val_0;
  return 0;
}

/*  ----- FUNCTIONS FOR CambrianError ----- */

uint64_t CambrianError_footprint( void ) {
  return CambrianError_footprint_ir();
}

/* IR footprint generated for CambrianError */
uint64_t CambrianError_footprint_ir( void ) {
    return 8ULL;
}
/* IR validator generated for CambrianError */
int CambrianError_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed ) {
  uint64_t tn_val_0 = 8ULL;
  if( tn_val_0 > buf_sz ) return 1;
  if( out_bytes_consumed ) *out_bytes_consumed = tn_val_0;
  return 0;
}

CambrianError_t const * CambrianError_from_slice( uint8_t const * data, uint64_t data_len ) {
    uint64_t required_size;
    if( CambrianError_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (CambrianError_t const *)data;
}

CambrianError_t * CambrianError_from_slice_mut( uint8_t * data, uint64_t data_len ) {
    uint64_t required_size;
    if( CambrianError_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (CambrianError_t *)data;
}

int CambrianError_new( uint8_t * buffer, uint64_t buffer_size, uint64_t * out_size ) {
    uint64_t required_size = 0;
    required_size += 8; /* code */

    if( buffer_size < required_size ) {
        return -1; /* Buffer too small */
    }

    memset( buffer, 0, required_size );

    uint64_t offset = 0;

    offset += 8;

    *out_size = required_size;
    return 0; /* Success */
}

uint64_t CambrianError_get_code( CambrianError_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    return ({ uint64_t val; memcpy( &val, &data[0], sizeof( val ) ); val; });
}

void CambrianError_set_code( CambrianError_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    memcpy( &data[0], &value, sizeof( value ) );
}

int CambrianError_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size ) {
    uint64_t offset = 0;

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'code' */
    }
    offset += 8; /* code */

    *out_size = offset;
    return 0;
}

/*  ----- FUNCTIONS FOR CambrianOrganism ----- */

uint64_t CambrianOrganism_footprint( void ) {
  return CambrianOrganism_footprint_ir();
}

/* IR footprint generated for CambrianOrganism */
uint64_t CambrianOrganism_footprint_ir( void ) {
    return 264ULL;
}
/* IR validator generated for CambrianOrganism */
int CambrianOrganism_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed ) {
  uint64_t tn_val_0 = 264ULL;
  if( tn_val_0 > buf_sz ) return 1;
  if( out_bytes_consumed ) *out_bytes_consumed = tn_val_0;
  return 0;
}

CambrianOrganism_t const * CambrianOrganism_from_slice( uint8_t const * data, uint64_t data_len ) {
    uint64_t required_size;
    if( CambrianOrganism_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (CambrianOrganism_t const *)data;
}

CambrianOrganism_t * CambrianOrganism_from_slice_mut( uint8_t * data, uint64_t data_len ) {
    uint64_t required_size;
    if( CambrianOrganism_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (CambrianOrganism_t *)data;
}

int CambrianOrganism_new( uint8_t * buffer, uint64_t buffer_size, uint64_t * out_size ) {
    uint64_t required_size = 0;
    required_size += 4; /* magic */
    required_size += 1; /* version */
    required_size += 1; /* status */
    required_size += 2; /* generation */
    required_size += 32; /* controller (nested struct) */
    required_size += 32; /* parent_a (nested struct) */
    required_size += 32; /* parent_b (nested struct) */
    required_size += 32; /* genome (nested struct) */
    required_size += 32; /* lineage (nested struct) */
    required_size += 32; /* memory (nested struct) */
    required_size += 8; /* born_slot */
    required_size += 8; /* last_pulse_slot */
    required_size += 8; /* age */
    required_size += 8; /* energy */
    required_size += 8; /* vitality */
    required_size += 8; /* pulse_count */
    required_size += 8; /* encounter_count */
    required_size += 8; /* offspring_count */

    if( buffer_size < required_size ) {
        return -1; /* Buffer too small */
    }

    memset( buffer, 0, required_size );

    uint64_t offset = 0;

    offset += 4;

    offset += 1;

    offset += 1;

    offset += 2;

    offset += 32; /* skip nested 'controller' (set via setters) */

    offset += 32; /* skip nested 'parent_a' (set via setters) */

    offset += 32; /* skip nested 'parent_b' (set via setters) */

    offset += 32; /* skip nested 'genome' (set via setters) */

    offset += 32; /* skip nested 'lineage' (set via setters) */

    offset += 32; /* skip nested 'memory' (set via setters) */

    offset += 8;

    offset += 8;

    offset += 8;

    offset += 8;

    offset += 8;

    offset += 8;

    offset += 8;

    offset += 8;

    *out_size = required_size;
    return 0; /* Success */
}

uint32_t CambrianOrganism_get_magic( CambrianOrganism_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    return ({ uint32_t val; memcpy( &val, &data[0], sizeof( val ) ); val; });
}

uint8_t CambrianOrganism_get_version( CambrianOrganism_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    return data[offset];
}

uint8_t CambrianOrganism_get_status( CambrianOrganism_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    return data[offset];
}

uint16_t CambrianOrganism_get_generation( CambrianOrganism_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    return ({ uint16_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

/* Nested struct const getter for controller */
Bytes32_t const * CambrianOrganism_get_controller_const( CambrianOrganism_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for controller */
Bytes32_t * CambrianOrganism_get_controller( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for controller */
int CambrianOrganism_set_controller( CambrianOrganism_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

/* Nested struct const getter for parent_a */
Bytes32_t const * CambrianOrganism_get_parent_a_const( CambrianOrganism_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for parent_a */
Bytes32_t * CambrianOrganism_get_parent_a( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for parent_a */
int CambrianOrganism_set_parent_a( CambrianOrganism_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

/* Nested struct const getter for parent_b */
Bytes32_t const * CambrianOrganism_get_parent_b_const( CambrianOrganism_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for parent_b */
Bytes32_t * CambrianOrganism_get_parent_b( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for parent_b */
int CambrianOrganism_set_parent_b( CambrianOrganism_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

/* Nested struct const getter for genome */
Bytes32_t const * CambrianOrganism_get_genome_const( CambrianOrganism_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for genome */
Bytes32_t * CambrianOrganism_get_genome( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for genome */
int CambrianOrganism_set_genome( CambrianOrganism_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

/* Nested struct const getter for lineage */
Bytes32_t const * CambrianOrganism_get_lineage_const( CambrianOrganism_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 32; /* genome (nested) */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for lineage */
Bytes32_t * CambrianOrganism_get_lineage( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 32; /* genome (nested) */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for lineage */
int CambrianOrganism_set_lineage( CambrianOrganism_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 32; /* genome (nested) */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

/* Nested struct const getter for memory */
Bytes32_t const * CambrianOrganism_get_memory_const( CambrianOrganism_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 32; /* genome (nested) */
    offset += 32; /* lineage (nested) */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for memory */
Bytes32_t * CambrianOrganism_get_memory( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 32; /* genome (nested) */
    offset += 32; /* lineage (nested) */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for memory */
int CambrianOrganism_set_memory( CambrianOrganism_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 32; /* genome (nested) */
    offset += 32; /* lineage (nested) */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

uint64_t CambrianOrganism_get_born_slot( CambrianOrganism_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 32; /* genome (nested) */
    offset += 32; /* lineage (nested) */
    offset += 32; /* memory (nested) */
    return ({ uint64_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

uint64_t CambrianOrganism_get_last_pulse_slot( CambrianOrganism_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 32; /* genome (nested) */
    offset += 32; /* lineage (nested) */
    offset += 32; /* memory (nested) */
    offset += 8; /* born_slot */
    return ({ uint64_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

uint64_t CambrianOrganism_get_age( CambrianOrganism_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 32; /* genome (nested) */
    offset += 32; /* lineage (nested) */
    offset += 32; /* memory (nested) */
    offset += 8; /* born_slot */
    offset += 8; /* last_pulse_slot */
    return ({ uint64_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

uint64_t CambrianOrganism_get_energy( CambrianOrganism_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 32; /* genome (nested) */
    offset += 32; /* lineage (nested) */
    offset += 32; /* memory (nested) */
    offset += 8; /* born_slot */
    offset += 8; /* last_pulse_slot */
    offset += 8; /* age */
    return ({ uint64_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

uint64_t CambrianOrganism_get_vitality( CambrianOrganism_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 32; /* genome (nested) */
    offset += 32; /* lineage (nested) */
    offset += 32; /* memory (nested) */
    offset += 8; /* born_slot */
    offset += 8; /* last_pulse_slot */
    offset += 8; /* age */
    offset += 8; /* energy */
    return ({ uint64_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

uint64_t CambrianOrganism_get_pulse_count( CambrianOrganism_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 32; /* genome (nested) */
    offset += 32; /* lineage (nested) */
    offset += 32; /* memory (nested) */
    offset += 8; /* born_slot */
    offset += 8; /* last_pulse_slot */
    offset += 8; /* age */
    offset += 8; /* energy */
    offset += 8; /* vitality */
    return ({ uint64_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

uint64_t CambrianOrganism_get_encounter_count( CambrianOrganism_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 32; /* genome (nested) */
    offset += 32; /* lineage (nested) */
    offset += 32; /* memory (nested) */
    offset += 8; /* born_slot */
    offset += 8; /* last_pulse_slot */
    offset += 8; /* age */
    offset += 8; /* energy */
    offset += 8; /* vitality */
    offset += 8; /* pulse_count */
    return ({ uint64_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

uint64_t CambrianOrganism_get_offspring_count( CambrianOrganism_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 32; /* genome (nested) */
    offset += 32; /* lineage (nested) */
    offset += 32; /* memory (nested) */
    offset += 8; /* born_slot */
    offset += 8; /* last_pulse_slot */
    offset += 8; /* age */
    offset += 8; /* energy */
    offset += 8; /* vitality */
    offset += 8; /* pulse_count */
    offset += 8; /* encounter_count */
    return ({ uint64_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

void CambrianOrganism_set_magic( CambrianOrganism_t * self, uint32_t value ) {
    uint8_t * data = (uint8_t *)self;
    memcpy( &data[0], &value, sizeof( value ) );
}

void CambrianOrganism_set_version( CambrianOrganism_t * self, uint8_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    data[offset] = value;
}

void CambrianOrganism_set_status( CambrianOrganism_t * self, uint8_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    data[offset] = value;
}

void CambrianOrganism_set_generation( CambrianOrganism_t * self, uint16_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void CambrianOrganism_set_born_slot( CambrianOrganism_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 32; /* genome (nested) */
    offset += 32; /* lineage (nested) */
    offset += 32; /* memory (nested) */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void CambrianOrganism_set_last_pulse_slot( CambrianOrganism_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 32; /* genome (nested) */
    offset += 32; /* lineage (nested) */
    offset += 32; /* memory (nested) */
    offset += 8; /* born_slot */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void CambrianOrganism_set_age( CambrianOrganism_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 32; /* genome (nested) */
    offset += 32; /* lineage (nested) */
    offset += 32; /* memory (nested) */
    offset += 8; /* born_slot */
    offset += 8; /* last_pulse_slot */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void CambrianOrganism_set_energy( CambrianOrganism_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 32; /* genome (nested) */
    offset += 32; /* lineage (nested) */
    offset += 32; /* memory (nested) */
    offset += 8; /* born_slot */
    offset += 8; /* last_pulse_slot */
    offset += 8; /* age */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void CambrianOrganism_set_vitality( CambrianOrganism_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 32; /* genome (nested) */
    offset += 32; /* lineage (nested) */
    offset += 32; /* memory (nested) */
    offset += 8; /* born_slot */
    offset += 8; /* last_pulse_slot */
    offset += 8; /* age */
    offset += 8; /* energy */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void CambrianOrganism_set_pulse_count( CambrianOrganism_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 32; /* genome (nested) */
    offset += 32; /* lineage (nested) */
    offset += 32; /* memory (nested) */
    offset += 8; /* born_slot */
    offset += 8; /* last_pulse_slot */
    offset += 8; /* age */
    offset += 8; /* energy */
    offset += 8; /* vitality */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void CambrianOrganism_set_encounter_count( CambrianOrganism_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 32; /* genome (nested) */
    offset += 32; /* lineage (nested) */
    offset += 32; /* memory (nested) */
    offset += 8; /* born_slot */
    offset += 8; /* last_pulse_slot */
    offset += 8; /* age */
    offset += 8; /* energy */
    offset += 8; /* vitality */
    offset += 8; /* pulse_count */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void CambrianOrganism_set_offspring_count( CambrianOrganism_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 4; /* magic */
    offset += 1; /* version */
    offset += 1; /* status */
    offset += 2; /* generation */
    offset += 32; /* controller (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 32; /* genome (nested) */
    offset += 32; /* lineage (nested) */
    offset += 32; /* memory (nested) */
    offset += 8; /* born_slot */
    offset += 8; /* last_pulse_slot */
    offset += 8; /* age */
    offset += 8; /* energy */
    offset += 8; /* vitality */
    offset += 8; /* pulse_count */
    offset += 8; /* encounter_count */
    memcpy( &data[offset], &value, sizeof( value ) );
}

int CambrianOrganism_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size ) {
    uint64_t offset = 0;

    if( offset + 4 > data_len ) {
        return -1; /* Buffer too small for 'magic' */
    }
    offset += 4; /* magic */

    if( offset + 1 > data_len ) {
        return -1; /* Buffer too small for 'version' */
    }
    offset += 1; /* version */

    if( offset + 1 > data_len ) {
        return -1; /* Buffer too small for 'status' */
    }
    offset += 1; /* status */

    if( offset + 2 > data_len ) {
        return -1; /* Buffer too small for 'generation' */
    }
    offset += 2; /* generation */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'controller' */
    }
    offset += 32; /* controller (nested) */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'parent_a' */
    }
    offset += 32; /* parent_a (nested) */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'parent_b' */
    }
    offset += 32; /* parent_b (nested) */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'genome' */
    }
    offset += 32; /* genome (nested) */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'lineage' */
    }
    offset += 32; /* lineage (nested) */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'memory' */
    }
    offset += 32; /* memory (nested) */

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'born_slot' */
    }
    offset += 8; /* born_slot */

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'last_pulse_slot' */
    }
    offset += 8; /* last_pulse_slot */

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'age' */
    }
    offset += 8; /* age */

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'energy' */
    }
    offset += 8; /* energy */

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'vitality' */
    }
    offset += 8; /* vitality */

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'pulse_count' */
    }
    offset += 8; /* pulse_count */

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'encounter_count' */
    }
    offset += 8; /* encounter_count */

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'offspring_count' */
    }
    offset += 8; /* offspring_count */

    *out_size = offset;
    return 0;
}

/*  ----- FUNCTIONS FOR EncounterArgs ----- */

uint64_t EncounterArgs_footprint( void ) {
  return EncounterArgs_footprint_ir();
}

/* IR footprint generated for EncounterArgs */
uint64_t EncounterArgs_footprint_ir( void ) {
    return 12ULL;
}
/* IR validator generated for EncounterArgs */
int EncounterArgs_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed ) {
  uint64_t tn_val_0 = 12ULL;
  if( tn_val_0 > buf_sz ) return 1;
  if( out_bytes_consumed ) *out_bytes_consumed = tn_val_0;
  return 0;
}

EncounterArgs_t const * EncounterArgs_from_slice( uint8_t const * data, uint64_t data_len ) {
    uint64_t required_size;
    if( EncounterArgs_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (EncounterArgs_t const *)data;
}

EncounterArgs_t * EncounterArgs_from_slice_mut( uint8_t * data, uint64_t data_len ) {
    uint64_t required_size;
    if( EncounterArgs_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (EncounterArgs_t *)data;
}

int EncounterArgs_new( uint8_t * buffer, uint64_t buffer_size, uint64_t * out_size ) {
    uint64_t required_size = 0;
    required_size += 2; /* actor_account_idx */
    required_size += 2; /* donor_account_idx */
    required_size += 8; /* catalyst */

    if( buffer_size < required_size ) {
        return -1; /* Buffer too small */
    }

    memset( buffer, 0, required_size );

    uint64_t offset = 0;

    offset += 2;

    offset += 2;

    offset += 8;

    *out_size = required_size;
    return 0; /* Success */
}

uint16_t EncounterArgs_get_actor_account_idx( EncounterArgs_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    return ({ uint16_t val; memcpy( &val, &data[0], sizeof( val ) ); val; });
}

uint16_t EncounterArgs_get_donor_account_idx( EncounterArgs_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 2; /* actor_account_idx */
    return ({ uint16_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

uint64_t EncounterArgs_get_catalyst( EncounterArgs_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 2; /* actor_account_idx */
    offset += 2; /* donor_account_idx */
    return ({ uint64_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

void EncounterArgs_set_actor_account_idx( EncounterArgs_t * self, uint16_t value ) {
    uint8_t * data = (uint8_t *)self;
    memcpy( &data[0], &value, sizeof( value ) );
}

void EncounterArgs_set_donor_account_idx( EncounterArgs_t * self, uint16_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 2; /* actor_account_idx */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void EncounterArgs_set_catalyst( EncounterArgs_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 2; /* actor_account_idx */
    offset += 2; /* donor_account_idx */
    memcpy( &data[offset], &value, sizeof( value ) );
}

int EncounterArgs_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size ) {
    uint64_t offset = 0;

    if( offset + 2 > data_len ) {
        return -1; /* Buffer too small for 'actor_account_idx' */
    }
    offset += 2; /* actor_account_idx */

    if( offset + 2 > data_len ) {
        return -1; /* Buffer too small for 'donor_account_idx' */
    }
    offset += 2; /* donor_account_idx */

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'catalyst' */
    }
    offset += 8; /* catalyst */

    *out_size = offset;
    return 0;
}

/*  ----- FUNCTIONS FOR EncounterEvent ----- */

uint64_t EncounterEvent_footprint( void ) {
  return EncounterEvent_footprint_ir();
}

/* IR footprint generated for EncounterEvent */
uint64_t EncounterEvent_footprint_ir( void ) {
    return 156ULL;
}
/* IR validator generated for EncounterEvent */
int EncounterEvent_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed ) {
  uint64_t tn_val_0 = 156ULL;
  if( tn_val_0 > buf_sz ) return 1;
  if( out_bytes_consumed ) *out_bytes_consumed = tn_val_0;
  return 0;
}

EncounterEvent_t const * EncounterEvent_from_slice( uint8_t const * data, uint64_t data_len ) {
    uint64_t required_size;
    if( EncounterEvent_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (EncounterEvent_t const *)data;
}

EncounterEvent_t * EncounterEvent_from_slice_mut( uint8_t * data, uint64_t data_len ) {
    uint64_t required_size;
    if( EncounterEvent_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (EncounterEvent_t *)data;
}

int EncounterEvent_new( uint8_t * buffer, uint64_t buffer_size, uint64_t * out_size ) {
    uint64_t required_size = 0;
    required_size += 32; /* actor (nested struct) */
    required_size += 32; /* donor (nested struct) */
    required_size += 2; /* compatibility */
    required_size += 1; /* outcome */
    required_size += 1; /* gene_transferred */
    required_size += 8; /* energy_before */
    required_size += 8; /* energy_after */
    required_size += 8; /* encounter_count */
    required_size += 32; /* genome (nested struct) */
    required_size += 32; /* memory (nested struct) */

    if( buffer_size < required_size ) {
        return -1; /* Buffer too small */
    }

    memset( buffer, 0, required_size );

    uint64_t offset = 0;

    offset += 32; /* skip nested 'actor' (set via setters) */

    offset += 32; /* skip nested 'donor' (set via setters) */

    offset += 2;

    offset += 1;

    offset += 1;

    offset += 8;

    offset += 8;

    offset += 8;

    offset += 32; /* skip nested 'genome' (set via setters) */

    offset += 32; /* skip nested 'memory' (set via setters) */

    *out_size = required_size;
    return 0; /* Success */
}

/* Nested struct const getter for actor */
Bytes32_t const * EncounterEvent_get_actor_const( EncounterEvent_t const * self ) {
    Bytes32_t const * result = (Bytes32_t const *)self;
    return result;
}

/* Nested struct mutable getter for actor */
Bytes32_t * EncounterEvent_get_actor( uint8_t * data ) {
    Bytes32_t * result = (Bytes32_t *)data;
    return result;
}

/* Nested struct setter for actor */
int EncounterEvent_set_actor( EncounterEvent_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

/* Nested struct const getter for donor */
Bytes32_t const * EncounterEvent_get_donor_const( EncounterEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* actor (nested) */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for donor */
Bytes32_t * EncounterEvent_get_donor( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 32; /* actor (nested) */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for donor */
int EncounterEvent_set_donor( EncounterEvent_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* actor (nested) */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

uint16_t EncounterEvent_get_compatibility( EncounterEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* actor (nested) */
    offset += 32; /* donor (nested) */
    return ({ uint16_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

uint8_t EncounterEvent_get_outcome( EncounterEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* actor (nested) */
    offset += 32; /* donor (nested) */
    offset += 2; /* compatibility */
    return data[offset];
}

uint8_t EncounterEvent_get_gene_transferred( EncounterEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* actor (nested) */
    offset += 32; /* donor (nested) */
    offset += 2; /* compatibility */
    offset += 1; /* outcome */
    return data[offset];
}

uint64_t EncounterEvent_get_energy_before( EncounterEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* actor (nested) */
    offset += 32; /* donor (nested) */
    offset += 2; /* compatibility */
    offset += 1; /* outcome */
    offset += 1; /* gene_transferred */
    return ({ uint64_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

uint64_t EncounterEvent_get_energy_after( EncounterEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* actor (nested) */
    offset += 32; /* donor (nested) */
    offset += 2; /* compatibility */
    offset += 1; /* outcome */
    offset += 1; /* gene_transferred */
    offset += 8; /* energy_before */
    return ({ uint64_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

uint64_t EncounterEvent_get_encounter_count( EncounterEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* actor (nested) */
    offset += 32; /* donor (nested) */
    offset += 2; /* compatibility */
    offset += 1; /* outcome */
    offset += 1; /* gene_transferred */
    offset += 8; /* energy_before */
    offset += 8; /* energy_after */
    return ({ uint64_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

/* Nested struct const getter for genome */
Bytes32_t const * EncounterEvent_get_genome_const( EncounterEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* actor (nested) */
    offset += 32; /* donor (nested) */
    offset += 2; /* compatibility */
    offset += 1; /* outcome */
    offset += 1; /* gene_transferred */
    offset += 8; /* energy_before */
    offset += 8; /* energy_after */
    offset += 8; /* encounter_count */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for genome */
Bytes32_t * EncounterEvent_get_genome( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 32; /* actor (nested) */
    offset += 32; /* donor (nested) */
    offset += 2; /* compatibility */
    offset += 1; /* outcome */
    offset += 1; /* gene_transferred */
    offset += 8; /* energy_before */
    offset += 8; /* energy_after */
    offset += 8; /* encounter_count */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for genome */
int EncounterEvent_set_genome( EncounterEvent_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* actor (nested) */
    offset += 32; /* donor (nested) */
    offset += 2; /* compatibility */
    offset += 1; /* outcome */
    offset += 1; /* gene_transferred */
    offset += 8; /* energy_before */
    offset += 8; /* energy_after */
    offset += 8; /* encounter_count */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

/* Nested struct const getter for memory */
Bytes32_t const * EncounterEvent_get_memory_const( EncounterEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* actor (nested) */
    offset += 32; /* donor (nested) */
    offset += 2; /* compatibility */
    offset += 1; /* outcome */
    offset += 1; /* gene_transferred */
    offset += 8; /* energy_before */
    offset += 8; /* energy_after */
    offset += 8; /* encounter_count */
    offset += 32; /* genome (nested) */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for memory */
Bytes32_t * EncounterEvent_get_memory( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 32; /* actor (nested) */
    offset += 32; /* donor (nested) */
    offset += 2; /* compatibility */
    offset += 1; /* outcome */
    offset += 1; /* gene_transferred */
    offset += 8; /* energy_before */
    offset += 8; /* energy_after */
    offset += 8; /* encounter_count */
    offset += 32; /* genome (nested) */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for memory */
int EncounterEvent_set_memory( EncounterEvent_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* actor (nested) */
    offset += 32; /* donor (nested) */
    offset += 2; /* compatibility */
    offset += 1; /* outcome */
    offset += 1; /* gene_transferred */
    offset += 8; /* energy_before */
    offset += 8; /* energy_after */
    offset += 8; /* encounter_count */
    offset += 32; /* genome (nested) */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

void EncounterEvent_set_compatibility( EncounterEvent_t * self, uint16_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* actor (nested) */
    offset += 32; /* donor (nested) */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void EncounterEvent_set_outcome( EncounterEvent_t * self, uint8_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* actor (nested) */
    offset += 32; /* donor (nested) */
    offset += 2; /* compatibility */
    data[offset] = value;
}

void EncounterEvent_set_gene_transferred( EncounterEvent_t * self, uint8_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* actor (nested) */
    offset += 32; /* donor (nested) */
    offset += 2; /* compatibility */
    offset += 1; /* outcome */
    data[offset] = value;
}

void EncounterEvent_set_energy_before( EncounterEvent_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* actor (nested) */
    offset += 32; /* donor (nested) */
    offset += 2; /* compatibility */
    offset += 1; /* outcome */
    offset += 1; /* gene_transferred */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void EncounterEvent_set_energy_after( EncounterEvent_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* actor (nested) */
    offset += 32; /* donor (nested) */
    offset += 2; /* compatibility */
    offset += 1; /* outcome */
    offset += 1; /* gene_transferred */
    offset += 8; /* energy_before */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void EncounterEvent_set_encounter_count( EncounterEvent_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* actor (nested) */
    offset += 32; /* donor (nested) */
    offset += 2; /* compatibility */
    offset += 1; /* outcome */
    offset += 1; /* gene_transferred */
    offset += 8; /* energy_before */
    offset += 8; /* energy_after */
    memcpy( &data[offset], &value, sizeof( value ) );
}

int EncounterEvent_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size ) {
    uint64_t offset = 0;

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'actor' */
    }
    offset += 32; /* actor (nested) */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'donor' */
    }
    offset += 32; /* donor (nested) */

    if( offset + 2 > data_len ) {
        return -1; /* Buffer too small for 'compatibility' */
    }
    offset += 2; /* compatibility */

    if( offset + 1 > data_len ) {
        return -1; /* Buffer too small for 'outcome' */
    }
    offset += 1; /* outcome */

    if( offset + 1 > data_len ) {
        return -1; /* Buffer too small for 'gene_transferred' */
    }
    offset += 1; /* gene_transferred */

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'energy_before' */
    }
    offset += 8; /* energy_before */

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'energy_after' */
    }
    offset += 8; /* energy_after */

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'encounter_count' */
    }
    offset += 8; /* encounter_count */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'genome' */
    }
    offset += 32; /* genome (nested) */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'memory' */
    }
    offset += 32; /* memory (nested) */

    *out_size = offset;
    return 0;
}

/*  ----- FUNCTIONS FOR PulseArgs ----- */

uint64_t PulseArgs_footprint( void ) {
  return PulseArgs_footprint_ir();
}

/* IR footprint generated for PulseArgs */
uint64_t PulseArgs_footprint_ir( void ) {
    return 10ULL;
}
/* IR validator generated for PulseArgs */
int PulseArgs_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed ) {
  uint64_t tn_val_0 = 10ULL;
  if( tn_val_0 > buf_sz ) return 1;
  if( out_bytes_consumed ) *out_bytes_consumed = tn_val_0;
  return 0;
}

PulseArgs_t const * PulseArgs_from_slice( uint8_t const * data, uint64_t data_len ) {
    uint64_t required_size;
    if( PulseArgs_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (PulseArgs_t const *)data;
}

PulseArgs_t * PulseArgs_from_slice_mut( uint8_t * data, uint64_t data_len ) {
    uint64_t required_size;
    if( PulseArgs_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (PulseArgs_t *)data;
}

int PulseArgs_new( uint8_t * buffer, uint64_t buffer_size, uint64_t * out_size ) {
    uint64_t required_size = 0;
    required_size += 2; /* organism_account_idx */
    required_size += 8; /* catalyst */

    if( buffer_size < required_size ) {
        return -1; /* Buffer too small */
    }

    memset( buffer, 0, required_size );

    uint64_t offset = 0;

    offset += 2;

    offset += 8;

    *out_size = required_size;
    return 0; /* Success */
}

uint16_t PulseArgs_get_organism_account_idx( PulseArgs_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    return ({ uint16_t val; memcpy( &val, &data[0], sizeof( val ) ); val; });
}

uint64_t PulseArgs_get_catalyst( PulseArgs_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 2; /* organism_account_idx */
    return ({ uint64_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

void PulseArgs_set_organism_account_idx( PulseArgs_t * self, uint16_t value ) {
    uint8_t * data = (uint8_t *)self;
    memcpy( &data[0], &value, sizeof( value ) );
}

void PulseArgs_set_catalyst( PulseArgs_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 2; /* organism_account_idx */
    memcpy( &data[offset], &value, sizeof( value ) );
}

int PulseArgs_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size ) {
    uint64_t offset = 0;

    if( offset + 2 > data_len ) {
        return -1; /* Buffer too small for 'organism_account_idx' */
    }
    offset += 2; /* organism_account_idx */

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'catalyst' */
    }
    offset += 8; /* catalyst */

    *out_size = offset;
    return 0;
}

/*  ----- FUNCTIONS FOR PulseEvent ----- */

uint64_t PulseEvent_footprint( void ) {
  return PulseEvent_footprint_ir();
}

/* IR footprint generated for PulseEvent */
uint64_t PulseEvent_footprint_ir( void ) {
    return 139ULL;
}
/* IR validator generated for PulseEvent */
int PulseEvent_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed ) {
  uint64_t tn_val_0 = 139ULL;
  if( tn_val_0 > buf_sz ) return 1;
  if( out_bytes_consumed ) *out_bytes_consumed = tn_val_0;
  return 0;
}

PulseEvent_t const * PulseEvent_from_slice( uint8_t const * data, uint64_t data_len ) {
    uint64_t required_size;
    if( PulseEvent_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (PulseEvent_t const *)data;
}

PulseEvent_t * PulseEvent_from_slice_mut( uint8_t * data, uint64_t data_len ) {
    uint64_t required_size;
    if( PulseEvent_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (PulseEvent_t *)data;
}

int PulseEvent_new( uint8_t * buffer, uint64_t buffer_size, uint64_t * out_size ) {
    uint64_t required_size = 0;
    required_size += 32; /* organism (nested struct) */
    required_size += 8; /* slot */
    required_size += 8; /* age */
    required_size += 8; /* energy_before */
    required_size += 8; /* energy_after */
    required_size += 8; /* vitality */
    required_size += 1; /* status */
    required_size += 2; /* mutation_bit */
    required_size += 32; /* genome (nested struct) */
    required_size += 32; /* lineage (nested struct) */

    if( buffer_size < required_size ) {
        return -1; /* Buffer too small */
    }

    memset( buffer, 0, required_size );

    uint64_t offset = 0;

    offset += 32; /* skip nested 'organism' (set via setters) */

    offset += 8;

    offset += 8;

    offset += 8;

    offset += 8;

    offset += 8;

    offset += 1;

    offset += 2;

    offset += 32; /* skip nested 'genome' (set via setters) */

    offset += 32; /* skip nested 'lineage' (set via setters) */

    *out_size = required_size;
    return 0; /* Success */
}

/* Nested struct const getter for organism */
Bytes32_t const * PulseEvent_get_organism_const( PulseEvent_t const * self ) {
    Bytes32_t const * result = (Bytes32_t const *)self;
    return result;
}

/* Nested struct mutable getter for organism */
Bytes32_t * PulseEvent_get_organism( uint8_t * data ) {
    Bytes32_t * result = (Bytes32_t *)data;
    return result;
}

/* Nested struct setter for organism */
int PulseEvent_set_organism( PulseEvent_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

uint64_t PulseEvent_get_slot( PulseEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    return ({ uint64_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

uint64_t PulseEvent_get_age( PulseEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 8; /* slot */
    return ({ uint64_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

uint64_t PulseEvent_get_energy_before( PulseEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 8; /* slot */
    offset += 8; /* age */
    return ({ uint64_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

uint64_t PulseEvent_get_energy_after( PulseEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 8; /* slot */
    offset += 8; /* age */
    offset += 8; /* energy_before */
    return ({ uint64_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

uint64_t PulseEvent_get_vitality( PulseEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 8; /* slot */
    offset += 8; /* age */
    offset += 8; /* energy_before */
    offset += 8; /* energy_after */
    return ({ uint64_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

uint8_t PulseEvent_get_status( PulseEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 8; /* slot */
    offset += 8; /* age */
    offset += 8; /* energy_before */
    offset += 8; /* energy_after */
    offset += 8; /* vitality */
    return data[offset];
}

uint16_t PulseEvent_get_mutation_bit( PulseEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 8; /* slot */
    offset += 8; /* age */
    offset += 8; /* energy_before */
    offset += 8; /* energy_after */
    offset += 8; /* vitality */
    offset += 1; /* status */
    return ({ uint16_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

/* Nested struct const getter for genome */
Bytes32_t const * PulseEvent_get_genome_const( PulseEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 8; /* slot */
    offset += 8; /* age */
    offset += 8; /* energy_before */
    offset += 8; /* energy_after */
    offset += 8; /* vitality */
    offset += 1; /* status */
    offset += 2; /* mutation_bit */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for genome */
Bytes32_t * PulseEvent_get_genome( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 8; /* slot */
    offset += 8; /* age */
    offset += 8; /* energy_before */
    offset += 8; /* energy_after */
    offset += 8; /* vitality */
    offset += 1; /* status */
    offset += 2; /* mutation_bit */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for genome */
int PulseEvent_set_genome( PulseEvent_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 8; /* slot */
    offset += 8; /* age */
    offset += 8; /* energy_before */
    offset += 8; /* energy_after */
    offset += 8; /* vitality */
    offset += 1; /* status */
    offset += 2; /* mutation_bit */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

/* Nested struct const getter for lineage */
Bytes32_t const * PulseEvent_get_lineage_const( PulseEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 8; /* slot */
    offset += 8; /* age */
    offset += 8; /* energy_before */
    offset += 8; /* energy_after */
    offset += 8; /* vitality */
    offset += 1; /* status */
    offset += 2; /* mutation_bit */
    offset += 32; /* genome (nested) */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for lineage */
Bytes32_t * PulseEvent_get_lineage( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 8; /* slot */
    offset += 8; /* age */
    offset += 8; /* energy_before */
    offset += 8; /* energy_after */
    offset += 8; /* vitality */
    offset += 1; /* status */
    offset += 2; /* mutation_bit */
    offset += 32; /* genome (nested) */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for lineage */
int PulseEvent_set_lineage( PulseEvent_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 8; /* slot */
    offset += 8; /* age */
    offset += 8; /* energy_before */
    offset += 8; /* energy_after */
    offset += 8; /* vitality */
    offset += 1; /* status */
    offset += 2; /* mutation_bit */
    offset += 32; /* genome (nested) */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

void PulseEvent_set_slot( PulseEvent_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void PulseEvent_set_age( PulseEvent_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 8; /* slot */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void PulseEvent_set_energy_before( PulseEvent_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 8; /* slot */
    offset += 8; /* age */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void PulseEvent_set_energy_after( PulseEvent_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 8; /* slot */
    offset += 8; /* age */
    offset += 8; /* energy_before */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void PulseEvent_set_vitality( PulseEvent_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 8; /* slot */
    offset += 8; /* age */
    offset += 8; /* energy_before */
    offset += 8; /* energy_after */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void PulseEvent_set_status( PulseEvent_t * self, uint8_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 8; /* slot */
    offset += 8; /* age */
    offset += 8; /* energy_before */
    offset += 8; /* energy_after */
    offset += 8; /* vitality */
    data[offset] = value;
}

void PulseEvent_set_mutation_bit( PulseEvent_t * self, uint16_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 8; /* slot */
    offset += 8; /* age */
    offset += 8; /* energy_before */
    offset += 8; /* energy_after */
    offset += 8; /* vitality */
    offset += 1; /* status */
    memcpy( &data[offset], &value, sizeof( value ) );
}

int PulseEvent_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size ) {
    uint64_t offset = 0;

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'organism' */
    }
    offset += 32; /* organism (nested) */

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'slot' */
    }
    offset += 8; /* slot */

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'age' */
    }
    offset += 8; /* age */

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'energy_before' */
    }
    offset += 8; /* energy_before */

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'energy_after' */
    }
    offset += 8; /* energy_after */

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'vitality' */
    }
    offset += 8; /* vitality */

    if( offset + 1 > data_len ) {
        return -1; /* Buffer too small for 'status' */
    }
    offset += 1; /* status */

    if( offset + 2 > data_len ) {
        return -1; /* Buffer too small for 'mutation_bit' */
    }
    offset += 2; /* mutation_bit */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'genome' */
    }
    offset += 32; /* genome (nested) */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'lineage' */
    }
    offset += 32; /* lineage (nested) */

    *out_size = offset;
    return 0;
}

/*  ----- FUNCTIONS FOR ReproduceArgs ----- */

uint64_t ReproduceArgs_footprint( int64_t proof_size ) {
  return ReproduceArgs_footprint_ir( (uint64_t)proof_size );
}

/* IR footprint generated for ReproduceArgs */
uint64_t ReproduceArgs_footprint_ir( uint64_t proof_proof_size ) {
    return ((((((((((((2ULL) + 2ULL - 1ULL) & ~(2ULL - 1ULL)) + (((2ULL) + 2ULL - 1ULL) & ~(2ULL - 1ULL))) + (((2ULL) + 2ULL - 1ULL) & ~(2ULL - 1ULL))) + (((32ULL) + 1ULL - 1ULL) & ~(1ULL - 1ULL))) + (((32ULL) + 1ULL - 1ULL) & ~(1ULL - 1ULL))) + (((4ULL) + 4ULL - 1ULL) & ~(4ULL - 1ULL))) + ((((proof_proof_size * 1ULL)) + 1ULL - 1ULL) & ~(1ULL - 1ULL)))) + 1ULL - 1ULL) & ~(1ULL - 1ULL));
}
/* IR validator generated for ReproduceArgs */
int ReproduceArgs_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed, uint64_t proof_proof_size ) {
  uint64_t tn_val_0 = 2ULL;
  uint64_t tn_val_1 = tn_val_0;
  uint64_t tn_val_2 = tn_val_1 % 2ULL;
  if( tn_val_2 ) {
    uint64_t tn_val_3 = 2ULL - tn_val_2;
    if( tn_checked_add_u64( tn_val_1, tn_val_3, &tn_val_1 ) ) return 3;
  }
  uint64_t tn_val_4 = 2ULL;
  uint64_t tn_val_5 = tn_val_4;
  uint64_t tn_val_6 = tn_val_5 % 2ULL;
  if( tn_val_6 ) {
    uint64_t tn_val_7 = 2ULL - tn_val_6;
    if( tn_checked_add_u64( tn_val_5, tn_val_7, &tn_val_5 ) ) return 3;
  }
  uint64_t tn_val_8 = 0ULL;
  if( tn_checked_add_u64( tn_val_1, tn_val_5, &tn_val_8 ) ) return 3;
  uint64_t tn_val_9 = 2ULL;
  uint64_t tn_val_10 = tn_val_9;
  uint64_t tn_val_11 = tn_val_10 % 2ULL;
  if( tn_val_11 ) {
    uint64_t tn_val_12 = 2ULL - tn_val_11;
    if( tn_checked_add_u64( tn_val_10, tn_val_12, &tn_val_10 ) ) return 3;
  }
  uint64_t tn_val_13 = 0ULL;
  if( tn_checked_add_u64( tn_val_8, tn_val_10, &tn_val_13 ) ) return 3;
  uint64_t tn_val_14 = 32ULL;
  uint64_t tn_val_15 = 0ULL;
  if( tn_checked_add_u64( tn_val_13, tn_val_14, &tn_val_15 ) ) return 3;
  uint64_t tn_val_16 = 32ULL;
  uint64_t tn_val_17 = 0ULL;
  if( tn_checked_add_u64( tn_val_15, tn_val_16, &tn_val_17 ) ) return 3;
  uint64_t tn_val_18 = 4ULL;
  uint64_t tn_val_19 = tn_val_18;
  uint64_t tn_val_20 = tn_val_19 % 4ULL;
  if( tn_val_20 ) {
    uint64_t tn_val_21 = 4ULL - tn_val_20;
    if( tn_checked_add_u64( tn_val_19, tn_val_21, &tn_val_19 ) ) return 3;
  }
  uint64_t tn_val_22 = 0ULL;
  if( tn_checked_add_u64( tn_val_17, tn_val_19, &tn_val_22 ) ) return 3;
  uint64_t tn_val_23 = 1ULL;
  uint64_t tn_val_24 = 0ULL;
  if( tn_checked_mul_u64( proof_proof_size, tn_val_23, &tn_val_24 ) ) return 3;
  uint64_t tn_val_25 = 0ULL;
  if( tn_checked_add_u64( tn_val_22, tn_val_24, &tn_val_25 ) ) return 3;
  if( tn_val_25 > buf_sz ) return 1;
  if( out_bytes_consumed ) *out_bytes_consumed = tn_val_25;
  return 0;
}

ReproduceArgs_t const * ReproduceArgs_from_slice( uint8_t const * data, uint64_t data_len ) {
    uint64_t required_size;
    if( ReproduceArgs_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (ReproduceArgs_t const *)data;
}

ReproduceArgs_t * ReproduceArgs_from_slice_mut( uint8_t * data, uint64_t data_len ) {
    uint64_t required_size;
    if( ReproduceArgs_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (ReproduceArgs_t *)data;
}

int ReproduceArgs_new( uint8_t * buffer, uint64_t buffer_size, uint32_t proof_size, uint64_t * out_size ) {
    uint64_t required_size = 0;
    required_size += 2; /* parent_a_account_idx */
    required_size += 2; /* parent_b_account_idx */
    required_size += 2; /* child_account_idx */
    required_size += 32; /* seed (nested struct) */
    required_size += 32; /* entropy (nested struct) */
    required_size += 4; /* proof_size */
    required_size += (proof_size) * 1; /* proof (variable array) */

    if( buffer_size < required_size ) {
        return -1; /* Buffer too small */
    }

    memset( buffer, 0, required_size );

    uint64_t offset = 0;

    offset += 2;

    offset += 2;

    offset += 2;

    offset += 32; /* skip nested 'seed' (set via setters) */

    offset += 32; /* skip nested 'entropy' (set via setters) */

    memcpy( &buffer[offset], &proof_size, sizeof( proof_size ) );
    offset += 4;

    offset += (proof_size) * 1; /* skip variable array 'proof' (set via setters) */

    *out_size = required_size;
    return 0; /* Success */
}

uint16_t ReproduceArgs_get_parent_a_account_idx( ReproduceArgs_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    return ({ uint16_t val; memcpy( &val, &data[0], sizeof( val ) ); val; });
}

uint16_t ReproduceArgs_get_parent_b_account_idx( ReproduceArgs_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 2; /* parent_a_account_idx */
    return ({ uint16_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

uint16_t ReproduceArgs_get_child_account_idx( ReproduceArgs_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 2; /* parent_a_account_idx */
    offset += 2; /* parent_b_account_idx */
    return ({ uint16_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

/* Nested struct const getter for seed */
Bytes32_t const * ReproduceArgs_get_seed_const( ReproduceArgs_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 2; /* parent_a_account_idx */
    offset += 2; /* parent_b_account_idx */
    offset += 2; /* child_account_idx */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for seed */
Bytes32_t * ReproduceArgs_get_seed( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 2; /* parent_a_account_idx */
    offset += 2; /* parent_b_account_idx */
    offset += 2; /* child_account_idx */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for seed */
int ReproduceArgs_set_seed( ReproduceArgs_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 2; /* parent_a_account_idx */
    offset += 2; /* parent_b_account_idx */
    offset += 2; /* child_account_idx */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

/* Nested struct const getter for entropy */
Bytes32_t const * ReproduceArgs_get_entropy_const( ReproduceArgs_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 2; /* parent_a_account_idx */
    offset += 2; /* parent_b_account_idx */
    offset += 2; /* child_account_idx */
    offset += 32; /* seed (nested) */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for entropy */
Bytes32_t * ReproduceArgs_get_entropy( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 2; /* parent_a_account_idx */
    offset += 2; /* parent_b_account_idx */
    offset += 2; /* child_account_idx */
    offset += 32; /* seed (nested) */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for entropy */
int ReproduceArgs_set_entropy( ReproduceArgs_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 2; /* parent_a_account_idx */
    offset += 2; /* parent_b_account_idx */
    offset += 2; /* child_account_idx */
    offset += 32; /* seed (nested) */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

uint32_t ReproduceArgs_get_proof_size( ReproduceArgs_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 2; /* parent_a_account_idx */
    offset += 2; /* parent_b_account_idx */
    offset += 2; /* child_account_idx */
    offset += 32; /* seed (nested) */
    offset += 32; /* entropy (nested) */
    return ({ uint32_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

/* Variable-size array accessor helpers for proof */
uint64_t ReproduceArgs_get_proof_length( ReproduceArgs_t const * self ) {
    return (ReproduceArgs_get_proof_size( self ));
}

uint8_t ReproduceArgs_get_proof_at( ReproduceArgs_t const * self, uint64_t index ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t base_offset = 0;
    base_offset += 2; /* parent_a_account_idx */
    base_offset += 2; /* parent_b_account_idx */
    base_offset += 2; /* child_account_idx */
    base_offset += 32; /* seed (nested) */
    base_offset += 32; /* entropy (nested) */
    base_offset += 4; /* proof_size */
    uint64_t offset = base_offset + index * 1; /* element index */
    return data[offset];
}

uint8_t const * ReproduceArgs_get_proof_const( ReproduceArgs_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 2; /* parent_a_account_idx */
    offset += 2; /* parent_b_account_idx */
    offset += 2; /* child_account_idx */
    offset += 32; /* seed (nested) */
    offset += 32; /* entropy (nested) */
    offset += 4; /* proof_size */
    return &data[offset];
}

void ReproduceArgs_set_parent_a_account_idx( ReproduceArgs_t * self, uint16_t value ) {
    uint8_t * data = (uint8_t *)self;
    memcpy( &data[0], &value, sizeof( value ) );
}

void ReproduceArgs_set_parent_b_account_idx( ReproduceArgs_t * self, uint16_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 2; /* parent_a_account_idx */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void ReproduceArgs_set_child_account_idx( ReproduceArgs_t * self, uint16_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 2; /* parent_a_account_idx */
    offset += 2; /* parent_b_account_idx */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void ReproduceArgs_set_proof_size( ReproduceArgs_t * self, uint32_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 2; /* parent_a_account_idx */
    offset += 2; /* parent_b_account_idx */
    offset += 2; /* child_account_idx */
    offset += 32; /* seed (nested) */
    offset += 32; /* entropy (nested) */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void ReproduceArgs_set_proof_at( ReproduceArgs_t * self, uint64_t index, uint8_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t base_offset = 0;
    base_offset += 2; /* parent_a_account_idx */
    base_offset += 2; /* parent_b_account_idx */
    base_offset += 2; /* child_account_idx */
    base_offset += 32; /* seed (nested) */
    base_offset += 32; /* entropy (nested) */
    base_offset += 4; /* proof_size */
    uint64_t offset = base_offset + index * 1;
    data[offset] = value;
}

void ReproduceArgs_set_proof( uint8_t * data, uint8_t const * slice, uint64_t slice_len ) {
    uint64_t offset = 0;
    offset += 2; /* parent_a_account_idx */
    offset += 2; /* parent_b_account_idx */
    offset += 2; /* child_account_idx */
    offset += 32; /* seed (nested) */
    offset += 32; /* entropy (nested) */
    offset += 4; /* proof_size */
    uint64_t len = ReproduceArgs_get_proof_length( (ReproduceArgs_t const *)data );
    if( slice_len < len ) len = slice_len;
    memcpy( &data[offset], slice, len );
}

uint8_t * ReproduceArgs_get_proof( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 2; /* parent_a_account_idx */
    offset += 2; /* parent_b_account_idx */
    offset += 2; /* child_account_idx */
    offset += 32; /* seed (nested) */
    offset += 32; /* entropy (nested) */
    offset += 4; /* proof_size */
    return &data[offset];
}

int ReproduceArgs_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size ) {
    uint64_t offset = 0;

    if( offset + 2 > data_len ) {
        return -1; /* Buffer too small for 'parent_a_account_idx' */
    }
    offset += 2; /* parent_a_account_idx */

    if( offset + 2 > data_len ) {
        return -1; /* Buffer too small for 'parent_b_account_idx' */
    }
    offset += 2; /* parent_b_account_idx */

    if( offset + 2 > data_len ) {
        return -1; /* Buffer too small for 'child_account_idx' */
    }
    offset += 2; /* child_account_idx */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'seed' */
    }
    offset += 32; /* seed (nested) */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'entropy' */
    }
    offset += 32; /* entropy (nested) */

    if( offset + 4 > data_len ) {
        return -1; /* Buffer too small for 'proof_size' */
    }
    uint64_t offset_proof_size = offset;
    offset += 4; /* proof_size */

    *out_size = offset;
    return 0;
}

/*  ----- FUNCTIONS FOR ReproduceEvent ----- */

uint64_t ReproduceEvent_footprint( void ) {
  return ReproduceEvent_footprint_ir();
}

/* IR footprint generated for ReproduceEvent */
uint64_t ReproduceEvent_footprint_ir( void ) {
    return 172ULL;
}
/* IR validator generated for ReproduceEvent */
int ReproduceEvent_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed ) {
  uint64_t tn_val_0 = 172ULL;
  if( tn_val_0 > buf_sz ) return 1;
  if( out_bytes_consumed ) *out_bytes_consumed = tn_val_0;
  return 0;
}

ReproduceEvent_t const * ReproduceEvent_from_slice( uint8_t const * data, uint64_t data_len ) {
    uint64_t required_size;
    if( ReproduceEvent_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (ReproduceEvent_t const *)data;
}

ReproduceEvent_t * ReproduceEvent_from_slice_mut( uint8_t * data, uint64_t data_len ) {
    uint64_t required_size;
    if( ReproduceEvent_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (ReproduceEvent_t *)data;
}

int ReproduceEvent_new( uint8_t * buffer, uint64_t buffer_size, uint64_t * out_size ) {
    uint64_t required_size = 0;
    required_size += 32; /* child (nested struct) */
    required_size += 32; /* parent_a (nested struct) */
    required_size += 32; /* parent_b (nested struct) */
    required_size += 2; /* generation */
    required_size += 2; /* mutation_bit */
    required_size += 8; /* energy */
    required_size += 32; /* genome (nested struct) */
    required_size += 32; /* lineage (nested struct) */

    if( buffer_size < required_size ) {
        return -1; /* Buffer too small */
    }

    memset( buffer, 0, required_size );

    uint64_t offset = 0;

    offset += 32; /* skip nested 'child' (set via setters) */

    offset += 32; /* skip nested 'parent_a' (set via setters) */

    offset += 32; /* skip nested 'parent_b' (set via setters) */

    offset += 2;

    offset += 2;

    offset += 8;

    offset += 32; /* skip nested 'genome' (set via setters) */

    offset += 32; /* skip nested 'lineage' (set via setters) */

    *out_size = required_size;
    return 0; /* Success */
}

/* Nested struct const getter for child */
Bytes32_t const * ReproduceEvent_get_child_const( ReproduceEvent_t const * self ) {
    Bytes32_t const * result = (Bytes32_t const *)self;
    return result;
}

/* Nested struct mutable getter for child */
Bytes32_t * ReproduceEvent_get_child( uint8_t * data ) {
    Bytes32_t * result = (Bytes32_t *)data;
    return result;
}

/* Nested struct setter for child */
int ReproduceEvent_set_child( ReproduceEvent_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

/* Nested struct const getter for parent_a */
Bytes32_t const * ReproduceEvent_get_parent_a_const( ReproduceEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* child (nested) */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for parent_a */
Bytes32_t * ReproduceEvent_get_parent_a( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 32; /* child (nested) */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for parent_a */
int ReproduceEvent_set_parent_a( ReproduceEvent_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* child (nested) */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

/* Nested struct const getter for parent_b */
Bytes32_t const * ReproduceEvent_get_parent_b_const( ReproduceEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* child (nested) */
    offset += 32; /* parent_a (nested) */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for parent_b */
Bytes32_t * ReproduceEvent_get_parent_b( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 32; /* child (nested) */
    offset += 32; /* parent_a (nested) */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for parent_b */
int ReproduceEvent_set_parent_b( ReproduceEvent_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* child (nested) */
    offset += 32; /* parent_a (nested) */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

uint16_t ReproduceEvent_get_generation( ReproduceEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* child (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    return ({ uint16_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

uint16_t ReproduceEvent_get_mutation_bit( ReproduceEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* child (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 2; /* generation */
    return ({ uint16_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

uint64_t ReproduceEvent_get_energy( ReproduceEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* child (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 2; /* generation */
    offset += 2; /* mutation_bit */
    return ({ uint64_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

/* Nested struct const getter for genome */
Bytes32_t const * ReproduceEvent_get_genome_const( ReproduceEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* child (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 2; /* generation */
    offset += 2; /* mutation_bit */
    offset += 8; /* energy */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for genome */
Bytes32_t * ReproduceEvent_get_genome( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 32; /* child (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 2; /* generation */
    offset += 2; /* mutation_bit */
    offset += 8; /* energy */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for genome */
int ReproduceEvent_set_genome( ReproduceEvent_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* child (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 2; /* generation */
    offset += 2; /* mutation_bit */
    offset += 8; /* energy */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

/* Nested struct const getter for lineage */
Bytes32_t const * ReproduceEvent_get_lineage_const( ReproduceEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* child (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 2; /* generation */
    offset += 2; /* mutation_bit */
    offset += 8; /* energy */
    offset += 32; /* genome (nested) */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for lineage */
Bytes32_t * ReproduceEvent_get_lineage( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 32; /* child (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 2; /* generation */
    offset += 2; /* mutation_bit */
    offset += 8; /* energy */
    offset += 32; /* genome (nested) */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for lineage */
int ReproduceEvent_set_lineage( ReproduceEvent_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* child (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 2; /* generation */
    offset += 2; /* mutation_bit */
    offset += 8; /* energy */
    offset += 32; /* genome (nested) */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

void ReproduceEvent_set_generation( ReproduceEvent_t * self, uint16_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* child (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void ReproduceEvent_set_mutation_bit( ReproduceEvent_t * self, uint16_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* child (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 2; /* generation */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void ReproduceEvent_set_energy( ReproduceEvent_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* child (nested) */
    offset += 32; /* parent_a (nested) */
    offset += 32; /* parent_b (nested) */
    offset += 2; /* generation */
    offset += 2; /* mutation_bit */
    memcpy( &data[offset], &value, sizeof( value ) );
}

int ReproduceEvent_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size ) {
    uint64_t offset = 0;

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'child' */
    }
    offset += 32; /* child (nested) */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'parent_a' */
    }
    offset += 32; /* parent_a (nested) */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'parent_b' */
    }
    offset += 32; /* parent_b (nested) */

    if( offset + 2 > data_len ) {
        return -1; /* Buffer too small for 'generation' */
    }
    offset += 2; /* generation */

    if( offset + 2 > data_len ) {
        return -1; /* Buffer too small for 'mutation_bit' */
    }
    offset += 2; /* mutation_bit */

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'energy' */
    }
    offset += 8; /* energy */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'genome' */
    }
    offset += 32; /* genome (nested) */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'lineage' */
    }
    offset += 32; /* lineage (nested) */

    *out_size = offset;
    return 0;
}

/*  ----- FUNCTIONS FOR TransferArgs ----- */

uint64_t TransferArgs_footprint( void ) {
  return TransferArgs_footprint_ir();
}

/* IR footprint generated for TransferArgs */
uint64_t TransferArgs_footprint_ir( void ) {
    return 4ULL;
}
/* IR validator generated for TransferArgs */
int TransferArgs_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed ) {
  uint64_t tn_val_0 = 4ULL;
  if( tn_val_0 > buf_sz ) return 1;
  if( out_bytes_consumed ) *out_bytes_consumed = tn_val_0;
  return 0;
}

TransferArgs_t const * TransferArgs_from_slice( uint8_t const * data, uint64_t data_len ) {
    uint64_t required_size;
    if( TransferArgs_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (TransferArgs_t const *)data;
}

TransferArgs_t * TransferArgs_from_slice_mut( uint8_t * data, uint64_t data_len ) {
    uint64_t required_size;
    if( TransferArgs_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (TransferArgs_t *)data;
}

int TransferArgs_new( uint8_t * buffer, uint64_t buffer_size, uint64_t * out_size ) {
    uint64_t required_size = 0;
    required_size += 2; /* organism_account_idx */
    required_size += 2; /* new_controller_account_idx */

    if( buffer_size < required_size ) {
        return -1; /* Buffer too small */
    }

    memset( buffer, 0, required_size );

    uint64_t offset = 0;

    offset += 2;

    offset += 2;

    *out_size = required_size;
    return 0; /* Success */
}

uint16_t TransferArgs_get_organism_account_idx( TransferArgs_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    return ({ uint16_t val; memcpy( &val, &data[0], sizeof( val ) ); val; });
}

uint16_t TransferArgs_get_new_controller_account_idx( TransferArgs_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 2; /* organism_account_idx */
    return ({ uint16_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

void TransferArgs_set_organism_account_idx( TransferArgs_t * self, uint16_t value ) {
    uint8_t * data = (uint8_t *)self;
    memcpy( &data[0], &value, sizeof( value ) );
}

void TransferArgs_set_new_controller_account_idx( TransferArgs_t * self, uint16_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 2; /* organism_account_idx */
    memcpy( &data[offset], &value, sizeof( value ) );
}

int TransferArgs_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size ) {
    uint64_t offset = 0;

    if( offset + 2 > data_len ) {
        return -1; /* Buffer too small for 'organism_account_idx' */
    }
    offset += 2; /* organism_account_idx */

    if( offset + 2 > data_len ) {
        return -1; /* Buffer too small for 'new_controller_account_idx' */
    }
    offset += 2; /* new_controller_account_idx */

    *out_size = offset;
    return 0;
}

/*  ----- FUNCTIONS FOR TransferEvent ----- */

uint64_t TransferEvent_footprint( void ) {
  return TransferEvent_footprint_ir();
}

/* IR footprint generated for TransferEvent */
uint64_t TransferEvent_footprint_ir( void ) {
    return 104ULL;
}
/* IR validator generated for TransferEvent */
int TransferEvent_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed ) {
  uint64_t tn_val_0 = 104ULL;
  if( tn_val_0 > buf_sz ) return 1;
  if( out_bytes_consumed ) *out_bytes_consumed = tn_val_0;
  return 0;
}

TransferEvent_t const * TransferEvent_from_slice( uint8_t const * data, uint64_t data_len ) {
    uint64_t required_size;
    if( TransferEvent_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (TransferEvent_t const *)data;
}

TransferEvent_t * TransferEvent_from_slice_mut( uint8_t * data, uint64_t data_len ) {
    uint64_t required_size;
    if( TransferEvent_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (TransferEvent_t *)data;
}

int TransferEvent_new( uint8_t * buffer, uint64_t buffer_size, uint64_t * out_size ) {
    uint64_t required_size = 0;
    required_size += 32; /* organism (nested struct) */
    required_size += 32; /* old_controller (nested struct) */
    required_size += 32; /* new_controller (nested struct) */
    required_size += 8; /* slot */

    if( buffer_size < required_size ) {
        return -1; /* Buffer too small */
    }

    memset( buffer, 0, required_size );

    uint64_t offset = 0;

    offset += 32; /* skip nested 'organism' (set via setters) */

    offset += 32; /* skip nested 'old_controller' (set via setters) */

    offset += 32; /* skip nested 'new_controller' (set via setters) */

    offset += 8;

    *out_size = required_size;
    return 0; /* Success */
}

/* Nested struct const getter for organism */
Bytes32_t const * TransferEvent_get_organism_const( TransferEvent_t const * self ) {
    Bytes32_t const * result = (Bytes32_t const *)self;
    return result;
}

/* Nested struct mutable getter for organism */
Bytes32_t * TransferEvent_get_organism( uint8_t * data ) {
    Bytes32_t * result = (Bytes32_t *)data;
    return result;
}

/* Nested struct setter for organism */
int TransferEvent_set_organism( TransferEvent_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

/* Nested struct const getter for old_controller */
Bytes32_t const * TransferEvent_get_old_controller_const( TransferEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for old_controller */
Bytes32_t * TransferEvent_get_old_controller( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for old_controller */
int TransferEvent_set_old_controller( TransferEvent_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

/* Nested struct const getter for new_controller */
Bytes32_t const * TransferEvent_get_new_controller_const( TransferEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 32; /* old_controller (nested) */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for new_controller */
Bytes32_t * TransferEvent_get_new_controller( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 32; /* old_controller (nested) */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for new_controller */
int TransferEvent_set_new_controller( TransferEvent_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 32; /* old_controller (nested) */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

uint64_t TransferEvent_get_slot( TransferEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 32; /* old_controller (nested) */
    offset += 32; /* new_controller (nested) */
    return ({ uint64_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

void TransferEvent_set_slot( TransferEvent_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 32; /* old_controller (nested) */
    offset += 32; /* new_controller (nested) */
    memcpy( &data[offset], &value, sizeof( value ) );
}

int TransferEvent_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size ) {
    uint64_t offset = 0;

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'organism' */
    }
    offset += 32; /* organism (nested) */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'old_controller' */
    }
    offset += 32; /* old_controller (nested) */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'new_controller' */
    }
    offset += 32; /* new_controller (nested) */

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'slot' */
    }
    offset += 8; /* slot */

    *out_size = offset;
    return 0;
}

/*  ----- FUNCTIONS FOR BirthArgs ----- */

uint64_t BirthArgs_footprint( int64_t proof_size ) {
  return BirthArgs_footprint_ir( (uint64_t)proof_size );
}

/* IR footprint generated for BirthArgs */
uint64_t BirthArgs_footprint_ir( uint64_t proof_proof_size ) {
    return ((((((((((2ULL) + 2ULL - 1ULL) & ~(2ULL - 1ULL)) + (((32ULL) + 1ULL - 1ULL) & ~(1ULL - 1ULL))) + (((32ULL) + 1ULL - 1ULL) & ~(1ULL - 1ULL))) + (((4ULL) + 4ULL - 1ULL) & ~(4ULL - 1ULL))) + ((((proof_proof_size * 1ULL)) + 1ULL - 1ULL) & ~(1ULL - 1ULL)))) + 1ULL - 1ULL) & ~(1ULL - 1ULL));
}
/* IR validator generated for BirthArgs */
int BirthArgs_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed, uint64_t proof_proof_size ) {
  uint64_t tn_val_0 = 2ULL;
  uint64_t tn_val_1 = tn_val_0;
  uint64_t tn_val_2 = tn_val_1 % 2ULL;
  if( tn_val_2 ) {
    uint64_t tn_val_3 = 2ULL - tn_val_2;
    if( tn_checked_add_u64( tn_val_1, tn_val_3, &tn_val_1 ) ) return 3;
  }
  uint64_t tn_val_4 = 32ULL;
  uint64_t tn_val_5 = 0ULL;
  if( tn_checked_add_u64( tn_val_1, tn_val_4, &tn_val_5 ) ) return 3;
  uint64_t tn_val_6 = 32ULL;
  uint64_t tn_val_7 = 0ULL;
  if( tn_checked_add_u64( tn_val_5, tn_val_6, &tn_val_7 ) ) return 3;
  uint64_t tn_val_8 = 4ULL;
  uint64_t tn_val_9 = tn_val_8;
  uint64_t tn_val_10 = tn_val_9 % 4ULL;
  if( tn_val_10 ) {
    uint64_t tn_val_11 = 4ULL - tn_val_10;
    if( tn_checked_add_u64( tn_val_9, tn_val_11, &tn_val_9 ) ) return 3;
  }
  uint64_t tn_val_12 = 0ULL;
  if( tn_checked_add_u64( tn_val_7, tn_val_9, &tn_val_12 ) ) return 3;
  uint64_t tn_val_13 = 1ULL;
  uint64_t tn_val_14 = 0ULL;
  if( tn_checked_mul_u64( proof_proof_size, tn_val_13, &tn_val_14 ) ) return 3;
  uint64_t tn_val_15 = 0ULL;
  if( tn_checked_add_u64( tn_val_12, tn_val_14, &tn_val_15 ) ) return 3;
  if( tn_val_15 > buf_sz ) return 1;
  if( out_bytes_consumed ) *out_bytes_consumed = tn_val_15;
  return 0;
}

BirthArgs_t const * BirthArgs_from_slice( uint8_t const * data, uint64_t data_len ) {
    uint64_t required_size;
    if( BirthArgs_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (BirthArgs_t const *)data;
}

BirthArgs_t * BirthArgs_from_slice_mut( uint8_t * data, uint64_t data_len ) {
    uint64_t required_size;
    if( BirthArgs_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (BirthArgs_t *)data;
}

int BirthArgs_new( uint8_t * buffer, uint64_t buffer_size, uint32_t proof_size, uint64_t * out_size ) {
    uint64_t required_size = 0;
    required_size += 2; /* organism_account_idx */
    required_size += 32; /* seed (nested struct) */
    required_size += 32; /* entropy (nested struct) */
    required_size += 4; /* proof_size */
    required_size += (proof_size) * 1; /* proof (variable array) */

    if( buffer_size < required_size ) {
        return -1; /* Buffer too small */
    }

    memset( buffer, 0, required_size );

    uint64_t offset = 0;

    offset += 2;

    offset += 32; /* skip nested 'seed' (set via setters) */

    offset += 32; /* skip nested 'entropy' (set via setters) */

    memcpy( &buffer[offset], &proof_size, sizeof( proof_size ) );
    offset += 4;

    offset += (proof_size) * 1; /* skip variable array 'proof' (set via setters) */

    *out_size = required_size;
    return 0; /* Success */
}

uint16_t BirthArgs_get_organism_account_idx( BirthArgs_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    return ({ uint16_t val; memcpy( &val, &data[0], sizeof( val ) ); val; });
}

/* Nested struct const getter for seed */
Bytes32_t const * BirthArgs_get_seed_const( BirthArgs_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 2; /* organism_account_idx */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for seed */
Bytes32_t * BirthArgs_get_seed( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 2; /* organism_account_idx */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for seed */
int BirthArgs_set_seed( BirthArgs_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 2; /* organism_account_idx */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

/* Nested struct const getter for entropy */
Bytes32_t const * BirthArgs_get_entropy_const( BirthArgs_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 2; /* organism_account_idx */
    offset += 32; /* seed (nested) */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for entropy */
Bytes32_t * BirthArgs_get_entropy( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 2; /* organism_account_idx */
    offset += 32; /* seed (nested) */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for entropy */
int BirthArgs_set_entropy( BirthArgs_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 2; /* organism_account_idx */
    offset += 32; /* seed (nested) */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

uint32_t BirthArgs_get_proof_size( BirthArgs_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 2; /* organism_account_idx */
    offset += 32; /* seed (nested) */
    offset += 32; /* entropy (nested) */
    return ({ uint32_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

/* Variable-size array accessor helpers for proof */
uint64_t BirthArgs_get_proof_length( BirthArgs_t const * self ) {
    return (BirthArgs_get_proof_size( self ));
}

uint8_t BirthArgs_get_proof_at( BirthArgs_t const * self, uint64_t index ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t base_offset = 0;
    base_offset += 2; /* organism_account_idx */
    base_offset += 32; /* seed (nested) */
    base_offset += 32; /* entropy (nested) */
    base_offset += 4; /* proof_size */
    uint64_t offset = base_offset + index * 1; /* element index */
    return data[offset];
}

uint8_t const * BirthArgs_get_proof_const( BirthArgs_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 2; /* organism_account_idx */
    offset += 32; /* seed (nested) */
    offset += 32; /* entropy (nested) */
    offset += 4; /* proof_size */
    return &data[offset];
}

void BirthArgs_set_organism_account_idx( BirthArgs_t * self, uint16_t value ) {
    uint8_t * data = (uint8_t *)self;
    memcpy( &data[0], &value, sizeof( value ) );
}

void BirthArgs_set_proof_size( BirthArgs_t * self, uint32_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 2; /* organism_account_idx */
    offset += 32; /* seed (nested) */
    offset += 32; /* entropy (nested) */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void BirthArgs_set_proof_at( BirthArgs_t * self, uint64_t index, uint8_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t base_offset = 0;
    base_offset += 2; /* organism_account_idx */
    base_offset += 32; /* seed (nested) */
    base_offset += 32; /* entropy (nested) */
    base_offset += 4; /* proof_size */
    uint64_t offset = base_offset + index * 1;
    data[offset] = value;
}

void BirthArgs_set_proof( uint8_t * data, uint8_t const * slice, uint64_t slice_len ) {
    uint64_t offset = 0;
    offset += 2; /* organism_account_idx */
    offset += 32; /* seed (nested) */
    offset += 32; /* entropy (nested) */
    offset += 4; /* proof_size */
    uint64_t len = BirthArgs_get_proof_length( (BirthArgs_t const *)data );
    if( slice_len < len ) len = slice_len;
    memcpy( &data[offset], slice, len );
}

uint8_t * BirthArgs_get_proof( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 2; /* organism_account_idx */
    offset += 32; /* seed (nested) */
    offset += 32; /* entropy (nested) */
    offset += 4; /* proof_size */
    return &data[offset];
}

int BirthArgs_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size ) {
    uint64_t offset = 0;

    if( offset + 2 > data_len ) {
        return -1; /* Buffer too small for 'organism_account_idx' */
    }
    offset += 2; /* organism_account_idx */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'seed' */
    }
    offset += 32; /* seed (nested) */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'entropy' */
    }
    offset += 32; /* entropy (nested) */

    if( offset + 4 > data_len ) {
        return -1; /* Buffer too small for 'proof_size' */
    }
    uint64_t offset_proof_size = offset;
    offset += 4; /* proof_size */

    *out_size = offset;
    return 0;
}

/*  ----- FUNCTIONS FOR BirthEvent ----- */

uint64_t BirthEvent_footprint( void ) {
  return BirthEvent_footprint_ir();
}

/* IR footprint generated for BirthEvent */
uint64_t BirthEvent_footprint_ir( void ) {
    return 154ULL;
}
/* IR validator generated for BirthEvent */
int BirthEvent_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed ) {
  uint64_t tn_val_0 = 154ULL;
  if( tn_val_0 > buf_sz ) return 1;
  if( out_bytes_consumed ) *out_bytes_consumed = tn_val_0;
  return 0;
}

BirthEvent_t const * BirthEvent_from_slice( uint8_t const * data, uint64_t data_len ) {
    uint64_t required_size;
    if( BirthEvent_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (BirthEvent_t const *)data;
}

BirthEvent_t * BirthEvent_from_slice_mut( uint8_t * data, uint64_t data_len ) {
    uint64_t required_size;
    if( BirthEvent_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (BirthEvent_t *)data;
}

int BirthEvent_new( uint8_t * buffer, uint64_t buffer_size, uint64_t * out_size ) {
    uint64_t required_size = 0;
    required_size += 32; /* organism (nested struct) */
    required_size += 32; /* controller (nested struct) */
    required_size += 8; /* slot */
    required_size += 2; /* generation */
    required_size += 8; /* energy */
    required_size += 8; /* vitality */
    required_size += 32; /* genome (nested struct) */
    required_size += 32; /* lineage (nested struct) */

    if( buffer_size < required_size ) {
        return -1; /* Buffer too small */
    }

    memset( buffer, 0, required_size );

    uint64_t offset = 0;

    offset += 32; /* skip nested 'organism' (set via setters) */

    offset += 32; /* skip nested 'controller' (set via setters) */

    offset += 8;

    offset += 2;

    offset += 8;

    offset += 8;

    offset += 32; /* skip nested 'genome' (set via setters) */

    offset += 32; /* skip nested 'lineage' (set via setters) */

    *out_size = required_size;
    return 0; /* Success */
}

/* Nested struct const getter for organism */
Bytes32_t const * BirthEvent_get_organism_const( BirthEvent_t const * self ) {
    Bytes32_t const * result = (Bytes32_t const *)self;
    return result;
}

/* Nested struct mutable getter for organism */
Bytes32_t * BirthEvent_get_organism( uint8_t * data ) {
    Bytes32_t * result = (Bytes32_t *)data;
    return result;
}

/* Nested struct setter for organism */
int BirthEvent_set_organism( BirthEvent_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

/* Nested struct const getter for controller */
Bytes32_t const * BirthEvent_get_controller_const( BirthEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for controller */
Bytes32_t * BirthEvent_get_controller( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for controller */
int BirthEvent_set_controller( BirthEvent_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

uint64_t BirthEvent_get_slot( BirthEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 32; /* controller (nested) */
    return ({ uint64_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

uint16_t BirthEvent_get_generation( BirthEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 32; /* controller (nested) */
    offset += 8; /* slot */
    return ({ uint16_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

uint64_t BirthEvent_get_energy( BirthEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 32; /* controller (nested) */
    offset += 8; /* slot */
    offset += 2; /* generation */
    return ({ uint64_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

uint64_t BirthEvent_get_vitality( BirthEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 32; /* controller (nested) */
    offset += 8; /* slot */
    offset += 2; /* generation */
    offset += 8; /* energy */
    return ({ uint64_t val; memcpy( &val, &data[offset], sizeof( val ) ); val; });
}

/* Nested struct const getter for genome */
Bytes32_t const * BirthEvent_get_genome_const( BirthEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 32; /* controller (nested) */
    offset += 8; /* slot */
    offset += 2; /* generation */
    offset += 8; /* energy */
    offset += 8; /* vitality */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for genome */
Bytes32_t * BirthEvent_get_genome( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 32; /* controller (nested) */
    offset += 8; /* slot */
    offset += 2; /* generation */
    offset += 8; /* energy */
    offset += 8; /* vitality */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for genome */
int BirthEvent_set_genome( BirthEvent_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 32; /* controller (nested) */
    offset += 8; /* slot */
    offset += 2; /* generation */
    offset += 8; /* energy */
    offset += 8; /* vitality */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

/* Nested struct const getter for lineage */
Bytes32_t const * BirthEvent_get_lineage_const( BirthEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 32; /* controller (nested) */
    offset += 8; /* slot */
    offset += 2; /* generation */
    offset += 8; /* energy */
    offset += 8; /* vitality */
    offset += 32; /* genome (nested) */
    Bytes32_t const * result = (Bytes32_t const *)&data[offset];
    return result;
}

/* Nested struct mutable getter for lineage */
Bytes32_t * BirthEvent_get_lineage( uint8_t * data ) {
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 32; /* controller (nested) */
    offset += 8; /* slot */
    offset += 2; /* generation */
    offset += 8; /* energy */
    offset += 8; /* vitality */
    offset += 32; /* genome (nested) */
    Bytes32_t * result = (Bytes32_t *)&data[offset];
    return result;
}

/* Nested struct setter for lineage */
int BirthEvent_set_lineage( BirthEvent_t * self, Bytes32_t const * nested ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 32; /* controller (nested) */
    offset += 8; /* slot */
    offset += 2; /* generation */
    offset += 8; /* energy */
    offset += 8; /* vitality */
    offset += 32; /* genome (nested) */
    memcpy( &data[offset], (uint8_t const *)nested, 32 );
    return 0; /* Success */
}

void BirthEvent_set_slot( BirthEvent_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 32; /* controller (nested) */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void BirthEvent_set_generation( BirthEvent_t * self, uint16_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 32; /* controller (nested) */
    offset += 8; /* slot */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void BirthEvent_set_energy( BirthEvent_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 32; /* controller (nested) */
    offset += 8; /* slot */
    offset += 2; /* generation */
    memcpy( &data[offset], &value, sizeof( value ) );
}

void BirthEvent_set_vitality( BirthEvent_t * self, uint64_t value ) {
    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 32; /* organism (nested) */
    offset += 32; /* controller (nested) */
    offset += 8; /* slot */
    offset += 2; /* generation */
    offset += 8; /* energy */
    memcpy( &data[offset], &value, sizeof( value ) );
}

int BirthEvent_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size ) {
    uint64_t offset = 0;

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'organism' */
    }
    offset += 32; /* organism (nested) */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'controller' */
    }
    offset += 32; /* controller (nested) */

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'slot' */
    }
    offset += 8; /* slot */

    if( offset + 2 > data_len ) {
        return -1; /* Buffer too small for 'generation' */
    }
    offset += 2; /* generation */

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'energy' */
    }
    offset += 8; /* energy */

    if( offset + 8 > data_len ) {
        return -1; /* Buffer too small for 'vitality' */
    }
    offset += 8; /* vitality */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'genome' */
    }
    offset += 32; /* genome (nested) */

    if( offset + 32 > data_len ) {
        return -1; /* Buffer too small for nested 'lineage' */
    }
    offset += 32; /* lineage (nested) */

    *out_size = offset;
    return 0;
}

/*  ----- FUNCTIONS FOR CambrianEvent ----- */

uint64_t CambrianEvent_payload_inner_footprint( int64_t tag ) {
  uint64_t size = 0;
  switch ( tag ) {
    case 0:
    {
      size = 154;
      break;
    }
    case 1:
    {
      size = 139;
      break;
    }
    case 2:
    {
      size = 156;
      break;
    }
    case 3:
    {
      size = 172;
      break;
    }
    case 4:
    {
      size = 104;
      break;
    }
    default:
      break;
  }
  return size;
}

uint64_t CambrianEvent_footprint( int64_t tag ) {
  return CambrianEvent_footprint_ir( (uint64_t)tag, (uint64_t)tag );
}

/* IR footprint generated for CambrianEvent */
uint64_t CambrianEvent_footprint_ir( uint64_t payload_tag, uint64_t CambrianEvent__payload_tag ) {
    return (((((((1ULL) + 1ULL - 1ULL) & ~(1ULL - 1ULL)) + (((({ uint64_t tn_result = 0ULL; switch( CambrianEvent__payload_tag ) {
    case 0:
        tn_result = (((154ULL) + 1ULL - 1ULL) & ~(1ULL - 1ULL));
        break;
    case 1:
        tn_result = (((139ULL) + 1ULL - 1ULL) & ~(1ULL - 1ULL));
        break;
    case 2:
        tn_result = (((156ULL) + 1ULL - 1ULL) & ~(1ULL - 1ULL));
        break;
    case 3:
        tn_result = (((172ULL) + 1ULL - 1ULL) & ~(1ULL - 1ULL));
        break;
    case 4:
        tn_result = (((104ULL) + 1ULL - 1ULL) & ~(1ULL - 1ULL));
        break;
    default:
        tn_result = 0ULL;
        break;
  }
  tn_result;
})
) + 1ULL - 1ULL) & ~(1ULL - 1ULL)))) + 1ULL - 1ULL) & ~(1ULL - 1ULL));
}
/* IR validator generated for CambrianEvent */
int CambrianEvent_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed, uint64_t payload_tag, uint64_t CambrianEvent__payload_tag ) {
  uint64_t tn_val_0 = 1ULL;
  uint64_t tn_val_1 = 0ULL;
  switch( CambrianEvent__payload_tag ) {
    case 0: {
      uint64_t tn_val_2 = 154ULL;
      tn_val_1 = tn_val_2;
      break;
    }
    case 1: {
      uint64_t tn_val_3 = 139ULL;
      tn_val_1 = tn_val_3;
      break;
    }
    case 2: {
      uint64_t tn_val_4 = 156ULL;
      tn_val_1 = tn_val_4;
      break;
    }
    case 3: {
      uint64_t tn_val_5 = 172ULL;
      tn_val_1 = tn_val_5;
      break;
    }
    case 4: {
      uint64_t tn_val_6 = 104ULL;
      tn_val_1 = tn_val_6;
      break;
    }
    default: return 2;
  }
  uint64_t tn_val_7 = 0ULL;
  if( tn_checked_add_u64( tn_val_0, tn_val_1, &tn_val_7 ) ) return 3;
  if( tn_val_7 > buf_sz ) return 1;
  if( out_bytes_consumed ) *out_bytes_consumed = tn_val_7;
  return 0;
}

CambrianEvent_t const * CambrianEvent_from_slice( uint8_t const * data, uint64_t data_len ) {
    uint64_t required_size;
    if( CambrianEvent_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (CambrianEvent_t const *)data;
}

CambrianEvent_t * CambrianEvent_from_slice_mut( uint8_t * data, uint64_t data_len ) {
    uint64_t required_size;
    if( CambrianEvent_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (CambrianEvent_t *)data;
}

int CambrianEvent_new( uint8_t * buffer, uint64_t buffer_size, uint8_t tag, uint64_t * out_size ) {
    uint64_t required_size = 0;
    required_size += 1; /* tag */
    /* Calculate enum 'payload' size based on tag */
    uint64_t payload_size;
    switch( (uint8_t)(tag) ) {
        case 0: payload_size = 154; break;
        case 1: payload_size = 139; break;
        case 2: payload_size = 156; break;
        case 3: payload_size = 172; break;
        case 4: payload_size = 104; break;
        default: return -1; /* Invalid enum tag */
    }
    required_size += payload_size;


    if( buffer_size < required_size ) {
        return -1; /* Buffer too small */
    }

    memset( buffer, 0, required_size );

    uint64_t offset = 0;

    buffer[offset] = tag;
    offset += 1;

    offset += payload_size; /* skip enum 'payload' (set via setters) */

    *out_size = required_size;
    return 0; /* Success */
}

uint8_t CambrianEvent_get_tag( CambrianEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    return data[0];
}

/* Size helper for enum field 'payload' */
uint64_t CambrianEvent_get_payload_size( CambrianEvent_t const * self ) {
    uint8_t tag = (CambrianEvent_get_tag( self ));
    switch( tag ) {
        case 0: return 154;
        case 1: return 139;
        case 2: return 156;
        case 3: return 172;
        case 4: return 104;
        default: return 0;
    }
}

/* Generic body getter for enum field 'payload' */
uint8_t const * CambrianEvent_get_payload_body( CambrianEvent_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 1; /* tag */
    return &data[offset];
}

/* Generic body setter for enum field 'payload' */
int CambrianEvent_set_payload_body( CambrianEvent_t * self, uint8_t const * body, uint64_t body_len ) {
    uint64_t expected_size = CambrianEvent_get_payload_size( (CambrianEvent_t const *)self );
    if( body_len != expected_size ) {
        return -1; /* Size mismatch */
    }

    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 1; /* tag */
    memcpy( &data[offset], body, body_len );
    return 0; /* Success */
}

int CambrianEvent_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size ) {
    uint64_t offset = 0;

    if( offset + 1 > data_len ) {
        return -1; /* Buffer too small for 'tag' */
    }
    offset += 1; /* tag */

    uint8_t tag_payload = (data[0]);
    uint64_t variant_size_payload;
    switch( tag_payload ) {
        case 0: variant_size_payload = 154; break;
        case 1: variant_size_payload = 139; break;
        case 2: variant_size_payload = 156; break;
        case 3: variant_size_payload = 172; break;
        case 4: variant_size_payload = 104; break;
        default: return -1; /* Invalid enum tag */
    }

    if( offset + variant_size_payload > data_len ) {
        return -1; /* Buffer too small for enum 'payload' */
    }
    offset += variant_size_payload;

    *out_size = offset;
    return 0;
}

/*  ----- FUNCTIONS FOR CambrianInstruction ----- */

uint64_t CambrianInstruction_payload_inner_footprint( int64_t birth_proof_size, int64_t reproduce_proof_size, int64_t tag ) {
  uint64_t size = 0;
  switch ( tag ) {
    case 0:
    {
      size = CambrianInstruction_payload_birth_inner_footprint( birth_proof_size );
      break;
    }
    case 1:
    {
      size = 10;
      break;
    }
    case 2:
    {
      size = 12;
      break;
    }
    case 3:
    {
      size = CambrianInstruction_payload_reproduce_inner_footprint( reproduce_proof_size );
      break;
    }
    case 4:
    {
      size = 4;
      break;
    }
    default:
      break;
  }
  return size;
}

uint64_t CambrianInstruction_footprint( int64_t payload_payload_size, int64_t tag ) {
  return CambrianInstruction_footprint_ir( (uint64_t)payload_payload_size, (uint64_t)tag );
}

/* IR footprint generated for CambrianInstruction */
uint64_t CambrianInstruction_footprint_ir( uint64_t payload_payload_size, uint64_t payload_tag ) {
    return (((((((1ULL) + 1ULL - 1ULL) & ~(1ULL - 1ULL)) + (((payload_payload_size) + 1ULL - 1ULL) & ~(1ULL - 1ULL)))) + 1ULL - 1ULL) & ~(1ULL - 1ULL));
}
/* IR validator generated for CambrianInstruction */
int CambrianInstruction_validate_ir( uint64_t buf_sz, uint64_t * out_bytes_consumed, uint64_t payload_payload_size, uint64_t payload_tag ) {
  uint64_t tn_val_0 = 1ULL;
  uint64_t tn_val_1 = 0ULL;
  if( tn_checked_add_u64( tn_val_0, payload_payload_size, &tn_val_1 ) ) return 3;
  if( tn_val_1 > buf_sz ) return 1;
  if( out_bytes_consumed ) *out_bytes_consumed = tn_val_1;
  return 0;
}

CambrianInstruction_t const * CambrianInstruction_from_slice( uint8_t const * data, uint64_t data_len ) {
    uint64_t required_size;
    if( CambrianInstruction_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (CambrianInstruction_t const *)data;
}

CambrianInstruction_t * CambrianInstruction_from_slice_mut( uint8_t * data, uint64_t data_len ) {
    uint64_t required_size;
    if( CambrianInstruction_validate( data, data_len, &required_size ) != 0 ) {
        return NULL;
    }
    return (CambrianInstruction_t *)data;
}

int CambrianInstruction_new( uint8_t * buffer, uint64_t buffer_size, uint8_t tag, uint64_t * out_size ) {
    uint64_t required_size = 0;
    required_size += 1; /* tag */
    /* Calculate enum 'payload' size based on tag */
    uint64_t payload_size;
    switch( (uint8_t)(tag) ) {
        case 1: payload_size = 10; break;
        case 2: payload_size = 12; break;
        case 4: payload_size = 4; break;
        default: return -1; /* Invalid enum tag */
    }
    required_size += payload_size;


    if( buffer_size < required_size ) {
        return -1; /* Buffer too small */
    }

    memset( buffer, 0, required_size );

    uint64_t offset = 0;

    buffer[offset] = tag;
    offset += 1;

    offset += payload_size; /* skip enum 'payload' (set via setters) */

    *out_size = required_size;
    return 0; /* Success */
}

uint8_t CambrianInstruction_get_tag( CambrianInstruction_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    return data[0];
}

/* Size helper for enum field 'payload' */
uint64_t CambrianInstruction_get_payload_size( CambrianInstruction_t const * self ) {
    uint8_t tag = (CambrianInstruction_get_tag( self ));
    switch( tag ) {
        case 1: return 10;
        case 2: return 12;
        case 4: return 4;
        default: return 0;
    }
}

/* Generic body getter for enum field 'payload' */
uint8_t const * CambrianInstruction_get_payload_body( CambrianInstruction_t const * self ) {
    uint8_t const * data = (uint8_t const *)self;
    uint64_t offset = 0;
    offset += 1; /* tag */
    return &data[offset];
}

/* Generic body setter for enum field 'payload' */
int CambrianInstruction_set_payload_body( CambrianInstruction_t * self, uint8_t const * body, uint64_t body_len ) {
    uint64_t expected_size = CambrianInstruction_get_payload_size( (CambrianInstruction_t const *)self );
    if( body_len != expected_size ) {
        return -1; /* Size mismatch */
    }

    uint8_t * data = (uint8_t *)self;
    uint64_t offset = 0;
    offset += 1; /* tag */
    memcpy( &data[offset], body, body_len );
    return 0; /* Success */
}

int CambrianInstruction_validate( uint8_t const * data, uint64_t data_len, uint64_t * out_size ) {
    uint64_t offset = 0;

    if( offset + 1 > data_len ) {
        return -1; /* Buffer too small for 'tag' */
    }
    offset += 1; /* tag */

    uint8_t tag_payload = (data[0]);
    uint64_t variant_size_payload;
    switch( tag_payload ) {
        case 1: variant_size_payload = 10; break;
        case 2: variant_size_payload = 12; break;
        case 4: variant_size_payload = 4; break;
        default: return -1; /* Invalid enum tag */
    }

    if( offset + variant_size_payload > data_len ) {
        return -1; /* Buffer too small for enum 'payload' */
    }
    offset += variant_size_payload;

    *out_size = offset;
    return 0;
}

