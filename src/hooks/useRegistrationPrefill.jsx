import { useEffect } from 'react';

/**
 * Universal hook for loading prefill into any registration form.
 * 
 * @param {Function} setFormData - your setFormData state updater
 * @param {Function} setStep - your setCurrentStep state updater
 */
export default function useRegistrationPrefill(setFormData, setStep) {
  useEffect(() => {
    try {
      // First check the generic prefill
      const generic = sessionStorage.getItem('registration_prefill');
      if (generic) {
        const parsed = JSON.parse(generic);
        if (parsed?.formData) setFormData(prev => ({ ...prev, ...parsed.formData }));
        if (parsed?.step) setStep(Number(parsed.step));
        sessionStorage.removeItem('registration_prefill');
        return;
      }

      // Otherwise scan for any *_prefill
      const keys = Object.keys(sessionStorage);
      const preKey = keys.find(k => /_prefill$/i.test(k));
      if (preKey) {
        const parsed = JSON.parse(sessionStorage.getItem(preKey));
        if (parsed?.formData) setFormData(prev => ({ ...prev, ...parsed.formData }));
        if (parsed?.step) setStep(Number(parsed.step));
        sessionStorage.removeItem(preKey);
      }
    } catch (err) {
      console.warn('Prefill hook failed', err);
    }
  }, [setFormData, setStep]);
}