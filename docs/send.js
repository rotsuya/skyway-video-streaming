const platform = navigator.platform;
const isIos = platform === 'iPhone' || platform === 'iPad' || platform === 'iPod';
const isAndroid = /Android/.test(navigator.userAgent);
const isMobile = isIos || isAndroid;
const mediaConstraints = {
    audio: true,
    video: true
};
if (isMobile) {
    mediaConstraints.video = {
        advanced: [
            { facingMode: 'environment' }
        ]
    };
}

const argObj = { localPeerId: PARENT, mediaConstraints };

function gUMAsync(argObj) {
    return new Promise((resolve, reject) => {
        const mediaConstraints = argObj.mediaConstraints;
        navigator.mediaDevices.getUserMedia(mediaConstraints)
            .then(localStream => {
                video.srcObject = localStream;
                argObj.localStream = localStream;
                resolve(argObj);
            })
            .catch(error => {
                reject(error);
            })
    });
}

gUMAsync(argObj)
    .then(newPeerAsync)
    .then(joinRoomAsync)
    .then(() => {
        html.classList.remove('waitingLocalStream');
        html.classList.add('shooting');
    })
    .catch(error => {
        console.error(error);
        alert('Error has occurred. (' + error + ')');
        location.href = './';
    });
