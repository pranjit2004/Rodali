 // Central View Manager
        function switchView(viewName) {
            // Panels
            const panels = {
                simple: document.getElementById('panel-simple'),
                advanced: document.getElementById('panel-advanced'),
                scenes: document.getElementById('panel-scenes'),
                filters: document.getElementById('panel-filters'),
                brand: document.getElementById('panel-brand'),
                templates: document.getElementById('panel-templates'),
                billing: document.getElementById('panel-billing'),
                settings: document.getElementById('panel-settings'),
                dashboard: document.getElementById('panel-dashboard')
            };
            
            // Views
            const views = {
                dashboard: document.getElementById('view-dashboard'),
                create: document.getElementById('view-create'),
                projects: document.getElementById('view-projects'),
                brand: document.getElementById('view-brand'),
                templates: document.getElementById('view-templates'),
                billing: document.getElementById('view-billing'),
                settings: document.getElementById('view-settings')
            };

            // Elements within view-create
            const videoPlaceholder = document.getElementById('video-placeholder');
            const videoPreview = document.getElementById('video-preview');

            // Reset Nav Active State
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => item.classList.remove('active'));

            // Helpers
            const hideAllPanels = () => Object.values(panels).forEach(p => { if(p) p.classList.add('hidden'); });
            const hideAllViews = () => Object.values(views).forEach(v => { if(v) v.classList.add('hidden'); });

            if (viewName === 'dashboard') {
                navItems[0].classList.add('active');
                hideAllViews(); views.dashboard.classList.remove('hidden');
                hideAllPanels();
                if(panels.dashboard) panels.dashboard.classList.remove('hidden');

            } else if (viewName === 'projects') {
                navItems[2].classList.add('active'); 
                hideAllViews(); views.projects.classList.remove('hidden');
                hideAllPanels();
                
                const filterBody = document.getElementById('filter-body');
                document.getElementById('filter-title').innerText = "Project Filters";
                filterBody.innerHTML = `
                    <div class="form-group"><label class="form-label">Status</label><select class="form-select"><option>All Status</option><option>Complete</option><option>Draft</option><option>Failed</option></select></div>
                    <div class="form-group"><label class="form-label">Date Range</label><select class="form-select"><option>Last 7 Days</option><option>Last 30 Days</option><option>All Time</option></select></div>
                    <div class="form-group"><label class="form-label">Type</label><select class="form-select"><option>All Types</option><option>Demo</option><option>Promo</option></select></div>
                `;
                panels.filters.classList.remove('hidden');

            } else if (viewName === 'brand') {
                navItems[3].classList.add('active'); 
                hideAllViews(); views.brand.classList.remove('hidden');
                hideAllPanels(); panels.brand.classList.remove('hidden');

            } else if (viewName === 'templates') {
                navItems[4].classList.add('active'); 
                hideAllViews(); views.templates.classList.remove('hidden');
                hideAllPanels(); panels.templates.classList.remove('hidden');

            } else if (viewName === 'billing') {
                navItems[5].classList.add('active');
                hideAllViews(); views.billing.classList.remove('hidden');
                hideAllPanels(); panels.billing.classList.remove('hidden');

            } else if (viewName === 'settings') {
                navItems[6].classList.add('active');
                hideAllViews(); views.settings.classList.remove('hidden');
                hideAllPanels(); panels.settings.classList.remove('hidden');

            } else if (viewName === 'create') {
                navItems[1].classList.add('active');
                hideAllViews(); views.create.classList.remove('hidden');
                videoPreview.classList.add('hidden');
                videoPlaceholder.classList.remove('hidden');
                hideAllPanels(); panels.simple.classList.remove('hidden');
            }
        }

        // Preview Logic
        function showPreview() {
            document.getElementById('panel-simple').classList.add('hidden');
            document.getElementById('panel-advanced').classList.add('hidden');
            document.getElementById('video-placeholder').classList.add('hidden');
            document.getElementById('video-preview').classList.remove('hidden');
            document.getElementById('panel-scenes').classList.remove('hidden');
        }

        // Mode Toggles
        function toggleMode(mode) {
            const simplePanel = document.getElementById('panel-simple');
            const advancedPanel = document.getElementById('panel-advanced');
            if (mode === 'advanced') {
                simplePanel.classList.add('hidden');
                advancedPanel.classList.remove('hidden');
            } else {
                advancedPanel.classList.add('hidden');
                simplePanel.classList.remove('hidden');
            }
        }
        
        // Feature 1: Advanced Panel Scroll Navigation
function scrollToSection(elementId, iconElement) {
    const section = document.getElementById(elementId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Update active icon state
        document.querySelectorAll('.rail-icon').forEach(icon => icon.classList.remove('active'));
        iconElement.classList.add('active');
    }
}

// Feature 2: Dynamic Cost Calculation
function initCostCalculator() {
    const triggers = document.querySelectorAll('.cost-trigger');
    const display = document.getElementById('adv-cost-display');
    
    const calculate = () => {
        let baseCost = 5; // CoreGen Base
        
        // Get inputs
        const isProGen = document.getElementById('toggle-progen')?.checked;
        const resolution = document.getElementById('select-resolution')?.value;
        const isAB = document.getElementById('toggle-ab')?.checked;

        // Logic
        if (isProGen) baseCost += 5; // ProGen is expensive
        if (resolution === '4k') baseCost += 2; // 4K surcharge
        if (isAB) baseCost = Math.ceil(baseCost * 1.5); // A/B testing multiplier

        if(display) display.innerText = `Est. Cost: ~${baseCost} Credits`;
    };

    // Attach listeners
    triggers.forEach(input => {
        input.addEventListener('change', calculate);
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initCostCalculator();
    initBrandPreview(); // See Feature 3
});

// Feature 3: Brand Kit Live Preview
function initBrandPreview() {
    const primaryInput = document.getElementById('brand-input-primary');
    const secondaryInput = document.getElementById('brand-input-secondary');
    
    // Select the swatch divs in the main canvas (View 3)
    // Note: Based on existing HTML structure, we target by style or index, 
    // but adding classes to the View 3 swatches is safer. 
    // Assuming standard DOM traversal for the provided HTML:
    const swatches = document.querySelectorAll('.color-swatch-preview');
    
    if(primaryInput && swatches[0]) {
        primaryInput.addEventListener('input', (e) => {
            const color = e.target.value;
            document.getElementById('brand-hex-primary').innerText = color.toUpperCase();
            swatches[0].style.backgroundColor = color;
        });
    }

    if(secondaryInput && swatches[1]) {
        secondaryInput.addEventListener('input', (e) => {
            const color = e.target.value;
            document.getElementById('brand-hex-secondary').innerText = color.toUpperCase();
            swatches[1].style.backgroundColor = color;
        });
    }
}
