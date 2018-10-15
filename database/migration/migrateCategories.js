const CategoriesData = require('../data/categories');
const { Category } = require('../associate');

(function migrateCategories(categoriesData) {
  Category.bulkCreate(categoriesData.map(record => ({ category_name: record.strCategory })));
})(CategoriesData);
