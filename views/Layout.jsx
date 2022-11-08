const React = require('react');
const PropTypes = require('prop-types');

function Layout({ children, title }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <script defer src="/js/application.js" />
        <title>{title}</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

// PropTypes
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

module.exports = Layout;
