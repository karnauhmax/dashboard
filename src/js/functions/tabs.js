class Tab {
  constructor(tabSelector) {
    this.tabContainer = document.querySelector(tabSelector);
    this.tabsBtn = this.tabContainer.querySelectorAll(".tabs__btn");
    this.tabsContent = this.tabContainer.querySelectorAll(".tabs__content");
  }

  renderTab() {
    this.tabContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("tabs__btn")) {
        const tabsHandler = (path) => {
          this.tabsContent.forEach((el) => {
            el.classList.remove("tabs__content-active");
          });
          this.tabContainer
            .querySelector(`[data-tabs-target="${path}"]`)
            .classList.add("tabs__content-active");
        };

        const tabsPath = e.target.dataset.tabsPath;
        this.tabsBtn.forEach((el) => {
          el.classList.remove("tabs__btn-active");
        });
        document
          .querySelector(`[data-tabs-path="${tabsPath}"]`)
          .classList.add("tabs__btn-active");
        tabsHandler(tabsPath);
      }
    });
  }
}

export default Tab;
