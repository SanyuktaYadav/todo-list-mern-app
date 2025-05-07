import { useState } from "react";

export const useValidation = () => {
  const [errors, setErrors] = useState({});

  const checkValidation = async (schema, formFields, name, value) => {
    try {
      let validData;

      if (name) {
        validData = await schema.validateAt(name, { [name]: value });
        setErrors((prev) => ({ ...prev, [name]: "" }));
      } else {
        validData = await schema.validate(formFields, { abortEarly: false });
        setErrors({});
      }

      return !!validData;
    } catch (err) {
      if (err.path) {
        setErrors((prev) => ({ ...prev, [err.path]: err.message }));
      }

      if (err.inner) {
        const newErrors = err.inner.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        setErrors((prev) => ({ ...prev, ...newErrors }));
      }

      return false;
    }
  };

  return { checkValidation, errors };
};
