/* eslint-disable */
import { TrackType, RoomInfo, ParticipantInfo, TrackInfo, trackTypeFromJSON, trackTypeToJSON } from './model';
import { Writer, Reader } from 'protobufjs/minimal';


export interface SignalRequest {
  /**
   *  participant joining initially
   */
  offer?: SessionDescription | undefined;
  /**
   *  participant responding to server-issued offers
   */
  answer?: SessionDescription | undefined;
  trickle?: TrickleRequest | undefined;
  addTrack?: AddTrackRequest | undefined;
  mute?: MuteTrackRequest | undefined;
  removeTrack?: RemoveTrackRequest | undefined;
  /**
   *  when client needs to negotiate
   */
  negotiate?: NegotiationRequest | undefined;
}

export interface SignalResponse {
  /**
   *  sent when join is accepted
   */
  join?: JoinResponse | undefined;
  /**
   *  sent when offer is answered
   */
  answer?: SessionDescription | undefined;
  /**
   *  sent when server needs to negotiate, always offer
   */
  offer?: SessionDescription | undefined;
  /**
   *  sent when an ICE candidate is available
   */
  trickle?: TrickleRequest | undefined;
  /**
   *  sent when participants in the room has changed
   */
  update?: ParticipantUpdate | undefined;
  /**
   *  sent to the participant when their track has been published
   */
  trackPublished?: TrackPublishedResponse | undefined;
  /**
   *  sent to participant when they should initiate negotiation
   */
  negotiate?: NegotiationResponse | undefined;
}

export interface AddTrackRequest {
  /**
   *  client ID of track, to match it when RTC track is received
   */
  cid: string;
  name: string;
  type: TrackType;
}

export interface TrickleRequest {
  candidateInit: string;
}

export interface RemoveTrackRequest {
  sid: string;
}

export interface MuteTrackRequest {
  sid: string;
  muted: boolean;
}

/**
 *  empty
 */
export interface NegotiationRequest {
}

export interface JoinResponse {
  room?: RoomInfo;
  participant?: ParticipantInfo;
  otherParticipants: ParticipantInfo[];
}

export interface TrackPublishedResponse {
  cid: string;
  track?: TrackInfo;
}

/**
 *  empty
 */
export interface NegotiationResponse {
}

export interface SessionDescription {
  /**
   *  "answer" | "offer" | "pranswer" | "rollback"
   */
  type: string;
  sdp: string;
}

export interface ParticipantUpdate {
  participants: ParticipantInfo[];
}

const baseSignalRequest: object = {
};

const baseSignalResponse: object = {
};

const baseAddTrackRequest: object = {
  cid: "",
  name: "",
  type: 0,
};

const baseTrickleRequest: object = {
  candidateInit: "",
};

const baseRemoveTrackRequest: object = {
  sid: "",
};

const baseMuteTrackRequest: object = {
  sid: "",
  muted: false,
};

const baseNegotiationRequest: object = {
};

const baseJoinResponse: object = {
};

const baseTrackPublishedResponse: object = {
  cid: "",
};

const baseNegotiationResponse: object = {
};

const baseSessionDescription: object = {
  type: "",
  sdp: "",
};

const baseParticipantUpdate: object = {
};

export const protobufPackage = 'livekit'

