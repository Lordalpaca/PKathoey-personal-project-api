export const error = (err, req, res, next) => {
  console.log(err.message);
  res
    .status(err.code || 500)
    .josn({ message: err.message || "Something's wrong" });
}