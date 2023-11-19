class cStars extends HTMLElement {
    constructor() {
        self = super();

        // Detect whether we have SSR content already:
        if (this.shadowRoot) {
            // A Declarative Shadow Root exists!
            // wire up event listeners, references, etc.:
            const button = this.shadowRoot.querySelector('button');
            // button.addEventListener('click', this._handleClick.bind(this));
        } else {
            // A Declarative Shadow Root doesn't exist.
            // Create a new shadow root and populate it:
            const shadow = this.attachShadow({ mode: 'open' });
            shadow.innerHTML = `<button><slot></slot></button>`;
            shadow.firstChild.addEventListener('click', this._handleClick.bind(this));
        }
        this.handleAnalytics = this._sendAnalytics.bind(this);
    }
    _handleClick() {
        console.log('clicked');
        this._sendAnalytics('toggle');
    }
    _sendAnalytics(message) {
        setTimeout(() => {
            console.log('Sending analytics data...', message);
        }, 500);
    }

    connectedCallback() {
        console.log('Custom c-stars added to page.');

        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '16');
        svg.setAttribute('height', '16');
        svg.setAttribute('fill', 'currentColor');
        svg.setAttribute('class', 'bi bi-star-fill');
        svg.setAttribute('viewBox', '0 0 16 16');
        svg.setAttribute('part', 'svg');

        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z');

        svg.appendChild(path);

        const stars_value = this.getAttribute('stars');
        const stars_elem = this.shadowRoot.querySelector('.stars');
        for (let i = 0; i < 5; i++) {
            const star_wrapper = document.createElement('div');
            star_wrapper.setAttribute('class', 'star-wrapper');
            star_wrapper.setAttribute('class', 'star');
            if (i + 1 <= stars_value) {
                star_wrapper.classList.add('class', 'star--filled');
            };
            star_wrapper.appendChild(svg.cloneNode(true));
            stars_elem.append(star_wrapper);
        }
    }
    disconnectedCallback() {
        window.removeEventListener('click', this._handleClick);
        console.log('Custom c-stars removed from page.');

    }
}

customElements.define('c-stars', cStars);