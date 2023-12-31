// Create a class for the element
class Tooltip extends HTMLElement {
  constructor() {
    // Always call super first in constructor

    self = super();
  }

  connectedCallback() {
    // Create a shadow root
    const contents = Array.from(self.querySelectorAll("*"));

    const shadow = this.attachShadow({ mode: "open" });

    // Create spans
    const wrapper = document.createElement("span");
    wrapper.setAttribute("class", "wrapper");

    const icon = document.createElement("span");
    icon.setAttribute("class", "icon");
    icon.setAttribute("tabindex", 0);

    const info = document.createElement("span");
    info.setAttribute("class", "info");

    const img = document.createElement("img");
    img.setAttribute("class", "icon-image");
    img.src = "help-icon.svg";
    img.alt = "info";

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

    style.textContent = `
        :host{
            
        }
        .wrapper {
          position: relative;
        }
  
        .info {
          font-size: 0.8rem;
          width: 320px;
          display: inline-block;
          border: 1px solid #1d1d1f;
          padding: 0.25rem 0.5rem;
          background: white;
          border-radius: 0.125rem;
          opacity: 0;
          transition: 0.6s all;
          position: absolute;
          top: 100%;
          z-index: 3;
          box-shadow: 0 2px 0.5rem rgba(0,0,0,0.16);
        }
  
        img {
          width: 1.2rem;
        }
        .icon:hover{
            cursor: pointer;
        }
        .icon:hover + .info, .icon:focus + .info {
          opacity: 1;
        }
      `;

    // Attach the created elements to the shadow dom

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(icon);
    wrapper.appendChild(info);
    icon.appendChild(img);
  }
}

customElements.define("tooltip-info", Tooltip);