function generateBreadcrumbs() {
    var breadcrumbs = [];
    var pathArray = window.location.pathname.split('/');
    var breadcrumbWrapper = document.getElementById('breadcrumbs');
    var capitalisation = breadcrumbWrapper.getAttribute('data-breadcrumb-capitalisation');

    pathArray.forEach(function (path, index) {
        if (path) {
            var formattedPath = path.replace(/-/g, ' ');
            var title;
            if (capitalisation === 'title') {
                title = formattedPath.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            } else {
                title = formattedPath.charAt(0).toUpperCase() + formattedPath.slice(1);
            }
            var breadcrumb = {
                title: title,
                url: pathArray.slice(0, index + 1).join('/')
            };
            breadcrumbs.push(breadcrumb);
        }
    });

    if (breadcrumbWrapper.getAttribute('data-display-home') === 'true') {
        breadcrumbs.unshift({ title: 'Home', url: '/' });
    }

    let iconColor = breadcrumbWrapper.getAttribute('data-icon-color');

    breadcrumbs.forEach(function (breadcrumb, index) {
        if (index === breadcrumbs.length - 1) {
            // Render the last (or only) breadcrumb as a 'p' element
            var text = document.createElement('p');
            text.textContent = breadcrumb.title;
            breadcrumbWrapper.appendChild(text);
        } else {
            // Render other breadcrumbs as links
            var link = document.createElement('a');
            link.href = breadcrumb.url;
            link.textContent = breadcrumb.title;
            breadcrumbWrapper.appendChild(link);
    
            var icon = document.createElement('span');
            icon.classList.add('breadcrumb-icon');
            if (breadcrumbWrapper.getAttribute('data-custom-icon') !== 'true') {
                icon.innerHTML = ' > ';
            }
            if (iconColor) {
                icon.style.color = iconColor;
            }
            breadcrumbWrapper.appendChild(icon);
        }
    });

    let itemGap = breadcrumbWrapper.getAttribute('data-item-spacing');
    if (itemGap) {
        breadcrumbWrapper.style.gap = itemGap;
    }
}

function adjustBreadcrumbText() {
    const breadcrumbWrapper = document.getElementById('breadcrumbs');
    const termsAttribute = breadcrumbWrapper.getAttribute('data-uppercase-terms');
    if (!termsAttribute) return;

    const specialTerms = termsAttribute.split(',').map(term => term.trim());
    const breadcrumbs = document.querySelectorAll('#breadcrumbs p, #breadcrumbs a');

    breadcrumbs.forEach(breadcrumb => {
        specialTerms.forEach(term => {
            const regex = new RegExp(term, 'gi');
            breadcrumb.textContent = breadcrumb.textContent.replace(regex, match => match.toUpperCase());
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    generateBreadcrumbs();
    adjustBreadcrumbText();
});