const React = require('react');

function Footer() {
  return (
    <footer id="footer" className="pt-3 mt-4 text-muted border-top">
      {`© Andrew Production ${new Date().getFullYear()}`}
    </footer>
  );
}

module.exports = Footer;
