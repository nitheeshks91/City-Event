import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function useLoginForm(onSubmit) {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let newErrors = {};

    // Email validation
    if (!form.email) {
      newErrors.email = t('email_required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = t('invalid_email');
      valid = false;
    }

    // Password validation
    if (!form.password) {
      newErrors.password = t('password_required');
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = t('invalid_password');
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' })); // clear error when typing
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(form);
    }
  };

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
  };
}
