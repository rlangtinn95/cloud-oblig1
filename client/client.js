const APIurl = "https://oblig1ri.herokuapp.com/user";

function clientTimestamp(sentTimestamp) {

      var receivedTimestamp = Date.now();
  
      return {client_received_timestamp: receivedTimestamp, client_sent_timestamp: sentTimestamp, client_latency: receivedTimestamp - sentTimestamp}
}

function calculateAndDisplayLatency(clientTimestamps, serverTimestamps, action="") {
      var roundTrip = clientTimestamps.client_latency - serverTimestamps.server_latency;

      var latencyOutput  = "Round-trip Latency: "+roundTrip+"ms";
      latencyOutput     += "<br>Server Latency: "+serverTimestamps.server_latency+"ms";
      latencyOutput     += "<br>Client Latency: "+clientTimestamps.client_latency+"ms";

      if(action)
            latencyOutput += "<br>Action: "+action;

      document.getElementById("latency").innerHTML = latencyOutput;
}

async function updateUser(firstName, surName, studentID, age, nationality, degree){
      var data = JSON.stringify({   "filter": {"student_id": studentID},
                                    "firstname": firstName,
                                    "surname": surName,
                                    "student_id": studentID,
                                    "age": age,
                                    "nationality": nationality,
                                    "degree": degree
                              });

      let dataReceived = ""; 
      await fetch(APIurl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: data
      })
      .then(resp => {
            if (resp.status === 200) {
                  return resp.json();
            } else {
                  console.log("Status: " + resp.status);
                  return Promise.reject("server");
            }
      })
      .then(dataJson => {
            dataReceived = dataJson; // Already parsed for some reason??
      })
      .catch(err => {
            if (err === "server") return
            console.log(err);
      });

      return dataReceived;
}

async function deleteUser(studentID){
      var data = JSON.stringify({"filter": {"student_id": studentID}});

      let dataReceived = ""; 
      await fetch(APIurl, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: data
      })
      .then(resp => {
            if (resp.status === 200) {
                  return resp.json();
            } else {
                  console.log("Status: " + resp.status);
                  return Promise.reject("server");
            }
      })
      .then(dataJson => {
            dataReceived = dataJson; // Already parsed for some reason??
      })
      .catch(err => {
            if (err === "server") return
            console.log(err);
      });

      return dataReceived;
}

async function readUser(studentID){
      let dataReceived = "";
      await fetch(APIurl+"?student_id="+studentID)
      .then(resp => {
            if (resp.status === 200) {
                  return resp.json();
            } else {
                  console.log("Status: " + resp.status);
                  return Promise.reject("server");
            }
      })
      .then(dataJson => {
            dataReceived = dataJson; // Already parsed for some reason??
      })
      .catch(err => {
            if (err === "server") return
            console.log(err);
      });

      return dataReceived;
}