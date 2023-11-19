// Create a class for the element
class PopupInfo extends HTMLElement {
  constructor() {
    // Always call super first in constructor

    self = super();
  }
  render() {
    // Create a shadow root
    const contents = Array.from(self.querySelectorAll("*"));

    var elem = self.querySelector("img").getBoundingClientRect();
    let right = null;
    if (window.innerWidth / 2 <= elem.left) {
      right = 0;
    }
    const shadow = this.attachShadow({ mode: "open" });

    // Create spans
    const wrapper = document.createElement("span");
    wrapper.setAttribute("class", "wrapper");

    const icon = document.createElement("span");
    icon.setAttribute("class", "icon");
    icon.setAttribute("tabindex", 0);
    const info = document.createElement("span");
    info.setAttribute("class", "info");

    // Take attribute content and put it inside the info span
    const text = this.getAttribute("data-text");
    const isHTML = this.getAttribute("data-html");

    if (isHTML) {
      info.innerHTML = text;
    } else {
      info.textContent = text;
    }
    // Create some CSS to apply to the shadow dom
    const style = document.createElement("style");

    const theme = this.getAttribute("theme");
    if (theme == 'dark') {
      style.textContent += `
        :host {
            --color: white;
            --bg-color: #1d1d1f;
        }`;
    }
    else {
      style.textContent += `
        :host {
            --text-color: #1d1d1f;
            --bg-color: white;
        }`;
    }
    style.textContent += `
      
      .wrapper {
        position: relative;
      }

      .info {
        font-size: 0.8rem;
        width: 320px;
        display: inline-block;
        border: 1px solid var(--bg-color));
        padding: 1rem;
        background: var(--bg-color);
        color: var(--color);
        border-radius: 0.125rem;
        opacity: 0;
        transition: 0.6s all;
        text-align:left;
        position: absolute;
        right: ${right};
        top: 100%;
        z-index: 3;
        box-shadow: 0 2px 0.5rem rgba(0,0,0,0.16);
        display: none;
      }

      img {
        width: 1.2rem;
      }
      .icon{
        width: 18px;
        height:18px;
        display: inline-block;
        & img {
          width: 18px;
        height:18px;
        }
      }
      .icon:hover{
          cursor: pointer;
      }
      .icon:hover + .info, .icon:focus + .info {
        opacity: 1;
        display: inline-block;
      }
    `;

    // Attach the created elements to the shadow dom

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(icon);
    wrapper.appendChild(info);
    contents.forEach((el) => {
      icon.appendChild(el);
    });
  }
  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }
}

customElements.define("popup-info", PopupInfo);