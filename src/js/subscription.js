import { subscribe } from './api.js';

const subscriptionForm = document.querySelector('.footer-form');
const emailInput = document.querySelector('.footer-input');
const submitButton = document.querySelector('#subscribeBtn');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function getStatusNode() {
  if (!subscriptionForm) return null;
  return subscriptionForm.querySelector('.footer-form__status');
}

function showStatus(message, type) {
  const statusNode = getStatusNode();
  if (!statusNode) return;

  statusNode.textContent = message;
  statusNode.className = 'footer-form__status';

  if (type) {
    statusNode.classList.add(`is-${type}`);
  }
}

function clearStatus() {
  showStatus('', '');
}

function setInvalidState(message) {
  if (!emailInput) return;

  emailInput.classList.add('is-invalid');
  emailInput.setAttribute('aria-invalid', 'true');
  showStatus(message, 'error');
}

function clearInvalidState() {
  if (!emailInput) return;

  emailInput.classList.remove('is-invalid');
  emailInput.removeAttribute('aria-invalid');
}

function setSubmitting(isSubmitting) {
  if (submitButton) {
    submitButton.disabled = isSubmitting;
    submitButton.textContent = isSubmitting ? 'Sending...' : 'Send';
  }

  if (emailInput) {
    emailInput.disabled = isSubmitting;
  }
}

function isValidEmail(email) {
  return EMAIL_PATTERN.test(email);
}

function getSubscribeErrorMessage(error) {
  if (error?.status === 409) {
    return 'This email is already subscribed.';
  }

  if (error?.status === 400) {
    return 'Please provide a valid email address.';
  }

  return 'Subscription failed. Please try again later.';
}

export function initSubscription() {
  if (!subscriptionForm || !emailInput) return;

  emailInput.addEventListener('input', () => {
    clearInvalidState();
    clearStatus();
  });

  subscriptionForm.addEventListener('submit', async event => {
    event.preventDefault();

    const email = emailInput.value.trim().toLowerCase();

    if (!email) {
      setInvalidState('Please enter your email.');
      return;
    }

    if (!emailInput.checkValidity() || !isValidEmail(email)) {
      setInvalidState('Please enter a valid email address.');
      return;
    }

    clearInvalidState();
    showStatus('Sending subscription...', 'pending');
    setSubmitting(true);

    try {
      await subscribe(email);
      subscriptionForm.reset();
      showStatus('Thanks! You are subscribed.', 'success');
    } catch (error) {
      showStatus(getSubscribeErrorMessage(error), 'error');
    } finally {
      setSubmitting(false);
    }
  });
}
