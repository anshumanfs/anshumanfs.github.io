// Theme follows the OS by default. The header toggle cycles
// system -> light -> dark and remembers the choice in this browser.
// Loaded in <head> so a saved choice applies before the first paint.
(function () {
    var root = document.documentElement;
    var order = ['system', 'light', 'dark'];
    var labels = {
        system: 'Theme: system (click for light)',
        light: 'Theme: light (click for dark)',
        dark: 'Theme: dark (click for system)'
    };
    var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

    function saved() {
        try {
            var value = localStorage.getItem('theme');
            return value === 'light' || value === 'dark' ? value : 'system';
        } catch (e) {
            return 'system';
        }
    }

    function apply(choice) {
        if (choice === 'system') {
            root.removeAttribute('data-theme');
        } else {
            root.setAttribute('data-theme', choice);
        }
        root.setAttribute('data-theme-choice', choice);

        var dark = choice === 'dark' || (choice === 'system' && media && media.matches);
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', dark ? '#1f1e1d' : '#ebe7e1');

        var button = document.querySelector('.theme-toggle');
        if (button) {
            button.setAttribute('aria-label', labels[choice]);
            button.setAttribute('title', labels[choice]);
        }
    }

    var current = saved();
    apply(current);

    if (media && media.addEventListener) {
        media.addEventListener('change', function () {
            if (current === 'system') apply('system');
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        var button = document.querySelector('.theme-toggle');
        if (!button) return;
        apply(current);
        button.addEventListener('click', function () {
            current = order[(order.indexOf(current) + 1) % order.length];
            try {
                if (current === 'system') {
                    localStorage.removeItem('theme');
                } else {
                    localStorage.setItem('theme', current);
                }
            } catch (e) { }
            apply(current);
        });
    });
})();

// On narrow screens the primary nav collapses behind a menu button. The button is
// added here so every page sharing the header gets it; without JS the nav stays visible.
document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('.site-header');
    var nav = header && header.querySelector('.site-nav');
    if (!nav) return;

    nav.id = nav.id || 'site-nav';
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'menu-toggle';
    button.setAttribute('aria-controls', nav.id);
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open menu');
    button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path class="bar-top" d="M4 7h16"/><path class="bar-mid" d="M4 12h16"/><path class="bar-bottom" d="M4 17h16"/></svg>';
    nav.parentNode.insertBefore(button, nav);
    header.classList.add('has-menu');

    function setOpen(open) {
        header.classList.toggle('is-open', open);
        button.setAttribute('aria-expanded', open ? 'true' : 'false');
        button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    button.addEventListener('click', function () {
        setOpen(!header.classList.contains('is-open'));
    });
    nav.addEventListener('click', function (event) {
        if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && header.classList.contains('is-open')) {
            setOpen(false);
            button.focus();
        }
    });
    if (window.matchMedia) {
        var wide = window.matchMedia('(min-width: 48rem)');
        var close = function () { if (wide.matches) setOpen(false); };
        if (wide.addEventListener) wide.addEventListener('change', close);
    }
});
