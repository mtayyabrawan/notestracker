function asyncWrapper(fn) {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (error) {
      res.status(500).json({
        resStatus: false,
        error: error.message,
      });
    }
  };
}
export default asyncWrapper;
