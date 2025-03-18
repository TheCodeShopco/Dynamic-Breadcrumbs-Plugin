function generateBreadcrumbs() {
    var breadcrumbs = [];
    var pathArray = window.location.pathname.split('/');
    var breadcrumbWrapper = document.getElementById('breadcrumbs');

    pathArray.forEach(function (path, index) {
        if (path) {
            var formattedPath = path.replace(/-/g, ' ');
            var title;
            if (breadcrumbOptions.capitalisationStyle === 'title') {
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

    if (breadcrumbOptions.displayHome === 'true') {
        breadcrumbs.unshift({ title: 'Home', url: '/' });
    }

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
            if (breadcrumbOptions.customIcon !== 'true') {
                icon.innerHTML = ' > ';
            }
            if (breadcrumbOptions.iconColor) {
                icon.style.color = breadcrumbOptions.iconColor;
            }
            breadcrumbWrapper.appendChild(icon);
        }
    });

    if (breadcrumbOptions.itemSpacing) {
        breadcrumbWrapper.style.gap = breadcrumbOptions.itemSpacing;
    }
}

function adjustBreadcrumbText() {
    const termsList = breadcrumbOptions.forcedUppercaseTerms;
    if (!termsList) return;

    const specialTerms = termsList.split(',').map(term => term.trim());
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