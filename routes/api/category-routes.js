const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories including its associated Products
  Category.findAll({
      include: [
          {
              model: Product,
              attributes: ['id', 'product_name', 'price', 'stock', 'category_id' ]
          }
        ]
    })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value including its products
  Category.findOne({
      where: {
          id: req.params.id
      },
      include: [
            {
                model: Product,
                attributes: ['category_id' ]
            }
        ]
    })
    .then(dbCategoryData => {
        if(!dbCategoryData[0]) {
            res.status(404).json({ message: "No category with this id"});
            return;
        }
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
      category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
        console.log(err);
        res.status(500).json(err);
   });

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
        where: {
            id: req.params.id
        }
    }) 
    .then(dbCategoryData => {
        if(!dbCategoryData[0]) {
            res.status(404).json({ message: "No category with this id"});
            return;
        }
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    // delete a user by its `id` value
    User.destroy({
          where: {
              id: req.params.id
          }
      })  
      .then(dbUserData => {
          if(!dbUserData[0]) {
              res.status(404).json({ message: "No user with this id"});
              return;
          }
          res.json(dbUserData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
  });

module.exports = router;