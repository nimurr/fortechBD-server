const { ObjectId } = require("mongodb");

function ClientMessageServer (ClientMessage , app){
  
    app.post("/all-client-message", async (req, res) => {
        const data = req.body;
        console.log(data);
        const result = await ClientMessage.insertOne(data);
        res.send(result);
      });
      app.get('/all-client-message' , async (req , res )=>{
        const data = req.body;
        const cursor = await ClientMessage.find(data).toArray();
        res.send(cursor);
      })
      app.get('/all-client-message/:id' , async (req , res )=>{
        const { id } = req.params; 
          const cursor = await ClientMessage.find({ _id: new ObjectId(id)  }).toArray(); 
          res.send(cursor);
      })

      app.put("/all-client-message/:id", async (req, res) => {
        const { id } = req.params;
        const { status } = req.body; // Extract status from request body
      
        if (!ObjectId.isValid(id)) {
          return res.status(400).send("Invalid ID format");
        }
      
        try {
          const result = await ClientMessage.updateOne(
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

      app.delete("/all-client-message/:id", async (req, res) => {
        const { id } = req.params;
    
        if (!ObjectId.isValid(id)) {
          return res.status(400).send("Invalid ID format");
        }
    
        try {
          const result = await ClientMessage.deleteOne({ _id: new ObjectId(id) });
          if (result.deletedCount === 0) {
            return res.status(404).send("Admin not found");
          }
          res.send({ message: "Admin deleted successfully", result });
        } catch (error) {
          console.error("Error deleting admin:", error);
          res.status(500).send("Internal Server Error");
        }
      });

}

module.exports  = ClientMessageServer;