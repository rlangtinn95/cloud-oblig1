function serverTimestamp(receivedTimestamp) {
    var ServerTimestamp = Date.now();
    return {server_received_timestamp: receivedTimestamp, server_sent_timestamp: ServerTimestamp, server_latency: ServerTimestamp - receivedTimestamp}
}

module.exports = serverTimestamp;