import { baseTypes } from './types/base';
import { advancedTypes, baseType, arrayType } from './types/advanced';

export const types = {
  ...baseTypes,
  ...advancedTypes
};
