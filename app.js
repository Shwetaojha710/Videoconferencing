const { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate } = require('wrtc');

// Example of creating a simple peer connection
const peerConnection = new RTCPeerConnection();

peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
        console.log('New ICE candidate:', event.candidate);
    }
};

// Example to create an offer and set up signaling (simplified)
async function createOffer() {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    console.log('Created offer:', offer);
}

createOffer().catch(console.error);
