const fs = require('fs');

app.get("/forms.html", (req, res) =>{
      res.sendFile("forms.html")
});
