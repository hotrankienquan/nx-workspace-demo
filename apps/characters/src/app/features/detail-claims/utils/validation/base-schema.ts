import { FieldType } from "../../types/claims.type";
import * as yup from 'yup';

export const getBaseSchema = (type: FieldType): yup.AnySchema => {
    switch (type) {
        case 'number':
            return yup.number().typeError('Must be a number');
        default:
            return yup.string();
    }
};


