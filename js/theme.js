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
