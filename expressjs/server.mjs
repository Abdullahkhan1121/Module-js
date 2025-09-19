import express from 'express'
import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync("data.json","utf-8"));
let comments = data.comments;

const app = express()
const port = 3000
app.use(express.json())
app.get('/', (req, res) => {
  // Sending emoji in the HTTP response
  res.send('👋 Hello welcome to the emoji server 🚀')
})
 
app.listen(port, () => {
  // Console log with emoji
  console.log(`🚀 Server is running on http://localhost:${port}`)
})

//Show all data
app.get('/comments', (req, res) =>{
  try {

    res.status(200).json({message:"Comments Found",Comment:comments })
  } catch (error) {
    res.status(404).json({message:"Comments Not Found" })
  }
})

// fetch data by specific id
app.get('/comments/:id', (req, res) =>{
  try {
    let id = req.params.id;
    let comment = comments.find((item)=>{
      return item.id==id;
    })
    res.status(200).json({message:"Comment Found",Comment:comment })
  } catch (error) {
    res.status(404).json({message:"Comment Not Found" })
  }
})

// add data to array

app.post('/addcomment', (req, res) =>{
    try {
  let newcomment= req.body;
  let addcomment= comments.push(newcomment);
  if (addcomment) {
    res.status(200).json({message:"Comment Added",Comment:newcomment });
  } else {
    res.status(404).json({message:"Comment Not Added" });
  }
    } catch (error) {
      console.log(error);
      res.status(500).json({message:error.message});
    }
  })


//delete data
app.delete('/deletecomment/:id', (req, res) => {
  try {
    let id = req.params.id;
    let deletedComment = comments.find((item) => {
      return item.id == id;
    })

    let filteredComments = comments.filter((item)=> {
      return item.id != id;
    })
    console.log(deletedComment)
    comments = filteredComments;

    if (filteredComments) {
      res.status(200).json({ message: "Comment deleted successfully", Comment: deletedComment });
    }
    else {
      res.status(404).json({ message: "Comment cann't be deleted!" });
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
})

//Edit Data

app.put('/editcomment/:id', (req, res) => {
  try {
    let id = req.params.id;
    let updatedData = req.body;

    // find the index of the comment
    let index = comments.findIndex((item) => item.id == id);

    if (index !== -1) {
      // merge old comment with new data
      comments[index] = { ...comments[index], ...updatedData };

      res.status(200).json({
        message: "Comment updated successfully",
        Comment: comments[index]
      });
    } else {
      res.status(404).json({ message: "Comment not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});











// // const express = require('express')
// import express from 'express'
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })