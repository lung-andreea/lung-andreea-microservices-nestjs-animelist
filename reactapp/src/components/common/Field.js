import React from "react";
import PropTypes from "prop-types";

const ENTER = 13;

const Field = ({
  label,
  inputType,
  inputValue,
  onInputValueChange,
  icon,
  iconPosition,
  iconAction,
  placeholderText,
}) => {
  const onKeyUp = (event) => {
    if (event.keyCode === ENTER) {
      iconAction && iconAction(event.target.value);
    }
  };

  return (
    <div className="field">
      <label htmlFor="" className="label">
        {label}
      </label>
      <div className={`control has-icons-${iconPosition}`}>
        <input
          type={inputType}
          value={inputValue}
          name={inputType}
          onChange={onInputValueChange}
          placeholder={placeholderText}
          className="input"
          required
          onKeyUp={onKeyUp}
        />
        <span className={`icon is-small is-${iconPosition}`}>
          <i className={`fa ${icon}`} />
        </span>
      </div>
      {iconAction && (
        <span onClick={iconAction}>
          {iconAction && <span className={`fa ${icon} search-icon`} />}
        </span>
      )}
    </div>
  );
};

Field.propTypes = {
  label: PropTypes.string,
  inputType: PropTypes.string,
  inputValue: PropTypes.string,
  onInputValueChange: PropTypes.func,
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  iconAction: PropTypes.func,
  placeholderText: PropTypes.string,
};

export default Field;