export const SignalRequest = {
  encode(message: SignalRequest, writer: Writer = Writer.create()): Writer {
    if (message.offer !== undefined) {
      SessionDescription.encode(message.offer, writer.uint32(10).fork()).ldelim();
    }
    if (message.answer !== undefined) {
      SessionDescription.encode(message.answer, writer.uint32(18).fork()).ldelim();
    }
    if (message.trickle !== undefined) {
      TrickleRequest.encode(message.trickle, writer.uint32(26).fork()).ldelim();
    }
    if (message.addTrack !== undefined) {
      AddTrackRequest.encode(message.addTrack, writer.uint32(34).fork()).ldelim();
    }
    if (message.mute !== undefined) {
      MuteTrackRequest.encode(message.mute, writer.uint32(42).fork()).ldelim();
    }
    if (message.removeTrack !== undefined) {
      RemoveTrackRequest.encode(message.removeTrack, writer.uint32(50).fork()).ldelim();
    }
    if (message.negotiate !== undefined) {
      NegotiationRequest.encode(message.negotiate, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SignalRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSignalRequest } as SignalRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.offer = SessionDescription.decode(reader, reader.uint32());
          break;
        case 2:
          message.answer = SessionDescription.decode(reader, reader.uint32());
          break;
        case 3:
          message.trickle = TrickleRequest.decode(reader, reader.uint32());
          break;
        case 4:
          message.addTrack = AddTrackRequest.decode(reader, reader.uint32());
          break;
        case 5:
          message.mute = MuteTrackRequest.decode(reader, reader.uint32());
          break;
        case 6:
          message.removeTrack = RemoveTrackRequest.decode(reader, reader.uint32());
          break;
        case 7:
          message.negotiate = NegotiationRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SignalRequest {
    const message = { ...baseSignalRequest } as SignalRequest;
    if (object.offer !== undefined && object.offer !== null) {
      message.offer = SessionDescription.fromJSON(object.offer);
    } else {
      message.offer = undefined;
    }
    if (object.answer !== undefined && object.answer !== null) {
      message.answer = SessionDescription.fromJSON(object.answer);
    } else {
      message.answer = undefined;
    }
    if (object.trickle !== undefined && object.trickle !== null) {
      message.trickle = TrickleRequest.fromJSON(object.trickle);
    } else {
      message.trickle = undefined;
    }
    if (object.addTrack !== undefined && object.addTrack !== null) {
      message.addTrack = AddTrackRequest.fromJSON(object.addTrack);
    } else {
      message.addTrack = undefined;
    }
    if (object.mute !== undefined && object.mute !== null) {
      message.mute = MuteTrackRequest.fromJSON(object.mute);
    } else {
      message.mute = undefined;
    }
    if (object.removeTrack !== undefined && object.removeTrack !== null) {
      message.removeTrack = RemoveTrackRequest.fromJSON(object.removeTrack);
    } else {
      message.removeTrack = undefined;
    }
    if (object.negotiate !== undefined && object.negotiate !== null) {
      message.negotiate = NegotiationRequest.fromJSON(object.negotiate);
    } else {
      message.negotiate = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<SignalRequest>): SignalRequest {
    const message = { ...baseSignalRequest } as SignalRequest;
    if (object.offer !== undefined && object.offer !== null) {
      message.offer = SessionDescription.fromPartial(object.offer);
    } else {
      message.offer = undefined;
    }
    if (object.answer !== undefined && object.answer !== null) {
      message.answer = SessionDescription.fromPartial(object.answer);
    } else {
      message.answer = undefined;
    }
    if (object.trickle !== undefined && object.trickle !== null) {
      message.trickle = TrickleRequest.fromPartial(object.trickle);
    } else {
      message.trickle = undefined;
    }
    if (object.addTrack !== undefined && object.addTrack !== null) {
      message.addTrack = AddTrackRequest.fromPartial(object.addTrack);
    } else {
      message.addTrack = undefined;
    }
    if (object.mute !== undefined && object.mute !== null) {
      message.mute = MuteTrackRequest.fromPartial(object.mute);
    } else {
      message.mute = undefined;
    }
    if (object.removeTrack !== undefined && object.removeTrack !== null) {
      message.removeTrack = RemoveTrackRequest.fromPartial(object.removeTrack);
    } else {
      message.removeTrack = undefined;
    }
    if (object.negotiate !== undefined && object.negotiate !== null) {
      message.negotiate = NegotiationRequest.fromPartial(object.negotiate);
    } else {
      message.negotiate = undefined;
    }
    return message;
  },
  toJSON(message: SignalRequest): unknown {
    const obj: any = {};
    message.offer !== undefined && (obj.offer = message.offer ? SessionDescription.toJSON(message.offer) : undefined);
    message.answer !== undefined && (obj.answer = message.answer ? SessionDescription.toJSON(message.answer) : undefined);
    message.trickle !== undefined && (obj.trickle = message.trickle ? TrickleRequest.toJSON(message.trickle) : undefined);
    message.addTrack !== undefined && (obj.addTrack = message.addTrack ? AddTrackRequest.toJSON(message.addTrack) : undefined);
    message.mute !== undefined && (obj.mute = message.mute ? MuteTrackRequest.toJSON(message.mute) : undefined);
    message.removeTrack !== undefined && (obj.removeTrack = message.removeTrack ? RemoveTrackRequest.toJSON(message.removeTrack) : undefined);
    message.negotiate !== undefined && (obj.negotiate = message.negotiate ? NegotiationRequest.toJSON(message.negotiate) : undefined);
    return obj;
  },
};

export const SignalResponse = {
  encode(message: SignalResponse, writer: Writer = Writer.create()): Writer {
    if (message.join !== undefined) {
      JoinResponse.encode(message.join, writer.uint32(10).fork()).ldelim();
    }
    if (message.answer !== undefined) {
      SessionDescription.encode(message.answer, writer.uint32(18).fork()).ldelim();
    }
    if (message.offer !== undefined) {
      SessionDescription.encode(message.offer, writer.uint32(26).fork()).ldelim();
    }
    if (message.trickle !== undefined) {
      TrickleRequest.encode(message.trickle, writer.uint32(34).fork()).ldelim();
    }
    if (message.update !== undefined) {
      ParticipantUpdate.encode(message.update, writer.uint32(42).fork()).ldelim();
    }
    if (message.trackPublished !== undefined) {
      TrackPublishedResponse.encode(message.trackPublished, writer.uint32(50).fork()).ldelim();
    }
    if (message.negotiate !== undefined) {
      NegotiationResponse.encode(message.negotiate, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SignalResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSignalResponse } as SignalResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.join = JoinResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.answer = SessionDescription.decode(reader, reader.uint32());
          break;
        case 3:
          message.offer = SessionDescription.decode(reader, reader.uint32());
          break;
        case 4:
          message.trickle = TrickleRequest.decode(reader, reader.uint32());
          break;
        case 5:
          message.update = ParticipantUpdate.decode(reader, reader.uint32());
          break;
        case 6:
          message.trackPublished = TrackPublishedResponse.decode(reader, reader.uint32());
          break;
        case 7:
          message.negotiate = NegotiationResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SignalResponse {
    const message = { ...baseSignalResponse } as SignalResponse;
    if (object.join !== undefined && object.join !== null) {
      message.join = JoinResponse.fromJSON(object.join);
    } else {
      message.join = undefined;
    }
    if (object.answer !== undefined && object.answer !== null) {
      message.answer = SessionDescription.fromJSON(object.answer);
    } else {
      message.answer = undefined;
    }
    if (object.offer !== undefined && object.offer !== null) {
      message.offer = SessionDescription.fromJSON(object.offer);
    } else {
      message.offer = undefined;
    }
    if (object.trickle !== undefined && object.trickle !== null) {
      message.trickle = TrickleRequest.fromJSON(object.trickle);
    } else {
      message.trickle = undefined;
    }
    if (object.update !== undefined && object.update !== null) {
      message.update = ParticipantUpdate.fromJSON(object.update);
    } else {
      message.update = undefined;
    }
    if (object.trackPublished !== undefined && object.trackPublished !== null) {
      message.trackPublished = TrackPublishedResponse.fromJSON(object.trackPublished);
    } else {
      message.trackPublished = undefined;
    }
    if (object.negotiate !== undefined && object.negotiate !== null) {
      message.negotiate = NegotiationResponse.fromJSON(object.negotiate);
    } else {
      message.negotiate = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<SignalResponse>): SignalResponse {
    const message = { ...baseSignalResponse } as SignalResponse;
    if (object.join !== undefined && object.join !== null) {
      message.join = JoinResponse.fromPartial(object.join);
    } else {
      message.join = undefined;
    }
    if (object.answer !== undefined && object.answer !== null) {
      message.answer = SessionDescription.fromPartial(object.answer);
    } else {
      message.answer = undefined;
    }
    if (object.offer !== undefined && object.offer !== null) {
      message.offer = SessionDescription.fromPartial(object.offer);
    } else {
      message.offer = undefined;
    }
    if (object.trickle !== undefined && object.trickle !== null) {
      message.trickle = TrickleRequest.fromPartial(object.trickle);
    } else {
      message.trickle = undefined;
    }
    if (object.update !== undefined && object.update !== null) {
      message.update = ParticipantUpdate.fromPartial(object.update);
    } else {
      message.update = undefined;
    }
    if (object.trackPublished !== undefined && object.trackPublished !== null) {
      message.trackPublished = TrackPublishedResponse.fromPartial(object.trackPublished);
    } else {
      message.trackPublished = undefined;
    }
    if (object.negotiate !== undefined && object.negotiate !== null) {
      message.negotiate = NegotiationResponse.fromPartial(object.negotiate);
    } else {
      message.negotiate = undefined;
    }
    return message;
  },
  toJSON(message: SignalResponse): unknown {
    const obj: any = {};
    message.join !== undefined && (obj.join = message.join ? JoinResponse.toJSON(message.join) : undefined);
    message.answer !== undefined && (obj.answer = message.answer ? SessionDescription.toJSON(message.answer) : undefined);
    message.offer !== undefined && (obj.offer = message.offer ? SessionDescription.toJSON(message.offer) : undefined);
    message.trickle !== undefined && (obj.trickle = message.trickle ? TrickleRequest.toJSON(message.trickle) : undefined);
    message.update !== undefined && (obj.update = message.update ? ParticipantUpdate.toJSON(message.update) : undefined);
    message.trackPublished !== undefined && (obj.trackPublished = message.trackPublished ? TrackPublishedResponse.toJSON(message.trackPublished) : undefined);
    message.negotiate !== undefined && (obj.negotiate = message.negotiate ? NegotiationResponse.toJSON(message.negotiate) : undefined);
    return obj;
  },
};

export const AddTrackRequest = {
  encode(message: AddTrackRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.cid);
    writer.uint32(18).string(message.name);
    writer.uint32(24).int32(message.type);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): AddTrackRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAddTrackRequest } as AddTrackRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cid = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.type = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): AddTrackRequest {
    const message = { ...baseAddTrackRequest } as AddTrackRequest;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid);
    } else {
      message.cid = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = trackTypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<AddTrackRequest>): AddTrackRequest {
    const message = { ...baseAddTrackRequest } as AddTrackRequest;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid;
    } else {
      message.cid = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    return message;
  },
  toJSON(message: AddTrackRequest): unknown {
    const obj: any = {};
    message.cid !== undefined && (obj.cid = message.cid);
    message.name !== undefined && (obj.name = message.name);
    message.type !== undefined && (obj.type = trackTypeToJSON(message.type));
    return obj;
  },
};

export const TrickleRequest = {
  encode(message: TrickleRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.candidateInit);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): TrickleRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTrickleRequest } as TrickleRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.candidateInit = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): TrickleRequest {
    const message = { ...baseTrickleRequest } as TrickleRequest;
    if (object.candidateInit !== undefined && object.candidateInit !== null) {
      message.candidateInit = String(object.candidateInit);
    } else {
      message.candidateInit = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<TrickleRequest>): TrickleRequest {
    const message = { ...baseTrickleRequest } as TrickleRequest;
    if (object.candidateInit !== undefined && object.candidateInit !== null) {
      message.candidateInit = object.candidateInit;
    } else {
      message.candidateInit = "";
    }
    return message;
  },
  toJSON(message: TrickleRequest): unknown {
    const obj: any = {};
    message.candidateInit !== undefined && (obj.candidateInit = message.candidateInit);
    return obj;
  },
};

