
// Main function to generate the breadcrumb list

function generateBreadcrumbs() {
    // Creating the empty breadcrumb array
    var breadcrumbs = [];
    // Splitting the URL path into an array
    var pathArray = window.location.pathname.split('/');
    // Getting the breadcrumb wrapper element
    var breadcrumbWrapper = document.getElementById('breadcrumbs');

    // Looping through the path array to create the breadcrumb objects
    pathArray.forEach(function (path, index) {
        if (path) {
            // Formatting the path to be more human-readable, removing hyphens and replacing them with spaces
            var formattedPath = path.replace(/-/g, ' ');
            // Creating the blank breadcrumb text variable
            var title;
            // Capitalising the first letter of each word in the path for title case
            if (breadcrumbOptions.capitalisationStyle === 'title') {
                title = formattedPath.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            } else {
                // Capitalising only the first letter of the path for sentence case
                title = formattedPath.charAt(0).toUpperCase() + formattedPath.slice(1);
            }
            // Creating the breadcrumb object
            var breadcrumb = {
                title: title,
                url: pathArray.slice(0, index + 1).join('/')
            };
            // Pushing the breadcrumb object to the breadcrumbs array
            breadcrumbs.push(breadcrumb);
        }
    });

    // Adding the home breadcrumb to the start of the array if the option is enabled
    if (breadcrumbOptions.displayHome === 'true') {
        breadcrumbs.unshift({ title: 'Home', url: '/' });
    }

    // Creating the breadcrumb elements and appending them to the breadcrumb wrapper
    breadcrumbs.forEach(function (breadcrumb, index) {
        // Ensuring the last item is a paragraph element and not a link
        if (index === breadcrumbs.length - 1) {
            var text = document.createElement('p');
            text.textContent = breadcrumb.title;
            if (breadcrumbOptions.textColor) {
                text.style.color = breadcrumbOptions.textColor;
            }
            breadcrumbWrapper.appendChild(text);
        } else {
            var link = document.createElement('a');
            link.href = breadcrumb.url;
            link.textContent = breadcrumb.title;
            if (breadcrumbOptions.textColor) {
                link.style.color = breadcrumbOptions.textColor;
            }
            breadcrumbWrapper.appendChild(link);
            
            // Creating the icons between elements
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

    // Applying the custom spacing value
    if (breadcrumbOptions.itemSpacing) {
        breadcrumbWrapper.style.gap = breadcrumbOptions.itemSpacing;
    }
}

// Helper function to edit the text to force capitalisation of certain terms
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

// Final event listener to call all the functions
document.addEventListener('DOMContentLoaded', () => {
    generateBreadcrumbs();
    adjustBreadcrumbText();
});