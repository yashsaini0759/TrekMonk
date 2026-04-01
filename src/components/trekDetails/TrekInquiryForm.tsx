import React, { useState } from 'react';

interface FormData {
  name: string;
  phone: string;
  people: string;
  message: string;
}

const TrekInquiryForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({ name: '', phone: '', people: '2', message: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Enter a valid 10-digit Indian number';
    if (!form.message.trim()) e.message = 'Please share your query';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSuccess(true);
    setForm({ name: '', phone: '', people: '2', message: '' });
    setTimeout(() => setSuccess(false), 5000);
  };

  const change = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  if (success) {
    return (
      <div className="td-section">
        <h2 className="td-section__title">Send an Inquiry</h2>
        <div className="td-form__success">
          We received your inquiry! Our team will contact you within 2 hours.
        </div>
      </div>
    );
  }

  return (
    <div className="td-section">
      <h2 className="td-section__title">Send an Inquiry</h2>
      <form className="td-form" onSubmit={handleSubmit} noValidate>
        <div className="td-form__group">
          <label className="td-form__label">Full Name</label>
          <input className="td-form__input" placeholder="Your name" value={form.name} onChange={change('name')} />
          {errors.name && <span className="td-form__error">{errors.name}</span>}
        </div>
        <div className="td-form__group">
          <label className="td-form__label">Phone Number</label>
          <input className="td-form__input" placeholder="10-digit mobile" value={form.phone} onChange={change('phone')} maxLength={10} />
          {errors.phone && <span className="td-form__error">{errors.phone}</span>}
        </div>
        <div className="td-form__group">
          <label className="td-form__label">Number of People</label>
          <select className="td-form__select" value={form.people} onChange={change('people')}>
            {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="td-form__group">
          <label className="td-form__label">Message / Query</label>
          <textarea className="td-form__textarea" placeholder="Any specific requirement or question..." value={form.message} onChange={change('message')} />
          {errors.message && <span className="td-form__error">{errors.message}</span>}
        </div>
        <button type="submit" className="td-form__submit">Submit Inquiry</button>
      </form>
    </div>
  );
};

export default TrekInquiryForm;
