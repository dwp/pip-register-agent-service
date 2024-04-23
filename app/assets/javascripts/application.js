//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  // Add JavaScript here
})

import CopyCodeButton from './copy-code-button';

document.querySelectorAll('.app-example__copy-code-button').forEach((button) => {
  new CopyCodeButton(button).init();
});