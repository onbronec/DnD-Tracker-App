import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles.css';

// Global listener to dynamically assign hover title tooltips to all inputs, selects, and textareas
document.addEventListener('mouseover', (event) => {
  const target = event.target as HTMLElement;
  if (!target) return;

  const isInput = target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA';
  if (!isInput) return;

  // Do not overwrite an existing explicit title
  if (target.getAttribute('title')) return;

  let description = '';

  // 1. Try placeholder attribute
  const placeholder = target.getAttribute('placeholder');
  if (placeholder) {
    description = placeholder;
  }

  // 2. Try parent label text (e.g. <label><span>Name</span><input /></label> or <label><input /> Name</label>)
  if (!description) {
    const parentLabel = target.closest('label');
    if (parentLabel) {
      const labelText = Array.from(parentLabel.childNodes)
        .filter(node => node !== target && (node.nodeType === Node.TEXT_NODE || (node as HTMLElement).tagName === 'SPAN'))
        .map(node => node.textContent || '')
        .join('')
        .trim();
      if (labelText) {
        description = labelText.replace(/:$/, '').trim();
      }
    }
  }

  // 3. Try previous sibling text (e.g. <span>Name</span> <input />)
  if (!description) {
    const prevSibling = target.previousElementSibling;
    if (prevSibling && (prevSibling.tagName === 'SPAN' || prevSibling.tagName === 'LABEL')) {
      description = prevSibling.textContent?.trim() || '';
    }
  }

  // 4. Try aria-label or name attributes
  if (!description) {
    description = target.getAttribute('aria-label') || target.getAttribute('name') || '';
  }

  // 5. Fallback description based on element type
  if (!description) {
    if (target.tagName === 'SELECT') {
      description = 'Select option';
    } else if (target.tagName === 'TEXTAREA') {
      description = 'Text area';
    } else {
      const type = target.getAttribute('type') || 'text';
      description = `${type.charAt(0).toUpperCase() + type.slice(1)} field`;
    }
  }

  if (description) {
    target.setAttribute('title', description);
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
