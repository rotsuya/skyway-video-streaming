const hash = location.hash.replace(/^#/, '');

function normalizeHash() {
    if (!hash) {
        location.href = './';
    }
    location.hash = '#' + hash.replace(/[^A-Za-z0-9_-]/g, '');
}

normalizeHash();

const APIKEY = '70c9c951-7072-4ce9-bb03-f849849d0974';
const ROOM = hash;
const PARENT = ROOM + '-parent';
const html = document.getElementsByTagName('html')[0];
const video = document.getElementById('video');

function newPeerAsync(argObj) {
    return new Promise((resolve, reject) => {
        const localPeerId = argObj.localPeerId;
        const peer = localPeerId
            ? new Peer(localPeerId, { key: APIKEY })
            : new Peer({ key: APIKEY });
        peer.on('open', () => {
            console.log('peer.id', peer.id);
            argObj.peer = peer;
            resolve(argObj);
        });
        peer.on('error', error => {
            reject(error);
        });
    });
}

function getArgAsObj(args) {
    let argObj = {};
    if (Object.prototype.toString.call(args) === '[object Array]') {
        argObj = args.reduce((accumulator, arg) => {
            return Object.assign(accumulator, arg);
        });
    } else {
        argObj = args;
    }
    return argObj;
}

function joinRoomAsync(args) {
    return new Promise((resolve, reject) => {
        const argObj = getArgAsObj(args);
        const peer = argObj.peer;
        const localStream = argObj.localStream;
        const option = { mode: 'sfu' };
        if (localStream) {
            option.stream = localStream;
        }
        const room = peer.joinRoom(ROOM, option);
        args.room = room;
        room.on('open', () => {
            resolve(args);
        });
    });
}
