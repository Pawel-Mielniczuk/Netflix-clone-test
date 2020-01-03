// Validate the field

const forms = document.querySelectorAll('.validate');
for (let i = 0; i < forms.length; i++) {
  forms[i].setAttribute('novalidate', true);
}

// Validate the field
const hasError = function (field) {

  let validity = field.validity;

  // If valid, return null
  if (validity.valid) return;

  // If field is required and empty
  if (validity.valueMissing) return 'Please fill out this field.';

  // If not the right type
  if (validity.typeMismatch) {
    // Email
    if (field.type === 'email') return 'Please enter an email address.';

  }

  // If too short
  if (validity.tooShort) {
    return (`Please lengthen this text to ${field.getAttribute('minLength')} characters or more. 
              You are currently using ${field.value.length} characters.`);
  }

  // If pattern doesn't match
  if (validity.patternMismatch) {
    // If pattern info is included, return custom error
    if (field.hasAttribute('title')) return field.getAttribute('title');

    // Otherwise, generic error
    return 'Please match the requested format.';
  }

  // If all else fails, return a generic catchall error
  return 'The value you entered for this field is invalid.';
};


function showError(field, error) {
  field.classList.add('error');

  let id = field.id || field.name;
  if (!id) return;

  let message = field.form.querySelector('.error-message#error-for-' + id);
  if (!message) {
    message = document.createElement('div');
    message.className = 'error-message';
    message.id = 'error-for-' + id;
    field.parentNode.insertBefore(message, field.nextSibling);
  }

  message.innerHTML = error;

  message.style.display = 'block';
  message.style.visibility = 'visible';
};

function removeError(field) {
  field.classList.remove('error');

  let id = field.id || field.name;
  if (!id) return;

  let message = field.form.querySelector('.error-message#error-for-' + id + '');
  if (!message) return;

  message.innerHTML = '';
  message.style.display = 'none';
  message.style.visibility = 'hidden';
};

// Listen to all blur events
document.addEventListener('blur', function (event) {
  if (!event.target.form.classList.contains('validate')) return;

  let error = hasError(event.target);

  if (error) {
    showError(event.target, error);
    return;
  }
  removeError(event.target);
}, true);



document.addEventListener('submit', function (event) {

  if (!event.target.classList.contains('validate')) return;

  let fields = event.target.elements;

  let error, hasErrors;
  for (let i = 0; i < fields.length; i++) {
    error = hasError(fields[i]);
    if (error) {
      showError(fields[i], error);
      if (!hasErrors) {
        hasErrors = fields[i];
      }
    }
  }

  if (hasErrors) {
    event.preventDefault();
    hasErrors.focus();
  }


}, false);