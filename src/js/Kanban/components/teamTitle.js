import { SELECTORS } from "../../utils/constants.js";
import { $ } from "../../utils/dom.js";

class teamTitle {
  constructor(title) {
    this.container = $(SELECTORS.USER_TITLE);
    this.title = title;
    this.render();
  }

  render() {
    this.container.innerHTML = this.title;
    this.container.dataset.username = this.title;
  }
}

export default teamTitle;