export const RemoveTrackRequest = {
  encode(message: RemoveTrackRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.sid);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): RemoveTrackRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRemoveTrackRequest } as RemoveTrackRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): RemoveTrackRequest {
    const message = { ...baseRemoveTrackRequest } as RemoveTrackRequest;
    if (object.sid !== undefined && object.sid !== null) {
      message.sid = String(object.sid);
    } else {
      message.sid = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<RemoveTrackRequest>): RemoveTrackRequest {
    const message = { ...baseRemoveTrackRequest } as RemoveTrackRequest;
    if (object.sid !== undefined && object.sid !== null) {
      message.sid = object.sid;
    } else {
      message.sid = "";
    }
    return message;
  },
  toJSON(message: RemoveTrackRequest): unknown {
    const obj: any = {};
    message.sid !== undefined && (obj.sid = message.sid);
    return obj;
  },
};

export const MuteTrackRequest = {
  encode(message: MuteTrackRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.sid);
    writer.uint32(16).bool(message.muted);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): MuteTrackRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMuteTrackRequest } as MuteTrackRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sid = reader.string();
          break;
        case 2:
          message.muted = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MuteTrackRequest {
    const message = { ...baseMuteTrackRequest } as MuteTrackRequest;
    if (object.sid !== undefined && object.sid !== null) {
      message.sid = String(object.sid);
    } else {
      message.sid = "";
    }
    if (object.muted !== undefined && object.muted !== null) {
      message.muted = Boolean(object.muted);
    } else {
      message.muted = false;
    }
    return message;
  },
  fromPartial(object: DeepPartial<MuteTrackRequest>): MuteTrackRequest {
    const message = { ...baseMuteTrackRequest } as MuteTrackRequest;
    if (object.sid !== undefined && object.sid !== null) {
      message.sid = object.sid;
    } else {
      message.sid = "";
    }
    if (object.muted !== undefined && object.muted !== null) {
      message.muted = object.muted;
    } else {
      message.muted = false;
    }
    return message;
  },
  toJSON(message: MuteTrackRequest): unknown {
    const obj: any = {};
    message.sid !== undefined && (obj.sid = message.sid);
    message.muted !== undefined && (obj.muted = message.muted);
    return obj;
  },
};

