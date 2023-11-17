class cButton extends HTMLElement {
    constructor() {
        super();

        // Detect whether we have SSR content already:
        if (this.shadowRoot) {
            // A Declarative Shadow Root exists!
            // wire up event listeners, references, etc.:
            const button = this.shadowRoot.querySelector('button');
            button.addEventListener('click', this._handleClick.bind(this));
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
        console.log('Custom c-button added to page.');
    }
    disconnectedCallback() {
        window.removeEventListener('click', this._handleClick);
        console.log('Custom c-button removed from page.');
    }
}

customElements.define('c-button', cButton);