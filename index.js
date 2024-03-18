const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://InternshalaImageProject:fO7AwBO2ZNwUWNDG@cluster0.uzun1bo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {

        const InternShalaProject = client.db("Register").collection("ImageUser");
        const InternShalaProjectImage = client.db("Images").collection("Image");

        app.post("/login",async(req,res)=>{
            const{email,password}=req.body;
            InternShalaProject.findOne({email:email})
            .then(user=>{
                if (user) {
                    if (user.password===password) {
                        res.json("Success")
                    }else{
                        res.json("Password Incorrect try again")
                    }
                }else{
                    res.json("You are not register.Please register then try again")
                }
            })
        })

        app.post("/register",async(req,res)=>{
            const NewUser = req.body;
            const result = await InternShalaProject.insertOne(NewUser);
            res.send(result);

        })
        app.post("/images",async(req,res)=>{
            const NewImages = req.body;
            const result = await InternShalaProjectImage.insertOne(NewImages);
            res.send(result);

        })

        app.get("/register", async (req, res) => {
            const result = await InternShalaProject.find().toArray();
            res.send(result);
          });
        app.get("/images", async (req, res) => {
            const result = await InternShalaProjectImage.find().toArray();
            res.send(result);
          });
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
    
    }
  }
  run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Image Api...");
  });
  
  app.listen(port, () => {
    console.log(`Internshala Project server is Running on port ${port}`);
  });
  