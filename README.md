# A Good Guy Moving Ltd. Website

This is the official website for A Good Guy Moving Ltd., a professional moving company.

## Features

- Responsive design for all devices
- Contact form with Netlify form handling
- Detailed estimate request form
- Service information pages
- Testimonials from satisfied customers

## Deployment

This website is configured to be deployed using GitHub Pages with Netlify form handling.

### GitHub Pages Deployment

1. Push the repository to GitHub
2. Go to the repository settings
3. Navigate to the "Pages" section
4. Select the branch to deploy (usually `main` or `master`)
5. Set the folder to `/` (root)
6. Click "Save"

### Netlify Form Integration

The contact and estimate forms are configured to work with Netlify Forms. When deploying to Netlify:

1. Connect your GitHub repository to Netlify
2. Netlify will automatically detect the forms with the `data-netlify="true"` attribute
3. Form submissions will be available in the Netlify dashboard

## Local Development

To run the website locally:

1. Clone the repository
2. Open the project in a code editor
3. Use a local server to view the website (e.g., Live Server extension for VS Code)

## Connecting to G Suite Domain

After deploying the website, you can connect it to a G Suite domain:

1. Log in to your G Suite admin console
2. Go to "Domains" > "Manage Domains"
3. Add your custom domain
4. Verify ownership of the domain
5. Update DNS settings to point to your deployed website

## File Structure

- `index.html` - Home page
- `about.html` - About Us page
- `services.html` - Services page
- `testimonials.html` - Testimonials page
- `contact.html` - Contact page
- `estimates.html` - Estimate request page
- `styles.css` - Main stylesheet
- `script.js` - JavaScript functionality
- `netlify.toml` - Netlify configuration
- `favicon.html` - Instructions for creating a favicon
- `images/` - Image assets
- `logos/` - Logo assets

## Favicon

The website includes references to a favicon.ico file, which should be created and placed in the root directory. The favicon.html file provides instructions for creating a favicon using an SVG that matches the brand colors. Follow these steps:

1. Open the favicon.html file in a browser
2. Copy the SVG code provided
3. Use an online converter like [Convertio](https://convertio.co/svg-ico/) or [favicon.io](https://favicon.io/favicon-converter/) to convert the SVG to an ICO file
4. Save the resulting favicon.ico file to the root directory of the website

## Cross-Browser Testing

The website includes a browser-testing.html file that provides a checklist for testing the website across different browsers and devices. This file helps ensure that the website works correctly in all major browsers. To use it:

1. Open the browser-testing.html file in a browser
2. Use the checklist to test each page of the website in different browsers
3. Check off items as you verify them
4. Note any issues found in the textarea at the bottom

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Netlify Forms
- GitHub Pages
