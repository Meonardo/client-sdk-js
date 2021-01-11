import {
  AudioTrack,
  connect,
  createLocalTracks,
  LocalAudioTrack,
  LocalDataTrack,
  LocalVideoTrack,
  LogLevel,
  Participant,
  ParticipantEvent,
  RemoteDataTrack,
  RemoteParticipant,
  RemoteTrack,
  Room,
  RoomEvent,
  Track,
  VideoTrack,
} from '../src/index';

let $ = function (id: string) {
  return document.getElementById(id);
};

declare global {
  interface Window {
    connectToRoom: any;
    toggleVideo: any;
    enterText: any;
  }
}

function appendLog(...args: any[]) {
  const logger = $('log')!;
  for (var i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] == 'object') {
      logger.innerHTML +=
        (JSON && JSON.stringify
          ? JSON.stringify(arguments[i], undefined, 2)
          : arguments[i]) + ' ';
    } else {
      logger.innerHTML += arguments[i] + ' ';
    }
  }
  logger.innerHTML += '\n';
  (() => {
    logger.scrollTop = logger.scrollHeight;
  })();
}

function trackSubscribed(
  div: HTMLDivElement,
  track: Track,
  participant: Participant
): HTMLMediaElement | null {
  appendLog('track subscribed', track);
  if (track instanceof AudioTrack || track instanceof VideoTrack) {
    const element = track.attach();
    div.appendChild(element);
    return element;
  }
  return null;
}

function trackUnsubscribed(track: RemoteTrack, participant: Participant) {
  appendLog('track unsubscribed', track.sid);
  if (track instanceof AudioTrack || track instanceof VideoTrack) {
    track.detach().forEach((element) => element.remove());
  }
}

function handleMessage(
  msg: string | ArrayBuffer,
  track: RemoteDataTrack,
  participant: RemoteParticipant
) {
  if (track.name === 'chat') {
    const chat = <HTMLTextAreaElement>$('chat');
    chat.value += `${participant.name}: ${msg}\n`;
  }
}

function participantConnected(participant: RemoteParticipant) {
  appendLog('participant', participant.sid, 'connected');

  const div = document.createElement('div');
  div.id = participant.sid;
  div.innerText = participant.name;
  div.className = 'col-md-6 video-container';
  $('remote-area')?.appendChild(div);

  participant.on(ParticipantEvent.TrackSubscribed, (track) =>
    trackSubscribed(div, track, participant)
  );
  participant.on(ParticipantEvent.TrackUnsubscribed, (track) =>
    trackUnsubscribed(track, participant)
  );

  Object.values(participant.tracks).forEach((publication) => {
    if (!publication.isSubscribed) return;
    if (publication.track! instanceof RemoteDataTrack) {
    } else {
      trackSubscribed(div, publication.track!, participant);
    }
  });
}

function participantDisconnected(participant: RemoteParticipant) {
  appendLog('participant', participant.sid, 'disconnected');

  $(participant.sid)?.remove();
}

let currentRoom: Room;
const chatTrack: LocalDataTrack = new LocalDataTrack({
  name: 'chat',
  ordered: true,
});
let videoTrack: LocalVideoTrack;
let audioTrack: LocalAudioTrack;
window.connectToRoom = () => {
  const host = (<HTMLInputElement>$('host')).value;
  const port = (<HTMLInputElement>$('port')).value;
  const token = (<HTMLInputElement>$('token')).value;

  // participant to div mapping

  connect({ host: host, port: parseInt(port) }, token, {
    logLevel: LogLevel.debug,
  })
    .then((room) => {
      appendLog('connected to room', room.name);
      $('toggle-video-button')!.removeAttribute('disabled');
      $('connect-button')!.setAttribute('disabled', 'true');
      currentRoom = room;

      room
        .on(RoomEvent.ParticipantConnected, participantConnected)
        .on(RoomEvent.ParticipantDisconnected, participantDisconnected)
        .on(RoomEvent.TrackMessage, handleMessage);

      room.localParticipant.publishTrack(chatTrack);

      appendLog('room participants', Object.keys(room.participants));
      Object.values(room.participants).forEach((participant) => {
        participantConnected(participant);
      });

      // publish video
      const div = <HTMLDivElement>$('local-video');
      createLocalTracks().then((tracks) => {
        currentRoom.localParticipant.publishTracks(tracks);
        for (const track of tracks) {
          if (track instanceof LocalVideoTrack) {
            videoTrack = track;
          } else if (track instanceof LocalAudioTrack) {
            audioTrack = track;
          }
          // skip adding local audio track, to avoid your own sound
          // only process local video tracks
          if (track.kind !== Track.Kind.Video) {
            continue;
          }
          const element = trackSubscribed(
            div,
            track,
            currentRoom.localParticipant
          );
          // flip video
          if (element) element.style.transform = 'scale(-1, 1)';
        }
      });
    })
    .catch((reason) => {
      console.error('error connecting to room', reason);
    });
};

window.toggleVideo = () => {
  if (!currentRoom) return;
  const video = <HTMLVideoElement>document.querySelector('#local-video video');
  if (videoTrack.isMuted) {
    videoTrack.mute();
    // hide from display
    if (video) {
      video.style.display = 'none';
    }

    // const tracks: LocalTrack[] = [];
    // for (const publication of currentRoom.localParticipant.getTracks()) {
    //   const localPublication = <LocalTrackPublication>publication;
    //   tracks.push(localPublication.track!);
    //   currentRoom.localParticipant.unpublishTracks(tracks);
    // }
    // const video = <HTMLVideoElement>(
    //   document.querySelector('#local-video video')
    // );
    // if (video) {
    //   video.remove();
    // }
  } else {
    videoTrack.unmute();
    if (video) {
      video.style.display = '';
    }
  }
};

window.enterText = () => {
  const textField = <HTMLInputElement>$('entry');
  if (textField.value) {
    chatTrack.send(textField.value);
    (<HTMLTextAreaElement>$('chat')).value += `me: ${textField.value}\n`;
    textField.value = '';
  }
};
