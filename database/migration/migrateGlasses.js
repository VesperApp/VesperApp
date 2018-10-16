const GlassesData = require('../data/glasses');
const { Glass } = require('../associate');

(function migrateGlasses(glassesData) {
  Glass.bulkCreate(glassesData.map(record => ({ glass_name: record.strGlass })));
})(GlassesData);
