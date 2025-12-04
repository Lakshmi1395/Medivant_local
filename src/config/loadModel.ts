import { readdirSync } from 'fs';
import { join } from 'path';
import { sequelize } from './sequelize';

export const loadModels = () => {
  const modelsPath = join(__dirname, '..', 'models');
  const files = readdirSync(modelsPath).filter(f => f.endsWith('.js') || f.endsWith('.ts'));

  const models: Record<string, any> = {};

  for (const file of files) {
    const required = require(join(modelsPath, file));
    const ModelClass = required.default ?? required[Object.keys(required)[0]];

    if (ModelClass && typeof ModelClass.initModel === 'function') {
      try {
        const model = ModelClass.initModel(sequelize);
        models[model.name] = model;
        // console.log(`Loaded model: ${model.name} (from ${file})`);
      } catch (err) {
        console.warn(`Failed to init model from file ${file}:`, err && (err as Error).message);
      }
    }
  }

  Object.assign(sequelize.models, models);

  for (const name of Object.keys(models)) {
    const model = models[name];
    if (model && typeof model.associate === 'function') {
      try {
        model.associate(sequelize.models);
        // console.log(`Associated model: ${name}`);
      } catch (err) {
        console.warn(`Warning while associating model ${name}:`, err && (err as Error).message);
      }
    }
  }

  return models;
};