export const NegotiationRequest = {
  encode(_: NegotiationRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): NegotiationRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNegotiationRequest } as NegotiationRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): NegotiationRequest {
    const message = { ...baseNegotiationRequest } as NegotiationRequest;
    return message;
  },
  fromPartial(_: DeepPartial<NegotiationRequest>): NegotiationRequest {
    const message = { ...baseNegotiationRequest } as NegotiationRequest;
    return message;
  },
  toJSON(_: NegotiationRequest): unknown {
    const obj: any = {};
    return obj;
  },
};

export const JoinResponse = {
  encode(message: JoinResponse, writer: Writer = Writer.create()): Writer {
    if (message.room !== undefined && message.room !== undefined) {
      RoomInfo.encode(message.room, writer.uint32(10).fork()).ldelim();
    }
    if (message.participant !== undefined && message.participant !== undefined) {
      ParticipantInfo.encode(message.participant, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.otherParticipants) {
      ParticipantInfo.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): JoinResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseJoinResponse } as JoinResponse;
    message.otherParticipants = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.room = RoomInfo.decode(reader, reader.uint32());
          break;
        case 2:
          message.participant = ParticipantInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.otherParticipants.push(ParticipantInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): JoinResponse {
    const message = { ...baseJoinResponse } as JoinResponse;
    message.otherParticipants = [];
    if (object.room !== undefined && object.room !== null) {
      message.room = RoomInfo.fromJSON(object.room);
    } else {
      message.room = undefined;
    }
    if (object.participant !== undefined && object.participant !== null) {
      message.participant = ParticipantInfo.fromJSON(object.participant);
    } else {
      message.participant = undefined;
    }
    if (object.otherParticipants !== undefined && object.otherParticipants !== null) {
      for (const e of object.otherParticipants) {
        message.otherParticipants.push(ParticipantInfo.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<JoinResponse>): JoinResponse {
    const message = { ...baseJoinResponse } as JoinResponse;
    message.otherParticipants = [];
    if (object.room !== undefined && object.room !== null) {
      message.room = RoomInfo.fromPartial(object.room);
    } else {
      message.room = undefined;
    }
    if (object.participant !== undefined && object.participant !== null) {
      message.participant = ParticipantInfo.fromPartial(object.participant);
    } else {
      message.participant = undefined;
    }
    if (object.otherParticipants !== undefined && object.otherParticipants !== null) {
      for (const e of object.otherParticipants) {
        message.otherParticipants.push(ParticipantInfo.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: JoinResponse): unknown {
    const obj: any = {};
    message.room !== undefined && (obj.room = message.room ? RoomInfo.toJSON(message.room) : undefined);
    message.participant !== undefined && (obj.participant = message.participant ? ParticipantInfo.toJSON(message.participant) : undefined);
    if (message.otherParticipants) {
      obj.otherParticipants = message.otherParticipants.map(e => e ? ParticipantInfo.toJSON(e) : undefined);
    } else {
      obj.otherParticipants = [];
    }
    return obj;
  },
};

export const TrackPublishedResponse = {
  encode(message: TrackPublishedResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.cid);
    if (message.track !== undefined && message.track !== undefined) {
      TrackInfo.encode(message.track, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): TrackPublishedResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTrackPublishedResponse } as TrackPublishedResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cid = reader.string();
          break;
        case 2:
          message.track = TrackInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): TrackPublishedResponse {
    const message = { ...baseTrackPublishedResponse } as TrackPublishedResponse;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid);
    } else {
      message.cid = "";
    }
    if (object.track !== undefined && object.track !== null) {
      message.track = TrackInfo.fromJSON(object.track);
    } else {
      message.track = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<TrackPublishedResponse>): TrackPublishedResponse {
    const message = { ...baseTrackPublishedResponse } as TrackPublishedResponse;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid;
    } else {
      message.cid = "";
    }
    if (object.track !== undefined && object.track !== null) {
      message.track = TrackInfo.fromPartial(object.track);
    } else {
      message.track = undefined;
    }
    return message;
  },
  toJSON(message: TrackPublishedResponse): unknown {
    const obj: any = {};
    message.cid !== undefined && (obj.cid = message.cid);
    message.track !== undefined && (obj.track = message.track ? TrackInfo.toJSON(message.track) : undefined);
    return obj;
  },
};

export const NegotiationResponse = {
  encode(_: NegotiationResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): NegotiationResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNegotiationResponse } as NegotiationResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): NegotiationResponse {
    const message = { ...baseNegotiationResponse } as NegotiationResponse;
    return message;
  },
  fromPartial(_: DeepPartial<NegotiationResponse>): NegotiationResponse {
    const message = { ...baseNegotiationResponse } as NegotiationResponse;
    return message;
  },
  toJSON(_: NegotiationResponse): unknown {
    const obj: any = {};
    return obj;
  },
};

export const SessionDescription = {
  encode(message: SessionDescription, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.type);
    writer.uint32(18).string(message.sdp);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SessionDescription {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSessionDescription } as SessionDescription;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.string();
          break;
        case 2:
          message.sdp = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SessionDescription {
    const message = { ...baseSessionDescription } as SessionDescription;
    if (object.type !== undefined && object.type !== null) {
      message.type = String(object.type);
    } else {
      message.type = "";
    }
    if (object.sdp !== undefined && object.sdp !== null) {
      message.sdp = String(object.sdp);
    } else {
      message.sdp = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<SessionDescription>): SessionDescription {
    const message = { ...baseSessionDescription } as SessionDescription;
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = "";
    }
    if (object.sdp !== undefined && object.sdp !== null) {
      message.sdp = object.sdp;
    } else {
      message.sdp = "";
    }
    return message;
  },
  toJSON(message: SessionDescription): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    message.sdp !== undefined && (obj.sdp = message.sdp);
    return obj;
  },
};

export const ParticipantUpdate = {
  encode(message: ParticipantUpdate, writer: Writer = Writer.create()): Writer {
    for (const v of message.participants) {
      ParticipantInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ParticipantUpdate {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParticipantUpdate } as ParticipantUpdate;
    message.participants = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.participants.push(ParticipantInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ParticipantUpdate {
    const message = { ...baseParticipantUpdate } as ParticipantUpdate;
    message.participants = [];
    if (object.participants !== undefined && object.participants !== null) {
      for (const e of object.participants) {
        message.participants.push(ParticipantInfo.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<ParticipantUpdate>): ParticipantUpdate {
    const message = { ...baseParticipantUpdate } as ParticipantUpdate;
    message.participants = [];
    if (object.participants !== undefined && object.participants !== null) {
      for (const e of object.participants) {
        message.participants.push(ParticipantInfo.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: ParticipantUpdate): unknown {
    const obj: any = {};
    if (message.participants) {
      obj.participants = message.participants.map(e => e ? ParticipantInfo.toJSON(e) : undefined);
    } else {
      obj.participants = [];
    }
    return obj;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;