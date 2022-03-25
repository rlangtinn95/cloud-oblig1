const APIurl = "/user";

function clientTimestamp(sentTimestamp) {

      var receivedTimestamp = Date.now();
  
      return {client_received_timestamp: receivedTimestamp, client_sent_timestamp: sentTimestamp, client_latency: receivedTimestamp - sentTimestamp}
  }

function updateUser(firstName, surName, studentID, age, nationality, degree){
      var data = JSON.stringify({"firstname": firstName, "surname": surName, "student_id": studentID, "age": age, "nationality": nationality, "degree": degree});
      let dataReceived = ""; 
      fetch(APIurl, {
      credentials: "same-origin",
      mode: "same-origin",
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
            dataReceived = JSON.parse(dataJson);
      })
      .catch(err => {
            if (err === "server") return
            console.log(err);
      });

      return dataReceived;
}

function readUser(studentID){
      let dataReceived = ""; 
      fetch("127.0.0.1:5000"+APIurl+"?student_id="+studentID, {
      credentials: "omit",
      mode: "no-cors",
      method: "GET",
      headers: { "Content-Type": "application/json" }
      })
      .then(resp => {
            if (resp.status === 200) {
                  console.log("yeehaw");
                  return resp.json();
            } else {
                  console.log("Status: " + resp.status);
                  return Promise.reject("server");
            }
      })
      .then(dataJson => {
            dataReceived = JSON.parse(dataJson);
      })
      .catch(err => {
            if (err === "server") return
            console.log(err);
      });

      return dataReceived;
}