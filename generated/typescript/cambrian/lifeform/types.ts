/* Auto-generated TypeScript code */
/* WARNING: Do not modify this file directly. It is generated from ABI definitions. */

type __TnIrNode =
  | { readonly op: "zero" }
  | { readonly op: "const"; readonly value: bigint }
  | { readonly op: "field"; readonly param: string }
  | {
      readonly op: "add";
      readonly left: __TnIrNode;
      readonly right: __TnIrNode;
    }
  | {
      readonly op: "sub";
      readonly left: __TnIrNode;
      readonly right: __TnIrNode;
    }
  | {
      readonly op: "mul";
      readonly left: __TnIrNode;
      readonly right: __TnIrNode;
    }
  | {
      readonly op:
        | "div"
        | "mod"
        | "bitAnd"
        | "bitOr"
        | "bitXor"
        | "leftShift"
        | "rightShift";
      readonly left: __TnIrNode;
      readonly right: __TnIrNode;
    }
  | {
      readonly op: "align";
      readonly alignment: number;
      readonly node: __TnIrNode;
    }
  | {
      readonly op: "switch";
      readonly tag: string;
      readonly cases: readonly { readonly value: number; readonly node: __TnIrNode }[];
      readonly default?: __TnIrNode;
    }
  | {
      readonly op: "call";
      readonly typeName: string;
      readonly args: readonly { readonly name: string; readonly source: string }[];
    }
  | {
      readonly op: "sumOverArray";
      readonly count: __TnIrNode;
      readonly elementTypeName: string;
      readonly fieldName: string;
    };

type __TnIrContext = {
  params: Record<string, bigint>;
  buffer?: Uint8Array;
  typeName?: string;
};

type __TnValidateResult = {
  ok: boolean;
  code?: string;
  consumed?: bigint;
  params?: Record<string, bigint>;
};
type __TnEvalResult =
  | { ok: true; value: bigint }
  | { ok: false; code: string };
type __TnBuilderLike = { build(): Uint8Array };
type __TnStructFieldInput =
  | Uint8Array
  | __TnBuilderLike
  | { buffer?: Uint8Array }
  | { asUint8Array?: () => Uint8Array }
  | { bytes?: () => Uint8Array };
type __TnVariantDescriptor = {
  readonly name: string;
  readonly tag: number;
  readonly payloadSize: number | null;
  readonly payloadType?: string;
  readonly createPayloadBuilder?: () => unknown | null;
};
type __TnVariantSelectorResult<Parent> = {
  select(
    name: string
  ): { writePayload(payload: Uint8Array | __TnBuilderLike): { finish(): Parent } };
  finish(): Parent;
};
type __TnFamWriterResult<Parent> = {
  write(payload: Uint8Array | __TnBuilderLike): { finish(): Parent };
  finish(): Parent;
};
type __TnConsole = { warn?: (...args: unknown[]) => void };

const __tnWarnings = new Set<string>();
const __tnHasNativeBigInt = typeof BigInt === "function";
const __tnHasBigIntDataView =
  typeof DataView !== "undefined" &&
  typeof DataView.prototype.getBigInt64 === "function" &&
  typeof DataView.prototype.getBigUint64 === "function" &&
  typeof DataView.prototype.setBigInt64 === "function" &&
  typeof DataView.prototype.setBigUint64 === "function";
const __tnConsole: __TnConsole | undefined =
  typeof globalThis !== "undefined"
    ? (globalThis as { console?: __TnConsole }).console
    : undefined;

function __tnLogWarn(message: string): void {
  if (__tnConsole && typeof __tnConsole.warn === "function") {
    __tnConsole.warn(message);
  }
}

function __tnWarnOnce(message: string): void {
  if (!__tnWarnings.has(message)) {
    __tnWarnings.add(message);
    __tnLogWarn(message);
  }
}

function __tnResolveBuilderInput(
  input: Uint8Array | __TnBuilderLike,
  context: string
): Uint8Array {
  if (input instanceof Uint8Array) {
    return new Uint8Array(input);
  }
  if (input && typeof (input as __TnBuilderLike).build === "function") {
    const built = (input as __TnBuilderLike).build();
    if (!(built instanceof Uint8Array)) {
      throw new Error(`${context}: builder did not return Uint8Array`);
    }
    return new Uint8Array(built);
  }
  throw new Error(`${context}: expected Uint8Array or builder`);
}

function __tnResolveStructFieldInput(
  input: __TnStructFieldInput,
  context: string
): Uint8Array {
  if (
    input instanceof Uint8Array ||
    (input && typeof (input as __TnBuilderLike).build === "function")
  ) {
    return __tnResolveBuilderInput(input as Uint8Array | __TnBuilderLike, context);
  }
  if (input && typeof (input as { asUint8Array?: () => Uint8Array }).asUint8Array === "function") {
    const bytes = (input as { asUint8Array: () => Uint8Array }).asUint8Array();
    return new Uint8Array(bytes);
  }
  if (input && typeof (input as { bytes?: () => Uint8Array }).bytes === "function") {
    const bytes = (input as { bytes: () => Uint8Array }).bytes();
    return new Uint8Array(bytes);
  }
  if (input && (input as { buffer?: unknown }).buffer instanceof Uint8Array) {
    return new Uint8Array((input as { buffer: Uint8Array }).buffer);
  }
  throw new Error(`${context}: expected Uint8Array, builder, or view-like value`);
}

function __tnMaybeCallBuilder(ctor: unknown): unknown | null {
  if (!ctor) {
    return null;
  }
  const builderFn = (ctor as { builder?: () => unknown }).builder;
  return typeof builderFn === "function" ? builderFn() : null;
}

function __tnCreateVariantSelector<Parent, Descriptor extends __TnVariantDescriptor>(
  parent: Parent,
  descriptors: readonly Descriptor[],
  assign: (descriptor: Descriptor, payload: Uint8Array) => void
): __TnVariantSelectorResult<Parent> {
  return {
    select(name: string) {
      const descriptor = descriptors.find((variant) => variant.name === name);
      if (!descriptor) {
        throw new Error(`Unknown variant '${name}'`);
      }
      return {
        writePayload(payload: Uint8Array | __TnBuilderLike) {
          const bytes = __tnResolveBuilderInput(
            payload,
            `variant ${descriptor.name}`
          );
          if (
            descriptor.payloadSize !== null &&
            bytes.length !== descriptor.payloadSize
          ) {
            throw new Error(
              `Payload for ${descriptor.name} must be ${descriptor.payloadSize} bytes`
            );
          }
          assign(descriptor, bytes);
          return {
            finish(): Parent {
              return parent;
            },
          };
        },
      };
    },
    finish(): Parent {
      return parent;
    },
  };
}

function __tnCreateFamWriter<Parent>(
  parent: Parent,
  fieldName: string,
  assign: (bytes: Uint8Array) => void
): __TnFamWriterResult<Parent> {
  let hasWritten = false;
  return {
    write(payload: Uint8Array | __TnBuilderLike) {
      const bytes = __tnResolveBuilderInput(
        payload,
        `flexible array '${fieldName}'`
      );
      const copy = new Uint8Array(bytes);
      assign(copy);
      hasWritten = true;
      return {
        finish(): Parent {
          return parent;
        },
      };
    },
    finish(): Parent {
      if (!hasWritten) {
        throw new Error(
          `flexible array '${fieldName}' requires write() before finish()`
        );
      }
      return parent;
    },
  };
}

const __tnMask32 = __tnHasNativeBigInt
  ? (BigInt(1) << BigInt(32)) - BigInt(1)
  : 0xffffffff;
const __tnSignBit32 = __tnHasNativeBigInt
  ? BigInt(1) << BigInt(31)
  : 0x80000000;

function __tnToBigInt(value: number | bigint): bigint {
  if (__tnHasNativeBigInt) {
    return typeof value === "bigint" ? value : BigInt(value);
  }
  if (typeof value === "bigint") return value;
  if (!Number.isFinite(value)) {
    throw new Error("IR runtime received non-finite numeric input");
  }
  if (!Number.isSafeInteger(value)) {
    __tnWarnOnce(
      `[thru-net] Precision loss while polyfilling BigInt (value=${value})`
    );
  }
  return (value as unknown) as bigint;
}

function __tnBigIntToNumber(value: bigint, context: string): number {
  if (__tnHasNativeBigInt) {
    const converted = Number(value);
    if (!Number.isFinite(converted)) {
      throw new Error(`${context} overflowed Number range`);
    }
    return converted;
  }
  return value as unknown as number;
}

function __tnBigIntEquals(lhs: bigint, rhs: bigint): boolean {
  if (__tnHasNativeBigInt) return lhs === rhs;
  return (lhs as unknown as number) === (rhs as unknown as number);
}

function __tnBigIntGreaterThan(lhs: bigint, rhs: bigint): boolean {
  if (__tnHasNativeBigInt) return lhs > rhs;
  return (lhs as unknown as number) > (rhs as unknown as number);
}

