// quote.js
import { getQuote } from './api.js';

// Поддерживаем цитату одновременно на главной и на странице избранного
// (оба блока имеют одинаковую структуру текста и автора)
const quoteTextEls = document.querySelectorAll(
  '.quote__container p, .favorite-quote__wrapper p'
);
const quoteAuthorEls = document.querySelectorAll('.quote__author-name');

const FALLBACK_TEXT =
  'The only bad workout is the one that didn’t happen.';
const FALLBACK_AUTHOR = 'Unknown';

export async function renderQuote() {
  if (!quoteTextEls.length || !quoteAuthorEls.length) return;

  try {
    const data = await getQuote();

    if (!data || !data.quote) {
      throw new Error('Empty quote');
    }

    quoteTextEls.forEach(node => {
      node.textContent = data.quote;
    });
    quoteAuthorEls.forEach(node => {
      node.textContent = data.author || FALLBACK_AUTHOR;
    });
  } catch (e) {
    quoteTextEls.forEach(node => {
      node.textContent = FALLBACK_TEXT;
    });
    quoteAuthorEls.forEach(node => {
      node.textContent = FALLBACK_AUTHOR;
    });
  }
}
