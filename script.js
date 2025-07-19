document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Tutorial Tabs
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tutorial-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tab = link.dataset.tab;

            tabLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tab) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Copy Script Button
    const copyScriptButton = document.getElementById('copy-script-button');
    let scriptContent = ''; // Variable to hold the fetched script text

    // Fetch the script from GitHub once and store it
    fetch('https://raw.githubusercontent.com/veriepicc/Serenity-Bloxd/main/dist/Serenity.js')
        .then(response => {
            if (!response.ok) { throw new Error('Network response was not ok'); }
            return response.text();
        })
        .then(text => {
            scriptContent = text;
        })
        .catch(error => {
            console.error('Failed to fetch the script:', error);
            copyScriptButton.innerHTML = 'Error fetching script!';
            copyScriptButton.disabled = true;
        });

    copyScriptButton.addEventListener('click', () => {
        if (!scriptContent) {
            console.error('Script content not loaded yet.');
            return;
        }

        navigator.clipboard.writeText(scriptContent).then(() => {
            const originalText = copyScriptButton.innerHTML;
            copyScriptButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
            
            setTimeout(() => {
                copyScriptButton.innerHTML = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy script to clipboard:', err);
        });
    });

    // Fade-in animations on scroll
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(i => i.classList.remove('active'));

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}); 