function __tnPopcount(value: number | bigint): number {
  let v =
    typeof value === "bigint"
      ? Number(value & BigInt(0xffffffff))
      : Number(value) >>> 0;
  v = v - ((v >>> 1) & 0x55555555);
  v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
  return (((v + (v >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24;
}

function __tnRaiseIrError(code: string, message: string): never {
  const err = new Error(message);
  (err as { code?: string }).code = code;
  throw err;
}

function __tnCheckedAdd(lhs: bigint, rhs: bigint): bigint {
  if (__tnHasNativeBigInt) {
    const result = (lhs as bigint) + (rhs as bigint);
    if (result < BigInt(0)) {
      __tnRaiseIrError(
        "tn.ir.overflow",
        "IR runtime detected negative size via addition"
      );
    }
    return result;
  }
  const left = lhs as unknown as number;
  const right = rhs as unknown as number;
  const sum = left + right;
  if (sum < 0 || !Number.isFinite(sum)) {
    __tnRaiseIrError(
      "tn.ir.overflow",
      "IR runtime detected invalid addition result"
    );
  }
  if (!Number.isSafeInteger(sum)) {
    __tnWarnOnce("[thru-net] Precision loss while polyfilling BigInt addition");
  }
  return (sum as unknown) as bigint;
}

function __tnCheckedSub(lhs: bigint, rhs: bigint): bigint {
  if (__tnHasNativeBigInt) {
    const result = (lhs as bigint) - (rhs as bigint);
    if (result < BigInt(0)) {
      __tnRaiseIrError(
        "tn.ir.overflow",
        "IR runtime detected negative size via subtraction"
      );
    }
    return result;
  }
  const left = lhs as unknown as number;
  const right = rhs as unknown as number;
  const diff = left - right;
  if (diff < 0 || !Number.isFinite(diff)) {
    __tnRaiseIrError(
      "tn.ir.overflow",
      "IR runtime detected invalid subtraction result"
    );
  }
  if (!Number.isSafeInteger(diff)) {
    __tnWarnOnce("[thru-net] Precision loss while polyfilling BigInt subtraction");
  }
  return (diff as unknown) as bigint;
}

function __tnCheckedMul(lhs: bigint, rhs: bigint): bigint {
  if (__tnHasNativeBigInt) {
    const result = (lhs as bigint) * (rhs as bigint);
    if (result < BigInt(0)) {
      __tnRaiseIrError(
        "tn.ir.overflow",
        "IR runtime detected negative size via multiplication"
      );
    }
    return result;
  }
  const left = lhs as unknown as number;
  const right = rhs as unknown as number;
  const product = left * right;
  if (product < 0 || !Number.isFinite(product)) {
    __tnRaiseIrError(
      "tn.ir.overflow",
      "IR runtime detected invalid multiplication result"
    );
  }
  if (!Number.isSafeInteger(product)) {
    __tnWarnOnce(
      "[thru-net] Precision loss while polyfilling BigInt multiplication"
    );
  }
  return (product as unknown) as bigint;
}

function __tnCheckedDiv(lhs: bigint, rhs: bigint): bigint {
  if (__tnBigIntEquals(rhs, __tnToBigInt(0))) {
    __tnRaiseIrError("tn.ir.overflow", "IR runtime division by zero");
  }
  if (__tnHasNativeBigInt) return (lhs as bigint) / (rhs as bigint);
  const quotient = Math.floor((lhs as unknown as number) / (rhs as unknown as number));
  return (quotient as unknown) as bigint;
}

function __tnCheckedMod(lhs: bigint, rhs: bigint): bigint {
  if (__tnBigIntEquals(rhs, __tnToBigInt(0))) {
    __tnRaiseIrError("tn.ir.overflow", "IR runtime modulo by zero");
  }
  if (__tnHasNativeBigInt) return (lhs as bigint) % (rhs as bigint);
  return (((lhs as unknown as number) % (rhs as unknown as number)) as unknown) as bigint;
}

function __tnBitwise(
  lhs: bigint,
  rhs: bigint,
  op: "and" | "or" | "xor"
): bigint {
  if (__tnHasNativeBigInt) {
    if (op === "and") return (lhs as bigint) & (rhs as bigint);
    if (op === "or") return (lhs as bigint) | (rhs as bigint);
    return (lhs as bigint) ^ (rhs as bigint);
  }
  const left = lhs as unknown as number;
  const right = rhs as unknown as number;
  const maxU32 = 0xffffffff;
  if (
    !Number.isInteger(left) ||
    !Number.isInteger(right) ||
    left < 0 ||
    right < 0 ||
    left > maxU32 ||
    right > maxU32
  ) {
    __tnRaiseIrError(
      "tn.ir.overflow",
      "IR runtime bitwise operation requires BigInt for values outside u32 range"
    );
  }
  const result = op === "and" ? left & right : op === "or" ? left | right : left ^ right;
  return ((result >>> 0) as unknown) as bigint;
}

function __tnCheckedShift(
  lhs: bigint,
  rhs: bigint,
  direction: "left" | "right"
): bigint {
  const amount = __tnBigIntToNumber(rhs, "IR shift amount");
  if (amount < 0 || amount >= 64 || !Number.isInteger(amount)) {
    __tnRaiseIrError("tn.ir.overflow", "IR runtime invalid shift amount");
  }
  if (__tnHasNativeBigInt) {
    const shift = BigInt(amount);
    return direction === "left" ? (lhs as bigint) << shift : (lhs as bigint) >> shift;
  }
  const value = lhs as unknown as number;
  const result = direction === "left" ? value * 2 ** amount : Math.floor(value / 2 ** amount);
  if (!Number.isSafeInteger(result)) {
    __tnWarnOnce("[thru-net] Precision loss while polyfilling BigInt shift");
  }
  return (result as unknown) as bigint;
}

function __tnAlign(value: bigint, alignment: number): bigint {
  if (alignment <= 1) return value;
  const alignBig = __tnToBigInt(alignment);
  if (__tnHasNativeBigInt) {
    const remainder = value % alignBig;
    if (__tnBigIntEquals(remainder, __tnToBigInt(0))) {
      return value;
    }
    const delta = alignBig - remainder;
    return __tnCheckedAdd(value, delta);
  }
  const current = __tnBigIntToNumber(value, "IR align");
  const alignNum = alignment >>> 0;
  const remainder = current % alignNum;
  const next = remainder === 0 ? current : current + (alignNum - remainder);
  return __tnToBigInt(next);
}

function __tnSplitUint64(value: bigint): { high: number; low: number } {
  if (__tnHasNativeBigInt) {
    const low = Number(value & (__tnMask32 as bigint));
    const high = Number((value >> BigInt(32)) & (__tnMask32 as bigint));
    return { high, low };
  }
  const num = __tnBigIntToNumber(value, "DataView.setBigUint64");
  const low = num >>> 0;
  const high = Math.floor(num / 4294967296) >>> 0;
  return { high, low };
}

function __tnSplitInt64(value: bigint): { high: number; low: number } {
  if (__tnHasNativeBigInt) {
    const low = Number(value & (__tnMask32 as bigint));
    let high = Number((value >> BigInt(32)) & (__tnMask32 as bigint));
    if ((BigInt(high) & (__tnSignBit32 as bigint)) !== BigInt(0)) {
      high -= 0x100000000;
    }
    return { high, low };
  }
  const num = __tnBigIntToNumber(value, "DataView.setBigInt64");
  const low = num >>> 0;
  const high = Math.floor(num / 4294967296);
  return { high, low };
}

function __tnPolyfillReadUint64(
  view: DataView,
  offset: number,
  littleEndian: boolean
): bigint {
  const low = littleEndian
    ? view.getUint32(offset, true)
    : view.getUint32(offset + 4, false);
  const high = littleEndian
    ? view.getUint32(offset + 4, true)
    : view.getUint32(offset, false);
  if (__tnHasNativeBigInt) {
    return (BigInt(high) << BigInt(32)) | BigInt(low);
  }
  const value = high * 4294967296 + low;
  if (!Number.isSafeInteger(value)) {
    __tnWarnOnce(
      "[thru-net] Precision loss while polyfilling DataView.getBigUint64"
    );
  }
  return (value as unknown) as bigint;
}

function __tnPolyfillReadInt64(
  view: DataView,
  offset: number,
  littleEndian: boolean
): bigint {
  const low = littleEndian
    ? view.getUint32(offset, true)
    : view.getUint32(offset + 4, false);
  const high = littleEndian
    ? view.getInt32(offset + 4, true)
    : view.getInt32(offset, false);
  if (__tnHasNativeBigInt) {
    return (BigInt(high) << BigInt(32)) | BigInt(low);
  }
  const value = high * 4294967296 + low;
  if (!Number.isSafeInteger(value)) {
    __tnWarnOnce(
      "[thru-net] Precision loss while polyfilling DataView.getBigInt64"
    );
  }
  return (value as unknown) as bigint;
}

function __tnPolyfillWriteUint64(
  view: DataView,
  offset: number,
  value: bigint,
  littleEndian: boolean
): void {
  const parts = __tnSplitUint64(value);
  if (littleEndian) {
    view.setUint32(offset, parts.low, true);
    view.setUint32(offset + 4, parts.high, true);
  } else {
    view.setUint32(offset, parts.high, false);
    view.setUint32(offset + 4, parts.low, false);
  }
}

function __tnPolyfillWriteInt64(
  view: DataView,
  offset: number,
  value: bigint,
  littleEndian: boolean
): void {
  const parts = __tnSplitInt64(value);
  if (littleEndian) {
    view.setUint32(offset, parts.low >>> 0, true);
    view.setInt32(offset + 4, parts.high | 0, true);
  } else {
    view.setInt32(offset, parts.high | 0, false);
    view.setUint32(offset + 4, parts.low >>> 0, false);
  }
}

if (typeof DataView !== "undefined" && !__tnHasBigIntDataView) {
  const proto = DataView.prototype as unknown as Record<string, unknown>;
  if (typeof proto.getBigUint64 !== "function") {
    (proto as any).getBigUint64 = function (
      offset: number,
      littleEndian?: boolean
    ): bigint {
      __tnWarnOnce(
        "[thru-net] Polyfilling DataView.getBigUint64; precision may be lost"
      );
      return __tnPolyfillReadUint64(this, offset, !!littleEndian);
    };
  }
  if (typeof proto.getBigInt64 !== "function") {
    (proto as any).getBigInt64 = function (
      offset: number,
      littleEndian?: boolean
    ): bigint {
      __tnWarnOnce(
        "[thru-net] Polyfilling DataView.getBigInt64; precision may be lost"
      );
      return __tnPolyfillReadInt64(this, offset, !!littleEndian);
    };
  }
  if (typeof proto.setBigUint64 !== "function") {
    (proto as any).setBigUint64 = function (
      offset: number,
      value: bigint,
      littleEndian?: boolean
    ): void {
      __tnWarnOnce(
        "[thru-net] Polyfilling DataView.setBigUint64; precision may be lost"
      );
      __tnPolyfillWriteUint64(this, offset, value, !!littleEndian);
    };
  }
  if (typeof proto.setBigInt64 !== "function") {
    (proto as any).setBigInt64 = function (
      offset: number,
      value: bigint,
      littleEndian?: boolean
    ): void {
      __tnWarnOnce(
        "[thru-net] Polyfilling DataView.setBigInt64; precision may be lost"
      );
      __tnPolyfillWriteInt64(this, offset, value, !!littleEndian);
    };
  }
  if (!__tnHasNativeBigInt) {
    __tnWarnOnce(
      "[thru-net] BigInt is unavailable; falling back to lossy 64-bit polyfill"
    );
  }
}

const __tnFootprintRegistry: Record<
  string,
  (params: Record<string, bigint>) => bigint
> = {};
const __tnValidateRegistry: Record<
  string,
  (buffer: Uint8Array, params: Record<string, bigint>) => __TnValidateResult
> = {};
const __tnDynamicValidateRegistry: Record<
  string,
  (buffer: Uint8Array) => __TnValidateResult
> = {};

function __tnRegisterFootprint(
  typeName: string,
  fn: (params: Record<string, bigint>) => bigint
): void {
  __tnFootprintRegistry[typeName] = fn;
}

function __tnRegisterValidate(
  typeName: string,
  fn: (buffer: Uint8Array, params: Record<string, bigint>) => __TnValidateResult
): void {
  __tnValidateRegistry[typeName] = fn;
}

function __tnRegisterDynamicValidate(
  typeName: string,
  fn: (buffer: Uint8Array) => __TnValidateResult
): void {
  __tnDynamicValidateRegistry[typeName] = fn;
}

function __tnInvokeFootprint(
  typeName: string,
  params: Record<string, bigint>
): bigint {
  const fn = __tnFootprintRegistry[typeName];
  if (!fn) throw new Error(`IR runtime missing footprint for ${typeName}`);
  return fn(params);
}

function __tnInvokeValidate(
  typeName: string,
  buffer: Uint8Array,
  params: Record<string, bigint>
): __TnValidateResult {
  const fn = __tnValidateRegistry[typeName];
  if (!fn) throw new Error(`IR runtime missing validate helper for ${typeName}`);
  return fn(buffer, params);
}

function __tnInvokeDynamicValidate(
  typeName: string,
  buffer: Uint8Array
): __TnValidateResult {
  const fn = __tnDynamicValidateRegistry[typeName];
  if (!fn) throw new Error(`IR runtime missing dynamic validate helper for ${typeName}`);
  return fn(buffer);
}

function __tnEvalFootprint(node: __TnIrNode, ctx: __TnIrContext): bigint {
  return __tnEvalIrNode(node, ctx, __tnToBigInt(0));
}

function __tnTryEvalFootprint(
  node: __TnIrNode,
  ctx: __TnIrContext
): __TnEvalResult {
  return __tnTryEvalIr(node, ctx);
}

function __tnTryEvalIr(
  node: __TnIrNode,
  ctx: __TnIrContext
): __TnEvalResult {
  try {
    return { ok: true, value: __tnEvalIrNode(node, ctx, __tnToBigInt(0)) };
  } catch (err) {
    return { ok: false, code: __tnNormalizeIrError(err) };
  }
}

function __tnIsEvalError(result: __TnEvalResult): result is { ok: false; code: string } {
  return result.ok === false;
}

function __tnValidateIrTree(
  ir: { readonly typeName: string; readonly root: __TnIrNode },
  buffer: Uint8Array,
  params: Record<string, bigint>
): __TnValidateResult {
  const evalResult = __tnTryEvalIr(ir.root, {
    params,
    buffer,
    typeName: ir.typeName,
  });
  if (__tnIsEvalError(evalResult)) {
    return { ok: false, code: evalResult.code };
  }
  const required = evalResult.value;
  const available = __tnToBigInt(buffer.length);
  if (__tnBigIntGreaterThan(required, available)) {
    return { ok: false, code: "tn.buffer_too_small", consumed: required };
  }
  return { ok: true, consumed: required };
}

function __tnEvalIrNode(
  node: __TnIrNode,
  ctx: __TnIrContext,
  baseOffset: bigint
): bigint {
  switch (node.op) {
    case "zero":
      return __tnToBigInt(0);
    case "const":
      return node.value;
    case "field": {
      if (node.param === "__buffer_size" && ctx.buffer) {
        return __tnToBigInt(ctx.buffer.length);
      }
      const val = ctx.params[node.param];
      if (val === undefined) {
        const prefix = ctx.typeName ? `${ctx.typeName}: ` : "";
        __tnRaiseIrError(
          "tn.ir.missing_param",
          `${prefix}Missing IR parameter '${node.param}'`
        );
      }
      return val;
    }
    case "add":
      {
        const left = __tnEvalIrNode(node.left, ctx, baseOffset);
        const right = __tnEvalIrNode(
          node.right,
          ctx,
          __tnCheckedAdd(baseOffset, left)
        );
        return __tnCheckedAdd(left, right);
      }
    case "sub":
      return __tnCheckedSub(
        __tnEvalIrNode(node.left, ctx, baseOffset),
        __tnEvalIrNode(node.right, ctx, baseOffset)
      );
    case "mul":
      return __tnCheckedMul(
        __tnEvalIrNode(node.left, ctx, baseOffset),
        __tnEvalIrNode(node.right, ctx, baseOffset)
      );
    case "div":
      return __tnCheckedDiv(
        __tnEvalIrNode(node.left, ctx, baseOffset),
        __tnEvalIrNode(node.right, ctx, baseOffset)
      );
    case "mod":
      return __tnCheckedMod(
        __tnEvalIrNode(node.left, ctx, baseOffset),
        __tnEvalIrNode(node.right, ctx, baseOffset)
      );
    case "bitAnd":
      return __tnBitwise(
        __tnEvalIrNode(node.left, ctx, baseOffset),
        __tnEvalIrNode(node.right, ctx, baseOffset),
        "and"
      );
    case "bitOr":
      return __tnBitwise(
        __tnEvalIrNode(node.left, ctx, baseOffset),
        __tnEvalIrNode(node.right, ctx, baseOffset),
        "or"
      );
    case "bitXor":
      return __tnBitwise(
        __tnEvalIrNode(node.left, ctx, baseOffset),
        __tnEvalIrNode(node.right, ctx, baseOffset),
        "xor"
      );
    case "leftShift":
      return __tnCheckedShift(
        __tnEvalIrNode(node.left, ctx, baseOffset),
        __tnEvalIrNode(node.right, ctx, baseOffset),
        "left"
      );
    case "rightShift":
      return __tnCheckedShift(
        __tnEvalIrNode(node.left, ctx, baseOffset),
        __tnEvalIrNode(node.right, ctx, baseOffset),
        "right"
      );
    case "align":
      return __tnAlign(__tnEvalIrNode(node.node, ctx, baseOffset), node.alignment);
    case "switch": {
      const tagVal = ctx.params[node.tag];
      if (tagVal === undefined) {
        const prefix = ctx.typeName ? `${ctx.typeName}: ` : "";
        __tnRaiseIrError(
          "tn.ir.missing_param",
          `${prefix}Missing IR switch tag '${node.tag}'`
        );
      }
      const tagNumber = Number(tagVal);
      for (const caseNode of node.cases) {
        if (caseNode.value === tagNumber) {
          return __tnEvalIrNode(caseNode.node, ctx, baseOffset);
        }
      }
      if (node.default) return __tnEvalIrNode(node.default, ctx, baseOffset);
      __tnRaiseIrError(
        "tn.ir.invalid_tag",
        `Unhandled IR switch value ${tagNumber} for '${node.tag}'`
      );
    }
    case "call": {
      const nestedParams: Record<string, bigint> = Object.create(null);
      for (const arg of node.args) {
        const val = ctx.params[arg.source];
        if (val === undefined) {
          const prefix = ctx.typeName ? `${ctx.typeName}: ` : "";
          __tnRaiseIrError(
            "tn.ir.missing_param",
            `${prefix}Missing IR parameter '${arg.source}' for nested call`
          );
        }
        nestedParams[arg.name] = val;
      }
      if (ctx.buffer) {
        const nestedOffset = __tnBigIntToNumber(baseOffset, "IR nested offset");
        const nestedResult = __tnInvokeValidate(
          node.typeName,
          ctx.buffer.subarray(nestedOffset),
          nestedParams
        );
        if (!nestedResult.ok) {
          const nestedCode =
            nestedResult.code ?? `tn.ir.runtime_error: ${node.typeName}`;
          const prefixed = nestedCode.startsWith("tn.")
            ? nestedCode
            : `tn.ir.runtime_error: ${node.typeName} -> ${nestedCode}`;
          __tnRaiseIrError(
            prefixed,
            `Nested validator ${node.typeName} failed`
          );
        }
        if (nestedResult.consumed !== undefined) {
          return nestedResult.consumed;
        }
      }
      return __tnInvokeFootprint(node.typeName, nestedParams);
    }
    case "sumOverArray": {
      if (!ctx.buffer) {
        __tnRaiseIrError(
          "tn.ir.missing_buffer",
          `Jagged array '${node.fieldName}' requires buffer-backed validation`
        );
      }
      const count = __tnBigIntToNumber(
        __tnEvalIrNode(node.count, ctx, baseOffset),
        `Jagged array '${node.fieldName}' count`
      );
      let cursor = __tnBigIntToNumber(baseOffset, "IR jagged array offset");
      let total = __tnToBigInt(0);
      for (let i = 0; i < count; i++) {
        const result = __tnInvokeDynamicValidate(
          node.elementTypeName,
          ctx.buffer.subarray(cursor)
        );
        if (!result.ok || result.consumed === undefined) {
          const code = result.code ?? "tn.ir.runtime_error";
          __tnRaiseIrError(
            code,
            `Jagged array '${node.fieldName}' element ${i} failed validation`
          );
        }
        cursor += __tnBigIntToNumber(result.consumed, "IR jagged element size");
        total = __tnCheckedAdd(total, result.consumed);
      }
      return total;
    }
    default:
      __tnRaiseIrError(
        "tn.ir.runtime_error",
        `Unsupported IR node ${(node as { op: string }).op}`
      );
  }
}

function __tnNormalizeIrError(err: unknown): string {
  if (err && typeof err === "object" && "code" in err) {
    const maybeCode = (err as { code?: string }).code;
    if (typeof maybeCode === "string" && maybeCode.length > 0) {
      return maybeCode;
    }
  }
  const message =
    err && typeof err === "object" && "message" in err
      ? String((err as { message?: unknown }).message ?? "")
      : typeof err === "string"
      ? err
      : "";
  if (message.includes("Missing IR parameter")) return "tn.ir.missing_param";
  if (message.includes("Unhandled IR switch value")) return "tn.ir.invalid_tag";
  if (
    message.includes("invalid") ||
    message.includes("overflow") ||
    message.includes("negative size")
  ) {
    return "tn.ir.overflow";
  }
  if (message.length > 0) return `tn.ir.runtime_error: ${message}`;
  return "tn.ir.runtime_error";
}

/* ----- TYPE DEFINITION FOR Bytes32 ----- */

const __tn_ir_Bytes32 = {
  typeName: "Bytes32",
  root: { op: "const", value: 32n }
} as const;

export class Bytes32 {
  private view: DataView;
  private constructor(private buffer: Uint8Array) {
    this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  }

  private static readonly __tnElementSize = 1;
  private static readonly __tnElementCount: number | null = 32;

  get length(): number {
    const explicit = Bytes32.__tnElementCount;
    if (explicit !== null) {
      return explicit;
    }
    const stride = Bytes32.__tnElementSize;
    if (stride > 0) {
      return Math.floor(this.buffer.length / stride);
    }
    return this.buffer.length;
  }

  getElementBytes(index: number): Uint8Array {
    if (!Number.isInteger(index) || index < 0) {
      throw new RangeError('Bytes32::getElementBytes index must be a non-negative integer');
    }
    const stride = Bytes32.__tnElementSize;
    if (stride <= 0) {
      throw new Error('Bytes32::getElementBytes requires constant element size');
    }
    const start = index * stride;
    const end = start + stride;
    if (end > this.buffer.length) {
      throw new RangeError('Bytes32::getElementBytes out of bounds');
    }
    return this.buffer.subarray(start, end);
  }

  static from_array(buffer: Uint8Array): Bytes32 | null {
    if (!buffer || buffer.length === undefined) {
      return null;
    }
    const validation = Bytes32.validate(buffer);
    if (!validation.ok) {
      return null;
    }
    return new Bytes32(buffer);
  }

  asUint8Array(): Uint8Array {
    return new Uint8Array(this.buffer);
  }

  private static __tnFootprintInternal(__tnParams: Record<string, bigint>): bigint {
    return __tnEvalFootprint(__tn_ir_Bytes32.root, { params: __tnParams });
  }

  private static __tnValidateInternal(buffer: Uint8Array, __tnParams: Record<string, bigint>): { ok: boolean; code?: string; consumed?: bigint } {
    return __tnValidateIrTree(__tn_ir_Bytes32, buffer, __tnParams);
  }

  static __tnInvokeFootprint(__tnParams: Record<string, bigint>): bigint {
    return this.__tnFootprintInternal(__tnParams);
  }

  static __tnInvokeValidate(buffer: Uint8Array, __tnParams: Record<string, bigint>): __TnValidateResult {
    return this.__tnValidateInternal(buffer, __tnParams);
  }

  static footprintIr(): bigint {
    return this.__tnFootprintInternal(Object.create(null));
  }

  static footprint(): number {
    const irResult = this.footprintIr();
      const maxSafe = __tnToBigInt(Number.MAX_SAFE_INTEGER);
    if (__tnBigIntGreaterThan(irResult, maxSafe)) {
      throw new Error('footprint exceeds Number.MAX_SAFE_INTEGER for Bytes32');
    }
    return __tnBigIntToNumber(irResult, 'Bytes32::footprint');
  }

  static validate(buffer: Uint8Array, _opts?: { params?: never }): { ok: boolean; code?: string; consumed?: number } {
    if (buffer.length < 32) return { ok: false, code: "tn.buffer_too_small", consumed: 32 };
    return { ok: true, consumed: 32 };
  }

}

__tnRegisterFootprint("Bytes32", (params) => Bytes32.__tnInvokeFootprint(params));
__tnRegisterValidate("Bytes32", (buffer, params) => Bytes32.__tnInvokeValidate(buffer, params));
__tnRegisterDynamicValidate("Bytes32", (buffer) => { const result = Bytes32.validate(buffer); const params = (result as { params?: Record<string, bigint> }).params; return { ok: result.ok, code: result.code, consumed: result.consumed === undefined ? undefined : __tnToBigInt(result.consumed), params }; });

/* ----- TYPE DEFINITION FOR CambrianError ----- */

const __tn_ir_CambrianError = {
  typeName: "CambrianError",
  root: { op: "const", value: 8n }
} as const;

export class CambrianError {
  private view: DataView;

  private constructor(private buffer: Uint8Array) {
    this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  }

  static __tnCreateView(buffer: Uint8Array, opts?: { fieldContext?: Record<string, number | bigint> }): CambrianError {
    if (!buffer || buffer.length === undefined) throw new Error("CambrianError.__tnCreateView requires a Uint8Array");
    return new CambrianError(new Uint8Array(buffer));
  }

  static builder(): CambrianErrorBuilder {
    return new CambrianErrorBuilder();
  }

  static fromBuilder(builder: CambrianErrorBuilder): CambrianError | null {
    const buffer = builder.build();
    return CambrianError.from_array(buffer);
  }

  get_code(): bigint {
    const offset = 0;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_code(value: bigint): void {
    const offset = 0;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get code(): bigint {
    return this.get_code();
  }

  set code(value: bigint) {
    this.set_code(value);
  }

  private static __tnFootprintInternal(__tnParams: Record<string, bigint>): bigint {
    return __tnEvalFootprint(__tn_ir_CambrianError.root, { params: __tnParams });
  }

  private static __tnValidateInternal(buffer: Uint8Array, __tnParams: Record<string, bigint>): { ok: boolean; code?: string; consumed?: bigint } {
    return __tnValidateIrTree(__tn_ir_CambrianError, buffer, __tnParams);
  }

  static __tnInvokeFootprint(__tnParams: Record<string, bigint>): bigint {
    return this.__tnFootprintInternal(__tnParams);
  }

  static __tnInvokeValidate(buffer: Uint8Array, __tnParams: Record<string, bigint>): __TnValidateResult {
    return this.__tnValidateInternal(buffer, __tnParams);
  }

  static footprintIr(): bigint {
    return this.__tnFootprintInternal(Object.create(null));
  }

  static footprint(): number {
    const irResult = this.footprintIr();
      const maxSafe = __tnToBigInt(Number.MAX_SAFE_INTEGER);
    if (__tnBigIntGreaterThan(irResult, maxSafe)) {
      throw new Error('footprint exceeds Number.MAX_SAFE_INTEGER for CambrianError');
    }
    return __tnBigIntToNumber(irResult, 'CambrianError::footprint');
  }

  static validate(buffer: Uint8Array, _opts?: { params?: never }): { ok: boolean; code?: string; consumed?: number } {
    if (buffer.length < 8) return { ok: false, code: "tn.buffer_too_small", consumed: 8 };
    return { ok: true, consumed: 8 };
  }

  static new(code: bigint): CambrianError {
    const buffer = new Uint8Array(8);
    const view = new DataView(buffer.buffer);

    let offset = 0;
    view.setBigUint64(0, code, true); /* code (little-endian) */

    return new CambrianError(buffer);
  }

  static from_array(buffer: Uint8Array): CambrianError | null {
    if (!buffer || buffer.length === undefined) {
      return null;
    }
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    const validation = this.validate(buffer);
    if (!validation.ok) {
      return null;
    }
    return new CambrianError(buffer);
  }

}

export class CambrianErrorBuilder {
  private buffer: Uint8Array;
  private view: DataView;

  constructor() {
    this.buffer = new Uint8Array(8);
    this.view = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
  }

  set_code(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(0, cast, true);
    return this;
  }

  build(): Uint8Array {
    return this.buffer.slice();
  }

  buildInto(target: Uint8Array, offset = 0): Uint8Array {
    if (target.length - offset < this.buffer.length) throw new Error("target buffer too small");
    target.set(this.buffer, offset);
    return target;
  }

  finish(): CambrianError {
    const view = CambrianError.from_array(this.buffer.slice());
    if (!view) throw new Error("failed to build CambrianError");
    return view;
  }
}

__tnRegisterFootprint("CambrianError", (params) => CambrianError.__tnInvokeFootprint(params));
__tnRegisterValidate("CambrianError", (buffer, params) => CambrianError.__tnInvokeValidate(buffer, params));
__tnRegisterDynamicValidate("CambrianError", (buffer) => { const result = CambrianError.validate(buffer); const params = (result as { params?: Record<string, bigint> }).params; return { ok: result.ok, code: result.code, consumed: result.consumed === undefined ? undefined : __tnToBigInt(result.consumed), params }; });

/* ----- TYPE DEFINITION FOR CambrianOrganism ----- */

const __tn_ir_CambrianOrganism = {
  typeName: "CambrianOrganism",
  root: { op: "const", value: 264n }
} as const;

export class CambrianOrganism {
  private view: DataView;

  private constructor(private buffer: Uint8Array) {
    this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  }

  static __tnCreateView(buffer: Uint8Array, opts?: { fieldContext?: Record<string, number | bigint> }): CambrianOrganism {
    if (!buffer || buffer.length === undefined) throw new Error("CambrianOrganism.__tnCreateView requires a Uint8Array");
    return new CambrianOrganism(new Uint8Array(buffer));
  }

  static builder(): CambrianOrganismBuilder {
    return new CambrianOrganismBuilder();
  }

  static fromBuilder(builder: CambrianOrganismBuilder): CambrianOrganism | null {
    const buffer = builder.build();
    return CambrianOrganism.from_array(buffer);
  }

  get_magic(): number {
    const offset = 0;
    return this.view.getUint32(offset, true); /* little-endian */
  }

  set_magic(value: number): void {
    const offset = 0;
    this.view.setUint32(offset, value, true); /* little-endian */
  }

  get magic(): number {
    return this.get_magic();
  }

  set magic(value: number) {
    this.set_magic(value);
  }

  get_version(): number {
    const offset = 4;
    return this.view.getUint8(offset);
  }

  set_version(value: number): void {
    const offset = 4;
    this.view.setUint8(offset, value);
  }

  get version(): number {
    return this.get_version();
  }

  set version(value: number) {
    this.set_version(value);
  }

  get_status(): number {
    const offset = 5;
    return this.view.getUint8(offset);
  }

  set_status(value: number): void {
    const offset = 5;
    this.view.setUint8(offset, value);
  }

  get status(): number {
    return this.get_status();
  }

  set status(value: number) {
    this.set_status(value);
  }

  get_generation(): number {
    const offset = 6;
    return this.view.getUint16(offset, true); /* little-endian */
  }

  set_generation(value: number): void {
    const offset = 6;
    this.view.setUint16(offset, value, true); /* little-endian */
  }

  get generation(): number {
    return this.get_generation();
  }

  set generation(value: number) {
    this.set_generation(value);
  }

  get_controller(): Bytes32 {
    const offset = 8;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_controller(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 8;
    this.buffer.set(sourceBytes, offset);
  }

  get controller(): Bytes32 {
    return this.get_controller();
  }

  set controller(value: Bytes32) {
    this.set_controller(value);
  }

  get_parent_a(): Bytes32 {
    const offset = 40;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_parent_a(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 40;
    this.buffer.set(sourceBytes, offset);
  }

  get parent_a(): Bytes32 {
    return this.get_parent_a();
  }

  set parent_a(value: Bytes32) {
    this.set_parent_a(value);
  }

  get_parent_b(): Bytes32 {
    const offset = 72;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_parent_b(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 72;
    this.buffer.set(sourceBytes, offset);
  }

  get parent_b(): Bytes32 {
    return this.get_parent_b();
  }

  set parent_b(value: Bytes32) {
    this.set_parent_b(value);
  }

  get_genome(): Bytes32 {
    const offset = 104;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_genome(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 104;
    this.buffer.set(sourceBytes, offset);
  }

  get genome(): Bytes32 {
    return this.get_genome();
  }

  set genome(value: Bytes32) {
    this.set_genome(value);
  }

  get_lineage(): Bytes32 {
    const offset = 136;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_lineage(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 136;
    this.buffer.set(sourceBytes, offset);
  }

  get lineage(): Bytes32 {
    return this.get_lineage();
  }

  set lineage(value: Bytes32) {
    this.set_lineage(value);
  }

  get_memory(): Bytes32 {
    const offset = 168;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_memory(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 168;
    this.buffer.set(sourceBytes, offset);
  }

  get memory(): Bytes32 {
    return this.get_memory();
  }

  set memory(value: Bytes32) {
    this.set_memory(value);
  }

  get_born_slot(): bigint {
    const offset = 200;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_born_slot(value: bigint): void {
    const offset = 200;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get born_slot(): bigint {
    return this.get_born_slot();
  }

  set born_slot(value: bigint) {
    this.set_born_slot(value);
  }

  get_last_pulse_slot(): bigint {
    const offset = 208;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_last_pulse_slot(value: bigint): void {
    const offset = 208;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get last_pulse_slot(): bigint {
    return this.get_last_pulse_slot();
  }

  set last_pulse_slot(value: bigint) {
    this.set_last_pulse_slot(value);
  }

  get_age(): bigint {
    const offset = 216;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_age(value: bigint): void {
    const offset = 216;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get age(): bigint {
    return this.get_age();
  }

  set age(value: bigint) {
    this.set_age(value);
  }

  get_energy(): bigint {
    const offset = 224;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_energy(value: bigint): void {
    const offset = 224;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get energy(): bigint {
    return this.get_energy();
  }

  set energy(value: bigint) {
    this.set_energy(value);
  }

  get_vitality(): bigint {
    const offset = 232;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_vitality(value: bigint): void {
    const offset = 232;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get vitality(): bigint {
    return this.get_vitality();
  }

  set vitality(value: bigint) {
    this.set_vitality(value);
  }

  get_pulse_count(): bigint {
    const offset = 240;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_pulse_count(value: bigint): void {
    const offset = 240;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get pulse_count(): bigint {
    return this.get_pulse_count();
  }

  set pulse_count(value: bigint) {
    this.set_pulse_count(value);
  }

  get_encounter_count(): bigint {
    const offset = 248;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_encounter_count(value: bigint): void {
    const offset = 248;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get encounter_count(): bigint {
    return this.get_encounter_count();
  }

  set encounter_count(value: bigint) {
    this.set_encounter_count(value);
  }

  get_offspring_count(): bigint {
    const offset = 256;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_offspring_count(value: bigint): void {
    const offset = 256;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get offspring_count(): bigint {
    return this.get_offspring_count();
  }

  set offspring_count(value: bigint) {
    this.set_offspring_count(value);
  }

  private static __tnFootprintInternal(__tnParams: Record<string, bigint>): bigint {
    return __tnEvalFootprint(__tn_ir_CambrianOrganism.root, { params: __tnParams });
  }

  private static __tnValidateInternal(buffer: Uint8Array, __tnParams: Record<string, bigint>): { ok: boolean; code?: string; consumed?: bigint } {
    return __tnValidateIrTree(__tn_ir_CambrianOrganism, buffer, __tnParams);
  }

  static __tnInvokeFootprint(__tnParams: Record<string, bigint>): bigint {
    return this.__tnFootprintInternal(__tnParams);
  }

  static __tnInvokeValidate(buffer: Uint8Array, __tnParams: Record<string, bigint>): __TnValidateResult {
    return this.__tnValidateInternal(buffer, __tnParams);
  }

  static footprintIr(): bigint {
    return this.__tnFootprintInternal(Object.create(null));
  }

  static footprint(): number {
    const irResult = this.footprintIr();
      const maxSafe = __tnToBigInt(Number.MAX_SAFE_INTEGER);
    if (__tnBigIntGreaterThan(irResult, maxSafe)) {
      throw new Error('footprint exceeds Number.MAX_SAFE_INTEGER for CambrianOrganism');
    }
    return __tnBigIntToNumber(irResult, 'CambrianOrganism::footprint');
  }

  static validate(buffer: Uint8Array, _opts?: { params?: never }): { ok: boolean; code?: string; consumed?: number } {
    if (buffer.length < 264) return { ok: false, code: "tn.buffer_too_small", consumed: 264 };
    return { ok: true, consumed: 264 };
  }

  static from_array(buffer: Uint8Array): CambrianOrganism | null {
    if (!buffer || buffer.length === undefined) {
      return null;
    }
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    const validation = this.validate(buffer);
    if (!validation.ok) {
      return null;
    }
    return new CambrianOrganism(buffer);
  }

}

export class CambrianOrganismBuilder {
  private buffer: Uint8Array;
  private view: DataView;

  constructor() {
    this.buffer = new Uint8Array(264);
    this.view = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
  }

  set_magic(value: number): this {
    this.view.setUint32(0, value, true);
    return this;
  }

  set_version(value: number): this {
    this.view.setUint8(4, value);
    return this;
  }

  set_status(value: number): this {
    this.view.setUint8(5, value);
    return this;
  }

  set_generation(value: number): this {
    this.view.setUint16(6, value, true);
    return this;
  }

  set_controller(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("controller expects 32 bytes");
    this.buffer.set(value, 8);
    return this;
  }

  set_parent_a(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("parent_a expects 32 bytes");
    this.buffer.set(value, 40);
    return this;
  }

  set_parent_b(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("parent_b expects 32 bytes");
    this.buffer.set(value, 72);
    return this;
  }

  set_genome(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("genome expects 32 bytes");
    this.buffer.set(value, 104);
    return this;
  }

  set_lineage(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("lineage expects 32 bytes");
    this.buffer.set(value, 136);
    return this;
  }

  set_memory(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("memory expects 32 bytes");
    this.buffer.set(value, 168);
    return this;
  }

  set_born_slot(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(200, cast, true);
    return this;
  }

  set_last_pulse_slot(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(208, cast, true);
    return this;
  }

  set_age(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(216, cast, true);
    return this;
  }

  set_energy(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(224, cast, true);
    return this;
  }

  set_vitality(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(232, cast, true);
    return this;
  }

  set_pulse_count(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(240, cast, true);
    return this;
  }

  set_encounter_count(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(248, cast, true);
    return this;
  }

  set_offspring_count(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(256, cast, true);
    return this;
  }

  build(): Uint8Array {
    return this.buffer.slice();
  }

  buildInto(target: Uint8Array, offset = 0): Uint8Array {
    if (target.length - offset < this.buffer.length) throw new Error("target buffer too small");
    target.set(this.buffer, offset);
    return target;
  }

  finish(): CambrianOrganism {
    const view = CambrianOrganism.from_array(this.buffer.slice());
    if (!view) throw new Error("failed to build CambrianOrganism");
    return view;
  }
}

__tnRegisterFootprint("CambrianOrganism", (params) => CambrianOrganism.__tnInvokeFootprint(params));
__tnRegisterValidate("CambrianOrganism", (buffer, params) => CambrianOrganism.__tnInvokeValidate(buffer, params));
__tnRegisterDynamicValidate("CambrianOrganism", (buffer) => { const result = CambrianOrganism.validate(buffer); const params = (result as { params?: Record<string, bigint> }).params; return { ok: result.ok, code: result.code, consumed: result.consumed === undefined ? undefined : __tnToBigInt(result.consumed), params }; });

/* ----- TYPE DEFINITION FOR EncounterArgs ----- */

const __tn_ir_EncounterArgs = {
  typeName: "EncounterArgs",
  root: { op: "const", value: 12n }
} as const;

export class EncounterArgs {
  private view: DataView;

  private constructor(private buffer: Uint8Array) {
    this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  }

  static __tnCreateView(buffer: Uint8Array, opts?: { fieldContext?: Record<string, number | bigint> }): EncounterArgs {
    if (!buffer || buffer.length === undefined) throw new Error("EncounterArgs.__tnCreateView requires a Uint8Array");
    return new EncounterArgs(new Uint8Array(buffer));
  }

  static builder(): EncounterArgsBuilder {
    return new EncounterArgsBuilder();
  }

  static fromBuilder(builder: EncounterArgsBuilder): EncounterArgs | null {
    const buffer = builder.build();
    return EncounterArgs.from_array(buffer);
  }

  get_actor_account_idx(): number {
    const offset = 0;
    return this.view.getUint16(offset, true); /* little-endian */
  }

  set_actor_account_idx(value: number): void {
    const offset = 0;
    this.view.setUint16(offset, value, true); /* little-endian */
  }

  get actor_account_idx(): number {
    return this.get_actor_account_idx();
  }

  set actor_account_idx(value: number) {
    this.set_actor_account_idx(value);
  }

  get_donor_account_idx(): number {
    const offset = 2;
    return this.view.getUint16(offset, true); /* little-endian */
  }

  set_donor_account_idx(value: number): void {
    const offset = 2;
    this.view.setUint16(offset, value, true); /* little-endian */
  }

  get donor_account_idx(): number {
    return this.get_donor_account_idx();
  }

  set donor_account_idx(value: number) {
    this.set_donor_account_idx(value);
  }

  get_catalyst(): bigint {
    const offset = 4;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_catalyst(value: bigint): void {
    const offset = 4;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get catalyst(): bigint {
    return this.get_catalyst();
  }

  set catalyst(value: bigint) {
    this.set_catalyst(value);
  }

  private static __tnFootprintInternal(__tnParams: Record<string, bigint>): bigint {
    return __tnEvalFootprint(__tn_ir_EncounterArgs.root, { params: __tnParams });
  }

  private static __tnValidateInternal(buffer: Uint8Array, __tnParams: Record<string, bigint>): { ok: boolean; code?: string; consumed?: bigint } {
    return __tnValidateIrTree(__tn_ir_EncounterArgs, buffer, __tnParams);
  }

  static __tnInvokeFootprint(__tnParams: Record<string, bigint>): bigint {
    return this.__tnFootprintInternal(__tnParams);
  }

  static __tnInvokeValidate(buffer: Uint8Array, __tnParams: Record<string, bigint>): __TnValidateResult {
    return this.__tnValidateInternal(buffer, __tnParams);
  }

  static footprintIr(): bigint {
    return this.__tnFootprintInternal(Object.create(null));
  }

  static footprint(): number {
    const irResult = this.footprintIr();
      const maxSafe = __tnToBigInt(Number.MAX_SAFE_INTEGER);
    if (__tnBigIntGreaterThan(irResult, maxSafe)) {
      throw new Error('footprint exceeds Number.MAX_SAFE_INTEGER for EncounterArgs');
    }
    return __tnBigIntToNumber(irResult, 'EncounterArgs::footprint');
  }

  static validate(buffer: Uint8Array, _opts?: { params?: never }): { ok: boolean; code?: string; consumed?: number } {
    if (buffer.length < 12) return { ok: false, code: "tn.buffer_too_small", consumed: 12 };
    return { ok: true, consumed: 12 };
  }

  static new(actor_account_idx: number, donor_account_idx: number, catalyst: bigint): EncounterArgs {
    const buffer = new Uint8Array(12);
    const view = new DataView(buffer.buffer);

    let offset = 0;
    view.setUint16(0, actor_account_idx, true); /* actor_account_idx (little-endian) */
    view.setUint16(2, donor_account_idx, true); /* donor_account_idx (little-endian) */
    view.setBigUint64(4, catalyst, true); /* catalyst (little-endian) */

    return new EncounterArgs(buffer);
  }

  static from_array(buffer: Uint8Array): EncounterArgs | null {
    if (!buffer || buffer.length === undefined) {
      return null;
    }
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    const validation = this.validate(buffer);
    if (!validation.ok) {
      return null;
    }
    return new EncounterArgs(buffer);
  }

}

export class EncounterArgsBuilder {
  private buffer: Uint8Array;
  private view: DataView;

  constructor() {
    this.buffer = new Uint8Array(12);
    this.view = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
  }

  set_actor_account_idx(value: number): this {
    this.view.setUint16(0, value, true);
    return this;
  }

  set_donor_account_idx(value: number): this {
    this.view.setUint16(2, value, true);
    return this;
  }

  set_catalyst(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(4, cast, true);
    return this;
  }

  build(): Uint8Array {
    return this.buffer.slice();
  }

  buildInto(target: Uint8Array, offset = 0): Uint8Array {
    if (target.length - offset < this.buffer.length) throw new Error("target buffer too small");
    target.set(this.buffer, offset);
    return target;
  }

  finish(): EncounterArgs {
    const view = EncounterArgs.from_array(this.buffer.slice());
    if (!view) throw new Error("failed to build EncounterArgs");
    return view;
  }
}

__tnRegisterFootprint("EncounterArgs", (params) => EncounterArgs.__tnInvokeFootprint(params));
__tnRegisterValidate("EncounterArgs", (buffer, params) => EncounterArgs.__tnInvokeValidate(buffer, params));
__tnRegisterDynamicValidate("EncounterArgs", (buffer) => { const result = EncounterArgs.validate(buffer); const params = (result as { params?: Record<string, bigint> }).params; return { ok: result.ok, code: result.code, consumed: result.consumed === undefined ? undefined : __tnToBigInt(result.consumed), params }; });

/* ----- TYPE DEFINITION FOR EncounterEvent ----- */

const __tn_ir_EncounterEvent = {
  typeName: "EncounterEvent",
  root: { op: "const", value: 156n }
} as const;

export class EncounterEvent {
  private view: DataView;

  private constructor(private buffer: Uint8Array) {
    this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  }

  static __tnCreateView(buffer: Uint8Array, opts?: { fieldContext?: Record<string, number | bigint> }): EncounterEvent {
    if (!buffer || buffer.length === undefined) throw new Error("EncounterEvent.__tnCreateView requires a Uint8Array");
    return new EncounterEvent(new Uint8Array(buffer));
  }

  static builder(): EncounterEventBuilder {
    return new EncounterEventBuilder();
  }

  static fromBuilder(builder: EncounterEventBuilder): EncounterEvent | null {
    const buffer = builder.build();
    return EncounterEvent.from_array(buffer);
  }

  get_actor(): Bytes32 {
    const offset = 0;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_actor(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 0;
    this.buffer.set(sourceBytes, offset);
  }

  get actor(): Bytes32 {
    return this.get_actor();
  }

  set actor(value: Bytes32) {
    this.set_actor(value);
  }

  get_donor(): Bytes32 {
    const offset = 32;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_donor(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 32;
    this.buffer.set(sourceBytes, offset);
  }

  get donor(): Bytes32 {
    return this.get_donor();
  }

  set donor(value: Bytes32) {
    this.set_donor(value);
  }

  get_compatibility(): number {
    const offset = 64;
    return this.view.getUint16(offset, true); /* little-endian */
  }

  set_compatibility(value: number): void {
    const offset = 64;
    this.view.setUint16(offset, value, true); /* little-endian */
  }

  get compatibility(): number {
    return this.get_compatibility();
  }

  set compatibility(value: number) {
    this.set_compatibility(value);
  }

  get_outcome(): number {
    const offset = 66;
    return this.view.getUint8(offset);
  }

  set_outcome(value: number): void {
    const offset = 66;
    this.view.setUint8(offset, value);
  }

  get outcome(): number {
    return this.get_outcome();
  }

  set outcome(value: number) {
    this.set_outcome(value);
  }

  get_gene_transferred(): number {
    const offset = 67;
    return this.view.getUint8(offset);
  }

  set_gene_transferred(value: number): void {
    const offset = 67;
    this.view.setUint8(offset, value);
  }

  get gene_transferred(): number {
    return this.get_gene_transferred();
  }

  set gene_transferred(value: number) {
    this.set_gene_transferred(value);
  }

  get_energy_before(): bigint {
    const offset = 68;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_energy_before(value: bigint): void {
    const offset = 68;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get energy_before(): bigint {
    return this.get_energy_before();
  }

  set energy_before(value: bigint) {
    this.set_energy_before(value);
  }

  get_energy_after(): bigint {
    const offset = 76;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_energy_after(value: bigint): void {
    const offset = 76;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get energy_after(): bigint {
    return this.get_energy_after();
  }

  set energy_after(value: bigint) {
    this.set_energy_after(value);
  }

  get_encounter_count(): bigint {
    const offset = 84;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_encounter_count(value: bigint): void {
    const offset = 84;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get encounter_count(): bigint {
    return this.get_encounter_count();
  }

  set encounter_count(value: bigint) {
    this.set_encounter_count(value);
  }

  get_genome(): Bytes32 {
    const offset = 92;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_genome(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 92;
    this.buffer.set(sourceBytes, offset);
  }

  get genome(): Bytes32 {
    return this.get_genome();
  }

  set genome(value: Bytes32) {
    this.set_genome(value);
  }

  get_memory(): Bytes32 {
    const offset = 124;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_memory(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 124;
    this.buffer.set(sourceBytes, offset);
  }

  get memory(): Bytes32 {
    return this.get_memory();
  }

  set memory(value: Bytes32) {
    this.set_memory(value);
  }

  private static __tnFootprintInternal(__tnParams: Record<string, bigint>): bigint {
    return __tnEvalFootprint(__tn_ir_EncounterEvent.root, { params: __tnParams });
  }

  private static __tnValidateInternal(buffer: Uint8Array, __tnParams: Record<string, bigint>): { ok: boolean; code?: string; consumed?: bigint } {
    return __tnValidateIrTree(__tn_ir_EncounterEvent, buffer, __tnParams);
  }

  static __tnInvokeFootprint(__tnParams: Record<string, bigint>): bigint {
    return this.__tnFootprintInternal(__tnParams);
  }

  static __tnInvokeValidate(buffer: Uint8Array, __tnParams: Record<string, bigint>): __TnValidateResult {
    return this.__tnValidateInternal(buffer, __tnParams);
  }

  static footprintIr(): bigint {
    return this.__tnFootprintInternal(Object.create(null));
  }

  static footprint(): number {
    const irResult = this.footprintIr();
      const maxSafe = __tnToBigInt(Number.MAX_SAFE_INTEGER);
    if (__tnBigIntGreaterThan(irResult, maxSafe)) {
      throw new Error('footprint exceeds Number.MAX_SAFE_INTEGER for EncounterEvent');
    }
    return __tnBigIntToNumber(irResult, 'EncounterEvent::footprint');
  }

  static validate(buffer: Uint8Array, _opts?: { params?: never }): { ok: boolean; code?: string; consumed?: number } {
    if (buffer.length < 156) return { ok: false, code: "tn.buffer_too_small", consumed: 156 };
    return { ok: true, consumed: 156 };
  }

  static from_array(buffer: Uint8Array): EncounterEvent | null {
    if (!buffer || buffer.length === undefined) {
      return null;
    }
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    const validation = this.validate(buffer);
    if (!validation.ok) {
      return null;
    }
    return new EncounterEvent(buffer);
  }

}

export class EncounterEventBuilder {
  private buffer: Uint8Array;
  private view: DataView;

  constructor() {
    this.buffer = new Uint8Array(156);
    this.view = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
  }

  set_actor(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("actor expects 32 bytes");
    this.buffer.set(value, 0);
    return this;
  }

  set_donor(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("donor expects 32 bytes");
    this.buffer.set(value, 32);
    return this;
  }

  set_compatibility(value: number): this {
    this.view.setUint16(64, value, true);
    return this;
  }

  set_outcome(value: number): this {
    this.view.setUint8(66, value);
    return this;
  }

  set_gene_transferred(value: number): this {
    this.view.setUint8(67, value);
    return this;
  }

  set_energy_before(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(68, cast, true);
    return this;
  }

  set_energy_after(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(76, cast, true);
    return this;
  }

  set_encounter_count(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(84, cast, true);
    return this;
  }

  set_genome(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("genome expects 32 bytes");
    this.buffer.set(value, 92);
    return this;
  }

  set_memory(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("memory expects 32 bytes");
    this.buffer.set(value, 124);
    return this;
  }

  build(): Uint8Array {
    return this.buffer.slice();
  }

  buildInto(target: Uint8Array, offset = 0): Uint8Array {
    if (target.length - offset < this.buffer.length) throw new Error("target buffer too small");
    target.set(this.buffer, offset);
    return target;
  }

  finish(): EncounterEvent {
    const view = EncounterEvent.from_array(this.buffer.slice());
    if (!view) throw new Error("failed to build EncounterEvent");
    return view;
  }
}

__tnRegisterFootprint("EncounterEvent", (params) => EncounterEvent.__tnInvokeFootprint(params));
__tnRegisterValidate("EncounterEvent", (buffer, params) => EncounterEvent.__tnInvokeValidate(buffer, params));
__tnRegisterDynamicValidate("EncounterEvent", (buffer) => { const result = EncounterEvent.validate(buffer); const params = (result as { params?: Record<string, bigint> }).params; return { ok: result.ok, code: result.code, consumed: result.consumed === undefined ? undefined : __tnToBigInt(result.consumed), params }; });

/* ----- TYPE DEFINITION FOR PulseArgs ----- */

const __tn_ir_PulseArgs = {
  typeName: "PulseArgs",
  root: { op: "const", value: 10n }
} as const;

export class PulseArgs {
  private view: DataView;

  private constructor(private buffer: Uint8Array) {
    this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  }

  static __tnCreateView(buffer: Uint8Array, opts?: { fieldContext?: Record<string, number | bigint> }): PulseArgs {
    if (!buffer || buffer.length === undefined) throw new Error("PulseArgs.__tnCreateView requires a Uint8Array");
    return new PulseArgs(new Uint8Array(buffer));
  }

  static builder(): PulseArgsBuilder {
    return new PulseArgsBuilder();
  }

  static fromBuilder(builder: PulseArgsBuilder): PulseArgs | null {
    const buffer = builder.build();
    return PulseArgs.from_array(buffer);
  }

  get_organism_account_idx(): number {
    const offset = 0;
    return this.view.getUint16(offset, true); /* little-endian */
  }

  set_organism_account_idx(value: number): void {
    const offset = 0;
    this.view.setUint16(offset, value, true); /* little-endian */
  }

  get organism_account_idx(): number {
    return this.get_organism_account_idx();
  }

  set organism_account_idx(value: number) {
    this.set_organism_account_idx(value);
  }

  get_catalyst(): bigint {
    const offset = 2;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_catalyst(value: bigint): void {
    const offset = 2;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get catalyst(): bigint {
    return this.get_catalyst();
  }

  set catalyst(value: bigint) {
    this.set_catalyst(value);
  }

  private static __tnFootprintInternal(__tnParams: Record<string, bigint>): bigint {
    return __tnEvalFootprint(__tn_ir_PulseArgs.root, { params: __tnParams });
  }

  private static __tnValidateInternal(buffer: Uint8Array, __tnParams: Record<string, bigint>): { ok: boolean; code?: string; consumed?: bigint } {
    return __tnValidateIrTree(__tn_ir_PulseArgs, buffer, __tnParams);
  }

  static __tnInvokeFootprint(__tnParams: Record<string, bigint>): bigint {
    return this.__tnFootprintInternal(__tnParams);
  }

  static __tnInvokeValidate(buffer: Uint8Array, __tnParams: Record<string, bigint>): __TnValidateResult {
    return this.__tnValidateInternal(buffer, __tnParams);
  }

  static footprintIr(): bigint {
    return this.__tnFootprintInternal(Object.create(null));
  }

  static footprint(): number {
    const irResult = this.footprintIr();
      const maxSafe = __tnToBigInt(Number.MAX_SAFE_INTEGER);
    if (__tnBigIntGreaterThan(irResult, maxSafe)) {
      throw new Error('footprint exceeds Number.MAX_SAFE_INTEGER for PulseArgs');
    }
    return __tnBigIntToNumber(irResult, 'PulseArgs::footprint');
  }

  static validate(buffer: Uint8Array, _opts?: { params?: never }): { ok: boolean; code?: string; consumed?: number } {
    if (buffer.length < 10) return { ok: false, code: "tn.buffer_too_small", consumed: 10 };
    return { ok: true, consumed: 10 };
  }

  static new(organism_account_idx: number, catalyst: bigint): PulseArgs {
    const buffer = new Uint8Array(10);
    const view = new DataView(buffer.buffer);

    let offset = 0;
    view.setUint16(0, organism_account_idx, true); /* organism_account_idx (little-endian) */
    view.setBigUint64(2, catalyst, true); /* catalyst (little-endian) */

    return new PulseArgs(buffer);
  }

  static from_array(buffer: Uint8Array): PulseArgs | null {
    if (!buffer || buffer.length === undefined) {
      return null;
    }
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    const validation = this.validate(buffer);
    if (!validation.ok) {
      return null;
    }
    return new PulseArgs(buffer);
  }

}

export class PulseArgsBuilder {
  private buffer: Uint8Array;
  private view: DataView;

  constructor() {
    this.buffer = new Uint8Array(10);
    this.view = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
  }

  set_organism_account_idx(value: number): this {
    this.view.setUint16(0, value, true);
    return this;
  }

  set_catalyst(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(2, cast, true);
    return this;
  }

  build(): Uint8Array {
    return this.buffer.slice();
  }

  buildInto(target: Uint8Array, offset = 0): Uint8Array {
    if (target.length - offset < this.buffer.length) throw new Error("target buffer too small");
    target.set(this.buffer, offset);
    return target;
  }

  finish(): PulseArgs {
    const view = PulseArgs.from_array(this.buffer.slice());
    if (!view) throw new Error("failed to build PulseArgs");
    return view;
  }
}

__tnRegisterFootprint("PulseArgs", (params) => PulseArgs.__tnInvokeFootprint(params));
__tnRegisterValidate("PulseArgs", (buffer, params) => PulseArgs.__tnInvokeValidate(buffer, params));
__tnRegisterDynamicValidate("PulseArgs", (buffer) => { const result = PulseArgs.validate(buffer); const params = (result as { params?: Record<string, bigint> }).params; return { ok: result.ok, code: result.code, consumed: result.consumed === undefined ? undefined : __tnToBigInt(result.consumed), params }; });

/* ----- TYPE DEFINITION FOR PulseEvent ----- */

const __tn_ir_PulseEvent = {
  typeName: "PulseEvent",
  root: { op: "const", value: 139n }
} as const;

export class PulseEvent {
  private view: DataView;

  private constructor(private buffer: Uint8Array) {
    this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  }

  static __tnCreateView(buffer: Uint8Array, opts?: { fieldContext?: Record<string, number | bigint> }): PulseEvent {
    if (!buffer || buffer.length === undefined) throw new Error("PulseEvent.__tnCreateView requires a Uint8Array");
    return new PulseEvent(new Uint8Array(buffer));
  }

  static builder(): PulseEventBuilder {
    return new PulseEventBuilder();
  }

  static fromBuilder(builder: PulseEventBuilder): PulseEvent | null {
    const buffer = builder.build();
    return PulseEvent.from_array(buffer);
  }

  get_organism(): Bytes32 {
    const offset = 0;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_organism(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 0;
    this.buffer.set(sourceBytes, offset);
  }

  get organism(): Bytes32 {
    return this.get_organism();
  }

  set organism(value: Bytes32) {
    this.set_organism(value);
  }

  get_slot(): bigint {
    const offset = 32;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_slot(value: bigint): void {
    const offset = 32;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get slot(): bigint {
    return this.get_slot();
  }

  set slot(value: bigint) {
    this.set_slot(value);
  }

  get_age(): bigint {
    const offset = 40;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_age(value: bigint): void {
    const offset = 40;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get age(): bigint {
    return this.get_age();
  }

  set age(value: bigint) {
    this.set_age(value);
  }

  get_energy_before(): bigint {
    const offset = 48;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_energy_before(value: bigint): void {
    const offset = 48;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get energy_before(): bigint {
    return this.get_energy_before();
  }

  set energy_before(value: bigint) {
    this.set_energy_before(value);
  }

  get_energy_after(): bigint {
    const offset = 56;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_energy_after(value: bigint): void {
    const offset = 56;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get energy_after(): bigint {
    return this.get_energy_after();
  }

  set energy_after(value: bigint) {
    this.set_energy_after(value);
  }

  get_vitality(): bigint {
    const offset = 64;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_vitality(value: bigint): void {
    const offset = 64;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get vitality(): bigint {
    return this.get_vitality();
  }

  set vitality(value: bigint) {
    this.set_vitality(value);
  }

  get_status(): number {
    const offset = 72;
    return this.view.getUint8(offset);
  }

  set_status(value: number): void {
    const offset = 72;
    this.view.setUint8(offset, value);
  }

  get status(): number {
    return this.get_status();
  }

  set status(value: number) {
    this.set_status(value);
  }

  get_mutation_bit(): number {
    const offset = 73;
    return this.view.getUint16(offset, true); /* little-endian */
  }

  set_mutation_bit(value: number): void {
    const offset = 73;
    this.view.setUint16(offset, value, true); /* little-endian */
  }

  get mutation_bit(): number {
    return this.get_mutation_bit();
  }

  set mutation_bit(value: number) {
    this.set_mutation_bit(value);
  }

  get_genome(): Bytes32 {
    const offset = 75;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_genome(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 75;
    this.buffer.set(sourceBytes, offset);
  }

  get genome(): Bytes32 {
    return this.get_genome();
  }

  set genome(value: Bytes32) {
    this.set_genome(value);
  }

  get_lineage(): Bytes32 {
    const offset = 107;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_lineage(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 107;
    this.buffer.set(sourceBytes, offset);
  }

  get lineage(): Bytes32 {
    return this.get_lineage();
  }

  set lineage(value: Bytes32) {
    this.set_lineage(value);
  }

  private static __tnFootprintInternal(__tnParams: Record<string, bigint>): bigint {
    return __tnEvalFootprint(__tn_ir_PulseEvent.root, { params: __tnParams });
  }

  private static __tnValidateInternal(buffer: Uint8Array, __tnParams: Record<string, bigint>): { ok: boolean; code?: string; consumed?: bigint } {
    return __tnValidateIrTree(__tn_ir_PulseEvent, buffer, __tnParams);
  }

  static __tnInvokeFootprint(__tnParams: Record<string, bigint>): bigint {
    return this.__tnFootprintInternal(__tnParams);
  }

  static __tnInvokeValidate(buffer: Uint8Array, __tnParams: Record<string, bigint>): __TnValidateResult {
    return this.__tnValidateInternal(buffer, __tnParams);
  }

  static footprintIr(): bigint {
    return this.__tnFootprintInternal(Object.create(null));
  }

  static footprint(): number {
    const irResult = this.footprintIr();
      const maxSafe = __tnToBigInt(Number.MAX_SAFE_INTEGER);
    if (__tnBigIntGreaterThan(irResult, maxSafe)) {
      throw new Error('footprint exceeds Number.MAX_SAFE_INTEGER for PulseEvent');
    }
    return __tnBigIntToNumber(irResult, 'PulseEvent::footprint');
  }

  static validate(buffer: Uint8Array, _opts?: { params?: never }): { ok: boolean; code?: string; consumed?: number } {
    if (buffer.length < 139) return { ok: false, code: "tn.buffer_too_small", consumed: 139 };
    return { ok: true, consumed: 139 };
  }

  static from_array(buffer: Uint8Array): PulseEvent | null {
    if (!buffer || buffer.length === undefined) {
      return null;
    }
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    const validation = this.validate(buffer);
    if (!validation.ok) {
      return null;
    }
    return new PulseEvent(buffer);
  }

}

export class PulseEventBuilder {
  private buffer: Uint8Array;
  private view: DataView;

  constructor() {
    this.buffer = new Uint8Array(139);
    this.view = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
  }

  set_organism(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("organism expects 32 bytes");
    this.buffer.set(value, 0);
    return this;
  }

  set_slot(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(32, cast, true);
    return this;
  }

  set_age(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(40, cast, true);
    return this;
  }

  set_energy_before(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(48, cast, true);
    return this;
  }

  set_energy_after(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(56, cast, true);
    return this;
  }

  set_vitality(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(64, cast, true);
    return this;
  }

  set_status(value: number): this {
    this.view.setUint8(72, value);
    return this;
  }

  set_mutation_bit(value: number): this {
    this.view.setUint16(73, value, true);
    return this;
  }

  set_genome(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("genome expects 32 bytes");
    this.buffer.set(value, 75);
    return this;
  }

  set_lineage(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("lineage expects 32 bytes");
    this.buffer.set(value, 107);
    return this;
  }

  build(): Uint8Array {
    return this.buffer.slice();
  }

  buildInto(target: Uint8Array, offset = 0): Uint8Array {
    if (target.length - offset < this.buffer.length) throw new Error("target buffer too small");
    target.set(this.buffer, offset);
    return target;
  }

  finish(): PulseEvent {
    const view = PulseEvent.from_array(this.buffer.slice());
    if (!view) throw new Error("failed to build PulseEvent");
    return view;
  }
}

__tnRegisterFootprint("PulseEvent", (params) => PulseEvent.__tnInvokeFootprint(params));
__tnRegisterValidate("PulseEvent", (buffer, params) => PulseEvent.__tnInvokeValidate(buffer, params));
__tnRegisterDynamicValidate("PulseEvent", (buffer) => { const result = PulseEvent.validate(buffer); const params = (result as { params?: Record<string, bigint> }).params; return { ok: result.ok, code: result.code, consumed: result.consumed === undefined ? undefined : __tnToBigInt(result.consumed), params }; });

/* ----- TYPE DEFINITION FOR ReproduceArgs ----- */

const __tn_ir_ReproduceArgs = {
  typeName: "ReproduceArgs",
  root: { op: "align", alignment: 1, node: { op: "add", left: { op: "add", left: { op: "add", left: { op: "add", left: { op: "add", left: { op: "add", left: { op: "align", alignment: 2, node: { op: "const", value: 2n } }, right: { op: "align", alignment: 2, node: { op: "const", value: 2n } } }, right: { op: "align", alignment: 2, node: { op: "const", value: 2n } } }, right: { op: "align", alignment: 1, node: { op: "const", value: 32n } } }, right: { op: "align", alignment: 1, node: { op: "const", value: 32n } } }, right: { op: "align", alignment: 4, node: { op: "const", value: 4n } } }, right: { op: "align", alignment: 1, node: { op: "mul", left: { op: "field", param: "proof.proof_size" }, right: { op: "const", value: 1n } } } } }
} as const;

export class ReproduceArgs {
  private view: DataView;
  private __tnFieldContext: Record<string, number | bigint> | null = null;
  private __tnParams: ReproduceArgs.Params;

  private constructor(private buffer: Uint8Array, params?: ReproduceArgs.Params, fieldContext?: Record<string, number | bigint>) {
    this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    this.__tnFieldContext = fieldContext ?? null;
    if (params) {
      this.__tnParams = params;
    } else {
      const derived = ReproduceArgs.__tnExtractParams(this.view, buffer);
      if (!derived) {
        throw new Error("ReproduceArgs: failed to derive dynamic parameters");
      }
      this.__tnParams = derived.params;
    }
  }

  static __tnCreateView(buffer: Uint8Array, opts?: { params?: ReproduceArgs.Params, fieldContext?: Record<string, number | bigint> }): ReproduceArgs {
    if (!buffer || buffer.length === undefined) throw new Error("ReproduceArgs.__tnCreateView requires a Uint8Array");
    let params = opts?.params ?? null;
    if (!params) {
      const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
      const derived = ReproduceArgs.__tnExtractParams(view, buffer);
      if (!derived) throw new Error("ReproduceArgs.__tnCreateView: failed to derive params");
      params = derived.params;
    }
    const instance = new ReproduceArgs(new Uint8Array(buffer), params, opts?.fieldContext);
    return instance;
  }

  dynamicParams(): ReproduceArgs.Params {
    return this.__tnParams;
  }

  withFieldContext(context: Record<string, number | bigint>): this {
    this.__tnFieldContext = context;
    return this;
  }

  private __tnResolveFieldRef(path: string): number {
    const getterName = `get_${path.replace(/[.]/g, '_')}`;
    const getter = (this as any)[getterName];
    if (typeof getter === "function") {
      const value = getter.call(this);
      return typeof value === "bigint" ? __tnBigIntToNumber(value, "ReproduceArgs::__tnResolveFieldRef") : value;
    }
    if (this.__tnFieldContext && Object.prototype.hasOwnProperty.call(this.__tnFieldContext, path)) {
      const contextValue = this.__tnFieldContext[path];
      return typeof contextValue === "bigint" ? __tnBigIntToNumber(contextValue, "ReproduceArgs::__tnResolveFieldRef") : contextValue;
    }
    throw new Error("ReproduceArgs: field reference '" + path + "' is not available; provide fieldContext when creating this view");
  }

  static builder(): ReproduceArgsBuilder {
    return new ReproduceArgsBuilder();
  }

  static fromBuilder(builder: ReproduceArgsBuilder): ReproduceArgs | null {
    const buffer = builder.build();
    const params = builder.dynamicParams();
    return ReproduceArgs.from_array(buffer, { params });
  }

  static readonly flexibleArrayWriters = Object.freeze([
    { field: "proof", method: "proof", sizeField: "proof_size", paramKey: "proof_size", elementSize: 1 },
  ] as const);

  private static __tnExtractParams(view: DataView, buffer: Uint8Array): { params: ReproduceArgs.Params; derived: Record<string, bigint> | null } | null {
    if (buffer.length < 74) {
      return null;
    }
    const __tnParam_proof_proof_size = __tnToBigInt(view.getUint32(70, true));
    const __tnExtractedParams = ReproduceArgs.Params.fromValues({
      proof_proof_size: __tnParam_proof_proof_size,
    });
    return { params: __tnExtractedParams, derived: null };
  }

  get_parent_a_account_idx(): number {
    const offset = 0;
    return this.view.getUint16(offset, true); /* little-endian */
  }

  set_parent_a_account_idx(value: number): void {
    const offset = 0;
    this.view.setUint16(offset, value, true); /* little-endian */
  }

  get parent_a_account_idx(): number {
    return this.get_parent_a_account_idx();
  }

  set parent_a_account_idx(value: number) {
    this.set_parent_a_account_idx(value);
  }

  get_parent_b_account_idx(): number {
    const offset = 2;
    return this.view.getUint16(offset, true); /* little-endian */
  }

  set_parent_b_account_idx(value: number): void {
    const offset = 2;
    this.view.setUint16(offset, value, true); /* little-endian */
  }

  get parent_b_account_idx(): number {
    return this.get_parent_b_account_idx();
  }

  set parent_b_account_idx(value: number) {
    this.set_parent_b_account_idx(value);
  }

  get_child_account_idx(): number {
    const offset = 4;
    return this.view.getUint16(offset, true); /* little-endian */
  }

  set_child_account_idx(value: number): void {
    const offset = 4;
    this.view.setUint16(offset, value, true); /* little-endian */
  }

  get child_account_idx(): number {
    return this.get_child_account_idx();
  }

  set child_account_idx(value: number) {
    this.set_child_account_idx(value);
  }

  get_seed(): Bytes32 {
    const offset = 6;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_seed(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 6;
    this.buffer.set(sourceBytes, offset);
  }

  get seed(): Bytes32 {
    return this.get_seed();
  }

  set seed(value: Bytes32) {
    this.set_seed(value);
  }

  get_entropy(): Bytes32 {
    const offset = 38;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_entropy(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 38;
    this.buffer.set(sourceBytes, offset);
  }

  get entropy(): Bytes32 {
    return this.get_entropy();
  }

  set entropy(value: Bytes32) {
    this.set_entropy(value);
  }

  get_proof_size(): number {
    const offset = 70;
    return this.view.getUint32(offset, true); /* little-endian */
  }

  set_proof_size(value: number): void {
    const offset = 70;
    this.view.setUint32(offset, value, true); /* little-endian */
  }

  get proof_size(): number {
    return this.get_proof_size();
  }

  set proof_size(value: number) {
    this.set_proof_size(value);
  }

  get_proof_length(): number {
    return this.__tnResolveFieldRef("proof_size");
  }

  get_proof_at(index: number): number {
    const offset = 74;
    return this.view.getUint8(offset + index * 1);
  }

  get_proof(): number[] {
    const len = this.get_proof_length();
    const result: number[] = [];
    for (let i = 0; i < len; i++) {
      result.push(this.get_proof_at(i));
    }
    return result;
  }

  set_proof_at(index: number, value: number): void {
    const offset = 74;
    this.view.setUint8((offset + index * 1), value);
  }

  set_proof(value: number[]): void {
    const len = Math.min(this.get_proof_length(), value.length);
    for (let i = 0; i < len; i++) {
      this.set_proof_at(i, value[i]);
    }
  }

  get proof(): number[] {
    return this.get_proof();
  }

  set proof(value: number[]) {
    this.set_proof(value);
  }
  private static __tnFootprintInternal(__tnParams: Record<string, bigint>): bigint {
    return __tnEvalFootprint(__tn_ir_ReproduceArgs.root, { params: __tnParams });
  }

  private static __tnValidateInternal(buffer: Uint8Array, __tnParams: Record<string, bigint>): { ok: boolean; code?: string; consumed?: bigint } {
    return __tnValidateIrTree(__tn_ir_ReproduceArgs, buffer, __tnParams);
  }

  static __tnInvokeFootprint(__tnParams: Record<string, bigint>): bigint {
    return this.__tnFootprintInternal(__tnParams);
  }

  static __tnInvokeValidate(buffer: Uint8Array, __tnParams: Record<string, bigint>): __TnValidateResult {
    return this.__tnValidateInternal(buffer, __tnParams);
  }

  static footprintIr(proof_proof_size: number | bigint): bigint {
    const params = ReproduceArgs.Params.fromValues({
      proof_proof_size: proof_proof_size,
    });
    return this.footprintIrFromParams(params);
  }

  private static __tnPackParams(params: ReproduceArgs.Params): Record<string, bigint> {
    const record: Record<string, bigint> = Object.create(null);
    record["proof.proof_size"] = params.proof_proof_size;
    return record;
  }

  static footprintIrFromParams(params: ReproduceArgs.Params): bigint {
    const __tnParams = this.__tnPackParams(params);
    return this.__tnFootprintInternal(__tnParams);
  }

  static footprintFromParams(params: ReproduceArgs.Params): number {
    const irResult = this.footprintIrFromParams(params);
    const maxSafe = __tnToBigInt(Number.MAX_SAFE_INTEGER);
    if (__tnBigIntGreaterThan(irResult, maxSafe)) throw new Error('footprint exceeds Number.MAX_SAFE_INTEGER for ReproduceArgs');
    return __tnBigIntToNumber(irResult, 'ReproduceArgs::footprintFromParams');
  }

  static footprintFromValues(input: { proof_proof_size: number | bigint }): number {
    const params = ReproduceArgs.params(input);
    return this.footprintFromParams(params);
  }

  static footprint(params: ReproduceArgs.Params): number {
    return this.footprintFromParams(params);
  }

  static validate(buffer: Uint8Array, opts?: { params?: ReproduceArgs.Params }): { ok: boolean; code?: string; consumed?: number; params?: ReproduceArgs.Params } {
    if (!buffer || buffer.length === undefined) {
      return { ok: false, code: "tn.invalid_buffer" };
    }
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    let params = opts?.params ?? null;
    if (!params) {
      const extracted = this.__tnExtractParams(view, buffer);
      if (!extracted) return { ok: false, code: "tn.param_extraction_failed" };
      params = extracted.params;
    }
    const __tnParamsRec = this.__tnPackParams(params);
    const irResult = this.__tnValidateInternal(buffer, __tnParamsRec);
    if (!irResult.ok) {
      return { ok: false, code: irResult.code, consumed: irResult.consumed ? __tnBigIntToNumber(irResult.consumed, 'ReproduceArgs::validate') : undefined, params };
    }
    const consumed = irResult.consumed ? __tnBigIntToNumber(irResult.consumed, 'ReproduceArgs::validate') : undefined;
    return { ok: true, consumed, params };
  }

  static from_array(buffer: Uint8Array, opts?: { params?: ReproduceArgs.Params }): ReproduceArgs | null {
    if (!buffer || buffer.length === undefined) {
      return null;
    }
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    let params = opts?.params ?? null;
    if (!params) {
      const derived = this.__tnExtractParams(view, buffer);
      if (!derived) return null;
      params = derived.params;
    }
    const validation = this.validate(buffer, { params });
    if (!validation.ok) {
      return null;
    }
    const cached = validation.params ?? params;
    const state = new ReproduceArgs(buffer, cached);
    return state;
  }


}

export namespace ReproduceArgs {
  export type Params = {
    /** ABI path: proof.proof_size */
    readonly proof_proof_size: bigint;
  };

  export const ParamKeys = Object.freeze({
    proof_proof_size: "proof.proof_size",
  } as const);

  export const Params = {
    fromValues(input: { proof_proof_size: number | bigint }): Params {
      return {
        proof_proof_size: __tnToBigInt(input.proof_proof_size),
      };
    },
    fromBuilder(source: { dynamicParams(): Params } | { params: Params } | Params): Params {
      if ((source as { dynamicParams?: () => Params }).dynamicParams) {
        return (source as { dynamicParams(): Params }).dynamicParams();
      }
      if ((source as { params?: Params }).params) {
        return (source as { params: Params }).params;
      }
      return source as Params;
    }
  };

  export function params(input: { proof_proof_size: number | bigint }): Params {
    return Params.fromValues(input);
  }
}

export class ReproduceArgsBuilder {
  private buffer: Uint8Array;
  private view: DataView;
  private __tnCachedParams: ReproduceArgs.Params | null = null;
  private __tnLastBuffer: Uint8Array | null = null;
  private __tnLastParams: ReproduceArgs.Params | null = null;
  private __tnFam_proof: Uint8Array | null = null;
  private __tnFam_proofCount: number | null = null;
  private __tnFamWriter_proof?: __TnFamWriterResult<ReproduceArgsBuilder>;

  constructor() {
    this.buffer = new Uint8Array(74);
    this.view = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
  }

  private __tnInvalidate(): void {
    this.__tnCachedParams = null;
    this.__tnLastBuffer = null;
    this.__tnLastParams = null;
  }

  set_parent_a_account_idx(value: number): this {
    this.view.setUint16(0, value, true);
    this.__tnInvalidate();
    return this;
  }

  set_parent_b_account_idx(value: number): this {
    this.view.setUint16(2, value, true);
    this.__tnInvalidate();
    return this;
  }

  set_child_account_idx(value: number): this {
    this.view.setUint16(4, value, true);
    this.__tnInvalidate();
    return this;
  }

  set_seed(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("seed expects 32 bytes");
    this.buffer.set(value, 6);
    this.__tnInvalidate();
    return this;
  }

  set_entropy(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("entropy expects 32 bytes");
    this.buffer.set(value, 38);
    this.__tnInvalidate();
    return this;
  }

  set_proof_size(value: number): this {
    this.view.setUint32(70, value, true);
    this.__tnInvalidate();
    return this;
  }

  proof(): __TnFamWriterResult<ReproduceArgsBuilder> {
    if (!this.__tnFamWriter_proof) {
      this.__tnFamWriter_proof = __tnCreateFamWriter(this, "proof", (payload) => {
        const bytes = new Uint8Array(payload);
        const elementCount = bytes.length;
        this.__tnFam_proof = bytes;
        this.__tnFam_proofCount = elementCount;
        this.set_proof_size(elementCount);
        this.__tnInvalidate();
      });
    }
    return this.__tnFamWriter_proof!;
  }

  build(): Uint8Array {
    const params = this.__tnComputeParams();
    const size = ReproduceArgs.footprintFromParams(params);
    const buffer = new Uint8Array(size);
    this.__tnWriteInto(buffer);
    this.__tnValidateOrThrow(buffer, params);
    return buffer;
  }

  buildInto(target: Uint8Array, offset = 0): Uint8Array {
    const params = this.__tnComputeParams();
    const size = ReproduceArgs.footprintFromParams(params);
    if (target.length - offset < size) throw new Error("ReproduceArgsBuilder: target buffer too small");
    const slice = target.subarray(offset, offset + size);
    this.__tnWriteInto(slice);
    this.__tnValidateOrThrow(slice, params);
    return target;
  }

  finish(): ReproduceArgs {
    const buffer = this.build();
    const params = this.__tnLastParams ?? this.__tnComputeParams();
    const view = ReproduceArgs.from_array(buffer, { params });
    if (!view) throw new Error("ReproduceArgsBuilder: failed to finalize view");
    return view;
  }

  finishView(): ReproduceArgs {
    return this.finish();
  }

  dynamicParams(): ReproduceArgs.Params {
    return this.__tnComputeParams();
  }

  private __tnComputeParams(): ReproduceArgs.Params {
    if (this.__tnCachedParams) return this.__tnCachedParams;
    const params = ReproduceArgs.Params.fromValues({
      proof_proof_size: (() => { if (this.__tnFam_proofCount === null) throw new Error("ReproduceArgsBuilder: field 'proof' must be written before computing params"); return __tnToBigInt(this.__tnFam_proofCount); })(),
    });
    this.__tnCachedParams = params;
    return params;
  }

  private __tnWriteInto(target: Uint8Array): void {
    target.set(this.buffer, 0);
    let cursor = this.buffer.length;
    const __tnLocal_proof_bytes = this.__tnFam_proof;
    if (!__tnLocal_proof_bytes) throw new Error("ReproduceArgsBuilder: field 'proof' must be written before build");
    target.set(__tnLocal_proof_bytes, cursor);
    cursor += __tnLocal_proof_bytes.length;
  }

  private __tnValidateOrThrow(buffer: Uint8Array, params: ReproduceArgs.Params): void {
    const result = ReproduceArgs.validate(buffer, { params });
    if (!result.ok) {
      throw new Error(`${ ReproduceArgs }Builder: builder produced invalid buffer (code=${result.code ?? "unknown"})`);
    }
    this.__tnLastParams = result.params ?? params;
    this.__tnLastBuffer = buffer;
  }
}

__tnRegisterFootprint("ReproduceArgs", (params) => ReproduceArgs.__tnInvokeFootprint(params));
__tnRegisterValidate("ReproduceArgs", (buffer, params) => ReproduceArgs.__tnInvokeValidate(buffer, params));
__tnRegisterDynamicValidate("ReproduceArgs", (buffer) => { const result = ReproduceArgs.validate(buffer); const params = (result as { params?: Record<string, bigint> }).params; return { ok: result.ok, code: result.code, consumed: result.consumed === undefined ? undefined : __tnToBigInt(result.consumed), params }; });

/* ----- TYPE DEFINITION FOR ReproduceEvent ----- */

const __tn_ir_ReproduceEvent = {
  typeName: "ReproduceEvent",
  root: { op: "const", value: 172n }
} as const;

export class ReproduceEvent {
  private view: DataView;

  private constructor(private buffer: Uint8Array) {
    this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  }

  static __tnCreateView(buffer: Uint8Array, opts?: { fieldContext?: Record<string, number | bigint> }): ReproduceEvent {
    if (!buffer || buffer.length === undefined) throw new Error("ReproduceEvent.__tnCreateView requires a Uint8Array");
    return new ReproduceEvent(new Uint8Array(buffer));
  }

  static builder(): ReproduceEventBuilder {
    return new ReproduceEventBuilder();
  }

  static fromBuilder(builder: ReproduceEventBuilder): ReproduceEvent | null {
    const buffer = builder.build();
    return ReproduceEvent.from_array(buffer);
  }

  get_child(): Bytes32 {
    const offset = 0;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_child(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 0;
    this.buffer.set(sourceBytes, offset);
  }

  get child(): Bytes32 {
    return this.get_child();
  }

  set child(value: Bytes32) {
    this.set_child(value);
  }

  get_parent_a(): Bytes32 {
    const offset = 32;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_parent_a(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 32;
    this.buffer.set(sourceBytes, offset);
  }

  get parent_a(): Bytes32 {
    return this.get_parent_a();
  }

  set parent_a(value: Bytes32) {
    this.set_parent_a(value);
  }

  get_parent_b(): Bytes32 {
    const offset = 64;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_parent_b(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 64;
    this.buffer.set(sourceBytes, offset);
  }

  get parent_b(): Bytes32 {
    return this.get_parent_b();
  }

  set parent_b(value: Bytes32) {
    this.set_parent_b(value);
  }

  get_generation(): number {
    const offset = 96;
    return this.view.getUint16(offset, true); /* little-endian */
  }

  set_generation(value: number): void {
    const offset = 96;
    this.view.setUint16(offset, value, true); /* little-endian */
  }

  get generation(): number {
    return this.get_generation();
  }

  set generation(value: number) {
    this.set_generation(value);
  }

  get_mutation_bit(): number {
    const offset = 98;
    return this.view.getUint16(offset, true); /* little-endian */
  }

  set_mutation_bit(value: number): void {
    const offset = 98;
    this.view.setUint16(offset, value, true); /* little-endian */
  }

  get mutation_bit(): number {
    return this.get_mutation_bit();
  }

  set mutation_bit(value: number) {
    this.set_mutation_bit(value);
  }

  get_energy(): bigint {
    const offset = 100;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_energy(value: bigint): void {
    const offset = 100;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get energy(): bigint {
    return this.get_energy();
  }

  set energy(value: bigint) {
    this.set_energy(value);
  }

  get_genome(): Bytes32 {
    const offset = 108;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_genome(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 108;
    this.buffer.set(sourceBytes, offset);
  }

  get genome(): Bytes32 {
    return this.get_genome();
  }

  set genome(value: Bytes32) {
    this.set_genome(value);
  }

  get_lineage(): Bytes32 {
    const offset = 140;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_lineage(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 140;
    this.buffer.set(sourceBytes, offset);
  }

  get lineage(): Bytes32 {
    return this.get_lineage();
  }

  set lineage(value: Bytes32) {
    this.set_lineage(value);
  }

  private static __tnFootprintInternal(__tnParams: Record<string, bigint>): bigint {
    return __tnEvalFootprint(__tn_ir_ReproduceEvent.root, { params: __tnParams });
  }

  private static __tnValidateInternal(buffer: Uint8Array, __tnParams: Record<string, bigint>): { ok: boolean; code?: string; consumed?: bigint } {
    return __tnValidateIrTree(__tn_ir_ReproduceEvent, buffer, __tnParams);
  }

  static __tnInvokeFootprint(__tnParams: Record<string, bigint>): bigint {
    return this.__tnFootprintInternal(__tnParams);
  }

  static __tnInvokeValidate(buffer: Uint8Array, __tnParams: Record<string, bigint>): __TnValidateResult {
    return this.__tnValidateInternal(buffer, __tnParams);
  }

  static footprintIr(): bigint {
    return this.__tnFootprintInternal(Object.create(null));
  }

  static footprint(): number {
    const irResult = this.footprintIr();
      const maxSafe = __tnToBigInt(Number.MAX_SAFE_INTEGER);
    if (__tnBigIntGreaterThan(irResult, maxSafe)) {
      throw new Error('footprint exceeds Number.MAX_SAFE_INTEGER for ReproduceEvent');
    }
    return __tnBigIntToNumber(irResult, 'ReproduceEvent::footprint');
  }

  static validate(buffer: Uint8Array, _opts?: { params?: never }): { ok: boolean; code?: string; consumed?: number } {
    if (buffer.length < 172) return { ok: false, code: "tn.buffer_too_small", consumed: 172 };
    return { ok: true, consumed: 172 };
  }

  static from_array(buffer: Uint8Array): ReproduceEvent | null {
    if (!buffer || buffer.length === undefined) {
      return null;
    }
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    const validation = this.validate(buffer);
    if (!validation.ok) {
      return null;
    }
    return new ReproduceEvent(buffer);
  }

}

export class ReproduceEventBuilder {
  private buffer: Uint8Array;
  private view: DataView;

  constructor() {
    this.buffer = new Uint8Array(172);
    this.view = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
  }

  set_child(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("child expects 32 bytes");
    this.buffer.set(value, 0);
    return this;
  }

  set_parent_a(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("parent_a expects 32 bytes");
    this.buffer.set(value, 32);
    return this;
  }

  set_parent_b(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("parent_b expects 32 bytes");
    this.buffer.set(value, 64);
    return this;
  }

  set_generation(value: number): this {
    this.view.setUint16(96, value, true);
    return this;
  }

  set_mutation_bit(value: number): this {
    this.view.setUint16(98, value, true);
    return this;
  }

  set_energy(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(100, cast, true);
    return this;
  }

  set_genome(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("genome expects 32 bytes");
    this.buffer.set(value, 108);
    return this;
  }

  set_lineage(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("lineage expects 32 bytes");
    this.buffer.set(value, 140);
    return this;
  }

  build(): Uint8Array {
    return this.buffer.slice();
  }

  buildInto(target: Uint8Array, offset = 0): Uint8Array {
    if (target.length - offset < this.buffer.length) throw new Error("target buffer too small");
    target.set(this.buffer, offset);
    return target;
  }

  finish(): ReproduceEvent {
    const view = ReproduceEvent.from_array(this.buffer.slice());
    if (!view) throw new Error("failed to build ReproduceEvent");
    return view;
  }
}

__tnRegisterFootprint("ReproduceEvent", (params) => ReproduceEvent.__tnInvokeFootprint(params));
__tnRegisterValidate("ReproduceEvent", (buffer, params) => ReproduceEvent.__tnInvokeValidate(buffer, params));
__tnRegisterDynamicValidate("ReproduceEvent", (buffer) => { const result = ReproduceEvent.validate(buffer); const params = (result as { params?: Record<string, bigint> }).params; return { ok: result.ok, code: result.code, consumed: result.consumed === undefined ? undefined : __tnToBigInt(result.consumed), params }; });

/* ----- TYPE DEFINITION FOR TransferArgs ----- */

const __tn_ir_TransferArgs = {
  typeName: "TransferArgs",
  root: { op: "const", value: 4n }
} as const;

export class TransferArgs {
  private view: DataView;

  private constructor(private buffer: Uint8Array) {
    this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  }

  static __tnCreateView(buffer: Uint8Array, opts?: { fieldContext?: Record<string, number | bigint> }): TransferArgs {
    if (!buffer || buffer.length === undefined) throw new Error("TransferArgs.__tnCreateView requires a Uint8Array");
    return new TransferArgs(new Uint8Array(buffer));
  }

  static builder(): TransferArgsBuilder {
    return new TransferArgsBuilder();
  }

  static fromBuilder(builder: TransferArgsBuilder): TransferArgs | null {
    const buffer = builder.build();
    return TransferArgs.from_array(buffer);
  }

  get_organism_account_idx(): number {
    const offset = 0;
    return this.view.getUint16(offset, true); /* little-endian */
  }

  set_organism_account_idx(value: number): void {
    const offset = 0;
    this.view.setUint16(offset, value, true); /* little-endian */
  }

  get organism_account_idx(): number {
    return this.get_organism_account_idx();
  }

  set organism_account_idx(value: number) {
    this.set_organism_account_idx(value);
  }

  get_new_controller_account_idx(): number {
    const offset = 2;
    return this.view.getUint16(offset, true); /* little-endian */
  }

  set_new_controller_account_idx(value: number): void {
    const offset = 2;
    this.view.setUint16(offset, value, true); /* little-endian */
  }

  get new_controller_account_idx(): number {
    return this.get_new_controller_account_idx();
  }

  set new_controller_account_idx(value: number) {
    this.set_new_controller_account_idx(value);
  }

  private static __tnFootprintInternal(__tnParams: Record<string, bigint>): bigint {
    return __tnEvalFootprint(__tn_ir_TransferArgs.root, { params: __tnParams });
  }

  private static __tnValidateInternal(buffer: Uint8Array, __tnParams: Record<string, bigint>): { ok: boolean; code?: string; consumed?: bigint } {
    return __tnValidateIrTree(__tn_ir_TransferArgs, buffer, __tnParams);
  }

  static __tnInvokeFootprint(__tnParams: Record<string, bigint>): bigint {
    return this.__tnFootprintInternal(__tnParams);
  }

  static __tnInvokeValidate(buffer: Uint8Array, __tnParams: Record<string, bigint>): __TnValidateResult {
    return this.__tnValidateInternal(buffer, __tnParams);
  }

  static footprintIr(): bigint {
    return this.__tnFootprintInternal(Object.create(null));
  }

  static footprint(): number {
    const irResult = this.footprintIr();
      const maxSafe = __tnToBigInt(Number.MAX_SAFE_INTEGER);
    if (__tnBigIntGreaterThan(irResult, maxSafe)) {
      throw new Error('footprint exceeds Number.MAX_SAFE_INTEGER for TransferArgs');
    }
    return __tnBigIntToNumber(irResult, 'TransferArgs::footprint');
  }

  static validate(buffer: Uint8Array, _opts?: { params?: never }): { ok: boolean; code?: string; consumed?: number } {
    if (buffer.length < 4) return { ok: false, code: "tn.buffer_too_small", consumed: 4 };
    return { ok: true, consumed: 4 };
  }

  static new(organism_account_idx: number, new_controller_account_idx: number): TransferArgs {
    const buffer = new Uint8Array(4);
    const view = new DataView(buffer.buffer);

    let offset = 0;
    view.setUint16(0, organism_account_idx, true); /* organism_account_idx (little-endian) */
    view.setUint16(2, new_controller_account_idx, true); /* new_controller_account_idx (little-endian) */

    return new TransferArgs(buffer);
  }

  static from_array(buffer: Uint8Array): TransferArgs | null {
    if (!buffer || buffer.length === undefined) {
      return null;
    }
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    const validation = this.validate(buffer);
    if (!validation.ok) {
      return null;
    }
    return new TransferArgs(buffer);
  }

}

export class TransferArgsBuilder {
  private buffer: Uint8Array;
  private view: DataView;

  constructor() {
    this.buffer = new Uint8Array(4);
    this.view = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
  }

  set_organism_account_idx(value: number): this {
    this.view.setUint16(0, value, true);
    return this;
  }

  set_new_controller_account_idx(value: number): this {
    this.view.setUint16(2, value, true);
    return this;
  }

  build(): Uint8Array {
    return this.buffer.slice();
  }

  buildInto(target: Uint8Array, offset = 0): Uint8Array {
    if (target.length - offset < this.buffer.length) throw new Error("target buffer too small");
    target.set(this.buffer, offset);
    return target;
  }

  finish(): TransferArgs {
    const view = TransferArgs.from_array(this.buffer.slice());
    if (!view) throw new Error("failed to build TransferArgs");
    return view;
  }
}

__tnRegisterFootprint("TransferArgs", (params) => TransferArgs.__tnInvokeFootprint(params));
__tnRegisterValidate("TransferArgs", (buffer, params) => TransferArgs.__tnInvokeValidate(buffer, params));
__tnRegisterDynamicValidate("TransferArgs", (buffer) => { const result = TransferArgs.validate(buffer); const params = (result as { params?: Record<string, bigint> }).params; return { ok: result.ok, code: result.code, consumed: result.consumed === undefined ? undefined : __tnToBigInt(result.consumed), params }; });

/* ----- TYPE DEFINITION FOR TransferEvent ----- */

const __tn_ir_TransferEvent = {
  typeName: "TransferEvent",
  root: { op: "const", value: 104n }
} as const;

export class TransferEvent {
  private view: DataView;

  private constructor(private buffer: Uint8Array) {
    this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  }

  static __tnCreateView(buffer: Uint8Array, opts?: { fieldContext?: Record<string, number | bigint> }): TransferEvent {
    if (!buffer || buffer.length === undefined) throw new Error("TransferEvent.__tnCreateView requires a Uint8Array");
    return new TransferEvent(new Uint8Array(buffer));
  }

  static builder(): TransferEventBuilder {
    return new TransferEventBuilder();
  }

  static fromBuilder(builder: TransferEventBuilder): TransferEvent | null {
    const buffer = builder.build();
    return TransferEvent.from_array(buffer);
  }

  get_organism(): Bytes32 {
    const offset = 0;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_organism(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 0;
    this.buffer.set(sourceBytes, offset);
  }

  get organism(): Bytes32 {
    return this.get_organism();
  }

  set organism(value: Bytes32) {
    this.set_organism(value);
  }

  get_old_controller(): Bytes32 {
    const offset = 32;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_old_controller(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 32;
    this.buffer.set(sourceBytes, offset);
  }

  get old_controller(): Bytes32 {
    return this.get_old_controller();
  }

  set old_controller(value: Bytes32) {
    this.set_old_controller(value);
  }

  get_new_controller(): Bytes32 {
    const offset = 64;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_new_controller(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 64;
    this.buffer.set(sourceBytes, offset);
  }

  get new_controller(): Bytes32 {
    return this.get_new_controller();
  }

  set new_controller(value: Bytes32) {
    this.set_new_controller(value);
  }

  get_slot(): bigint {
    const offset = 96;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_slot(value: bigint): void {
    const offset = 96;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get slot(): bigint {
    return this.get_slot();
  }

  set slot(value: bigint) {
    this.set_slot(value);
  }

  private static __tnFootprintInternal(__tnParams: Record<string, bigint>): bigint {
    return __tnEvalFootprint(__tn_ir_TransferEvent.root, { params: __tnParams });
  }

  private static __tnValidateInternal(buffer: Uint8Array, __tnParams: Record<string, bigint>): { ok: boolean; code?: string; consumed?: bigint } {
    return __tnValidateIrTree(__tn_ir_TransferEvent, buffer, __tnParams);
  }

  static __tnInvokeFootprint(__tnParams: Record<string, bigint>): bigint {
    return this.__tnFootprintInternal(__tnParams);
  }

  static __tnInvokeValidate(buffer: Uint8Array, __tnParams: Record<string, bigint>): __TnValidateResult {
    return this.__tnValidateInternal(buffer, __tnParams);
  }

  static footprintIr(): bigint {
    return this.__tnFootprintInternal(Object.create(null));
  }

  static footprint(): number {
    const irResult = this.footprintIr();
      const maxSafe = __tnToBigInt(Number.MAX_SAFE_INTEGER);
    if (__tnBigIntGreaterThan(irResult, maxSafe)) {
      throw new Error('footprint exceeds Number.MAX_SAFE_INTEGER for TransferEvent');
    }
    return __tnBigIntToNumber(irResult, 'TransferEvent::footprint');
  }

  static validate(buffer: Uint8Array, _opts?: { params?: never }): { ok: boolean; code?: string; consumed?: number } {
    if (buffer.length < 104) return { ok: false, code: "tn.buffer_too_small", consumed: 104 };
    return { ok: true, consumed: 104 };
  }

  static from_array(buffer: Uint8Array): TransferEvent | null {
    if (!buffer || buffer.length === undefined) {
      return null;
    }
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    const validation = this.validate(buffer);
    if (!validation.ok) {
      return null;
    }
    return new TransferEvent(buffer);
  }

}

export class TransferEventBuilder {
  private buffer: Uint8Array;
  private view: DataView;

  constructor() {
    this.buffer = new Uint8Array(104);
    this.view = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
  }

  set_organism(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("organism expects 32 bytes");
    this.buffer.set(value, 0);
    return this;
  }

  set_old_controller(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("old_controller expects 32 bytes");
    this.buffer.set(value, 32);
    return this;
  }

  set_new_controller(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("new_controller expects 32 bytes");
    this.buffer.set(value, 64);
    return this;
  }

  set_slot(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(96, cast, true);
    return this;
  }

  build(): Uint8Array {
    return this.buffer.slice();
  }

  buildInto(target: Uint8Array, offset = 0): Uint8Array {
    if (target.length - offset < this.buffer.length) throw new Error("target buffer too small");
    target.set(this.buffer, offset);
    return target;
  }

  finish(): TransferEvent {
    const view = TransferEvent.from_array(this.buffer.slice());
    if (!view) throw new Error("failed to build TransferEvent");
    return view;
  }
}

__tnRegisterFootprint("TransferEvent", (params) => TransferEvent.__tnInvokeFootprint(params));
__tnRegisterValidate("TransferEvent", (buffer, params) => TransferEvent.__tnInvokeValidate(buffer, params));
__tnRegisterDynamicValidate("TransferEvent", (buffer) => { const result = TransferEvent.validate(buffer); const params = (result as { params?: Record<string, bigint> }).params; return { ok: result.ok, code: result.code, consumed: result.consumed === undefined ? undefined : __tnToBigInt(result.consumed), params }; });

/* ----- TYPE DEFINITION FOR BirthArgs ----- */

const __tn_ir_BirthArgs = {
  typeName: "BirthArgs",
  root: { op: "align", alignment: 1, node: { op: "add", left: { op: "add", left: { op: "add", left: { op: "add", left: { op: "align", alignment: 2, node: { op: "const", value: 2n } }, right: { op: "align", alignment: 1, node: { op: "const", value: 32n } } }, right: { op: "align", alignment: 1, node: { op: "const", value: 32n } } }, right: { op: "align", alignment: 4, node: { op: "const", value: 4n } } }, right: { op: "align", alignment: 1, node: { op: "mul", left: { op: "field", param: "proof.proof_size" }, right: { op: "const", value: 1n } } } } }
} as const;

export class BirthArgs {
  private view: DataView;
  private __tnFieldContext: Record<string, number | bigint> | null = null;
  private __tnParams: BirthArgs.Params;

  private constructor(private buffer: Uint8Array, params?: BirthArgs.Params, fieldContext?: Record<string, number | bigint>) {
    this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    this.__tnFieldContext = fieldContext ?? null;
    if (params) {
      this.__tnParams = params;
    } else {
      const derived = BirthArgs.__tnExtractParams(this.view, buffer);
      if (!derived) {
        throw new Error("BirthArgs: failed to derive dynamic parameters");
      }
      this.__tnParams = derived.params;
    }
  }

  static __tnCreateView(buffer: Uint8Array, opts?: { params?: BirthArgs.Params, fieldContext?: Record<string, number | bigint> }): BirthArgs {
    if (!buffer || buffer.length === undefined) throw new Error("BirthArgs.__tnCreateView requires a Uint8Array");
    let params = opts?.params ?? null;
    if (!params) {
      const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
      const derived = BirthArgs.__tnExtractParams(view, buffer);
      if (!derived) throw new Error("BirthArgs.__tnCreateView: failed to derive params");
      params = derived.params;
    }
    const instance = new BirthArgs(new Uint8Array(buffer), params, opts?.fieldContext);
    return instance;
  }

  dynamicParams(): BirthArgs.Params {
    return this.__tnParams;
  }

  withFieldContext(context: Record<string, number | bigint>): this {
    this.__tnFieldContext = context;
    return this;
  }

  private __tnResolveFieldRef(path: string): number {
    const getterName = `get_${path.replace(/[.]/g, '_')}`;
    const getter = (this as any)[getterName];
    if (typeof getter === "function") {
      const value = getter.call(this);
      return typeof value === "bigint" ? __tnBigIntToNumber(value, "BirthArgs::__tnResolveFieldRef") : value;
    }
    if (this.__tnFieldContext && Object.prototype.hasOwnProperty.call(this.__tnFieldContext, path)) {
      const contextValue = this.__tnFieldContext[path];
      return typeof contextValue === "bigint" ? __tnBigIntToNumber(contextValue, "BirthArgs::__tnResolveFieldRef") : contextValue;
    }
    throw new Error("BirthArgs: field reference '" + path + "' is not available; provide fieldContext when creating this view");
  }

  static builder(): BirthArgsBuilder {
    return new BirthArgsBuilder();
  }

  static fromBuilder(builder: BirthArgsBuilder): BirthArgs | null {
    const buffer = builder.build();
    const params = builder.dynamicParams();
    return BirthArgs.from_array(buffer, { params });
  }

  static readonly flexibleArrayWriters = Object.freeze([
    { field: "proof", method: "proof", sizeField: "proof_size", paramKey: "proof_size", elementSize: 1 },
  ] as const);

  private static __tnExtractParams(view: DataView, buffer: Uint8Array): { params: BirthArgs.Params; derived: Record<string, bigint> | null } | null {
    if (buffer.length < 70) {
      return null;
    }
    const __tnParam_proof_proof_size = __tnToBigInt(view.getUint32(66, true));
    const __tnExtractedParams = BirthArgs.Params.fromValues({
      proof_proof_size: __tnParam_proof_proof_size,
    });
    return { params: __tnExtractedParams, derived: null };
  }

  get_organism_account_idx(): number {
    const offset = 0;
    return this.view.getUint16(offset, true); /* little-endian */
  }

  set_organism_account_idx(value: number): void {
    const offset = 0;
    this.view.setUint16(offset, value, true); /* little-endian */
  }

  get organism_account_idx(): number {
    return this.get_organism_account_idx();
  }

  set organism_account_idx(value: number) {
    this.set_organism_account_idx(value);
  }

  get_seed(): Bytes32 {
    const offset = 2;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_seed(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 2;
    this.buffer.set(sourceBytes, offset);
  }

  get seed(): Bytes32 {
    return this.get_seed();
  }

  set seed(value: Bytes32) {
    this.set_seed(value);
  }

  get_entropy(): Bytes32 {
    const offset = 34;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_entropy(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 34;
    this.buffer.set(sourceBytes, offset);
  }

  get entropy(): Bytes32 {
    return this.get_entropy();
  }

  set entropy(value: Bytes32) {
    this.set_entropy(value);
  }

  get_proof_size(): number {
    const offset = 66;
    return this.view.getUint32(offset, true); /* little-endian */
  }

  set_proof_size(value: number): void {
    const offset = 66;
    this.view.setUint32(offset, value, true); /* little-endian */
  }

  get proof_size(): number {
    return this.get_proof_size();
  }

  set proof_size(value: number) {
    this.set_proof_size(value);
  }

  get_proof_length(): number {
    return this.__tnResolveFieldRef("proof_size");
  }

  get_proof_at(index: number): number {
    const offset = 70;
    return this.view.getUint8(offset + index * 1);
  }

  get_proof(): number[] {
    const len = this.get_proof_length();
    const result: number[] = [];
    for (let i = 0; i < len; i++) {
      result.push(this.get_proof_at(i));
    }
    return result;
  }

  set_proof_at(index: number, value: number): void {
    const offset = 70;
    this.view.setUint8((offset + index * 1), value);
  }

  set_proof(value: number[]): void {
    const len = Math.min(this.get_proof_length(), value.length);
    for (let i = 0; i < len; i++) {
      this.set_proof_at(i, value[i]);
    }
  }

  get proof(): number[] {
    return this.get_proof();
  }

  set proof(value: number[]) {
    this.set_proof(value);
  }
  private static __tnFootprintInternal(__tnParams: Record<string, bigint>): bigint {
    return __tnEvalFootprint(__tn_ir_BirthArgs.root, { params: __tnParams });
  }

  private static __tnValidateInternal(buffer: Uint8Array, __tnParams: Record<string, bigint>): { ok: boolean; code?: string; consumed?: bigint } {
    return __tnValidateIrTree(__tn_ir_BirthArgs, buffer, __tnParams);
  }

  static __tnInvokeFootprint(__tnParams: Record<string, bigint>): bigint {
    return this.__tnFootprintInternal(__tnParams);
  }

  static __tnInvokeValidate(buffer: Uint8Array, __tnParams: Record<string, bigint>): __TnValidateResult {
    return this.__tnValidateInternal(buffer, __tnParams);
  }

  static footprintIr(proof_proof_size: number | bigint): bigint {
    const params = BirthArgs.Params.fromValues({
      proof_proof_size: proof_proof_size,
    });
    return this.footprintIrFromParams(params);
  }

  private static __tnPackParams(params: BirthArgs.Params): Record<string, bigint> {
    const record: Record<string, bigint> = Object.create(null);
    record["proof.proof_size"] = params.proof_proof_size;
    return record;
  }

  static footprintIrFromParams(params: BirthArgs.Params): bigint {
    const __tnParams = this.__tnPackParams(params);
    return this.__tnFootprintInternal(__tnParams);
  }

  static footprintFromParams(params: BirthArgs.Params): number {
    const irResult = this.footprintIrFromParams(params);
    const maxSafe = __tnToBigInt(Number.MAX_SAFE_INTEGER);
    if (__tnBigIntGreaterThan(irResult, maxSafe)) throw new Error('footprint exceeds Number.MAX_SAFE_INTEGER for BirthArgs');
    return __tnBigIntToNumber(irResult, 'BirthArgs::footprintFromParams');
  }

  static footprintFromValues(input: { proof_proof_size: number | bigint }): number {
    const params = BirthArgs.params(input);
    return this.footprintFromParams(params);
  }

  static footprint(params: BirthArgs.Params): number {
    return this.footprintFromParams(params);
  }

  static validate(buffer: Uint8Array, opts?: { params?: BirthArgs.Params }): { ok: boolean; code?: string; consumed?: number; params?: BirthArgs.Params } {
    if (!buffer || buffer.length === undefined) {
      return { ok: false, code: "tn.invalid_buffer" };
    }
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    let params = opts?.params ?? null;
    if (!params) {
      const extracted = this.__tnExtractParams(view, buffer);
      if (!extracted) return { ok: false, code: "tn.param_extraction_failed" };
      params = extracted.params;
    }
    const __tnParamsRec = this.__tnPackParams(params);
    const irResult = this.__tnValidateInternal(buffer, __tnParamsRec);
    if (!irResult.ok) {
      return { ok: false, code: irResult.code, consumed: irResult.consumed ? __tnBigIntToNumber(irResult.consumed, 'BirthArgs::validate') : undefined, params };
    }
    const consumed = irResult.consumed ? __tnBigIntToNumber(irResult.consumed, 'BirthArgs::validate') : undefined;
    return { ok: true, consumed, params };
  }

  static from_array(buffer: Uint8Array, opts?: { params?: BirthArgs.Params }): BirthArgs | null {
    if (!buffer || buffer.length === undefined) {
      return null;
    }
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    let params = opts?.params ?? null;
    if (!params) {
      const derived = this.__tnExtractParams(view, buffer);
      if (!derived) return null;
      params = derived.params;
    }
    const validation = this.validate(buffer, { params });
    if (!validation.ok) {
      return null;
    }
    const cached = validation.params ?? params;
    const state = new BirthArgs(buffer, cached);
    return state;
  }


}

export namespace BirthArgs {
  export type Params = {
    /** ABI path: proof.proof_size */
    readonly proof_proof_size: bigint;
  };

  export const ParamKeys = Object.freeze({
    proof_proof_size: "proof.proof_size",
  } as const);

  export const Params = {
    fromValues(input: { proof_proof_size: number | bigint }): Params {
      return {
        proof_proof_size: __tnToBigInt(input.proof_proof_size),
      };
    },
    fromBuilder(source: { dynamicParams(): Params } | { params: Params } | Params): Params {
      if ((source as { dynamicParams?: () => Params }).dynamicParams) {
        return (source as { dynamicParams(): Params }).dynamicParams();
      }
      if ((source as { params?: Params }).params) {
        return (source as { params: Params }).params;
      }
      return source as Params;
    }
  };

  export function params(input: { proof_proof_size: number | bigint }): Params {
    return Params.fromValues(input);
  }
}

export class BirthArgsBuilder {
  private buffer: Uint8Array;
  private view: DataView;
  private __tnCachedParams: BirthArgs.Params | null = null;
  private __tnLastBuffer: Uint8Array | null = null;
  private __tnLastParams: BirthArgs.Params | null = null;
  private __tnFam_proof: Uint8Array | null = null;
  private __tnFam_proofCount: number | null = null;
  private __tnFamWriter_proof?: __TnFamWriterResult<BirthArgsBuilder>;

  constructor() {
    this.buffer = new Uint8Array(70);
    this.view = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
  }

  private __tnInvalidate(): void {
    this.__tnCachedParams = null;
    this.__tnLastBuffer = null;
    this.__tnLastParams = null;
  }

  set_organism_account_idx(value: number): this {
    this.view.setUint16(0, value, true);
    this.__tnInvalidate();
    return this;
  }

  set_seed(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("seed expects 32 bytes");
    this.buffer.set(value, 2);
    this.__tnInvalidate();
    return this;
  }

  set_entropy(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("entropy expects 32 bytes");
    this.buffer.set(value, 34);
    this.__tnInvalidate();
    return this;
  }

  set_proof_size(value: number): this {
    this.view.setUint32(66, value, true);
    this.__tnInvalidate();
    return this;
  }

  proof(): __TnFamWriterResult<BirthArgsBuilder> {
    if (!this.__tnFamWriter_proof) {
      this.__tnFamWriter_proof = __tnCreateFamWriter(this, "proof", (payload) => {
        const bytes = new Uint8Array(payload);
        const elementCount = bytes.length;
        this.__tnFam_proof = bytes;
        this.__tnFam_proofCount = elementCount;
        this.set_proof_size(elementCount);
        this.__tnInvalidate();
      });
    }
    return this.__tnFamWriter_proof!;
  }

  build(): Uint8Array {
    const params = this.__tnComputeParams();
    const size = BirthArgs.footprintFromParams(params);
    const buffer = new Uint8Array(size);
    this.__tnWriteInto(buffer);
    this.__tnValidateOrThrow(buffer, params);
    return buffer;
  }

  buildInto(target: Uint8Array, offset = 0): Uint8Array {
    const params = this.__tnComputeParams();
    const size = BirthArgs.footprintFromParams(params);
    if (target.length - offset < size) throw new Error("BirthArgsBuilder: target buffer too small");
    const slice = target.subarray(offset, offset + size);
    this.__tnWriteInto(slice);
    this.__tnValidateOrThrow(slice, params);
    return target;
  }

  finish(): BirthArgs {
    const buffer = this.build();
    const params = this.__tnLastParams ?? this.__tnComputeParams();
    const view = BirthArgs.from_array(buffer, { params });
    if (!view) throw new Error("BirthArgsBuilder: failed to finalize view");
    return view;
  }

  finishView(): BirthArgs {
    return this.finish();
  }

  dynamicParams(): BirthArgs.Params {
    return this.__tnComputeParams();
  }

  private __tnComputeParams(): BirthArgs.Params {
    if (this.__tnCachedParams) return this.__tnCachedParams;
    const params = BirthArgs.Params.fromValues({
      proof_proof_size: (() => { if (this.__tnFam_proofCount === null) throw new Error("BirthArgsBuilder: field 'proof' must be written before computing params"); return __tnToBigInt(this.__tnFam_proofCount); })(),
    });
    this.__tnCachedParams = params;
    return params;
  }

  private __tnWriteInto(target: Uint8Array): void {
    target.set(this.buffer, 0);
    let cursor = this.buffer.length;
    const __tnLocal_proof_bytes = this.__tnFam_proof;
    if (!__tnLocal_proof_bytes) throw new Error("BirthArgsBuilder: field 'proof' must be written before build");
    target.set(__tnLocal_proof_bytes, cursor);
    cursor += __tnLocal_proof_bytes.length;
  }

  private __tnValidateOrThrow(buffer: Uint8Array, params: BirthArgs.Params): void {
    const result = BirthArgs.validate(buffer, { params });
    if (!result.ok) {
      throw new Error(`${ BirthArgs }Builder: builder produced invalid buffer (code=${result.code ?? "unknown"})`);
    }
    this.__tnLastParams = result.params ?? params;
    this.__tnLastBuffer = buffer;
  }
}

__tnRegisterFootprint("BirthArgs", (params) => BirthArgs.__tnInvokeFootprint(params));
__tnRegisterValidate("BirthArgs", (buffer, params) => BirthArgs.__tnInvokeValidate(buffer, params));
__tnRegisterDynamicValidate("BirthArgs", (buffer) => { const result = BirthArgs.validate(buffer); const params = (result as { params?: Record<string, bigint> }).params; return { ok: result.ok, code: result.code, consumed: result.consumed === undefined ? undefined : __tnToBigInt(result.consumed), params }; });

/* ----- TYPE DEFINITION FOR BirthEvent ----- */

const __tn_ir_BirthEvent = {
  typeName: "BirthEvent",
  root: { op: "const", value: 154n }
} as const;

export class BirthEvent {
  private view: DataView;

  private constructor(private buffer: Uint8Array) {
    this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  }

  static __tnCreateView(buffer: Uint8Array, opts?: { fieldContext?: Record<string, number | bigint> }): BirthEvent {
    if (!buffer || buffer.length === undefined) throw new Error("BirthEvent.__tnCreateView requires a Uint8Array");
    return new BirthEvent(new Uint8Array(buffer));
  }

  static builder(): BirthEventBuilder {
    return new BirthEventBuilder();
  }

  static fromBuilder(builder: BirthEventBuilder): BirthEvent | null {
    const buffer = builder.build();
    return BirthEvent.from_array(buffer);
  }

  get_organism(): Bytes32 {
    const offset = 0;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_organism(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 0;
    this.buffer.set(sourceBytes, offset);
  }

  get organism(): Bytes32 {
    return this.get_organism();
  }

  set organism(value: Bytes32) {
    this.set_organism(value);
  }

  get_controller(): Bytes32 {
    const offset = 32;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_controller(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 32;
    this.buffer.set(sourceBytes, offset);
  }

  get controller(): Bytes32 {
    return this.get_controller();
  }

  set controller(value: Bytes32) {
    this.set_controller(value);
  }

  get_slot(): bigint {
    const offset = 64;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_slot(value: bigint): void {
    const offset = 64;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get slot(): bigint {
    return this.get_slot();
  }

  set slot(value: bigint) {
    this.set_slot(value);
  }

  get_generation(): number {
    const offset = 72;
    return this.view.getUint16(offset, true); /* little-endian */
  }

  set_generation(value: number): void {
    const offset = 72;
    this.view.setUint16(offset, value, true); /* little-endian */
  }

  get generation(): number {
    return this.get_generation();
  }

  set generation(value: number) {
    this.set_generation(value);
  }

  get_energy(): bigint {
    const offset = 74;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_energy(value: bigint): void {
    const offset = 74;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get energy(): bigint {
    return this.get_energy();
  }

  set energy(value: bigint) {
    this.set_energy(value);
  }

  get_vitality(): bigint {
    const offset = 82;
    return this.view.getBigUint64(offset, true); /* little-endian */
  }

  set_vitality(value: bigint): void {
    const offset = 82;
    this.view.setBigUint64(offset, value, true); /* little-endian */
  }

  get vitality(): bigint {
    return this.get_vitality();
  }

  set vitality(value: bigint) {
    this.set_vitality(value);
  }

  get_genome(): Bytes32 {
    const offset = 90;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_genome(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 90;
    this.buffer.set(sourceBytes, offset);
  }

  get genome(): Bytes32 {
    return this.get_genome();
  }

  set genome(value: Bytes32) {
    this.set_genome(value);
  }

  get_lineage(): Bytes32 {
    const offset = 122;
    const slice = this.buffer.subarray(offset, offset + 32);
    return Bytes32.from_array(slice)!;
  }

  set_lineage(value: Bytes32): void {
    /* Copy bytes from source struct to this field */
    const sourceBytes = (value as any).buffer as Uint8Array;
    const offset = 122;
    this.buffer.set(sourceBytes, offset);
  }

  get lineage(): Bytes32 {
    return this.get_lineage();
  }

  set lineage(value: Bytes32) {
    this.set_lineage(value);
  }

  private static __tnFootprintInternal(__tnParams: Record<string, bigint>): bigint {
    return __tnEvalFootprint(__tn_ir_BirthEvent.root, { params: __tnParams });
  }

  private static __tnValidateInternal(buffer: Uint8Array, __tnParams: Record<string, bigint>): { ok: boolean; code?: string; consumed?: bigint } {
    return __tnValidateIrTree(__tn_ir_BirthEvent, buffer, __tnParams);
  }

  static __tnInvokeFootprint(__tnParams: Record<string, bigint>): bigint {
    return this.__tnFootprintInternal(__tnParams);
  }

  static __tnInvokeValidate(buffer: Uint8Array, __tnParams: Record<string, bigint>): __TnValidateResult {
    return this.__tnValidateInternal(buffer, __tnParams);
  }

  static footprintIr(): bigint {
    return this.__tnFootprintInternal(Object.create(null));
  }

  static footprint(): number {
    const irResult = this.footprintIr();
      const maxSafe = __tnToBigInt(Number.MAX_SAFE_INTEGER);
    if (__tnBigIntGreaterThan(irResult, maxSafe)) {
      throw new Error('footprint exceeds Number.MAX_SAFE_INTEGER for BirthEvent');
    }
    return __tnBigIntToNumber(irResult, 'BirthEvent::footprint');
  }

  static validate(buffer: Uint8Array, _opts?: { params?: never }): { ok: boolean; code?: string; consumed?: number } {
    if (buffer.length < 154) return { ok: false, code: "tn.buffer_too_small", consumed: 154 };
    return { ok: true, consumed: 154 };
  }

  static from_array(buffer: Uint8Array): BirthEvent | null {
    if (!buffer || buffer.length === undefined) {
      return null;
    }
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    const validation = this.validate(buffer);
    if (!validation.ok) {
      return null;
    }
    return new BirthEvent(buffer);
  }

}

export class BirthEventBuilder {
  private buffer: Uint8Array;
  private view: DataView;

  constructor() {
    this.buffer = new Uint8Array(154);
    this.view = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
  }

  set_organism(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("organism expects 32 bytes");
    this.buffer.set(value, 0);
    return this;
  }

  set_controller(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("controller expects 32 bytes");
    this.buffer.set(value, 32);
    return this;
  }

  set_slot(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(64, cast, true);
    return this;
  }

  set_generation(value: number): this {
    this.view.setUint16(72, value, true);
    return this;
  }

  set_energy(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(74, cast, true);
    return this;
  }

  set_vitality(value: bigint): this {
    const cast = __tnToBigInt(value);
    this.view.setBigUint64(82, cast, true);
    return this;
  }

  set_genome(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("genome expects 32 bytes");
    this.buffer.set(value, 90);
    return this;
  }

  set_lineage(value: Uint8Array): this {
    if (value.length !== 32) throw new Error("lineage expects 32 bytes");
    this.buffer.set(value, 122);
    return this;
  }

  build(): Uint8Array {
    return this.buffer.slice();
  }

  buildInto(target: Uint8Array, offset = 0): Uint8Array {
    if (target.length - offset < this.buffer.length) throw new Error("target buffer too small");
    target.set(this.buffer, offset);
    return target;
  }

  finish(): BirthEvent {
    const view = BirthEvent.from_array(this.buffer.slice());
    if (!view) throw new Error("failed to build BirthEvent");
    return view;
  }
}

__tnRegisterFootprint("BirthEvent", (params) => BirthEvent.__tnInvokeFootprint(params));
__tnRegisterValidate("BirthEvent", (buffer, params) => BirthEvent.__tnInvokeValidate(buffer, params));
__tnRegisterDynamicValidate("BirthEvent", (buffer) => { const result = BirthEvent.validate(buffer); const params = (result as { params?: Record<string, bigint> }).params; return { ok: result.ok, code: result.code, consumed: result.consumed === undefined ? undefined : __tnToBigInt(result.consumed), params }; });

/* ----- TYPE DEFINITION FOR CambrianEvent ----- */

const __tn_ir_CambrianEvent = {
  typeName: "CambrianEvent",
  root: { op: "align", alignment: 1, node: { op: "add", left: { op: "align", alignment: 1, node: { op: "const", value: 1n } }, right: { op: "align", alignment: 1, node: { op: "switch", tag: "CambrianEvent::payload.tag", cases: [{ value: 0, node: { op: "align", alignment: 1, node: { op: "const", value: 154n } } }, { value: 1, node: { op: "align", alignment: 1, node: { op: "const", value: 139n } } }, { value: 2, node: { op: "align", alignment: 1, node: { op: "const", value: 156n } } }, { value: 3, node: { op: "align", alignment: 1, node: { op: "const", value: 172n } } }, { value: 4, node: { op: "align", alignment: 1, node: { op: "const", value: 104n } } }] } } } }
} as const;

export class CambrianEvent_payload_Inner {
  private view: DataView;
  private __tnFieldContext: Record<string, number | bigint> | null = null;
  private constructor(private buffer: Uint8Array, private descriptor: __TnVariantDescriptor | null, fieldContext?: Record<string, number | bigint>) {
    this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    this.__tnFieldContext = fieldContext ?? null;
  }

  static __tnCreate(payload: Uint8Array, descriptor: __TnVariantDescriptor | null, fieldContext?: Record<string, number | bigint>): CambrianEvent_payload_Inner {
    return new CambrianEvent_payload_Inner(new Uint8Array(payload), descriptor, fieldContext);
  }

  bytes(): Uint8Array {
    return new Uint8Array(this.buffer);
  }

  variant(): __TnVariantDescriptor | null {
    return this.descriptor;
  }

  asBirth(): BirthEvent | null {
    if (!this.descriptor || this.descriptor.tag !== 0) return null;
    return BirthEvent.__tnCreateView(new Uint8Array(this.buffer), { fieldContext: this.__tnFieldContext ?? undefined });
  }

  asPulse(): PulseEvent | null {
    if (!this.descriptor || this.descriptor.tag !== 1) return null;
    return PulseEvent.__tnCreateView(new Uint8Array(this.buffer), { fieldContext: this.__tnFieldContext ?? undefined });
  }

  asEncounter(): EncounterEvent | null {
    if (!this.descriptor || this.descriptor.tag !== 2) return null;
    return EncounterEvent.__tnCreateView(new Uint8Array(this.buffer), { fieldContext: this.__tnFieldContext ?? undefined });
  }

  asReproduce(): ReproduceEvent | null {
    if (!this.descriptor || this.descriptor.tag !== 3) return null;
    return ReproduceEvent.__tnCreateView(new Uint8Array(this.buffer), { fieldContext: this.__tnFieldContext ?? undefined });
  }

  asTransferControl(): TransferEvent | null {
    if (!this.descriptor || this.descriptor.tag !== 4) return null;
    return TransferEvent.__tnCreateView(new Uint8Array(this.buffer), { fieldContext: this.__tnFieldContext ?? undefined });
  }

}

export class CambrianEvent {
  private view: DataView;
  private static readonly __tnFieldOffset_payload = 1;
  private __tnParams: CambrianEvent.Params;

  private constructor(private buffer: Uint8Array, params?: CambrianEvent.Params) {
    this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    if (params) {
      this.__tnParams = params;
    } else {
      const derived = CambrianEvent.__tnExtractParams(this.view, buffer);
      if (!derived) {
        throw new Error("CambrianEvent: failed to derive dynamic parameters");
      }
      this.__tnParams = derived.params;
    }
  }

  static __tnCreateView(buffer: Uint8Array, opts?: { params?: CambrianEvent.Params, fieldContext?: Record<string, number | bigint> }): CambrianEvent {
    if (!buffer || buffer.length === undefined) throw new Error("CambrianEvent.__tnCreateView requires a Uint8Array");
    let params = opts?.params ?? null;
    if (!params) {
      const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
      const derived = CambrianEvent.__tnExtractParams(view, buffer);
      if (!derived) throw new Error("CambrianEvent.__tnCreateView: failed to derive params");
      params = derived.params;
    }
    const instance = new CambrianEvent(new Uint8Array(buffer), params);
    return instance;
  }

  dynamicParams(): CambrianEvent.Params {
    return this.__tnParams;
  }

  static builder(): CambrianEventBuilder {
    return new CambrianEventBuilder();
  }

  static fromBuilder(builder: CambrianEventBuilder): CambrianEvent | null {
    const buffer = builder.build();
    const params = builder.dynamicParams();
    return CambrianEvent.from_array(buffer, { params });
  }

  static readonly payloadVariantDescriptors = Object.freeze([
    {
      name: "birth",
      tag: 0,
      payloadSize: 154,
      payloadType: "CambrianEvent::payload::birth",
      createPayloadBuilder: () => __tnMaybeCallBuilder(BirthEvent),
    },
    {
      name: "pulse",
      tag: 1,
      payloadSize: 139,
      payloadType: "CambrianEvent::payload::pulse",
      createPayloadBuilder: () => __tnMaybeCallBuilder(PulseEvent),
    },
    {
      name: "encounter",
      tag: 2,
      payloadSize: 156,
      payloadType: "CambrianEvent::payload::encounter",
      createPayloadBuilder: () => __tnMaybeCallBuilder(EncounterEvent),
    },
    {
      name: "reproduce",
      tag: 3,
      payloadSize: 172,
      payloadType: "CambrianEvent::payload::reproduce",
      createPayloadBuilder: () => __tnMaybeCallBuilder(ReproduceEvent),
    },
    {
      name: "transfer_control",
      tag: 4,
      payloadSize: 104,
      payloadType: "CambrianEvent::payload::transfer_control",
      createPayloadBuilder: () => __tnMaybeCallBuilder(TransferEvent),
    },
  ] as const);

  private static __tnExtractParams(view: DataView, buffer: Uint8Array): { params: CambrianEvent.Params; derived: Record<string, bigint> | null } | null {
    if (buffer.length < 1) {
      return null;
    }
    const __tnParam_payload_tag = __tnToBigInt(view.getUint8(0));
    const __tnExtractedParams = CambrianEvent.Params.fromValues({
      payload_tag: __tnParam_payload_tag,
    });
    return { params: __tnExtractedParams, derived: null };
  }

  get_tag(): number {
    const offset = 0;
    return this.view.getUint8(offset);
  }

  set_tag(value: number): void {
    const offset = 0;
    this.view.setUint8(offset, value);
  }

  get tag(): number {
    return this.get_tag();
  }

  set tag(value: number) {
    this.set_tag(value);
  }

  payloadVariant(): typeof CambrianEvent.payloadVariantDescriptors[number] | null {
    const tag = this.view.getUint8(0);
    return CambrianEvent.payloadVariantDescriptors.find((variant) => variant.tag === tag) ?? null;
  }

  payload(): CambrianEvent_payload_Inner {
    const descriptor = this.payloadVariant();
    if (!descriptor) throw new Error("CambrianEvent: unknown payload variant");
    const offset = CambrianEvent.__tnFieldOffset_payload;
    const remaining = this.buffer.length - offset;
    const payloadLength = descriptor.payloadSize ?? remaining;
    if (payloadLength < 0 || offset + payloadLength > this.buffer.length) throw new Error("CambrianEvent: payload exceeds buffer bounds");
    const slice = this.buffer.subarray(offset, offset + payloadLength);
    return CambrianEvent_payload_Inner.__tnCreate(slice, descriptor, undefined);
  }
  private static __tnFootprintInternal(__tnParams: Record<string, bigint>): bigint {
    return __tnEvalFootprint(__tn_ir_CambrianEvent.root, { params: __tnParams });
  }

  private static __tnValidateInternal(buffer: Uint8Array, __tnParams: Record<string, bigint>): { ok: boolean; code?: string; consumed?: bigint } {
    return __tnValidateIrTree(__tn_ir_CambrianEvent, buffer, __tnParams);
  }

  static __tnInvokeFootprint(__tnParams: Record<string, bigint>): bigint {
    return this.__tnFootprintInternal(__tnParams);
  }

  static __tnInvokeValidate(buffer: Uint8Array, __tnParams: Record<string, bigint>): __TnValidateResult {
    return this.__tnValidateInternal(buffer, __tnParams);
  }

  static footprintIr(payload_tag: number | bigint): bigint {
    const params = CambrianEvent.Params.fromValues({
      payload_tag: payload_tag,
    });
    return this.footprintIrFromParams(params);
  }

  private static __tnPackParams(params: CambrianEvent.Params): Record<string, bigint> {
    const record: Record<string, bigint> = Object.create(null);
    record["payload.tag"] = params.payload_tag;
    record["CambrianEvent::payload.tag"] = params.payload_tag;
    return record;
  }

  static footprintIrFromParams(params: CambrianEvent.Params): bigint {
    const __tnParams = this.__tnPackParams(params);
    return this.__tnFootprintInternal(__tnParams);
  }

  static footprintFromParams(params: CambrianEvent.Params): number {
    const irResult = this.footprintIrFromParams(params);
    const maxSafe = __tnToBigInt(Number.MAX_SAFE_INTEGER);
    if (__tnBigIntGreaterThan(irResult, maxSafe)) throw new Error('footprint exceeds Number.MAX_SAFE_INTEGER for CambrianEvent');
    return __tnBigIntToNumber(irResult, 'CambrianEvent::footprintFromParams');
  }

  static footprintFromValues(input: { payload_tag: number | bigint }): number {
    const params = CambrianEvent.params(input);
    return this.footprintFromParams(params);
  }

  static footprint(params: CambrianEvent.Params): number {
    return this.footprintFromParams(params);
  }

  static validate(buffer: Uint8Array, opts?: { params?: CambrianEvent.Params }): { ok: boolean; code?: string; consumed?: number; params?: CambrianEvent.Params } {
    if (!buffer || buffer.length === undefined) {
      return { ok: false, code: "tn.invalid_buffer" };
    }
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    let params = opts?.params ?? null;
    if (!params) {
      const extracted = this.__tnExtractParams(view, buffer);
      if (!extracted) return { ok: false, code: "tn.param_extraction_failed" };
      params = extracted.params;
    }
    const __tnParamsRec = this.__tnPackParams(params);
    const irResult = this.__tnValidateInternal(buffer, __tnParamsRec);
    if (!irResult.ok) {
      return { ok: false, code: irResult.code, consumed: irResult.consumed ? __tnBigIntToNumber(irResult.consumed, 'CambrianEvent::validate') : undefined, params };
    }
    const consumed = irResult.consumed ? __tnBigIntToNumber(irResult.consumed, 'CambrianEvent::validate') : undefined;
    return { ok: true, consumed, params };
  }

  static from_array(buffer: Uint8Array, opts?: { params?: CambrianEvent.Params }): CambrianEvent | null {
    if (!buffer || buffer.length === undefined) {
      return null;
    }
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    let params = opts?.params ?? null;
    if (!params) {
      const derived = this.__tnExtractParams(view, buffer);
      if (!derived) return null;
      params = derived.params;
    }
    const validation = this.validate(buffer, { params });
    if (!validation.ok) {
      return null;
    }
    const cached = validation.params ?? params;
    const state = new CambrianEvent(buffer, cached);
    return state;
  }


}

export namespace CambrianEvent {
  export type Params = {
    /** ABI path: payload.tag */
    readonly payload_tag: bigint;
  };

  export const ParamKeys = Object.freeze({
    payload_tag: "payload.tag",
  } as const);

  export const Params = {
    fromValues(input: { payload_tag: number | bigint }): Params {
      return {
        payload_tag: __tnToBigInt(input.payload_tag),
      };
    },
    fromBuilder(source: { dynamicParams(): Params } | { params: Params } | Params): Params {
      if ((source as { dynamicParams?: () => Params }).dynamicParams) {
        return (source as { dynamicParams(): Params }).dynamicParams();
      }
      if ((source as { params?: Params }).params) {
        return (source as { params: Params }).params;
      }
      return source as Params;
    }
  };

  export function params(input: { payload_tag: number | bigint }): Params {
    return Params.fromValues(input);
  }
}

export class CambrianEventBuilder {
  private __tnPrefixBuffer: Uint8Array;
  private __tnPrefixView: DataView;
  private __tnField_tag: number | null = null;
  private __tnPayload_payload: { descriptor: typeof CambrianEvent.payloadVariantDescriptors[number]; bytes: Uint8Array } | null = null;
  private __tnCachedParams: CambrianEvent.Params | null = null;
  private __tnLastBuffer: Uint8Array | null = null;
  private __tnLastParams: CambrianEvent.Params | null = null;
  private __tnVariantSelector_payload?: __TnVariantSelectorResult<CambrianEventBuilder>;

  constructor() {
    this.__tnPrefixBuffer = new Uint8Array(1);
    this.__tnPrefixView = new DataView(this.__tnPrefixBuffer.buffer, this.__tnPrefixBuffer.byteOffset, this.__tnPrefixBuffer.byteLength);
  }

  private __tnInvalidate(): void {
    this.__tnCachedParams = null;
    this.__tnLastBuffer = null;
    this.__tnLastParams = null;
  }

  private __tnAssign_tag(value: number): void {
    this.__tnField_tag = value;
    this.__tnInvalidate();
  }

  set_tag(value: number): this {
    this.__tnAssign_tag(value);
    return this;
  }

  payload(): __TnVariantSelectorResult<CambrianEventBuilder> {
    if (!this.__tnVariantSelector_payload) {
      this.__tnVariantSelector_payload = __tnCreateVariantSelector(this, CambrianEvent.payloadVariantDescriptors, (descriptor, payload) => {
        this.__tnPayload_payload = { descriptor, bytes: new Uint8Array(payload) };
        this.__tnAssign_tag(descriptor.tag);
      });
    }
    return this.__tnVariantSelector_payload!;
  }

  build(): Uint8Array {
    const params = this.__tnComputeParams();
    if (this.__tnField_tag === null) throw new Error("CambrianEventBuilder: field 'tag' must be set before build");
    if (!this.__tnPayload_payload) throw new Error("CambrianEventBuilder: payload variant not selected");
    const payloadLength = this.__tnPayload_payload.bytes.length;
    const requiredSize = 1 + payloadLength;
    const footprintSize = CambrianEvent.footprintFromParams(params);
    const size = Math.max(requiredSize, footprintSize);
    const buffer = new Uint8Array(size);
    this.__tnWriteInto(buffer);
    this.__tnValidateOrThrow(buffer, params);
    return buffer;
  }

  buildInto(target: Uint8Array, offset = 0): Uint8Array {
    const params = this.__tnComputeParams();
    if (this.__tnField_tag === null) throw new Error("CambrianEventBuilder: field 'tag' must be set before build");
    if (!this.__tnPayload_payload) throw new Error("CambrianEventBuilder: payload variant not selected");
    const payloadLength = this.__tnPayload_payload.bytes.length;
    const requiredSize = 1 + payloadLength;
    const footprintSize = CambrianEvent.footprintFromParams(params);
    const size = Math.max(requiredSize, footprintSize);
    if (target.length - offset < size) throw new Error("CambrianEventBuilder: target buffer too small");
    const slice = target.subarray(offset, offset + size);
    this.__tnWriteInto(slice);
    this.__tnValidateOrThrow(slice, params);
    return target;
  }

  finish(): CambrianEvent {
    const buffer = this.build();
    const params = this.__tnLastParams ?? this.__tnComputeParams();
    const view = CambrianEvent.from_array(buffer, { params });
    if (!view) throw new Error("CambrianEventBuilder: failed to finalize view");
    return view;
  }

  finishView(): CambrianEvent {
    return this.finish();
  }

  dynamicParams(): CambrianEvent.Params {
    return this.__tnComputeParams();
  }

  private __tnComputeParams(): CambrianEvent.Params {
    if (this.__tnCachedParams) return this.__tnCachedParams;
    const params = CambrianEvent.Params.fromValues({
      payload_tag: (() => { if (this.__tnField_tag === null) throw new Error("CambrianEventBuilder: missing enum tag"); return __tnToBigInt(this.__tnField_tag); })(),
    });
    this.__tnCachedParams = params;
    return params;
  }

  private __tnWriteInto(target: Uint8Array): void {
    if (this.__tnField_tag === null) throw new Error("CambrianEventBuilder: field 'tag' must be set before build");
    if (!this.__tnPayload_payload) throw new Error("CambrianEventBuilder: payload variant not selected");
    const view = new DataView(target.buffer, target.byteOffset, target.byteLength);
    target.set(this.__tnPrefixBuffer, 0);
    view.setUint8(0, this.__tnField_tag);
    target.set(this.__tnPayload_payload.bytes, 1);
  }

  private __tnValidateOrThrow(buffer: Uint8Array, params: CambrianEvent.Params): void {
    const result = CambrianEvent.validate(buffer, { params });
    if (!result.ok) {
      throw new Error(`${ CambrianEvent }Builder: builder produced invalid buffer (code=${result.code ?? "unknown"})`);
    }
    this.__tnLastParams = result.params ?? params;
    this.__tnLastBuffer = buffer;
  }
}

__tnRegisterFootprint("CambrianEvent", (params) => CambrianEvent.__tnInvokeFootprint(params));
__tnRegisterValidate("CambrianEvent", (buffer, params) => CambrianEvent.__tnInvokeValidate(buffer, params));
__tnRegisterDynamicValidate("CambrianEvent", (buffer) => { const result = CambrianEvent.validate(buffer); const params = (result as { params?: Record<string, bigint> }).params; return { ok: result.ok, code: result.code, consumed: result.consumed === undefined ? undefined : __tnToBigInt(result.consumed), params }; });

/* ----- TYPE DEFINITION FOR CambrianInstruction ----- */

const __tn_ir_CambrianInstruction = {
  typeName: "CambrianInstruction",
  root: { op: "align", alignment: 1, node: { op: "add", left: { op: "align", alignment: 1, node: { op: "const", value: 1n } }, right: { op: "align", alignment: 1, node: { op: "field", param: "payload.payload_size" } } } }
} as const;

export class CambrianInstruction_payload_Inner {
  private view: DataView;
  private __tnFieldContext: Record<string, number | bigint> | null = null;
  private constructor(private buffer: Uint8Array, private descriptor: __TnVariantDescriptor | null, fieldContext?: Record<string, number | bigint>) {
    this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    this.__tnFieldContext = fieldContext ?? null;
  }

  static __tnCreate(payload: Uint8Array, descriptor: __TnVariantDescriptor | null, fieldContext?: Record<string, number | bigint>): CambrianInstruction_payload_Inner {
    return new CambrianInstruction_payload_Inner(new Uint8Array(payload), descriptor, fieldContext);
  }

  bytes(): Uint8Array {
    return new Uint8Array(this.buffer);
  }

  variant(): __TnVariantDescriptor | null {
    return this.descriptor;
  }

  asBirth(): BirthArgs | null {
    if (!this.descriptor || this.descriptor.tag !== 0) return null;
    return BirthArgs.__tnCreateView(new Uint8Array(this.buffer), { fieldContext: this.__tnFieldContext ?? undefined });
  }

  asPulse(): PulseArgs | null {
    if (!this.descriptor || this.descriptor.tag !== 1) return null;
    return PulseArgs.__tnCreateView(new Uint8Array(this.buffer), { fieldContext: this.__tnFieldContext ?? undefined });
  }

  asEncounter(): EncounterArgs | null {
    if (!this.descriptor || this.descriptor.tag !== 2) return null;
    return EncounterArgs.__tnCreateView(new Uint8Array(this.buffer), { fieldContext: this.__tnFieldContext ?? undefined });
  }

  asReproduce(): ReproduceArgs | null {
    if (!this.descriptor || this.descriptor.tag !== 3) return null;
    return ReproduceArgs.__tnCreateView(new Uint8Array(this.buffer), { fieldContext: this.__tnFieldContext ?? undefined });
  }

  asTransferControl(): TransferArgs | null {
    if (!this.descriptor || this.descriptor.tag !== 4) return null;
    return TransferArgs.__tnCreateView(new Uint8Array(this.buffer), { fieldContext: this.__tnFieldContext ?? undefined });
  }

}

export class CambrianInstruction {
  private view: DataView;
  private static readonly __tnFieldOffset_payload = 1;
  private __tnParams: CambrianInstruction.Params;

  private constructor(private buffer: Uint8Array, params?: CambrianInstruction.Params) {
    this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    if (params) {
      this.__tnParams = params;
    } else {
      const derived = CambrianInstruction.__tnExtractParams(this.view, buffer);
      if (!derived) {
        throw new Error("CambrianInstruction: failed to derive dynamic parameters");
      }
      this.__tnParams = derived.params;
    }
  }

  static __tnCreateView(buffer: Uint8Array, opts?: { params?: CambrianInstruction.Params, fieldContext?: Record<string, number | bigint> }): CambrianInstruction {
    if (!buffer || buffer.length === undefined) throw new Error("CambrianInstruction.__tnCreateView requires a Uint8Array");
    let params = opts?.params ?? null;
    if (!params) {
      const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
      const derived = CambrianInstruction.__tnExtractParams(view, buffer);
      if (!derived) throw new Error("CambrianInstruction.__tnCreateView: failed to derive params");
      params = derived.params;
    }
    const instance = new CambrianInstruction(new Uint8Array(buffer), params);
    return instance;
  }

  dynamicParams(): CambrianInstruction.Params {
    return this.__tnParams;
  }

  static builder(): CambrianInstructionBuilder {
    return new CambrianInstructionBuilder();
  }

  static fromBuilder(builder: CambrianInstructionBuilder): CambrianInstruction | null {
    const buffer = builder.build();
    const params = builder.dynamicParams();
    return CambrianInstruction.from_array(buffer, { params });
  }

  static readonly payloadVariantDescriptors = Object.freeze([
    {
      name: "birth",
      tag: 0,
      payloadSize: null,
      payloadType: "CambrianInstruction::payload::birth",
      createPayloadBuilder: () => __tnMaybeCallBuilder(BirthArgs),
    },
    {
      name: "pulse",
      tag: 1,
      payloadSize: 10,
      payloadType: "CambrianInstruction::payload::pulse",
      createPayloadBuilder: () => __tnMaybeCallBuilder(PulseArgs),
    },
    {
      name: "encounter",
      tag: 2,
      payloadSize: 12,
      payloadType: "CambrianInstruction::payload::encounter",
      createPayloadBuilder: () => __tnMaybeCallBuilder(EncounterArgs),
    },
    {
      name: "reproduce",
      tag: 3,
      payloadSize: null,
      payloadType: "CambrianInstruction::payload::reproduce",
      createPayloadBuilder: () => __tnMaybeCallBuilder(ReproduceArgs),
    },
    {
      name: "transfer_control",
      tag: 4,
      payloadSize: 4,
      payloadType: "CambrianInstruction::payload::transfer_control",
      createPayloadBuilder: () => __tnMaybeCallBuilder(TransferArgs),
    },
  ] as const);

  static __tnComputeSequentialLayout(view: DataView, buffer: Uint8Array): { params: Record<string, bigint> | null; offsets: Record<string, number> | null; derived: Record<string, bigint> | null } | null {
    const __tnLength = buffer.length;
    let __tnParamSeq_payload_payload_size: bigint | null = null;
    let __tnFieldValue_tag: number | null = null;
    let __tnCursorMutable = 0;
    if (__tnCursorMutable + 1 > __tnLength) return null;
    const __tnRead_tag = view.getUint8(__tnCursorMutable);
    __tnFieldValue_tag = __tnRead_tag;
    __tnCursorMutable += 1;
    const __tnEnumTagValue_payload = __tnFieldValue_tag;
    if (__tnEnumTagValue_payload === null) return null;
    let __tnEnumSize_payload = 0;
    switch (Number(__tnEnumTagValue_payload)) {
      case 0: break;
      case 1: break;
      case 2: break;
      case 3: break;
      case 4: break;
      default: return null;
    }
    if (__tnCursorMutable > __tnLength) return null;
    __tnEnumSize_payload = __tnLength - __tnCursorMutable;
    __tnCursorMutable = __tnLength;
    __tnParamSeq_payload_payload_size = __tnToBigInt(__tnEnumSize_payload);
    const params: Record<string, bigint> = Object.create(null);
    if (__tnParamSeq_payload_payload_size === null) return null;
    params["payload_payload_size"] = __tnParamSeq_payload_payload_size as bigint;
    return { params, offsets: null, derived: null };
  }

  private static __tnExtractParams(view: DataView, buffer: Uint8Array): { params: CambrianInstruction.Params; derived: Record<string, bigint> | null } | null {
    if (buffer.length < 1) {
      return null;
    }
    const __tnParam_payload_tag = __tnToBigInt(view.getUint8(0));
    const __tnLayout = CambrianInstruction.__tnComputeSequentialLayout(view, buffer);
    if (!__tnLayout || !__tnLayout.params) return null;
    const __tnSeqParams = __tnLayout.params;
    const __tnParamSeq_payload_payload_size = __tnSeqParams["payload_payload_size"];
    if (__tnParamSeq_payload_payload_size === undefined) return null;
    const __tnExtractedParams = CambrianInstruction.Params.fromValues({
      payload_payload_size: __tnParamSeq_payload_payload_size as bigint,
      payload_tag: __tnParam_payload_tag,
    });
    return { params: __tnExtractedParams, derived: null };
  }

  get_tag(): number {
    const offset = 0;
    return this.view.getUint8(offset);
  }

  set_tag(value: number): void {
    const offset = 0;
    this.view.setUint8(offset, value);
  }

  get tag(): number {
    return this.get_tag();
  }

  set tag(value: number) {
    this.set_tag(value);
  }

  payloadVariant(): typeof CambrianInstruction.payloadVariantDescriptors[number] | null {
    const tag = this.view.getUint8(0);
    return CambrianInstruction.payloadVariantDescriptors.find((variant) => variant.tag === tag) ?? null;
  }

  payload(): CambrianInstruction_payload_Inner {
    const descriptor = this.payloadVariant();
    if (!descriptor) throw new Error("CambrianInstruction: unknown payload variant");
    const offset = CambrianInstruction.__tnFieldOffset_payload;
    const remaining = this.buffer.length - offset;
    const payloadLength = descriptor.payloadSize ?? remaining;
    if (payloadLength < 0 || offset + payloadLength > this.buffer.length) throw new Error("CambrianInstruction: payload exceeds buffer bounds");
    const slice = this.buffer.subarray(offset, offset + payloadLength);
    return CambrianInstruction_payload_Inner.__tnCreate(slice, descriptor, undefined);
  }
  private static __tnFootprintInternal(__tnParams: Record<string, bigint>): bigint {
    return __tnEvalFootprint(__tn_ir_CambrianInstruction.root, { params: __tnParams });
  }

  private static __tnValidateInternal(buffer: Uint8Array, __tnParams: Record<string, bigint>): { ok: boolean; code?: string; consumed?: bigint } {
    return __tnValidateIrTree(__tn_ir_CambrianInstruction, buffer, __tnParams);
  }

  static __tnInvokeFootprint(__tnParams: Record<string, bigint>): bigint {
    return this.__tnFootprintInternal(__tnParams);
  }

  static __tnInvokeValidate(buffer: Uint8Array, __tnParams: Record<string, bigint>): __TnValidateResult {
    return this.__tnValidateInternal(buffer, __tnParams);
  }

  static footprintIr(payload_payload_size: number | bigint, payload_tag: number | bigint): bigint {
    const params = CambrianInstruction.Params.fromValues({
      payload_payload_size: payload_payload_size,
      payload_tag: payload_tag,
    });
    return this.footprintIrFromParams(params);
  }

  private static __tnPackParams(params: CambrianInstruction.Params): Record<string, bigint> {
    const record: Record<string, bigint> = Object.create(null);
    record["payload.payload_size"] = params.payload_payload_size;
    record["payload.tag"] = params.payload_tag;
    return record;
  }

  static footprintIrFromParams(params: CambrianInstruction.Params): bigint {
    const __tnParams = this.__tnPackParams(params);
    return this.__tnFootprintInternal(__tnParams);
  }

  static footprintFromParams(params: CambrianInstruction.Params): number {
    const irResult = this.footprintIrFromParams(params);
    const maxSafe = __tnToBigInt(Number.MAX_SAFE_INTEGER);
    if (__tnBigIntGreaterThan(irResult, maxSafe)) throw new Error('footprint exceeds Number.MAX_SAFE_INTEGER for CambrianInstruction');
    return __tnBigIntToNumber(irResult, 'CambrianInstruction::footprintFromParams');
  }

  static footprintFromValues(input: { payload_payload_size: number | bigint, payload_tag: number | bigint }): number {
    const params = CambrianInstruction.params(input);
    return this.footprintFromParams(params);
  }

  static footprint(params: CambrianInstruction.Params): number {
    return this.footprintFromParams(params);
  }

  static validate(buffer: Uint8Array, opts?: { params?: CambrianInstruction.Params }): { ok: boolean; code?: string; consumed?: number; params?: CambrianInstruction.Params } {
    if (!buffer || buffer.length === undefined) {
      return { ok: false, code: "tn.invalid_buffer" };
    }
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    let params = opts?.params ?? null;
    if (!params) {
      const extracted = this.__tnExtractParams(view, buffer);
      if (!extracted) return { ok: false, code: "tn.param_extraction_failed" };
      params = extracted.params;
    }
    const __tnParamsRec = this.__tnPackParams(params);
    const irResult = this.__tnValidateInternal(buffer, __tnParamsRec);
    if (!irResult.ok) {
      return { ok: false, code: irResult.code, consumed: irResult.consumed ? __tnBigIntToNumber(irResult.consumed, 'CambrianInstruction::validate') : undefined, params };
    }
    const consumed = irResult.consumed ? __tnBigIntToNumber(irResult.consumed, 'CambrianInstruction::validate') : undefined;
    return { ok: true, consumed, params };
  }

  static from_array(buffer: Uint8Array, opts?: { params?: CambrianInstruction.Params }): CambrianInstruction | null {
    if (!buffer || buffer.length === undefined) {
      return null;
    }
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    let params = opts?.params ?? null;
    if (!params) {
      const derived = this.__tnExtractParams(view, buffer);
      if (!derived) return null;
      params = derived.params;
    }
    const validation = this.validate(buffer, { params });
    if (!validation.ok) {
      return null;
    }
    const cached = validation.params ?? params;
    const state = new CambrianInstruction(buffer, cached);
    return state;
  }


}

export namespace CambrianInstruction {
  export type Params = {
    /** ABI path: payload.payload_size */
    readonly payload_payload_size: bigint;
    /** ABI path: payload.tag */
    readonly payload_tag: bigint;
  };

  export const ParamKeys = Object.freeze({
    payload_payload_size: "payload.payload_size",
    payload_tag: "payload.tag",
  } as const);

  export const Params = {
    fromValues(input: { payload_payload_size: number | bigint, payload_tag: number | bigint }): Params {
      return {
        payload_payload_size: __tnToBigInt(input.payload_payload_size),
        payload_tag: __tnToBigInt(input.payload_tag),
      };
    },
    fromBuilder(source: { dynamicParams(): Params } | { params: Params } | Params): Params {
      if ((source as { dynamicParams?: () => Params }).dynamicParams) {
        return (source as { dynamicParams(): Params }).dynamicParams();
      }
      if ((source as { params?: Params }).params) {
        return (source as { params: Params }).params;
      }
      return source as Params;
    }
  };

  export function params(input: { payload_payload_size: number | bigint, payload_tag: number | bigint }): Params {
    return Params.fromValues(input);
  }
}

export class CambrianInstructionBuilder {
  private __tnPrefixBuffer: Uint8Array;
  private __tnPrefixView: DataView;
  private __tnField_tag: number | null = null;
  private __tnPayload_payload: { descriptor: typeof CambrianInstruction.payloadVariantDescriptors[number]; bytes: Uint8Array } | null = null;
  private __tnCachedParams: CambrianInstruction.Params | null = null;
  private __tnLastBuffer: Uint8Array | null = null;
  private __tnLastParams: CambrianInstruction.Params | null = null;
  private __tnVariantSelector_payload?: __TnVariantSelectorResult<CambrianInstructionBuilder>;

  constructor() {
    this.__tnPrefixBuffer = new Uint8Array(1);
    this.__tnPrefixView = new DataView(this.__tnPrefixBuffer.buffer, this.__tnPrefixBuffer.byteOffset, this.__tnPrefixBuffer.byteLength);
  }

  private __tnInvalidate(): void {
    this.__tnCachedParams = null;
    this.__tnLastBuffer = null;
    this.__tnLastParams = null;
  }

  private __tnAssign_tag(value: number): void {
    this.__tnField_tag = value;
    this.__tnInvalidate();
  }

  set_tag(value: number): this {
    this.__tnAssign_tag(value);
    return this;
  }

  payload(): __TnVariantSelectorResult<CambrianInstructionBuilder> {
    if (!this.__tnVariantSelector_payload) {
      this.__tnVariantSelector_payload = __tnCreateVariantSelector(this, CambrianInstruction.payloadVariantDescriptors, (descriptor, payload) => {
        this.__tnPayload_payload = { descriptor, bytes: new Uint8Array(payload) };
        this.__tnAssign_tag(descriptor.tag);
      });
    }
    return this.__tnVariantSelector_payload!;
  }

  build(): Uint8Array {
    const params = this.__tnComputeParams();
    if (this.__tnField_tag === null) throw new Error("CambrianInstructionBuilder: field 'tag' must be set before build");
    if (!this.__tnPayload_payload) throw new Error("CambrianInstructionBuilder: payload variant not selected");
    const payloadLength = this.__tnPayload_payload.bytes.length;
    const requiredSize = 1 + payloadLength;
    const footprintSize = CambrianInstruction.footprintFromParams(params);
    const size = Math.max(requiredSize, footprintSize);
    const buffer = new Uint8Array(size);
    this.__tnWriteInto(buffer);
    this.__tnValidateOrThrow(buffer, params);
    return buffer;
  }

  buildInto(target: Uint8Array, offset = 0): Uint8Array {
    const params = this.__tnComputeParams();
    if (this.__tnField_tag === null) throw new Error("CambrianInstructionBuilder: field 'tag' must be set before build");
    if (!this.__tnPayload_payload) throw new Error("CambrianInstructionBuilder: payload variant not selected");
    const payloadLength = this.__tnPayload_payload.bytes.length;
    const requiredSize = 1 + payloadLength;
    const footprintSize = CambrianInstruction.footprintFromParams(params);
    const size = Math.max(requiredSize, footprintSize);
    if (target.length - offset < size) throw new Error("CambrianInstructionBuilder: target buffer too small");
    const slice = target.subarray(offset, offset + size);
    this.__tnWriteInto(slice);
    this.__tnValidateOrThrow(slice, params);
    return target;
  }

  finish(): CambrianInstruction {
    const buffer = this.build();
    const params = this.__tnLastParams ?? this.__tnComputeParams();
    const view = CambrianInstruction.from_array(buffer, { params });
    if (!view) throw new Error("CambrianInstructionBuilder: failed to finalize view");
    return view;
  }

  finishView(): CambrianInstruction {
    return this.finish();
  }

  dynamicParams(): CambrianInstruction.Params {
    return this.__tnComputeParams();
  }

  private __tnComputeParams(): CambrianInstruction.Params {
    if (this.__tnCachedParams) return this.__tnCachedParams;
    const params = CambrianInstruction.Params.fromValues({
      payload_payload_size: (() => { if (!this.__tnPayload_payload) throw new Error("CambrianInstructionBuilder: payload 'payload' must be selected before build"); return __tnToBigInt(this.__tnPayload_payload.bytes.length); })(),
      payload_tag: (() => { if (this.__tnField_tag === null) throw new Error("CambrianInstructionBuilder: missing enum tag"); return __tnToBigInt(this.__tnField_tag); })(),
    });
    this.__tnCachedParams = params;
    return params;
  }

  private __tnWriteInto(target: Uint8Array): void {
    if (this.__tnField_tag === null) throw new Error("CambrianInstructionBuilder: field 'tag' must be set before build");
    if (!this.__tnPayload_payload) throw new Error("CambrianInstructionBuilder: payload variant not selected");
    const view = new DataView(target.buffer, target.byteOffset, target.byteLength);
    target.set(this.__tnPrefixBuffer, 0);
    view.setUint8(0, this.__tnField_tag);
    target.set(this.__tnPayload_payload.bytes, 1);
  }

  private __tnValidateOrThrow(buffer: Uint8Array, params: CambrianInstruction.Params): void {
    const result = CambrianInstruction.validate(buffer, { params });
    if (!result.ok) {
      throw new Error(`${ CambrianInstruction }Builder: builder produced invalid buffer (code=${result.code ?? "unknown"})`);
    }
    this.__tnLastParams = result.params ?? params;
    this.__tnLastBuffer = buffer;
  }
}

__tnRegisterFootprint("CambrianInstruction", (params) => CambrianInstruction.__tnInvokeFootprint(params));
__tnRegisterValidate("CambrianInstruction", (buffer, params) => CambrianInstruction.__tnInvokeValidate(buffer, params));
__tnRegisterDynamicValidate("CambrianInstruction", (buffer) => { const result = CambrianInstruction.validate(buffer); const params = (result as { params?: Record<string, bigint> }).params; return { ok: result.ok, code: result.code, consumed: result.consumed === undefined ? undefined : __tnToBigInt(result.consumed), params }; });
