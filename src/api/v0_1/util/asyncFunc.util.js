/**
 * @param {Function} func 
 */
function asyncFunc(func) {
  return async (req, res, next) => {
    try {
			await func(req, res, next);
    } catch (e) {
      console.error(e);
    }
    return;
  };
}
export default asyncFunc;
