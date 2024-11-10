import React from 'react';
import Button from '../Button/Button';

const ProfileForm = ({ fields, userData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="profile-form">
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type || "text"}
            id={field.name}
            name={field.name}
            value={userData[field.name]}
            onChange={handleChange}
          />
        </div>
      ))}
      <Button type="submit" btn_class="btn-save" text="Guardar cambios" />
    </form>
  );
};

export default ProfileForm;