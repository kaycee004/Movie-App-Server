const Movie = require("../models/movie");
const customError = require("../utils/customError");

const allBookmarks = async (req, res) => {
    const { userId } = req.user;
    const bookmarks = await Movie.find({ bookmarkedBy: userId })
  res.status(200).json({
    data: bookmarks,
  });
};

const addBookmark = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;

  const movie = await Movie.findOneAndUpdate(
    { _id: id },
    { $push: { bookmarkedBy: userId } }
  );

  if (!movie) {
    return next(customError(`No Movie with ID:${id}`, 400));
  }

  res.status(200).json({
    message: "Movie bookmarked",
  });
};

const removeBookmark = async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.user;
  
    const movie = await Movie.findOneAndUpdate(
      { _id: id },
      { $pull: { bookmarkedBy: userId } }
    );
  
    if (!movie) {
      return next(customError(`No Movie with ID:${id}`, 400));
    }

  res.status(200).json({
    message: "Bookmark Removed",
  });
};

module.exports = { allBookmarks, addBookmark, removeBookmark };



// const hasBeenBookmarked = await Movie.findOne({ _id: id, bookmarkedBy: userId })


// (!hasBeenBookmarked) { return next(customError("You haven't this", 400))}