const { ObjectId } = require("mongodb");

function UserInformation (UserInfo , app){
  
    app.post("/userInfo", async (req, res) => {
        const data = req.body;
        console.log(data);
        const result = await UserInfo.insertOne(data);
        res.send(result);
      });
      app.get('/userInfo' , async (req , res )=>{
        const data = req.body;
        const cursor = await UserInfo.find(data).toArray();
        res.send(cursor);
      })
      app.get('/userInfo/:id' , async (req , res )=>{
        const { id } = req.params; 
          const cursor = await UserInfo.find({ _id: new ObjectId(id)  }).toArray(); 
          res.send(cursor);
      })

      app.put("/userInfo/:id", async (req, res) => {
        const { id } = req.params;
        const { status } = req.body; // Extract status from request body
      
        if (!ObjectId.isValid(id)) {
          return res.status(400).send("Invalid ID format");
        }
      
        try {
          const result = await UserInfo.updateOne(
            { _id: new ObjectId(id) }, // Find the booking by ID
            { $set: { status: status } } // Update the status
          );
          if (result.matchedCount === 0) {
            return res.status(404).send("Booking not found");
          }
          res.send(result);
        } catch (error) {
          console.error("Error updating booking:", error);
          res.status(500).send("Internal Server Error");
        }
      });

}

module.exports  = UserInformation;