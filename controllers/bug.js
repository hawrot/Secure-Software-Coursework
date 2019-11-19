exports.getAddBug = (req, res, next) =>{
  res.render('add-bug', {
      pageTitle : 'Add a bug',
      path : '/add-bug'
  }) ;
};