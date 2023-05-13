import { useState } from 'react';

const SwitchToggle = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className='switch-toggle'>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default SwitchToggle;
