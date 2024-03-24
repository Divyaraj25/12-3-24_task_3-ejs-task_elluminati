const userModel = require("../models/users");

const homepage = async (req, res) => {
  let limit = 5;
  let page = req.query.page || 1;
  let skip = (page - 1) * limit;
  let count = await userModel.countDocuments();
  let pages = Math.ceil(count / limit);

  console.log(pages);
  console.log(count);

  try {
    const data = await userModel.find().skip(skip).limit(limit).exec();
    res.render("index", {
      data,
      pages,
      count,
    });
  } catch (error) {
    console.log(error);
  }
};

const searchuser = async (req, res) => {
  let { search } = req.query;
  console.log(search);
  try {
    if (!search) {
      var user = await userModel.find();
    } else {
      console.log(typeof search);
      const firstChar = search.charAt(0);
      console.log(firstChar);
      const searching = firstChar.match(/[0-9]+/g);
      console.log(searching);
      if (searching == null) {
        var searchalphabet = search;
      } else {
        var searchnumber = parseInt(search);
      }
      var user = await userModel.find({
        $or: [
          { username: { $regex: `${searchalphabet}`, $options: "i" } },
          { email: { $regex: `${searchalphabet}`, $options: "i" } },
          { contact: { $eq: searchnumber } },
        ],
      });
    }
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

const adduser = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    const { username, email, contact } = req.body;
    let path = req.file.path;
    path = path.replace("\\", "/");
    path = path.slice(path.search("images"), path.length);

    const user = new userModel({
      username,
      email,
      contact,
      path,
    });
    await user.save();
    const count = await userModel.countDocuments();
    res.status(201).json({ user, filename: req.file.filename, count });
  } catch (e) {
    console.log("error : " + e);
    res
      .status(409)
      .send({ e, email: req.body.email, contact: req.body.contact });
    console.log(e);
  }
};

const edituser = async (req, res) => {
  const { username, email, contact, id } = req.body;
  console.log(req.body);
  console.log(req.file);
  const old = await userModel.findOne({ _id: id });
  const oldpath = old.path;
  if (req.file) {
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
    res.status(409).send(error);
  }
};

const deleteuser = async (req, res) => {
  const id = req.body.id;
  console.log(id);
  await userModel.findOneAndDelete({ _id: id });
  const count = await userModel.countDocuments();
  res.status(200).json(count);
};

module.exports = {
  homepage,
  adduser,
  edituser,
  deleteuser,
  searchuser,
};
