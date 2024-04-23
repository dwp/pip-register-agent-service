function CopyCodeButton($module) {
    this.$module = $module;
  }
  
  CopyCodeButton.prototype.init = function () {
    if (!this.$module) {
      return;
    }
  
    this.$module.addEventListener('click', () => {
      let code;
      this.$module.textContent = 'Code copied';
      setTimeout(() => {
        this.$module.textContent = 'Copy code';
      }, 2000);
      const openPanels = Array.from(document.getElementsByClassName('app-js-visible'));
      openPanels.forEach((el) => {
        const panelCopyBtn = this.$module.dataset.module;
        if (el.id === panelCopyBtn) {
          code = el.querySelector('pre').textContent;
          navigator.clipboard.writeText(code);
        }
      });
    });
  };
  
  export default CopyCodeButton;