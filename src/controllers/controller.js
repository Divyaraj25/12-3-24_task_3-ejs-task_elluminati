const userModel = require("../models/users");

const homepage = async (req, res) => {
  // let limit = 8
  // let page = req.query.page || 1
  // let skip = (page - 1) * limit

  try {
    const { search } = req.body;
    const data = await userModel.find({
      $or: [
        { username: { $regex: search || "", $options: "i" } },
        { email: { $regex: search || "", $options: "i" } },
        { contact: { $regex: search || "", $options: "i" } },
      ],
    });
    // const users = await userModel.aggregate([
    //   { $skip: skip },
    //   { $limit: limit },
    //   { $sort: { username: -1 } },
    // ]).exec()
    // const count = await userModel.countDocuments()
    // console.log(data);
    // data.forEach((path) => {
    //   path.path = path.path.replace("\\", "/");
    //   path.path = path.path.slice(path.path.search("images"), path.path.length);
    // });
    res.render("index", {
      data,
      // users,
      // page,
      // pages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.log(error);
  }
};

const adduser = async (req, res) => {
  // const {username, email, contact} = req.body
  // const file = req.file
  // const path = file.path
  console.log(req.body);
  console.log(req.file);
  const { username, email, contact } = req.body;
  let path = req.file.path;
  path = path.replace("\\", "/");
  path = path.slice(path.search("images"), path.length);
  // res.send({
  //   username: req.body.username,
  //   email: req.body.email,
  //   contact: req.body.contact,
  //   path,
  // });

  const user = new userModel({
    username,
    email,
    contact,
    path,
  });
  await user.save();
  res.status(201).json({ user, filename: req.file.filename });
};

// const deleteuser = async (req, res) => {
//   try {
//     const id = req.body.id;
//     console.log(id);
//     console.log(req.query);
//     const data = await userModel.deleteOne({ _id: id });
//     res.end();
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getuser = async(req,res)=>{
//   const id = req.body.id
//   console.log(id);
//   const data = await userModel.findOne({_id:id})
//   res.send(data)
// }

const edituser = async (req, res) => {
  const { username, email, contact, id } = req.body;
  console.log(req.body);
  console.log(req.file);
  const old = await userModel.findOne({ _id: id });
  const oldpath = old.path
  // console.log(oldpath, path);
  if(req.file){
    var path = req.file.path;
    path = path.replace("\\", "/");
    path = path.slice(path.search("images"), path.length);
    console.log(path);
  }
  

  const updatedFields = {
    username,
    email,
    contact,
    id,
    path: req.file ? path : oldpath,
  };

  try {
    const editedUser = await userModel.findOneAndUpdate(
      { _id: id },
      updatedFields,
      { new: true }
    );

    if (!editedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(editedUser);
    res.json(editedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
  // -  const updatedfield = req.body;
  // -  console.log(updatedfield);
  // -  const editeduser = await userModel.findOneAndUpdate(
  // -    { _id: req.query.id },
  // -    updatedfield
  // -  );
};

const deleteuser = async (req, res) => {
  const id = req.body.id;
  console.log(id);
  await userModel.findOneAndDelete({ _id: id });
  res.send();
};

// const deleteuser = async (req, res) => {
//   const email = req.query.email;
//   console.log(email);
//   const data = await userModel.deleteOne({ email: email });
//   // res.send(req.body)
//   console.log(data);
//   res.send(data);
//   // res.send(req.params)
//   // console.log(req.params);
//   // console.log(req.query);
//   // console.log(req.body);
// };

module.exports = {
  homepage,
  adduser,
  edituser,
  deleteuser,
};
